/**
 * Formation geometry for the Live Motion signal field.
 *
 * A formation is a set of targets in its own coordinate space (width × height).
 * The particle engine fits that space into an anchor element on the page, so the
 * same geometry drives both the live particles and the static SVG fallback.
 */

export type SignalColor = 0 | 1 | 2; // 0 = amber, 1 = sky, 2 = soft (text colour)

export type Target =
  | { kind: "point"; x: number; y: number; c: SignalColor }
  | { kind: "flow"; path: Polyline; offset: number; speed: number; c: SignalColor }
  | { kind: "spin"; cx: number; cy: number; r: number; angle: number; speed: number; c: SignalColor };

export interface Polyline {
  pts: [number, number][];
  cum: number[];
  length: number;
}

export interface Formation {
  width: number;
  height: number;
  /** Fraction of the particle pool pulled into the formation; the rest keep drifting. */
  share: number;
  targets: Target[];
}

export type FormationKey = "mj" | "contact" | "sys" | "tree" | "orbit" | "reel" | "yard" | "trace";

type Rand = () => number;
type Make = (rand: Rand) => Target;
interface Primitive {
  weight: number;
  make: Make;
}

const TAU = Math.PI * 2;

/* ------------------------------------------------------------------ */
/* Shared diagram geometry (640 × 420 space, also rendered as SVG)     */
/* ------------------------------------------------------------------ */

export type Shape =
  | { type: "line"; x1: number; y1: number; x2: number; y2: number; tone?: "faint" | "accent" }
  | { type: "rect"; x: number; y: number; w: number; h: number; tone?: "accent" }
  | { type: "circle"; cx: number; cy: number; r: number; tone?: "accent" | "dashed" };

export interface Label {
  x: number;
  y: number;
  text: string;
  anchor?: "start" | "middle";
  size?: "sm" | "lg";
}

export interface Diagram {
  width: number;
  height: number;
  shapes: Shape[];
  labels: Label[];
  description: string;
}

const sysNodes = [
  { x: 62, label: "ENGINEERING" },
  { x: 246, label: "OPERATIONS" },
  { x: 430, label: "FINANCE" },
];

const treeNodes = [
  { x: 320, y: 98, n: "42", path: true },
  { x: 200, y: 202, n: "21" },
  { x: 440, y: 202, n: "67", path: true },
  { x: 125, y: 306, n: "12" },
  { x: 265, y: 306, n: "29" },
  { x: 375, y: 306, n: "53", path: true },
  { x: 515, y: 306, n: "80" },
];
const treeEdges: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [2, 6],
];

/** REPLAY Studio: a captured window with a callout and a privacy region, its timeline, and the MP4 it exports. */
const reelTracks = [
  { y: 290, label: "TAKE" },
  { y: 320, label: "TEXT" },
  { y: 350, label: "BLUR" },
];

/** Switchyard: the route leaves the library, passes the switch, and runs the exact-checkout line. */
const yardRoute: [number, number][] = [
  [40, 300],
  [200, 300],
  [250, 250],
  [300, 196],
  [340, 180],
  [600, 180],
];
const yardStations = [
  { x: 380, label: "CHECKOUT" },
  { x: 470, label: "OPEN" },
  { x: 555, label: "TICKET" },
];

/** TRACE Workbench: four agent CLIs meet at one interface, which reaches into a Windows window holding the two skills. */
const traceAgents = [
  { y: 90, label: "CODEX" },
  { y: 170, label: "CLAUDE CODE" },
  { y: 250, label: "GROK BUILD" },
  { y: 330, label: "GEMINI CLI" },
];
const traceHub = { x: 252, y: 170, w: 124, h: 80 };

const orbitSatellites = [
  { x: 320, y: 55, label: "IDENTITY" },
  { x: 488, y: 285, label: "PROJECTS" },
  { x: 151, y: 285, label: "CONTACT" },
];

export type DiagramKey = "sys" | "tree" | "orbit" | "reel" | "yard" | "trace";

export const diagrams: Record<DiagramKey, Diagram> = {
  sys: {
    width: 640,
    height: 420,
    description: "Diagram of a central domain controller distributing policy to three departmental units",
    shapes: [
      { type: "rect", x: 222, y: 56, w: 196, h: 72, tone: "accent" },
      { type: "line", x1: 320, y1: 128, x2: 320, y2: 286 },
      { type: "line", x1: 136, y1: 238, x2: 504, y2: 238 },
      { type: "line", x1: 136, y1: 238, x2: 136, y2: 286 },
      { type: "line", x1: 504, y1: 238, x2: 504, y2: 286 },
      ...sysNodes.map((n) => ({ type: "rect" as const, x: n.x, y: 286, w: 148, h: 70 })),
      { type: "line", x1: 136, y1: 356, x2: 136, y2: 384, tone: "faint" },
      { type: "line", x1: 320, y1: 356, x2: 320, y2: 384, tone: "faint" },
      { type: "line", x1: 504, y1: 356, x2: 504, y2: 384, tone: "faint" },
      { type: "line", x1: 136, y1: 384, x2: 504, y2: 384, tone: "faint" },
    ],
    labels: [
      { x: 320, y: 86, text: "DOMAIN CONTROLLER", anchor: "middle" },
      { x: 320, y: 110, text: "AD DS / DNS", anchor: "middle", size: "lg" },
      ...sysNodes.map((n) => ({ x: n.x + 18, y: 336, text: n.label })),
      { x: 320, y: 404, text: "GPO PROPAGATION / OU BOUNDARIES", anchor: "middle" },
    ],
  },
  tree: {
    width: 640,
    height: 420,
    description: "Self-balancing AVL tree with the search path from 42 to 53 highlighted",
    shapes: [
      ...treeEdges.map(([a, b]) => {
        const [x1, y1, x2, y2] = trim(treeNodes[a].x, treeNodes[a].y, treeNodes[b].x, treeNodes[b].y, 30);
        const onPath = treeNodes[a].path && treeNodes[b].path;
        return { type: "line" as const, x1, y1, x2, y2, tone: onPath ? ("accent" as const) : undefined };
      }),
      ...treeNodes.map((n) => ({ type: "circle" as const, cx: n.x, cy: n.y, r: 30, tone: n.path ? ("accent" as const) : undefined })),
    ],
    labels: [
      ...treeNodes.map((n) => ({ x: n.x, y: n.y + 6, text: n.n, anchor: "middle" as const, size: "lg" as const })),
      { x: 32, y: 392, text: "BALANCED HEIGHT / O(LOG N) LOOKUP" },
    ],
  },
  orbit: {
    width: 640,
    height: 420,
    description: "Portfolio architecture: a core connected to identity, projects, and contact",
    shapes: [
      { type: "circle", cx: 320, cy: 205, r: 148, tone: "dashed" },
      { type: "circle", cx: 320, cy: 205, r: 82, tone: "dashed" },
      ...orbitSatellites.map((s) => {
        const [x1, y1, x2, y2] = trim(320, 205, s.x, s.y, 69, 29);
        return { type: "line" as const, x1, y1, x2, y2 };
      }),
      { type: "circle", cx: 320, cy: 205, r: 69, tone: "accent" },
      ...orbitSatellites.map((s) => ({ type: "circle" as const, cx: s.x, cy: s.y, r: 29 })),
    ],
    labels: [
      { x: 320, y: 200, text: "PORTFOLIO", anchor: "middle" },
      { x: 320, y: 224, text: "MJ / 26", anchor: "middle", size: "lg" },
      ...orbitSatellites.map((s) => ({ x: s.x, y: s.y + 50, text: s.label, anchor: "middle" as const })),
    ],
  },
  reel: {
    width: 640,
    height: 420,
    description: "A captured window with a callout and a privacy region, its trimmed timeline with a playhead, and the MP4 export",
    shapes: [
      { type: "rect", x: 120, y: 40, w: 360, h: 190 },
      { type: "line", x1: 120, y1: 64, x2: 480, y2: 64, tone: "faint" },
      { type: "rect", x: 150, y: 160, w: 160, h: 42, tone: "accent" },
      { type: "rect", x: 370, y: 84, w: 86, h: 62 },
      { type: "line", x1: 480, y1: 138, x2: 520, y2: 138 },
      { type: "rect", x: 520, y: 108, w: 96, h: 60, tone: "accent" },
      ...reelTracks.map((t) => ({ type: "line" as const, x1: 90, y1: t.y, x2: 600, y2: t.y, tone: "faint" as const })),
      { type: "rect", x: 150, y: 281, w: 400, h: 18 },
      { type: "rect", x: 230, y: 312, w: 160, h: 16, tone: "accent" },
      { type: "rect", x: 330, y: 342, w: 110, h: 16 },
      { type: "line", x1: 150, y1: 272, x2: 150, y2: 308, tone: "accent" },
      { type: "line", x1: 550, y1: 272, x2: 550, y2: 308, tone: "accent" },
      { type: "line", x1: 360, y1: 262, x2: 360, y2: 372, tone: "accent" },
      { type: "circle", cx: 360, cy: 262, r: 6, tone: "accent" },
    ],
    labels: [
      { x: 134, y: 57, text: "CAPTURE TARGET" },
      { x: 230, y: 186, text: "CALLOUT", anchor: "middle" },
      { x: 413, y: 120, text: "PRIVACY", anchor: "middle" },
      { x: 568, y: 134, text: "EXPORT", anchor: "middle" },
      { x: 568, y: 156, text: "MP4", anchor: "middle", size: "lg" },
      ...reelTracks.map((t) => ({ x: 32, y: t.y + 4, text: t.label })),
      { x: 320, y: 404, text: "TRIM / CALLOUT / PRIVACY / EXPORT", anchor: "middle" },
    ],
  },
  yard: {
    width: 640,
    height: 420,
    description: "A rail yard: the route leaves the library, passes a switch, and follows the exact checkout to a Return Ticket while side tracks stay unlit",
    shapes: [
      ...yardRoute.slice(1).map(([x2, y2], i) => ({
        type: "line" as const,
        x1: yardRoute[i][0],
        y1: yardRoute[i][1],
        x2,
        y2,
        tone: i === 0 ? undefined : ("accent" as const),
      })),
      { type: "line", x1: 200, y1: 300, x2: 600, y2: 300, tone: "faint" },
      { type: "line", x1: 200, y1: 300, x2: 250, y2: 350, tone: "faint" },
      { type: "line", x1: 250, y1: 350, x2: 600, y2: 350, tone: "faint" },
      { type: "circle", cx: 100, cy: 300, r: 10 },
      { type: "circle", cx: 200, cy: 300, r: 7 },
      ...yardStations.map((s) => ({ type: "circle" as const, cx: s.x, cy: 180, r: 10, tone: "accent" as const })),
      { type: "rect", x: 480, y: 44, w: 150, h: 64, tone: "accent" },
      { type: "line", x1: 555, y1: 108, x2: 555, y2: 170, tone: "faint" },
      { type: "circle", cx: 120, cy: 130, r: 50, tone: "dashed" },
      { type: "line", x1: 166, y1: 148, x2: 370, y2: 176, tone: "faint" },
    ],
    labels: [
      { x: 120, y: 126, text: "OBSIDIAN", anchor: "middle" },
      { x: 120, y: 148, text: "VAULT", anchor: "middle", size: "lg" },
      { x: 555, y: 70, text: "RETURN TICKET", anchor: "middle" },
      { x: 555, y: 92, text: "NEXT STEP", anchor: "middle", size: "lg" },
      ...yardStations.map((s) => ({ x: s.x, y: 216, text: s.label, anchor: "middle" as const })),
      { x: 100, y: 334, text: "LIBRARY", anchor: "middle" },
      { x: 420, y: 292, text: "SAME-LOOKING FOLDER", anchor: "middle" },
      { x: 420, y: 342, text: "REMOTE REFERENCE", anchor: "middle" },
      { x: 320, y: 404, text: "EXACT TARGET / RETURN TICKET / READ-ONLY CONTEXT", anchor: "middle" },
    ],
  },
  trace: {
    width: 640,
    height: 420,
    description: "Four agent CLIs, Codex, Claude Code, Grok Build and Gemini CLI, meet at one TRACE interface that reaches into a Windows window holding two skills: Reverse Engineer Anything, set up and verified, and Computer Use, selected and not yet implemented",
    shapes: [
      ...traceAgents.map((a) => ({ type: "rect" as const, x: 24, y: a.y - 18, w: 136, h: 36 })),
      ...traceAgents.map((a) => ({ type: "line" as const, x1: 160, y1: a.y, x2: traceHub.x, y2: 210, tone: "faint" as const })),
      { type: "rect", x: traceHub.x, y: traceHub.y, w: traceHub.w, h: traceHub.h, tone: "accent" },
      { type: "line", x1: traceHub.x + traceHub.w, y1: 210, x2: 436, y2: 210, tone: "accent" },
      { type: "rect", x: 436, y: 60, w: 184, h: 300 },
      { type: "line", x1: 436, y1: 86, x2: 620, y2: 86, tone: "faint" },
      { type: "rect", x: 454, y: 106, w: 148, h: 104, tone: "accent" },
      { type: "rect", x: 454, y: 230, w: 148, h: 110 },
    ],
    labels: [
      ...traceAgents.map((a) => ({ x: 92, y: a.y + 4, text: a.label, anchor: "middle" as const })),
      { x: 314, y: 214, text: "TRACE", anchor: "middle", size: "lg" },
      { x: 314, y: 236, text: "ONE INTERFACE", anchor: "middle" },
      { x: 448, y: 78, text: "WINDOWS" },
      { x: 528, y: 150, text: "SKILL 01", anchor: "middle" },
      { x: 528, y: 172, text: "REVERSE ENGINEER", anchor: "middle" },
      { x: 528, y: 278, text: "SKILL 02", anchor: "middle" },
      { x: 528, y: 300, text: "COMPUTER USE", anchor: "middle" },
      { x: 320, y: 404, text: "FOUR AGENTS / ONE INTERFACE / OBSERVE AND OPERATE WINDOWS", anchor: "middle" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Primitive samplers                                                  */
/* ------------------------------------------------------------------ */

function trim(x1: number, y1: number, x2: number, y2: number, startInset: number, endInset = startInset) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  return [x1 + ux * startInset, y1 + uy * startInset, x2 - ux * endInset, y2 - uy * endInset] as const;
}

const point = (x: number, y: number, c: SignalColor): Target => ({ kind: "point", x, y, c });

function segment(x1: number, y1: number, x2: number, y2: number, c: SignalColor, thickness = 1.2): Make {
  const len = Math.hypot(x2 - x1, y2 - y1) || 1;
  const nx = -(y2 - y1) / len;
  const ny = (x2 - x1) / len;
  return (rand) => {
    const t = rand();
    const o = (rand() - 0.5) * thickness;
    return point(x1 + (x2 - x1) * t + nx * o, y1 + (y2 - y1) * t + ny * o, c);
  };
}

function rectOutline(x: number, y: number, w: number, h: number, c: SignalColor): Make {
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

function rectFill(x: number, y: number, w: number, h: number, c: SignalColor): Make {
  return (rand) => point(x + rand() * w, y + rand() * h, c);
}

function ring(cx: number, cy: number, r: number, c: SignalColor, thickness = 1.5): Make {
  return (rand) => {
    const a = rand() * TAU;
    const rr = r + (rand() - 0.5) * thickness;
    return point(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, c);
  };
}

function disc(cx: number, cy: number, r: number, c: SignalColor): Make {
  return (rand) => {
    const a = rand() * TAU;
    const d = Math.sqrt(rand()) * r;
    return point(cx + Math.cos(a) * d, cy + Math.sin(a) * d, c);
  };
}

/** Points that orbit a centre; `dashes` groups them into rotating dash segments. */
function spin(cx: number, cy: number, r: number, speed: number, c: SignalColor, dashes = 0, arc = TAU): Make {
  return (rand) => {
    let angle = rand() * arc;
    if (dashes > 0) {
      const slot = Math.floor(rand() * dashes);
      angle = ((slot + rand() * 0.55) / dashes) * TAU;
    }
    return { kind: "spin", cx, cy, r: r + (rand() - 0.5) * 1.6, angle, speed, c };
  };
}

function polyline(pts: [number, number][]): Polyline {
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  }
  return { pts, cum, length: cum[cum.length - 1] };
}

/** Particles that travel along a path forever, bunched into packets — the data moving through a diagram. */
function flow(pts: [number, number][], speed: number, c: SignalColor, packets = 4): Make {
  const path = polyline(pts);
  return (rand) => ({
    kind: "flow",
    path,
    offset: (Math.floor(rand() * packets) + rand() * 0.07) / packets,
    speed,
    c,
  });
}

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

/* ------------------------------------------------------------------ */
/* Formation recipes                                                   */
/* ------------------------------------------------------------------ */

function recipeSys(): Primitive[] {
  const prims: Primitive[] = [
    { weight: 13, make: rectOutline(222, 56, 196, 72, 0) },
    { weight: 3, make: rectFill(226, 60, 188, 64, 0) },
    { weight: 4, make: segment(320, 128, 320, 286, 2) },
    { weight: 7, make: segment(136, 238, 504, 238, 2) },
    { weight: 1.5, make: segment(136, 238, 136, 286, 2) },
    { weight: 1.5, make: segment(504, 238, 504, 286, 2) },
    { weight: 2.5, make: segment(136, 384, 504, 384, 2) },
  ];
  for (const n of sysNodes) {
    prims.push({ weight: 9, make: rectOutline(n.x, 286, 148, 70, 1) });
    prims.push({ weight: 0.8, make: disc(n.x + 20, 308, 5, 0) });
    prims.push({ weight: 0.5, make: segment(n.x + 74, 356, n.x + 74, 384, 2) });
    prims.push({
      weight: 4,
      make: flow(
        [
          [320, 128],
          [320, 238],
          [n.x + 74, 238],
          [n.x + 74, 286],
        ],
        0.32,
        0,
      ),
    });
  }
  return prims;
}

function recipeTree(): Primitive[] {
  const prims: Primitive[] = [];
  for (const n of treeNodes) {
    prims.push({ weight: 7, make: ring(n.x, n.y, 30, n.path ? 0 : 1) });
    if (n.path) prims.push({ weight: 1.5, make: disc(n.x, n.y, 20, 0) });
  }
  for (const [a, b] of treeEdges) {
    const [x1, y1, x2, y2] = trim(treeNodes[a].x, treeNodes[a].y, treeNodes[b].x, treeNodes[b].y, 30);
    prims.push({ weight: 3.5, make: segment(x1, y1, x2, y2, treeNodes[a].path && treeNodes[b].path ? 0 : 2) });
  }
  prims.push({
    weight: 9,
    make: flow(
      [
        [320, 98],
        [440, 202],
        [375, 306],
      ],
      0.34,
      0,
      3,
    ),
  });
  prims.push({ weight: 2.5, make: segment(32, 404, 300, 404, 2, 0.8) });
  return prims;
}

function recipeOrbit(): Primitive[] {
  const prims: Primitive[] = [
    { weight: 20, make: spin(320, 205, 148, 0.12, 1, 42) },
    { weight: 11, make: spin(320, 205, 82, -0.22, 0, 24) },
    { weight: 13, make: ring(320, 205, 69, 0) },
    { weight: 3, make: disc(320, 205, 40, 0) },
    { weight: 2.5, make: spin(320, 205, 148, 0.55, 0, 0, 0.16) },
  ];
  for (const s of orbitSatellites) {
    const [x1, y1, x2, y2] = trim(320, 205, s.x, s.y, 69, 29);
    prims.push({ weight: 3, make: segment(x1, y1, x2, y2, 2) });
    prims.push({ weight: 6, make: ring(s.x, s.y, 29, 1) });
  }
  return prims;
}

function recipeReel(): Primitive[] {
  const prims: Primitive[] = [
    { weight: 14, make: rectOutline(120, 40, 360, 190, 1) },
    { weight: 2.5, make: segment(120, 64, 480, 64, 2, 0.8) },
    { weight: 7, make: rectOutline(150, 160, 160, 42, 0) },
    { weight: 2, make: rectFill(154, 164, 152, 34, 0) },
    // The privacy region is a loose cloud, the way a blur reads.
    { weight: 6, make: rectFill(370, 84, 86, 62, 2) },
    { weight: 3, make: rectOutline(370, 84, 86, 62, 1) },
    { weight: 1.5, make: segment(480, 138, 520, 138, 2) },
    { weight: 6, make: rectOutline(520, 108, 96, 60, 0) },
    { weight: 3, make: flow([[480, 138], [520, 138]], 0.5, 0, 2) },
    { weight: 7, make: rectOutline(150, 281, 400, 18, 1) },
    { weight: 4, make: rectOutline(230, 312, 160, 16, 0) },
    { weight: 3, make: rectOutline(330, 342, 110, 16, 1) },
    { weight: 2, make: segment(150, 272, 150, 308, 0) },
    { weight: 2, make: segment(550, 272, 550, 308, 0) },
    { weight: 4, make: segment(360, 262, 360, 372, 0) },
    { weight: 1, make: disc(360, 262, 6, 0) },
    { weight: 6, make: flow([[150, 290], [550, 290]], 0.18, 0, 3) },
  ];
  for (const t of reelTracks) prims.push({ weight: 2, make: segment(90, t.y, 600, t.y, 2, 0.6) });
  return prims;
}

function recipeYard(): Primitive[] {
  const prims: Primitive[] = [
    { weight: 3, make: segment(40, 300, 200, 300, 2) },
    { weight: 4, make: segment(200, 300, 600, 300, 2, 0.8) },
    { weight: 1.2, make: segment(200, 300, 250, 350, 2, 0.8) },
    { weight: 3.5, make: segment(250, 350, 600, 350, 2, 0.8) },
    { weight: 3, make: ring(100, 300, 10, 1) },
    { weight: 2, make: ring(200, 300, 7, 1) },
    { weight: 10, make: rectOutline(480, 44, 150, 64, 0) },
    { weight: 2, make: rectFill(484, 48, 142, 56, 0) },
    { weight: 1.5, make: segment(555, 108, 555, 170, 2) },
    { weight: 12, make: spin(120, 130, 50, 0.16, 1, 22) },
    { weight: 2, make: segment(166, 148, 370, 176, 2, 0.8) },
    { weight: 3, make: flow([[166, 148], [370, 176]], 0.3, 1, 2) },
    { weight: 12, make: flow(yardRoute, 0.16, 0, 5) },
  ];
  for (let i = 1; i < yardRoute.length; i++) {
    const [x1, y1] = yardRoute[i - 1];
    const [x2, y2] = yardRoute[i];
    prims.push({ weight: Math.hypot(x2 - x1, y2 - y1) / 40, make: segment(x1, y1, x2, y2, i === 1 ? 2 : 0) });
  }
  for (const s of yardStations) prims.push({ weight: 4, make: ring(s.x, 180, 10, 0) });
  return prims;
}

function recipeTrace(): Primitive[] {
  const hubIn: [number, number] = [traceHub.x, 210];
  const prims: Primitive[] = [
    { weight: 12, make: rectOutline(traceHub.x, traceHub.y, traceHub.w, traceHub.h, 0) },
    { weight: 3, make: rectFill(traceHub.x + 4, traceHub.y + 4, traceHub.w - 8, traceHub.h - 8, 0) },
    { weight: 2, make: segment(traceHub.x + traceHub.w, 210, 436, 210, 0) },
    { weight: 4, make: flow([[traceHub.x + traceHub.w, 210], [436, 210], [454, 158]], 0.32, 0, 3) },
    { weight: 16, make: rectOutline(436, 60, 184, 300, 2) },
    { weight: 2.5, make: segment(436, 86, 620, 86, 2, 0.8) },
    { weight: 8, make: rectOutline(454, 106, 148, 104, 0) },
    { weight: 2, make: rectFill(458, 110, 140, 96, 0) },
    // Skill 02 is selected but its executor is not built: a sparse, soft outline.
    { weight: 4, make: rectOutline(454, 230, 148, 110, 2) },
  ];
  for (const a of traceAgents) {
    prims.push({ weight: 5, make: rectOutline(24, a.y - 18, 136, 36, 1) });
    prims.push({ weight: 2, make: segment(160, a.y, hubIn[0], hubIn[1], 2, 0.8) });
    prims.push({ weight: 2.5, make: flow([[160, a.y], hubIn], 0.22, 1, 2) });
  }
  return prims;
}

/** Hero: the MJ monogram, sampled from real type, inside two orbiting rings. */
function recipeMonogram(glyph: [number, number][]): Primitive[] {
  const glyphMake: Make = (rand) => {
    const [x, y] = glyph[Math.floor(rand() * glyph.length)];
    return point(x + (rand() - 0.5) * 1.2, y + (rand() - 0.5) * 1.2, rand() < 0.22 ? 0 : 2);
  };
  return [
    { weight: 60, make: glyphMake },
    { weight: 17, make: spin(300, 300, 262, 0.07, 1, 64) },
    { weight: 8, make: spin(300, 300, 214, -0.11, 0, 18) },
    { weight: 2.5, make: spin(300, 300, 262, 0.4, 0, 0, 0.14) },
    ...monogramSatellites.map((s) => ({ weight: 2, make: disc(s.x, s.y, 8, 1) })),
  ];
}

function recipeContact(): Primitive[] {
  return [
    { weight: 24, make: spin(300, 300, 250, 0.09, 1, 36) },
    { weight: 12, make: ring(300, 300, 196, 2, 1) },
    { weight: 30, make: segment(210, 390, 382, 218, 0, 26) },
    { weight: 16, make: segment(236, 218, 392, 218, 0, 26) },
    { weight: 16, make: segment(382, 208, 382, 364, 0, 26) },
  ];
}

/* ------------------------------------------------------------------ */
/* Builder                                                             */
/* ------------------------------------------------------------------ */

function mulberry32(seed: number): Rand {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function assemble(width: number, height: number, share: number, prims: Primitive[], count: number, seed: number): Formation {
  const rand = mulberry32(seed);
  const total = prims.reduce((sum, p) => sum + p.weight, 0);
  const targets: Target[] = [];
  prims.forEach((p) => {
    const n = Math.round((p.weight / total) * count);
    for (let i = 0; i < n; i++) targets.push(p.make(rand));
  });
  while (targets.length < count) targets.push(prims[0].make(rand));
  targets.length = count;
  return { width, height, share, targets };
}

/** Samples filled pixels of "MJ" set in the page's display face, in a 600 × 600 space. */
export function sampleMonogram(fontFamily: string): [number, number][] {
  const size = 600;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `800 250px ${fontFamily}`;
  ctx.fillText("MJ", size / 2, size / 2 + 12);
  const data = ctx.getImageData(0, 0, size, size).data;
  const pts: [number, number][] = [];
  for (let y = 0; y < size; y += 2) {
    for (let x = 0; x < size; x += 2) {
      if (data[(y * size + x) * 4 + 3] > 140) pts.push([x, y]);
    }
  }
  return pts;
}

/** Builds a formation sized for a particle pool of `pool` particles. */
export function buildFormation(key: FormationKey, pool: number, glyph: [number, number][]): Formation {
  const take = (share: number) => Math.round(pool * share);
  switch (key) {
    case "mj":
      return assemble(600, 600, 0.9, recipeMonogram(glyph.length ? glyph : [[300, 300]]), take(0.9), 11);
    case "contact":
      return assemble(600, 600, 0.72, recipeContact(), take(0.72), 29);
    case "sys":
      return assemble(640, 420, 1, recipeSys(), take(1), 3);
    case "tree":
      return assemble(640, 420, 1, recipeTree(), take(1), 5);
    case "orbit":
      return assemble(640, 420, 1, recipeOrbit(), take(1), 7);
    case "reel":
      return assemble(640, 420, 1, recipeReel(), take(1), 13);
    case "yard":
      return assemble(640, 420, 1, recipeYard(), take(1), 17);
    case "trace":
      return assemble(640, 420, 1, recipeTrace(), take(1), 19);
  }
}

/** Where the hero's three satellites sit on the monogram's outer ring (600 × 600 space). */
export const monogramSatellites = [
  { x: 99, y: 132, index: "01", label: "SYSTEMS" },
  { x: 515, y: 150, index: "02", label: "ALGORITHMS" },
  { x: 150, y: 515, index: "03", label: "APPLIED AI" },
];
