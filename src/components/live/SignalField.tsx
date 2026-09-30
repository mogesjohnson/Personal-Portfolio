"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { buildFormation, pointOnPolyline, sampleMonogram, type Formation, type FormationKey, type Target } from "./formations";

/**
 * The Live Motion signal field: one full-screen canvas of particles that follows
 * the reader down the page. Elements marked `data-signal="<formation>"` act as
 * anchors — while one is on screen the particles assemble into its formation,
 * fitted to the element's box. Between anchors they drift through a flow field.
 */

const PALETTES = {
  dark: ["#fbbf24", "#38bdf8", "#e6ebf2"],
  light: ["#d97706", "#0284c7", "#334155"],
};

const FORMATION_KEYS: FormationKey[] = ["mj", "contact", "sys", "tree", "orbit"];

function evalTarget(t: Target, time: number, out: [number, number]) {
  if (t.kind === "point") {
    out[0] = t.x;
    out[1] = t.y;
  } else if (t.kind === "spin") {
    const a = t.angle + time * t.speed;
    out[0] = t.cx + Math.cos(a) * t.r;
    out[1] = t.cy + Math.sin(a) * t.r;
  } else {
    pointOnPolyline(t.path, t.offset + time * t.speed, out);
  }
}

export default function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const root = document.documentElement;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const MAX = window.innerWidth < 768 ? 850 : coarse ? 1100 : 1900;
    let pool = MAX;

    const px = new Float32Array(MAX);
    const py = new Float32Array(MAX);
    const vx = new Float32Array(MAX);
    const vy = new Float32Array(MAX);
    const size = new Float32Array(MAX);
    const phase = new Float32Array(MAX);
    const spring = new Float32Array(MAX);
    const damping = new Float32Array(MAX);
    const wake = new Float32Array(MAX);
    const baseAlpha = new Float32Array(MAX);
    const ambientColor = new Uint8Array(MAX);
    const drawColor = new Uint8Array(MAX);
    const drawAlpha = new Float32Array(MAX);
    const assign = new Int32Array(MAX).fill(-1);
    const order = new Uint32Array(MAX);

    for (let i = 0; i < MAX; i++) {
      order[i] = i;
      size[i] = Math.random() < 0.06 ? 2.6 : 1.1 + Math.random() * 1.1;
      phase[i] = Math.random() * Math.PI * 2;
      spring[i] = 0.016 + Math.random() * 0.03;
      damping[i] = 0.8 + Math.random() * 0.08;
      baseAlpha[i] = 0.2 + Math.random() * 0.3;
      const r = Math.random();
      ambientColor[i] = r < 0.25 ? 0 : r < 0.55 ? 1 : 2;
    }
    for (let i = MAX - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    for (let i = 0; i < MAX; i++) {
      px[i] = Math.random() * w;
      py[i] = Math.random() * h;
    }

    /* Formations ---------------------------------------------------- */
    let glyph: [number, number][] = [];
    const cache = new Map<string, Formation>();
    const formationFor = (key: FormationKey) => {
      const id = `${key}:${pool}`;
      let f = cache.get(id);
      if (!f) {
        f = buildFormation(key, pool, glyph);
        cache.set(id, f);
      }
      return f;
    };

    let active: HTMLElement | null = null;
    let activeKey = "";
    let formation: Formation | null = null;
    const pos: [number, number] = [0, 0];

    const pickAnchor = (): HTMLElement | null => {
      const vh = window.innerHeight;
      let best: HTMLElement | null = null;
      let bestScore = 0;
      for (const el of document.querySelectorAll<HTMLElement>("[data-signal]")) {
        const r = el.getBoundingClientRect();
        if (r.height < 1) continue;
        const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
        let score = visible / Math.min(r.height, vh);
        if (el === active) score += 0.25; // hysteresis: hold the current formation a little longer
        if (score > bestScore) {
          bestScore = score;
          best = el;
        }
      }
      return bestScore >= 0.5 ? best : null;
    };

    const morph = (f: Formation | null, now: number) => {
      formation = f;
      assign.fill(-1);
      if (!f) {
        for (let i = 0; i < pool; i++) {
          vx[i] += (Math.random() - 0.5) * 3;
          vy[i] += (Math.random() - 0.5) * 3;
        }
        return;
      }
      const n = Math.min(f.targets.length, pool);
      // Pair particles and targets left-to-right so the swarm sweeps instead of tangling.
      const participants = Array.from(order)
        .filter((i) => i < pool)
        .slice(0, n);
      participants.sort((a, b) => px[a] - px[b]);
      const tx = new Float32Array(n);
      const targetOrder = Array.from({ length: n }, (_, j) => {
        evalTarget(f.targets[j], now, pos);
        tx[j] = pos[0];
        return j;
      }).sort((a, b) => tx[a] - tx[b]);
      for (let m = 0; m < n; m++) {
        const i = participants[m];
        const j = targetOrder[m];
        assign[i] = j;
        wake[i] = now + 0.05 + (tx[j] / f.width) * 0.45 + Math.random() * 0.25;
      }
    };

    /* Pointer --------------------------------------------------------- */
    const pointer = { x: -9999, y: -9999, active: false };
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onPointerUp = (e: PointerEvent) => {
      // A finger lifting off shouldn't leave a permanent hole in the formation.
      if (e.pointerType !== "mouse") pointer.active = false;
    };
    const onPointerDown = (e: PointerEvent) => {
      // Shockwave: a click scatters nearby particles, and the springs pull them back.
      const R = 280;
      for (let i = 0; i < pool; i++) {
        const dx = px[i] - e.clientX;
        const dy = py[i] - e.clientY;
        const d = Math.hypot(dx, dy);
        if (d < R && d > 0.5) {
          const s = (1 - d / R) * 16;
          vx[i] += (dx / d) * s;
          vy[i] += (dy / d) * s;
        }
      }
    };

    /* Start: wait for the intro to finish and the display face to load */
    let started = false;
    let introDone = root.dataset.intro !== "on";
    let fontsReady = false;
    const maybeStart = () => {
      if (started || !introDone || !fontsReady) return;
      started = true;
      const hero = document.querySelector<HTMLElement>('[data-signal="mj"]')?.getBoundingClientRect();
      const cx = hero ? hero.left + hero.width / 2 : w / 2;
      const cy = hero ? hero.top + hero.height / 2 : h / 2;
      for (let i = 0; i < MAX; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 3 + Math.random() * 16;
        px[i] = cx + Math.cos(a) * 4;
        py[i] = cy + Math.sin(a) * 4;
        vx[i] = Math.cos(a) * s;
        vy[i] = Math.sin(a) * s;
      }
    };
    const onIntroDone = () => {
      introDone = true;
      maybeStart();
    };
    window.addEventListener("live:intro-done", onIntroDone);

    const loadGlyph = () => {
      if (fontsReady) return;
      glyph = sampleMonogram(getComputedStyle(document.body).fontFamily);
      cache.clear();
      fontsReady = true;
      maybeStart();
    };
    document.fonts.ready.then(loadGlyph);
    const fontTimeout = window.setTimeout(loadGlyph, 1500);

    /* Adaptive quality + HUD stats ------------------------------------ */
    let frames = 0;
    let frameTime = 0;
    let statClock = 0;
    let fps = 60;
    const writeStats = () => {
      document.querySelectorAll<HTMLElement>("[data-signal-stat]").forEach((el) => {
        el.textContent = `${pool.toLocaleString("en-US")} PARTICLES · ${fps} FPS`;
      });
    };

    /* Frame ----------------------------------------------------------- */
    let lastScroll = window.scrollY;
    const tick = (time: number, deltaMs: number) => {
      const now = time;
      const dt = Math.min(deltaMs, 50) / 1000;
      const f = dt * 60;

      frames++;
      frameTime += deltaMs;
      statClock += deltaMs;
      if (statClock > 500) {
        fps = Math.round((frames * 1000) / frameTime);
        if (fps < 42 && pool > 600 && started) {
          pool = Math.max(600, Math.floor(pool * 0.75));
          activeKey = ""; // force a re-morph at the smaller pool size
        }
        writeStats();
        frames = 0;
        frameTime = 0;
        statClock = 0;
      }

      const dark = root.dataset.theme !== "light";
      const palette = dark ? PALETTES.dark : PALETTES.light;
      const scrollY = window.scrollY;
      const dScroll = lastScroll - scrollY;
      lastScroll = scrollY;

      // Fade the previous frame to leave short motion trails; fade harder while the
      // page scrolls so trails read as blur on the swarm, not smears across text.
      const fade = Math.min(0.9, (dark ? 0.3 : 0.45) + Math.abs(dScroll) * 0.03);
      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgba(0,0,0,${fade})`;
      ctx.fillRect(0, 0, w, h);
      if (!started) return;

      const next = pickAnchor();
      const key = (next?.dataset.signal ?? "") as FormationKey | "";
      if (next !== active || key !== activeKey) {
        active = next;
        activeKey = key;
        morph(key && FORMATION_KEYS.includes(key) ? formationFor(key) : null, now);
      }

      let ox = 0;
      let oy = 0;
      let sc = 1;
      if (active && formation) {
        const r = active.getBoundingClientRect();
        sc = Math.min(r.width / formation.width, r.height / formation.height);
        ox = r.left + (r.width - formation.width * sc) / 2;
        oy = r.top + (r.height - formation.height * sc) / 2;
      }

      const R = coarse ? 70 : 120;
      const R2 = R * R;
      for (let i = 0; i < pool; i++) {
        let x = px[i];
        let y = py[i];
        const a = assign[i];
        const inForm = a >= 0 && formation !== null && now >= wake[i];
        // Formation particles scroll with the page; drifting dust gets parallax.
        y += dScroll * (a >= 0 ? 1 : 0.35);

        if (inForm && formation) {
          const t = formation.targets[a];
          evalTarget(t, now, pos);
          const tx = ox + pos[0] * sc + Math.sin(now * 1.6 + phase[i]) * 0.7;
          const ty = oy + pos[1] * sc + Math.cos(now * 1.3 + phase[i]) * 0.7;
          let visibility = 1;
          if (t.kind === "flow") {
            // Packets fade in at the source and out at the sink, then jump back
            // unseen — otherwise the spring drags them across the diagram.
            const u = (((t.offset + now * t.speed) % 1) + 1) % 1;
            visibility = Math.min(1, u / 0.08, (1 - u) / 0.08);
            if (u < 0.03) {
              x = tx;
              y = ty;
              vx[i] = 0;
              vy[i] = 0;
            }
          }
          vx[i] += (tx - x) * spring[i] * f;
          vy[i] += (ty - y) * spring[i] * f;
          const d = Math.pow(damping[i], f);
          vx[i] *= d;
          vy[i] *= d;
          drawColor[i] = t.c;
          drawAlpha[i] = ((dark ? 0.62 : 0.78) + Math.sin(now * 2.2 + phase[i]) * 0.2) * visibility;
        } else {
          const angle =
            Math.sin(x * 0.0021 + now * 0.13) * 2.1 + Math.cos(y * 0.0017 - now * 0.11) * 2.1 + Math.sin((x + y) * 0.0009 + now * 0.07);
          // Flow field plus a little random walk so the dust never settles into clumps.
          vx[i] += (Math.cos(angle) * 0.03 + (Math.random() - 0.5) * 0.05) * f;
          vy[i] += (Math.sin(angle) * 0.03 + (Math.random() - 0.5) * 0.05) * f;
          const d = Math.pow(0.965, f);
          vx[i] *= d;
          vy[i] *= d;
          drawColor[i] = ambientColor[i];
          drawAlpha[i] = baseAlpha[i] * (dark ? 1 : 0.9);
        }

        if (pointer.active) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const s = 1 - d / R;
            const push = s * s * 5 * f;
            // Push outward with a slight swirl, like a hand through water.
            vx[i] += (dx / d) * push - (dy / d) * push * 0.35;
            vy[i] += (dy / d) * push + (dx / d) * push * 0.35;
          }
        }

        x += vx[i] * f;
        y += vy[i] * f;
        if (!inForm) {
          if (x < -20) x = w + 20;
          else if (x > w + 20) x = -20;
          if (y < -20) y = h + 20;
          else if (y > h + 20) y = -20;
        }
        px[i] = x;
        py[i] = y;
      }

      ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
      for (let c = 0; c < 3; c++) {
        ctx.fillStyle = palette[c];
        for (let i = 0; i < pool; i++) {
          if (drawColor[i] !== c) continue;
          ctx.globalAlpha = drawAlpha[i];
          ctx.fillRect(px[i], py[i], size[i], size[i]);
        }
      }
    };

    // Runs on GSAP's ticker so it reads scroll after Lenis has updated it this frame.
    const onTick = (time: number, deltaMs: number) => tick(time, deltaMs);
    gsap.ticker.add(onTick);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);

    return () => {
      gsap.ticker.remove(onTick);
      window.clearTimeout(fontTimeout);
      window.removeEventListener("live:intro-done", onIntroDone);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="signal-field" aria-hidden="true" />;
}
