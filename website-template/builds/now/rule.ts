import { gsap } from "gsap";
import type { Scene } from "../../lib/runtime";

/**
 * Draws the rule under the title once. Static CSS (reduced motion, no JS) shows the
 * finished line. In full motion CSS parks it at scaleX(0) with a 3.5s failsafe; this
 * scene cancels the failsafe and owns the draw.
 */
export function ruleDraw(): Scene {
  return ({ afterIntro }) => {
    afterIntro(() => {
      const rule = document.querySelector<HTMLElement>(".nw-rule");
      if (!rule) return;
      gsap.set(rule, { animation: "none" });
      gsap.fromTo(
        rule,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: "expo.out", transformOrigin: "left center" },
      );
    });
  };
}
