import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Scene } from "../../lib/runtime";

gsap.registerPlugin(ScrollTrigger);

/**
 * Signature move for /trace-workbench: observe, act, observe.
 *
 * The stage renders at its rest pose: the Dusk picture, the cursor on the Dusk
 * swatch, the sight marks on the window, the changed frame boxed, every step lit.
 * That is also the reduced-motion and no-JS picture.
 *
 * In full motion the stage rewinds to the Tide picture with nothing on it. When
 * the stage is in view, TRACE's loop plays once at its own tempo (about 3s, not
 * scrubbed): the sight marks close on the window (observe), the cursor travels to
 * Dusk and clicks (act), the old frame holds, then the picture cuts, with no
 * crossfade, to the fresh observation and the changed region is boxed. Scrolling
 * back above the stage rewinds it, so the loop runs again on the way down.
 * The score is in BRIEF.md › Score.
 */
export function lookAgain(): Scene {
  return () => {
    const root = document.querySelector<HTMLElement>("[data-look]");
    const stage = root?.querySelector<HTMLElement>(".tw-stage");
    if (!root || !stage) return;
    const after = stage.querySelector(".tw-after");
    const sight = stage.querySelector(".tw-sight");
    const cursor = stage.querySelector(".tw-cursor");
    const ring = stage.querySelector(".tw-ring");
    const diff = stage.querySelector(".tw-diff");
    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    if (!after || !sight || !cursor || !ring || !diff || steps.length !== 3) return;

    // Where the cursor starts, relative to its rest point on the Dusk swatch.
    const fromX = () => -0.3 * stage.clientWidth;
    const fromY = () => 0.49 * stage.clientHeight;

    // Rewound: the Tide picture, nothing on it, every step dim.
    gsap.set([after, sight, cursor, ring, diff], { autoAlpha: 0 });
    gsap.set(steps, { opacity: 0.34 });

    const tl = gsap.timeline({
      defaults: { ease: "expo.out", immediateRender: false },
      scrollTrigger: {
        trigger: stage,
        start: "center 62%",
        toggleActions: "play none none reset",
        invalidateOnRefresh: true,
      },
    });

    // Beat 1, observe: the sight marks close on the Tide window.
    tl.fromTo(sight, { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 0.45 }, 0)
      .fromTo(steps[0], { opacity: 0.34 }, { opacity: 1, duration: 0.35 }, 0)
      // Beat 2, act: the cursor travels to Dusk, presses, and the click rings out.
      .fromTo(cursor, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: "none" }, 0.5)
      .fromTo(cursor, { x: fromX, y: fromY }, { x: 0, y: 0, duration: 1.1 }, 0.5)
      .fromTo(cursor, { scale: 1 }, { scale: 0.84, duration: 0.12 }, 1.5)
      .fromTo(cursor, { scale: 0.84 }, { scale: 1, duration: 0.3 }, 1.62)
      .fromTo(ring, { autoAlpha: 1, scale: 0.3 }, { autoAlpha: 0, scale: 1.7, duration: 0.5 }, 1.62)
      .fromTo(steps[1], { opacity: 0.34 }, { opacity: 1, duration: 0.35 }, 1.62)
      // Beat 3, look again: hold the old frame, cut to the fresh observation, box what changed.
      .fromTo(after, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0, ease: "none" }, 2.15)
      .fromTo(sight, { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 0.45 }, 2.15)
      .fromTo(steps[2], { opacity: 0.34 }, { opacity: 1, duration: 0.35 }, 2.15)
      .fromTo(diff, { autoAlpha: 0, scale: 1.03 }, { autoAlpha: 1, scale: 1, duration: 0.7 }, 2.3);

    // The sets, the timeline and its trigger live in the runtime's GSAP context,
    // so teardown (or a failed start) reverts every element to the CSS rest pose.
  };
}
