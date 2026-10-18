import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import type { Scene } from "../../lib/runtime";

gsap.registerPlugin(ScrollTrigger);

/**
 * Signature move for /replay-studio: the scroll is the playhead.
 *
 * The timeline renders finished: playhead at the out point, every step lit. In
 * full motion the playhead parks at the in point and the reader's scroll drags it
 * across the take; each "Make a demo" step lights as the playhead passes its cue,
 * and the timecode counts with it. Reverting restores the finished state.
 */
export function timelineScrub(): Scene {
  return () => {
    const root = document.querySelector<HTMLElement>("[data-timeline]");
    if (!root) return;
    const steps = Array.from(document.querySelectorAll<HTMLElement>("[data-cue]"));
    const clock = root.querySelector<HTMLElement>("[data-timecode]");
    const total = Number(root.dataset.duration ?? "8");
    const finished = clock?.textContent ?? "";

    const paint = (t: number) => {
      root.style.setProperty("--t", t.toFixed(4));
      if (clock) clock.textContent = `00:${(t * total).toFixed(1).padStart(4, "0")}`;
      for (const step of steps) step.classList.toggle("is-dim", t < Number(step.dataset.cue));
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
      if (clock) clock.textContent = finished;
      for (const step of steps) step.classList.remove("is-dim");
    };
  };
}
