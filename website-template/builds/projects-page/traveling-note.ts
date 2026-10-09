import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Scene } from "../../lib/runtime";

gsap.registerPlugin(ScrollTrigger);

/**
 * The note stays in the pin in the DOM, so reduced motion and no JavaScript
 * already show the end state. In full motion it is parked on the How to post it
 * mark until the connection heading reaches the upper third, then it travels
 * back along one curve.
 */
export function travelingNote(): Scene {
  return () => {
    const origin = document.querySelector<HTMLElement>("[data-note-origin]");
    const note = document.querySelector<HTMLElement>("[data-note]");
    const heading = document.querySelector<HTMLElement>("#connection-title");
    if (!origin || !note || !heading) return;

    let flown = false;

    const passed = () => heading.getBoundingClientRect().top < window.innerHeight * 0.33;

    const park = () => {
      if (flown || passed()) {
        gsap.set(note, { x: 0, y: 0 });
        return;
      }
      const from = origin.getBoundingClientRect();
      const current = note.getBoundingClientRect();
      const raw = getComputedStyle(note).transform;
      const matrix = raw && raw !== "none" ? new DOMMatrix(raw) : new DOMMatrix();
      gsap.set(note, {
        x: from.left - (current.left - matrix.m41),
        y: from.top - (current.top - matrix.m42),
      });
    };

    if (passed()) return;

    park();

    const trigger = ScrollTrigger.create({
      trigger: heading,
      start: "top 33%",
      once: true,
      onEnter: () => {
        flown = true;
        gsap.to(note, { x: 0, y: 0, duration: 0.8, ease: "expo.out", overwrite: true });
      },
    });

    const onRefresh = () => park();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    window.addEventListener("resize", onRefresh);

    return () => {
      trigger.kill();
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      window.removeEventListener("resize", onRefresh);
    };
  };
}
