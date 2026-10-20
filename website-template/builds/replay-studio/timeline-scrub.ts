import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import type { Scene } from "../../lib/runtime";

gsap.registerPlugin(ScrollTrigger);

/**
 * Signature move for /replay-studio: the scroll is the playhead. See BRIEF.md › Score.
 *
 * The timeline renders finished: playhead at the out point, every step lit, no
 * overlay live. In full motion the playhead parks at the in point and the reader's
 * scroll drags it across the 8-second take while the timeline is in view. The
 * timecode counts with it, each overlay clip goes live while the playhead is
 * inside it (as the editor shows what is on screen at that moment), and each
 * "how it works" step lights as the playhead passes its cue. Reverting restores
 * the finished state.
 */
export function timelineScrub(): Scene {
  return () => {
    const root = document.querySelector<HTMLElement>("[data-timeline]");
    if (!root) return;
    const steps = Array.from(document.querySelectorAll<HTMLElement>("[data-cue]"));
    const clips = Array.from(root.querySelectorAll<HTMLElement>("[data-span]")).map((el) => {
      const [from, to] = (el.dataset.span ?? "0 0").split(" ").map(Number);
      return { el, from, to };
    });
    const clock = root.querySelector<HTMLElement>("[data-timecode]");
    const total = Number(root.dataset.duration ?? "8");
    const finished = clock?.textContent ?? "";

    const paint = (t: number) => {
      root.style.setProperty("--t", t.toFixed(4));
      if (clock) clock.textContent = `00:${(t * total).toFixed(1).padStart(4, "0")}`;
      for (const clip of clips) clip.el.classList.toggle("is-live", t >= clip.from && t < clip.to);
      for (const step of steps) step.classList.toggle("is-dim", t < Number(step.dataset.cue));
    };

    paint(0);

    // From the stage sitting whole in the lower part of the screen to sitting whole near the top.
    // Progress maps 1:1 to scroll; Lenis, on the runtime's ticker, is the smoothing.
    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "center 80%",
      end: "center 30%",
      onUpdate: (self) => paint(self.progress),
    });

    return () => {
      trigger.kill();
      root.style.removeProperty("--t");
      if (clock) clock.textContent = finished;
      for (const clip of clips) clip.el.classList.remove("is-live");
      for (const step of steps) step.classList.remove("is-dim");
    };
  };
}
