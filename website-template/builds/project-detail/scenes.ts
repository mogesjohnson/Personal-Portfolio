import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { batchReveal, EXPO, splitHeadings } from "../../lib/scenes";
import type { Scene } from "../../lib/runtime";

gsap.registerPlugin(SplitText);

/**
 * The opening, the page's loudest beat. The name rises letter by letter, then
 * the kicker, status and pitch follow 0.25s in, then the hero screenshot lands.
 * project-detail.css keeps these hidden in full motion until this runs, with a
 * 3.5s failsafe; reduced motion and no-JS never hide them.
 */
export function heroEntrance(): Scene {
  return ({ afterIntro }) => {
    const hero = document.querySelector<HTMLElement>(".pd-hero");
    const title = hero?.querySelector<HTMLElement>(".pd-hero-title");
    if (!hero || !title) return;
    const followers = hero.querySelectorAll<HTMLElement>(".dispatch-kicker, .pd-status, .pd-lead");
    const stage = hero.querySelectorAll<HTMLElement>(":scope > .pd-shot");
    // SplitText labels the heading with the real string and hides the letters from assistive tech.
    const split = SplitText.create(title, { type: "words,chars" });
    gsap.set(split.chars, { yPercent: 60, autoAlpha: 0 });
    // `animation: none` cancels the CSS failsafe now that JS owns visibility.
    gsap.set(title, { visibility: "visible", animation: "none" });
    gsap.set(followers, { autoAlpha: 0, y: 16, animation: "none" });
    gsap.set(stage, { autoAlpha: 0, y: 24, animation: "none" });

    afterIntro(() => {
      gsap
        .timeline()
        .to(split.chars, { yPercent: 0, autoAlpha: 1, duration: 1.15, stagger: 0.035, ease: EXPO })
        .to(followers, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08, ease: EXPO }, 0.25)
        .to(stage, { autoAlpha: 1, y: 0, duration: 1.1, ease: EXPO }, 0.45);
    });
  };
}

/**
 * The calm score every detail page shares: the opening, section headings that
 * rise, and blocks that arrive as they enter, plus the page's own signature
 * move. Every arrival is expo.out in the entrance register (1.0-1.2s) and body
 * blocks travel 20px. The hero and the closed evidence drawer are left out of
 * the batch: the opening owns the first, and the second can't be measured.
 * Call it at module scope in a client component so the array stays stable.
 */
export function detailScenes(signature: Scene[]): Scene[] {
  return [
    heroEntrance(),
    splitHeadings({ selector: ".pd .dispatch-title", duration: 1.05, stagger: 0.06, rotate: 2 }),
    batchReveal({ selector: ".pd [data-reveal]:not(.pd-hero *):not(.pd-details-body *)", y: 20, duration: 1, stagger: 0.07 }),
    ...signature,
  ];
}
