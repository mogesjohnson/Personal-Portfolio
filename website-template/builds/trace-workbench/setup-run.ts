import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Scene } from "../../lib/runtime";

gsap.registerPlugin(ScrollTrigger);

/**
 * Signature move for /trace-workbench: the scroll runs the setup.
 *
 * The terminal (Fig. 01) renders finished: every README setup line is lit and the
 * amber rail is full. In full motion the run rewinds, then the reader's scroll
 * fills the rail and lights each comment and command as progress reaches its
 * `data-at` cue. Reverting restores the finished state.
 */
export function setupRun(): Scene {
  return () => {
    const root = document.querySelector<HTMLElement>("[data-setup-run]");
    if (!root) return;
    const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-at]"));

    const paint = (t: number) => {
      root.style.setProperty("--t", t.toFixed(4));
      for (const line of lines) line.classList.toggle("is-dim", t < Number(line.dataset.at));
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
      root.style.removeProperty("--t");
      for (const line of lines) line.classList.remove("is-dim");
    };
  };
}
