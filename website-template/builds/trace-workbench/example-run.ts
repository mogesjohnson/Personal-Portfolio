import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Scene } from "../../lib/runtime";

gsap.registerPlugin(ScrollTrigger);

/**
 * Signature move for /trace-workbench: scroll walks the three recorded runs.
 *
 * The list renders finished: every row is lit. In full motion it rewinds, then
 * the reader's scroll lights each row as progress reaches its `data-at` cue.
 * Reverting restores the finished state. Reduced motion never starts this scene,
 * so the rows stay lit.
 */
export function exampleRun(): Scene {
  return () => {
    const root = document.querySelector<HTMLElement>("[data-examples]");
    if (!root) return;
    const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-at]"));

    const paint = (t: number) => {
      for (const row of rows) row.classList.toggle("is-dim", t < Number(row.dataset.at));
    };

    paint(0);

    const trigger = ScrollTrigger.create({
      trigger: root.closest("section") ?? root,
      start: "top 65%",
      end: "bottom 75%",
      scrub: 0.6,
      onUpdate: (self) => paint(self.progress),
    });

    return () => {
      trigger.kill();
      for (const row of rows) row.classList.remove("is-dim");
    };
  };
}
