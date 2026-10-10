"use client";

import type { ReactNode } from "react";
import { useMotionScenes } from "../../connectors/react";
import type { Scene } from "../../lib/runtime";
import { ruleDraw } from "./rule";

const SCENES: Scene[] = [ruleDraw()];

export function NowMotion({ children }: { children: ReactNode }) {
  useMotionScenes(SCENES);
  return children;
}
