"use client";

import { useEffect, useRef } from "react";

/* The signal field from the TRACE landing page (trace-workbench site/index.html at
 * 11e5a96), ported to React for the hero figure. Same palettes, particle count,
 * speeds, link distance and pointer repel. Differences, all for the frame:
 * - it is sized by the figure, not the viewport, and respawns when that size changes;
 * - particles come from a seeded generator, so the reduced-motion still is the same
 *   frame on every visit;
 * - it redraws when the site theme flips, since the page has no field-specific toggle. */

const PALETTES = {
  dark: { dots: ["251,191,36", "56,189,248", "230,235,242"], link: "179,186,198" },
  light: { dots: ["217,119,6", "2,132,199", "51,65,85"], link: "58,67,81" },
} as const;

const LINK_DIST = 130;
const MOUSE_DIST = 170;

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

    const draw = () => {
      const pal = PALETTES[root.dataset.theme === "light" ? "light" : "dark"];
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pal.dots[p.tone]},${p.tone === 0 ? 0.8 : 0.6})`;
        ctx.fill();
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p = particles[i];
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = dx * dx + dy * dy;
          if (d < LINK_DIST * LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${pal.link},${(0.16 * (1 - d / (LINK_DIST * LINK_DIST))).toFixed(3)})`;
            ctx.stroke();
          }
        }
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
      spawn(Math.round(Math.min(90, Math.max(40, (W * H) / 14000))));
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
      if (!running) draw();
    });
    themed.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    document.addEventListener("visibilitychange", update);
    reduce.addEventListener("change", update);
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
