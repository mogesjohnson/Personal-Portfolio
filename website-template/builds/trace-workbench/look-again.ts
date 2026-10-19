import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Scene } from "../../lib/runtime";

gsap.registerPlugin(ScrollTrigger);

/**
 * Signature move: scroll is the next observation.
 *
 * The stage renders finished, on the second picture. In full motion it rewinds
 * to the first picture, then the reader's scroll fades in the picture TRACE
 * took after one click and lights each step as progress reaches its cue.
 */
export function lookAgain(): Scene {
  return () => {
    const root = document.querySelector<HTMLElement>("[data-look]");
    if (!root) return;
    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-at]"));

    const paint = (t: number) => {
      root.style.setProperty("--t", t.toFixed(4));
      for (const step of steps) step.classList.toggle("is-dim", t < Number(step.dataset.at));
    };

    paint(0);

    const trigger = ScrollTrigger.create({
      trigger: root.closest("section") ?? root,
      start: "top 68%",
      end: "bottom 72%",
      scrub: 0.6,
      onUpdate: (self) => paint(self.progress),
    });

    return () => {
      trigger.kill();
      root.style.removeProperty("--t");
      for (const step of steps) step.classList.remove("is-dim");
    };
  };
}
