import { gsap } from "gsap";
import { INTRO_DONE_EVENT } from "../flags";
import { buildFormation, evalTarget, sampleText, type Formation, type FormationHelpers, type FormationRecipe, type GlyphOptions } from "./formations";

/**
 * A single full-screen Canvas 2D particle field that follows the reader down the
 * page. Elements marked `data-signal="<key>"` are anchors: while one fills at least
 * half the viewport (or half of itself), the particles spring into its formation,
 * fitted to the element's box. Between anchors they drift through a flow field.
 *
 * Mount only in full-motion mode. The canvas should be position:fixed, inset 0,
 * pointer-events:none, behind the content (see .signal-canvas in motion.css).
 */

export interface ParticleFieldOptions {
  formations: Record<string, FormationRecipe>;
  /** One colour per palette index, per theme. Index 0 is the accent by convention. */
  palettes: { dark: string[]; light: string[] };
  anchorAttribute?: string;
  /** Pool size by device class; the field shrinks further if FPS drops. */
  budget?: { desktop: number; touch: number; phone: number };
  minParticles?: number;
  /** Shrink the pool when measured FPS falls below this. */
  fpsFloor?: number;
  /** Probability of each palette index for drifting particles. */
  ambientMix?: number[];
  pointerRadius?: { fine: number; coarse: number };
  shockwaveRadius?: number;
  /** Elements whose text shows the live count and FPS. */
  statSelector?: string;
  statFormat?: (count: number, fps: number) => string;
  /** Anchor the opening burst radiates from; defaults to the viewport centre. */
  burstFrom?: string;
  introEvent?: string;
  /** Cap on devicePixelRatio; above ~1.75 the fill cost outruns the visible gain. */
  maxDpr?: number;
}

export function createParticleField(canvas: HTMLCanvasElement, options: ParticleFieldOptions): () => void {
  const {
    formations,
    palettes,
    anchorAttribute = "data-signal",
    budget = { desktop: 1900, touch: 1100, phone: 850 },
    minParticles = 600,
    fpsFloor = 42,
    ambientMix = [0.25, 0.3, 0.45],
    pointerRadius = { fine: 120, coarse: 70 },
    shockwaveRadius = 280,
    statSelector = "[data-signal-stat]",
    statFormat = (count, fps) => `${count.toLocaleString("en-US")} PARTICLES · ${fps} FPS`,
    burstFrom,
    introEvent = INTRO_DONE_EVENT,
    maxDpr = 1.75,
  } = options;

  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const root = document.documentElement;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const MAX = window.innerWidth < 768 ? budget.phone : coarse ? budget.touch : budget.desktop;
  let pool = MAX;

  /* Particle state, struct-of-arrays so the hot loop stays allocation-free. */
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

  const mixTotal = ambientMix.reduce((a, b) => a + b, 0) || 1;
  for (let i = 0; i < MAX; i++) {
    order[i] = i;
    // A few large "stars" among the dust give the field depth.
    size[i] = Math.random() < 0.06 ? 2.6 : 1.1 + Math.random() * 1.1;
    phase[i] = Math.random() * Math.PI * 2;
    // Per-particle spring and damping so a formation settles organically, not in lockstep.
    spring[i] = 0.016 + Math.random() * 0.03;
    damping[i] = 0.8 + Math.random() * 0.08;
    baseAlpha[i] = 0.2 + Math.random() * 0.3;
    let r = Math.random() * mixTotal;
    let c = 0;
    while (c < ambientMix.length - 1 && r >= ambientMix[c]) r -= ambientMix[c++];
    ambientColor[i] = c;
  }
  // Shuffled order decides which particles join a formation when it needs fewer than the pool.
  for (let i = MAX - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  let w = 0;
  let h = 0;
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
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

  /* Formations ------------------------------------------------------ */
  const glyphCache = new Map<string, [number, number][]>();
  const helpers: FormationHelpers = {
    glyph(text: string, glyphOptions?: GlyphOptions) {
      const id = `${text}|${JSON.stringify(glyphOptions ?? {})}`;
      let pts = glyphCache.get(id);
      if (!pts) {
        pts = sampleText(text, getComputedStyle(document.body).fontFamily, glyphOptions);
        glyphCache.set(id, pts);
      }
      return pts;
    },
  };
  const cache = new Map<string, Formation>();
  const formationFor = (key: string) => {
    const id = `${key}:${pool}`;
    let f = cache.get(id);
    if (!f) {
      f = buildFormation(formations[key], pool, helpers);
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
    for (const el of document.querySelectorAll<HTMLElement>(`[${anchorAttribute}]`)) {
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
      // Released: a small random kick so the swarm visibly lets go.
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
      // Staggered wake times, earlier on the left, so the formation draws itself in a sweep.
      wake[i] = now + 0.05 + (tx[j] / f.width) * 0.45 + Math.random() * 0.25;
    }
  };

  /* Pointer ---------------------------------------------------------- */
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
    const R = shockwaveRadius;
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

  /* Start: wait for the intro to hand off and the web font to load ---- */
  let started = false;
  let introDone = root.dataset.intro !== "on";
  let fontsReady = false;
  const maybeStart = () => {
    if (started || !introDone || !fontsReady) return;
    started = true;
    const origin = burstFrom ? document.querySelector<HTMLElement>(`[${anchorAttribute}="${burstFrom}"]`)?.getBoundingClientRect() : undefined;
    const cx = origin ? origin.left + origin.width / 2 : w / 2;
    const cy = origin ? origin.top + origin.height / 2 : h / 2;
    // Big bang: everything starts at one point and bursts outward into the first formation.
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
  window.addEventListener(introEvent, onIntroDone);

  const onFonts = () => {
    if (fontsReady) return;
    // Glyphs sampled before the web font loads would use the fallback face.
    glyphCache.clear();
    cache.clear();
    fontsReady = true;
    maybeStart();
  };
  document.fonts.ready.then(onFonts);
  const fontTimeout = window.setTimeout(onFonts, 1500);

  /* Adaptive quality + HUD stats ------------------------------------- */
  let frames = 0;
  let frameTime = 0;
  let statClock = 0;
  let fps = 60;
  const writeStats = () => {
    document.querySelectorAll<HTMLElement>(statSelector).forEach((el) => {
      el.textContent = statFormat(pool, fps);
    });
  };

  /* Frame ------------------------------------------------------------ */
  let lastScroll = window.scrollY;
  const tick = (now: number, deltaMs: number) => {
    // Clamp so a background tab returning doesn't fling everything off screen.
    const dt = Math.min(deltaMs, 50) / 1000;
    const f = dt * 60;

    frames++;
    frameTime += deltaMs;
    statClock += deltaMs;
    if (statClock > 500) {
      fps = Math.round((frames * 1000) / frameTime);
      if (fps < fpsFloor && pool > minParticles && started) {
        pool = Math.max(minParticles, Math.floor(pool * 0.75));
        activeKey = ""; // force a re-morph at the smaller pool size
      }
      writeStats();
      frames = 0;
      frameTime = 0;
      statClock = 0;
    }

    const dark = root.dataset.theme !== "light";
    const palette = dark ? palettes.dark : palettes.light;
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
    const key = next?.getAttribute(anchorAttribute) ?? "";
    if (next !== active || key !== activeKey) {
      active = next;
      activeKey = key;
      morph(key && key in formations ? formationFor(key) : null, now);
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

    const R = coarse ? pointerRadius.coarse : pointerRadius.fine;
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
        // Tiny per-particle breathing keeps a settled formation alive.
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
        const angle = Math.sin(x * 0.0021 + now * 0.13) * 2.1 + Math.cos(y * 0.0017 - now * 0.11) * 2.1 + Math.sin((x + y) * 0.0009 + now * 0.07);
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
        // Drifting particles wrap around the edges.
        if (x < -20) x = w + 20;
        else if (x > w + 20) x = -20;
        if (y < -20) y = h + 20;
        else if (y > h + 20) y = -20;
      }
      px[i] = x;
      py[i] = y;
    }

    // Additive blending glows on dark; it would wash out to white on light.
    ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
    // One fillStyle change per colour instead of per particle.
    for (let c = 0; c < palette.length; c++) {
      ctx.fillStyle = palette[c];
      for (let i = 0; i < pool; i++) {
        if (drawColor[i] !== c) continue;
        ctx.globalAlpha = drawAlpha[i];
        ctx.fillRect(px[i], py[i], size[i], size[i]);
      }
    }
  };

  // Runs on GSAP's ticker so it reads scroll after Lenis has updated it this frame.
  gsap.ticker.add(tick);
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  window.addEventListener("pointerup", onPointerUp, { passive: true });
  window.addEventListener("pointercancel", onPointerUp, { passive: true });
  root.addEventListener("pointerleave", onPointerLeave);
  window.addEventListener("blur", onPointerLeave);

  return () => {
    gsap.ticker.remove(tick);
    window.clearTimeout(fontTimeout);
    window.removeEventListener(introEvent, onIntroDone);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);
    root.removeEventListener("pointerleave", onPointerLeave);
    window.removeEventListener("blur", onPointerLeave);
  };
}
