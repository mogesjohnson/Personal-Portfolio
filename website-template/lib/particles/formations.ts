/**
 * Formation geometry for the particle field.
 *
 * A formation is a list of targets in its own coordinate space (width × height).
 * The engine fits that space into an anchor element on the page, so one recipe
 * can sit in a 300px card or a full-bleed hero. Targets can be static points,
 * points orbiting a centre ("spin"), or points travelling a path forever ("flow").
 *
 * Recipes are lists of weighted primitives. Each primitive is a sampler that
 * returns one random target on its shape; `assemble` splits the particle budget
 * across primitives by weight using a seeded RNG, so a formation looks the same
 * on every visit and at every pool size.
 */

/** Index into the field's palette (0 = accent, 1 = secondary, 2 = soft, by convention). */
export type PaletteIndex = number;

export type Target =
  | { kind: "point"; x: number; y: number; c: PaletteIndex }
  | { kind: "flow"; path: Polyline; offset: number; speed: number; c: PaletteIndex }
  | { kind: "spin"; cx: number; cy: number; r: number; angle: number; speed: number; c: PaletteIndex };

export interface Polyline {
  pts: [number, number][];
  cum: number[];
  length: number;
}

export interface Formation {
  width: number;
  height: number;
  targets: Target[];
}

export type Rand = () => number;
export type Make = (rand: Rand) => Target;

export interface Primitive {
  weight: number;
  make: Make;
}

export interface GlyphOptions {
  /** Side of the square sampling canvas, which is also the formation space. */
  size?: number;
  fontSize?: number;
  fontWeight?: number;
  /** Sample every nth pixel; 2 keeps ~1/4 of the filled pixels. */
  step?: number;
  /** Optical nudge for the baseline. */
  offsetY?: number;
}

export interface FormationHelpers {
  /** Filled pixels of `text` set in the page's body font. Only valid after fonts load. */
  glyph(text: string, options?: GlyphOptions): [number, number][];
}

export interface FormationRecipe {
  width: number;
  height: number;
  /** Fraction of the particle pool pulled into the formation; the rest keep drifting. */
  share: number;
  seed?: number;
  primitives(helpers: FormationHelpers): Primitive[];
}

/** Identity helper that gives recipe literals full type checking. */
export function defineFormation(recipe: FormationRecipe): FormationRecipe {
  return recipe;
}

const TAU = Math.PI * 2;

/* ------------------------------------------------------------------ */
/* Geometry helpers                                                     */
/* ------------------------------------------------------------------ */

/** Shortens a line at both ends, e.g. so an edge stops at a node's ring instead of its centre. */
export function trim(x1: number, y1: number, x2: number, y2: number, startInset: number, endInset = startInset) {
  const len = Math.hypot(x2 - x1, y2 - y1) || 1;
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  return [x1 + ux * startInset, y1 + uy * startInset, x2 - ux * endInset, y2 - uy * endInset] as const;
}

export function polyline(pts: [number, number][]): Polyline {
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  }
  return { pts, cum, length: cum[cum.length - 1] };
}

/** Writes the point at fraction `u` (wrapped to 0..1) along the path into `out`. */
export function pointOnPolyline(path: Polyline, u: number, out: [number, number]) {
  const d = (((u % 1) + 1) % 1) * path.length;
  let i = 1;
  while (i < path.cum.length - 1 && path.cum[i] < d) i++;
  const seg = path.cum[i] - path.cum[i - 1] || 1;
  const t = (d - path.cum[i - 1]) / seg;
  const [ax, ay] = path.pts[i - 1];
  const [bx, by] = path.pts[i];
  out[0] = ax + (bx - ax) * t;
  out[1] = ay + (by - ay) * t;
}

/** Position of a target at `time` seconds, written into `out` to avoid allocating per particle per frame. */
export function evalTarget(t: Target, time: number, out: [number, number]) {
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

/* ------------------------------------------------------------------ */
/* Primitive samplers                                                   */
/* ------------------------------------------------------------------ */

export const point = (x: number, y: number, c: PaletteIndex): Target => ({ kind: "point", x, y, c });

/** A line with a little perpendicular jitter so it reads as drawn, not ruled. */
export function segment(x1: number, y1: number, x2: number, y2: number, c: PaletteIndex, thickness = 1.2): Make {
  const len = Math.hypot(x2 - x1, y2 - y1) || 1;
  const nx = -(y2 - y1) / len;
  const ny = (x2 - x1) / len;
  return (rand) => {
    const t = rand();
    const o = (rand() - 0.5) * thickness;
    return point(x1 + (x2 - x1) * t + nx * o, y1 + (y2 - y1) * t + ny * o, c);
  };
}

/** Uniform along the perimeter, so long sides get proportionally more particles. */
export function rectOutline(x: number, y: number, w: number, h: number, c: PaletteIndex): Make {
  return (rand) => {
    let p = rand() * 2 * (w + h);
    if (p < w) return point(x + p, y, c);
    p -= w;
    if (p < h) return point(x + w, y + p, c);
    p -= h;
    if (p < w) return point(x + w - p, y + h, c);
    return point(x, y + h - (p - w), c);
  };
}

export function rectFill(x: number, y: number, w: number, h: number, c: PaletteIndex): Make {
  return (rand) => point(x + rand() * w, y + rand() * h, c);
}

export function ring(cx: number, cy: number, r: number, c: PaletteIndex, thickness = 1.5): Make {
  return (rand) => {
    const a = rand() * TAU;
    const rr = r + (rand() - 0.5) * thickness;
    return point(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, c);
  };
}

/** Uniform over the area (sqrt keeps the centre from clumping). */
export function disc(cx: number, cy: number, r: number, c: PaletteIndex): Make {
  return (rand) => {
    const a = rand() * TAU;
    const d = Math.sqrt(rand()) * r;
    return point(cx + Math.cos(a) * d, cy + Math.sin(a) * d, c);
  };
}

/**
 * Points that orbit a centre at `speed` rad/s (negative = counter-clockwise).
 * `dashes` groups them into rotating dash segments; `arc` limits them to a sweep,
 * which at a higher speed reads as a comet chasing round the ring.
 */
export function spin(cx: number, cy: number, r: number, speed: number, c: PaletteIndex, dashes = 0, arc = TAU): Make {
  return (rand) => {
    let angle = rand() * arc;
    if (dashes > 0) {
      const slot = Math.floor(rand() * dashes);
      angle = ((slot + rand() * 0.55) / dashes) * TAU;
    }
    return { kind: "spin", cx, cy, r: r + (rand() - 0.5) * 1.6, angle, speed, c };
  };
}

/**
 * Particles that travel a path forever, bunched into `packets` — data moving
 * through a diagram. `speed` is path lengths per second.
 */
export function flow(pts: [number, number][], speed: number, c: PaletteIndex, packets = 4): Make {
  const path = polyline(pts);
  return (rand) => ({
    kind: "flow",
    path,
    offset: (Math.floor(rand() * packets) + rand() * 0.07) / packets,
    speed,
    c,
  });
}

/** Scatters targets over sampled glyph pixels; `accentShare` of them take colour 0. */
export function glyphCloud(points: [number, number][], { accentShare = 0.22, base = 2, jitter = 1.2 } = {}): Make {
  const pts = points.length ? points : [[0, 0] as [number, number]];
  return (rand) => {
    const [x, y] = pts[Math.floor(rand() * pts.length)];
    return point(x + (rand() - 0.5) * jitter, y + (rand() - 0.5) * jitter, rand() < accentShare ? 0 : base);
  };
}

/* ------------------------------------------------------------------ */
/* Builder                                                              */
/* ------------------------------------------------------------------ */

/** Small, fast, seedable PRNG; plenty for layout jitter. */
export function mulberry32(seed: number): Rand {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Builds `count` targets, split across primitives by weight. */
export function assemble(width: number, height: number, prims: Primitive[], count: number, seed = 1): Formation {
  const rand = mulberry32(seed);
  const targets: Target[] = [];
  if (!prims.length || count <= 0) return { width, height, targets };
  const total = prims.reduce((sum, p) => sum + p.weight, 0) || 1;
  prims.forEach((p) => {
    const n = Math.round((p.weight / total) * count);
    for (let i = 0; i < n; i++) targets.push(p.make(rand));
  });
  while (targets.length < count) targets.push(prims[0].make(rand));
  targets.length = count;
  return { width, height, targets };
}

export function buildFormation(recipe: FormationRecipe, pool: number, helpers: FormationHelpers): Formation {
  return assemble(recipe.width, recipe.height, recipe.primitives(helpers), Math.round(pool * recipe.share), recipe.seed ?? 1);
}

/** Samples filled pixels of `text` drawn in `fontFamily`, in a size × size space. */
export function sampleText(text: string, fontFamily: string, { size = 600, fontSize = 250, fontWeight = 800, step = 2, offsetY = 12 }: GlyphOptions = {}): [number, number][] {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillText(text, size / 2, size / 2 + offsetY);
  const data = ctx.getImageData(0, 0, size, size).data;
  const pts: [number, number][] = [];
  for (let y = 0; y < size; y += step) {
    for (let x = 0; x < size; x += step) {
      if (data[(y * size + x) * 4 + 3] > 140) pts.push([x, y]);
    }
  }
  return pts;
}

/* ------------------------------------------------------------------ */
/* Diagrams: one geometry for both SVG and particles                    */
/* ------------------------------------------------------------------ */

export type Tone = "accent" | "faint" | "dashed";

export type Shape =
  | { type: "line"; x1: number; y1: number; x2: number; y2: number; tone?: Tone; weight?: number }
  | { type: "rect"; x: number; y: number; w: number; h: number; tone?: Tone; weight?: number }
  | { type: "circle"; cx: number; cy: number; r: number; tone?: Tone; weight?: number; spin?: number };

export interface Label {
  x: number;
  y: number;
  text: string;
  anchor?: "start" | "middle" | "end";
  size?: "sm" | "lg";
}

export interface DiagramFlow {
  pts: [number, number][];
  speed?: number;
  packets?: number;
  weight?: number;
}

export interface Diagram {
  width: number;
  height: number;
  shapes: Shape[];
  labels: Label[];
  /** Data moving through the diagram; particles only (the SVG shows the path as shapes). */
  flows?: DiagramFlow[];
  /** Used as the SVG's accessible name. */
  description: string;
}

export interface DiagramRecipeOptions {
  share?: number;
  seed?: number;
  /** Particles per 100 units of stroke length. Raise for denser outlines. */
  density?: number;
}

/**
 * Converts a diagram into a particle recipe so the static SVG fallback and the live
 * formation can never drift apart. Weights follow stroke length; accent shapes get
 * colour 0 and a filled core, outlines colour 1, connecting lines colour 2.
 */
export function diagramRecipe(diagram: Diagram, { share = 1, seed = 1, density = 1 }: DiagramRecipeOptions = {}): FormationRecipe {
  return {
    width: diagram.width,
    height: diagram.height,
    share,
    seed,
    primitives: () => {
      const prims: Primitive[] = [];
      const w = (length: number, shape: { tone?: Tone; weight?: number }) =>
        (shape.weight ?? (length / 100) * density) * (shape.tone === "accent" ? 1.6 : shape.tone === "faint" ? 0.5 : 1);
      for (const s of diagram.shapes) {
        const accent = s.tone === "accent";
        if (s.type === "line") {
          prims.push({ weight: w(Math.hypot(s.x2 - s.x1, s.y2 - s.y1), s), make: segment(s.x1, s.y1, s.x2, s.y2, accent ? 0 : 2) });
        } else if (s.type === "rect") {
          prims.push({ weight: w(2 * (s.w + s.h), s), make: rectOutline(s.x, s.y, s.w, s.h, accent ? 0 : 1) });
          if (accent) prims.push({ weight: w(s.w + s.h, s) * 0.2, make: rectFill(s.x + 4, s.y + 4, s.w - 8, s.h - 8, 0) });
        } else {
          const length = TAU * s.r;
          const make = s.tone === "dashed" || s.spin ? spin(s.cx, s.cy, s.r, s.spin ?? 0.12, accent ? 0 : 1, Math.round(s.r / 4)) : ring(s.cx, s.cy, s.r, accent ? 0 : 1);
          prims.push({ weight: w(length, s), make });
          if (accent) prims.push({ weight: w(length, s) * 0.2, make: disc(s.cx, s.cy, s.r * 0.66, 0) });
        }
      }
      for (const f of diagram.flows ?? []) {
        prims.push({ weight: f.weight ?? 4, make: flow(f.pts, f.speed ?? 0.32, 0, f.packets ?? 4) });
      }
      return prims;
    },
  };
}
