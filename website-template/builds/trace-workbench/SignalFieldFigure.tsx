"use client";

import { useEffect, useRef } from "react";

/* The signal field from the TRACE landing page (trace-workbench site/index.html at
 * 11e5a96), ported to React for the hero figure. Same dot palettes, speeds, link
 * distance and pointer repel. Differences, all for the frame:
 * - it is sized by the figure, not the viewport, and respawns when that size changes;
 * - the node count follows the frame's area (one node per 1,600 px², the density the
 *   landing page's 40-node floor gives a 390 px frame), capped at 480, so the desktop
 *   frame is as full as the phone one. Links are found through a grid of LINK_DIST cells
 *   and stroked in batched alpha bands; past 2,400 links the faintest bands are
 *   dropped first, so a full frame stays cheap to raster;
 * - link lines take the theme's --text-2, and are stronger in light mode, where the
 *   landing page's 0.16 alpha almost disappeared on the paper background;
 * - particles come from a seeded generator, so the reduced-motion still is the same
 *   frame on every visit;
 * - it redraws when the site theme flips, since the page has no field-specific toggle. */

const PALETTES = {
  dark: { dots: ["251,191,36", "56,189,248", "230,235,242"], linkAlpha: 0.16 },
  light: { dots: ["217,119,6", "2,132,199", "51,65,85"], linkAlpha: 0.36 },
} as const;

const LINK_DIST = 130;
const LINK_DIST2 = LINK_DIST * LINK_DIST;
const MOUSE_DIST = 170;
/* One node per 1,600 px² of frame: the landing page's 40-node floor in a 390 px frame. */
const AREA_PER_NODE = 1600;
const MIN_NODES = 40;
const MAX_NODES = 480;
/* Link alpha is quantised into this many bands, one batched stroke each. */
const BANDS = 16;
/* Raster budget: past this many links a frame drops its faintest (longest) bands first,
 * which changes the look least. The 390 frame (~500 links) never reaches it. */
const MAX_LINKS = 2400;

/** "#b3bac6" or "rgb(179, 186, 198)" → "179,186,198". */
function rgbOf(value: string, fallback: string) {
  const v = value.trim();
  const hex = /^#([0-9a-f]{6})$/i.exec(v);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
  }
  const rgb = /^rgba?\(([^)]+)\)$/i.exec(v);
  if (rgb) return rgb[1].split(",").slice(0, 3).map((x) => x.trim()).join(",");
  return fallback;
}

function nodeCount(width: number, height: number) {
  return Math.round(Math.min(MAX_NODES, Math.max(MIN_NODES, (width * height) / AREA_PER_NODE)));
}

type Particle = { x: number; y: number; vx: number; vy: number; r: number; tone: 0 | 1 | 2 };

function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function SignalFieldFigure() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let W = 0;
    let H = 0;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };
    let visible = true;
    let running = false;
    let raf = 0;

    const spawn = (n: number) => {
      const rand = seeded(0x7ace);
      particles = Array.from({ length: n }, () => {
        const roll = rand();
        return {
          x: rand() * W,
          y: rand() * H,
          vx: (rand() - 0.5) * 0.45,
          vy: (rand() - 0.5) * 0.45,
          r: rand() * 1.8 + 0.6,
          tone: roll < 0.28 ? 0 : roll < 0.7 ? 1 : 2,
        };
      });
    };

    /* Theme colours, read from the site tokens when the theme changes, not every frame. */
    let theme: "dark" | "light" = "dark";
    let linkRgb = "179,186,198";
    const readTheme = () => {
      theme = root.dataset.theme === "light" ? "light" : "dark";
      linkRgb = rgbOf(getComputedStyle(root).getPropertyValue("--text-2"), theme === "light" ? "58,67,81" : "179,186,198");
    };

    /* Grid of LINK_DIST cells: each node is only compared with the nodes in its own and
     * neighbouring cells. Rebuilt every frame, which is cheap next to the drawing. */
    let cols = 1;
    let rows = 1;
    let heads = new Int32Array(1);
    let next = new Int32Array(0);
    const bands: Path2D[] = [];
    const bandCount = new Int32Array(BANDS);

    const draw = () => {
      const pal = PALETTES[theme];
      ctx.clearRect(0, 0, W, H);

      const n = particles.length;
      if (next.length !== n) next = new Int32Array(n);
      heads.fill(-1);
      for (let i = 0; i < n; i++) {
        const p = particles[i];
        const cx = Math.min(cols - 1, Math.max(0, Math.floor((p.x + 20) / LINK_DIST)));
        const cy = Math.min(rows - 1, Math.max(0, Math.floor((p.y + 20) / LINK_DIST)));
        const cell = cy * cols + cx;
        next[i] = heads[cell];
        heads[cell] = i;
      }
      for (let b = 0; b < BANDS; b++) bands[b] = new Path2D();
      bandCount.fill(0);
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          for (let i = heads[cy * cols + cx]; i !== -1; i = next[i]) {
            const p = particles[i];
            /* This cell (later nodes only) and the four forward neighbours, so each pair is seen once. */
            for (const [ox, oy] of [[0, 0], [1, 0], [-1, 1], [0, 1], [1, 1]] as const) {
              const nx = cx + ox;
              const ny = cy + oy;
              if (nx < 0 || nx >= cols || ny >= rows) continue;
              for (let j = ox === 0 && oy === 0 ? next[i] : heads[ny * cols + nx]; j !== -1; j = next[j]) {
                const q = particles[j];
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const d = dx * dx + dy * dy;
                if (d < LINK_DIST2) {
                  const band = Math.min(BANDS - 1, Math.floor((1 - d / LINK_DIST2) * BANDS));
                  bandCount[band]++;
                  bands[band].moveTo(p.x, p.y);
                  bands[band].lineTo(q.x, q.y);
                }
              }
            }
          }
        }
      }
      ctx.lineWidth = 1;
      let drawn = 0;
      for (let b = BANDS - 1; b >= 0; b--) {
        drawn += bandCount[b];
        if (drawn > MAX_LINKS && b < BANDS - 1) break;
        ctx.strokeStyle = `rgba(${linkRgb},${(pal.linkAlpha * ((b + 0.5) / BANDS)).toFixed(3)})`;
        ctx.stroke(bands[b]);
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pal.dots[p.tone]},${p.tone === 0 ? 0.8 : 0.6})`;
        ctx.fill();
      }
    };

    const move = () => {
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_DIST && d > 1) {
          p.x += (dx / d) * 0.7;
          p.y += (dy / d) * 0.7;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = W + 20;
        else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        else if (p.y > H + 20) p.y = -20;
      }
    };

    const frame = () => {
      move();
      draw();
      raf = requestAnimationFrame(frame);
    };

    /* Animate only with full motion, while the figure is on screen and the tab is visible.
     * Otherwise the field holds one still frame. */
    const update = () => {
      const should = !reduce.matches && visible && !document.hidden;
      if (should && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!should && running) {
        running = false;
        cancelAnimationFrame(raf);
        draw();
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.max(1, Math.ceil((W + 40) / LINK_DIST));
      rows = Math.max(1, Math.ceil((H + 40) / LINK_DIST));
      heads = new Int32Array(cols * rows);
      spawn(nodeCount(W, H));
      wrap.dataset.nodes = String(particles.length);
      draw();
    };

    let lastW = -1;
    let lastH = -1;
    const sizer = new ResizeObserver(() => {
      if (wrap.clientWidth === lastW && wrap.clientHeight === lastH) return;
      lastW = wrap.clientWidth;
      lastH = wrap.clientHeight;
      resize();
    });
    sizer.observe(wrap);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    const seen = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      update();
    });
    seen.observe(wrap);

    const themed = new MutationObserver(() => {
      readTheme();
      if (!running) draw();
    });
    themed.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    document.addEventListener("visibilitychange", update);
    reduce.addEventListener("change", update);
    readTheme();
    resize();
    update();

    return () => {
      cancelAnimationFrame(raf);
      sizer.disconnect();
      seen.disconnect();
      themed.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="tw-field"
      data-signal-field
      role="img"
      aria-label="The TRACE signal field: amber, sky and grey particles drift across the frame and link with faint lines when they pass close to each other."
    >
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
