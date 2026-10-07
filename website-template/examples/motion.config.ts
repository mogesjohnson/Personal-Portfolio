/**
 * Example configuration for a new site: everything brand-specific lives here, and
 * both the server layout (flags) and the client shell (formations, intro) import it.
 * Nothing in this file touches the DOM at import time, so it is server-safe.
 */

import type { FlagOptions } from "../lib/flags";
import type { IntroWord } from "../lib/intro";
import type { ParticleFieldOptions } from "../lib/particles/field";
import { defineFormation, diagramRecipe, glyphCloud, segment, spin, type Diagram } from "../lib/particles/formations";

export const FLAGS: FlagOptions = { themeKey: "acme-theme", introKey: "acme-intro", defaultTheme: "dark" };

/** One geometry: DiagramSvg draws it, diagramRecipe turns it into particles. */
export const PIPELINE: Diagram = {
  width: 640,
  height: 420,
  description: "Data pipeline: ingest, transform and serve stages connected left to right",
  shapes: [
    { type: "rect", x: 40, y: 170, w: 150, h: 80, tone: "accent" },
    { type: "rect", x: 245, y: 170, w: 150, h: 80 },
    { type: "rect", x: 450, y: 170, w: 150, h: 80 },
    { type: "line", x1: 190, y1: 210, x2: 245, y2: 210 },
    { type: "line", x1: 395, y1: 210, x2: 450, y2: 210 },
    { type: "circle", cx: 320, cy: 90, r: 34, tone: "dashed" },
    { type: "line", x1: 320, y1: 124, x2: 320, y2: 170, tone: "faint" },
  ],
  labels: [
    { x: 115, y: 215, text: "INGEST", anchor: "middle" },
    { x: 320, y: 215, text: "TRANSFORM", anchor: "middle" },
    { x: 525, y: 215, text: "SERVE", anchor: "middle" },
    { x: 320, y: 95, text: "SCHEDULER", anchor: "middle" },
    { x: 40, y: 330, text: "BATCH + STREAM / EXACTLY-ONCE", size: "sm" },
  ],
  flows: [
    {
      pts: [
        [190, 210],
        [450, 210],
      ],
      speed: 0.3,
      packets: 5,
    },
  ],
};

export const FORMATIONS: ParticleFieldOptions["formations"] = {
  /** Hero: the brand name sampled from the live web font, inside two counter-rotating rings. */
  brand: defineFormation({
    width: 600,
    height: 600,
    share: 0.9,
    seed: 11,
    primitives: ({ glyph }) => [
      { weight: 60, make: glyphCloud(glyph("ACME", { fontSize: 170 })) },
      { weight: 17, make: spin(300, 300, 262, 0.07, 1, 64) },
      { weight: 8, make: spin(300, 300, 214, -0.11, 0, 18) },
      { weight: 2.5, make: spin(300, 300, 262, 0.4, 0, 0, 0.14) },
    ],
  }),
  pipeline: diagramRecipe(PIPELINE, { seed: 3 }),
  /** Closing call to action: a ring and a forward chevron. */
  next: defineFormation({
    width: 600,
    height: 600,
    share: 0.7,
    seed: 29,
    primitives: () => [
      { weight: 24, make: spin(300, 300, 250, 0.09, 1, 36) },
      { weight: 22, make: segment(240, 190, 360, 300, 0, 24) },
      { weight: 22, make: segment(360, 300, 240, 410, 0, 24) },
    ],
  }),
};

export const PALETTES: ParticleFieldOptions["palettes"] = {
  dark: ["#a78bfa", "#22d3ee", "#e6ebf2"],
  light: ["#7c3aed", "#0891b2", "#334155"],
};

export const INTRO_WORDS: IntroWord[] = [
  { text: "IDEAS", bg: "#07080c", fg: "#eceef2" },
  { text: "IN", bg: "#a78bfa", fg: "#07080c" },
  { text: "MOTION.", bg: "#07080c", fg: "#a78bfa" },
];
