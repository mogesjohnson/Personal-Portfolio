import { gsap } from "gsap";
import type { Scene } from "../../lib/runtime";

/** Draws the date rule once. Static CSS already shows the finished line. */
export function ruleDraw(): Scene {
  return ({ afterIntro }) => {
    afterIntro(() => {
      const rule = document.querySelector(".now-rule");
      if (!rule) return;
      gsap.fromTo(
        rule,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: "expo.out", transformOrigin: "left center" },
      );
    });
  };
}
