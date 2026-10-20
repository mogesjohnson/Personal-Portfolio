"use client";

import type { ReactNode } from "react";
import { useMotionScenes } from "../../connectors/react";
import { useNoIntroHold } from "../project-detail/no-intro";
import { detailScenes } from "../project-detail/scenes";
import { switchTrack } from "./switch-track";

const SCENES = detailScenes([switchTrack()]);

export function SwitchyardMotion({ children }: { children: ReactNode }) {
  useNoIntroHold();
  useMotionScenes(SCENES);
  return children;
}
