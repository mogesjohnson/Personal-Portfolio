import { gsap } from "gsap";
import type { Scene } from "./runtime";

/**
 * Pointer-driven effects. The two scenes only run on fine pointers (mouse,
 * trackpad); `trackSpotlight` is plain DOM and safe in every motion mode because
 * it only writes CSS variables that hover styles read.
 */

export interface MagneticOptions {
  selector?: string;
  /** Fraction of the cursor offset the element follows, per axis. */
  strengthX?: number;
  strengthY?: number;
  duration?: number;
  ease?: string;
}

/** Elements lean toward the cursor and spring back on an elastic ease when it leaves. */
export function magnetic({ selector = "[data-magnetic]", strengthX = 0.28, strengthY = 0.4, duration = 0.6, ease = "elastic.out(1, 0.45)" }: MagneticOptions = {}): Scene {
  return ({ finePointer }) => {
    if (!finePointer) return;
    const offs = gsap.utils.toArray<HTMLElement>(selector).map((el) => {
      // quickTo reuses one tween per axis instead of creating a tween per pointermove.
      const xTo = gsap.quickTo(el, "x", { duration, ease });
      const yTo = gsap.quickTo(el, "y", { duration, ease });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strengthX);
        yTo((e.clientY - (r.top + r.height / 2)) * strengthY);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
        gsap.set(el, { x: 0, y: 0 });
      };
    });
    return () => offs.forEach((off) => off());
  };
}

export interface ProximityWeightOptions {
  container: string;
  chars: string;
  /** Pixels from a character's centre at which it reaches `min`. */
  radius?: number;
  min?: number;
  max?: number;
}

/**
 * Characters near the cursor swell to a heavier weight of a variable font. Weight
 * follows a squared falloff so the bulge is tight; a CSS transition on font-weight
 * smooths the steps. Reads layout at most once per frame.
 */
export function proximityWeight({ container, chars, radius = 320, min = 250, max = 900 }: ProximityWeightOptions): Scene {
  return ({ finePointer }) => {
    const word = document.querySelector<HTMLElement>(container);
    if (!finePointer || !word) return;
    const letters = Array.from(word.querySelectorAll<HTMLElement>(chars));
    let frame = 0;
    let px = 0;
    let py = 0;
    const update = () => {
      frame = 0;
      letters.forEach((ch) => {
        const r = ch.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        const t = Math.max(0, 1 - d / radius);
        ch.style.fontWeight = String(Math.round(min + (max - min) * t * t));
      });
    };
    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const leave = () => letters.forEach((ch) => (ch.style.fontWeight = ""));
    word.addEventListener("pointermove", move);
    word.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      word.removeEventListener("pointermove", move);
      word.removeEventListener("pointerleave", leave);
      leave();
    };
  };
}

/**
 * Feeds the pointer position into --mx / --my on the hovered card so a radial
 * glow can follow the cursor in CSS. One delegated listener serves every card.
 */
export function trackSpotlight(selector = ".glass"): () => void {
  const onMove = (e: PointerEvent) => {
    const card = (e.target as Element | null)?.closest<HTMLElement>(selector);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  return () => window.removeEventListener("pointermove", onMove);
}
