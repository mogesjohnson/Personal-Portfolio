"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { useMotionScenes } from "../../connectors/react";
import type { Scene } from "../../lib/runtime";
import { ruleDraw } from "./rule";

const SCENES: Scene[] = [ruleDraw()];

/**
 * The flags script marks a session's first page with data-intro="on", and the
 * runtime then holds the scroll until the homepage title sequence finishes. /now
 * has no title sequence, so a visitor who lands here first would be stuck and the
 * rule would never draw. This turns the flag off before the runtime starts
 * (layout effects run before useMotionScenes' effect). The session flag is left
 * alone, so the homepage intro still plays on the first homepage visit.
 */
function useNoIntroHold() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro === "on") root.dataset.intro = "off";
  }, []);
}

export function NowMotion({ children }: { children: ReactNode }) {
  useNoIntroHold();
  useMotionScenes(SCENES);
  return children;
}
