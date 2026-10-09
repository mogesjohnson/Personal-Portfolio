"use client";

import type { ReactNode } from "react";
import { useMotionScenes } from "../../connectors/react";
import { batchReveal, scrubWords, splitHeadings } from "../../lib/scenes";
import type { Scene } from "../../lib/runtime";
import { travelingNote } from "./traveling-note";

const SCENES: Scene[] = [
  splitHeadings({ selector: ".dispatch-title", duration: 1.05, stagger: 0.06, rotate: 2 }),
  batchReveal({ selector: ".dispatch [data-reveal]", y: 24, duration: 0.9, stagger: 0.06 }),
  scrubWords({ selector: ".dispatch [data-scrub]", dim: 0.38, start: "top 78%", end: "bottom 48%" }),
  travelingNote(),
];

export function DispatchMotion({ children }: { children: ReactNode }) {
  useMotionScenes(SCENES);
  return children;
}
