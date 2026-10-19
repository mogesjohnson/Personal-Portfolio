"use client";

import type { ReactNode } from "react";
import { useMotionScenes } from "../../connectors/react";
import { useNoIntroHold } from "../project-detail/no-intro";
import { detailScenes } from "../project-detail/scenes";
import { exampleRun } from "./example-run";

const SCENES = detailScenes([exampleRun()]);

export function TraceMotion({ children }: { children: ReactNode }) {
  useNoIntroHold();
  useMotionScenes(SCENES);
  return children;
}
