import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Scene } from "../../lib/runtime";

gsap.registerPlugin(ScrollTrigger);

/**
 * Signature move for /trace-workbench: the scroll runs the setup.
 *
 * The terminal renders finished: every README setup command is lit, the cursor
 * sits after `doctor`, and the progress rail is full. In full motion the run
 * rewinds to the first command, then the reader's scroll walks the cursor down
 * the six commands; each line lights as the cursor reaches its cue, and the
 * three phase labels (install, configure, verify) follow. Reverting restores
 * the finished state.
 */
export function setupRun(): Scene {
  return () => {
    const root = document.querySelector<HTMLElement>("[data-setup-run]");
    if (!root) return;
    const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-at]"));
    const counter = root.querySelector<HTMLElement>("[data-step-count]");
    const finished = counter?.textContent ?? "";
    const total = lines.filter((line) => line.dataset.cmd !== undefined).length;

    const paint = (t: number) => {
      root.style.setProperty("--t", t.toFixed(4));
      let done = 0;
      for (const line of lines) {
        const dim = t < Number(line.dataset.at);
        line.classList.toggle("is-dim", dim);
        if (!dim && line.dataset.cmd !== undefined) done++;
      }
      if (counter) counter.textContent = `${done} / ${total}`;
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
      if (counter) counter.textContent = finished;
      for (const line of lines) line.classList.remove("is-dim");
    };
  };
}
