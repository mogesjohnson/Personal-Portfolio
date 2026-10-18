"use client";

import type { ReactNode } from "react";
import { useMotionScenes } from "../../connectors/react";
import { useNoIntroHold } from "../project-detail/no-intro";
import { detailScenes } from "../project-detail/scenes";
import { timelineScrub } from "./timeline-scrub";

const SCENES = detailScenes([timelineScrub()]);

export function ReplayMotion({ children }: { children: ReactNode }) {
  useNoIntroHold();
  useMotionScenes(SCENES);
  return children;
}
