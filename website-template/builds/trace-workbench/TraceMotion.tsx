"use client";

import type { ReactNode } from "react";
import { useMotionScenes } from "../../connectors/react";
import { useNoIntroHold } from "../project-detail/no-intro";
import { detailScenes } from "../project-detail/scenes";
import { lookAgain } from "./look-again";

const SCENES = detailScenes([lookAgain()]);

export function TraceMotion({ children }: { children: ReactNode }) {
  useNoIntroHold();
  useMotionScenes(SCENES);
  return children;
}
