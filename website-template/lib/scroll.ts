import type Lenis from "lenis";

/**
 * Shared handle to the smooth-scroll instance, which only exists in full-motion mode.
 *
 * Scroll locks are reference counted: every overlay (menu, modal, palette, intro)
 * takes its own hold and releases only that hold, so closing one overlay never
 * unlocks the page underneath another that is still open.
 */
let lenis: Lenis | null = null;
let holds = 0;

function apply() {
  const locked = holds > 0;
  // Native fallback for reduced motion, where Lenis never starts.
  document.documentElement.classList.toggle("scroll-locked", locked);
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

export function setSmoothScroll(instance: Lenis | null) {
  lenis = instance;
  if (lenis && holds > 0) lenis.stop();
}

export function getSmoothScroll() {
  return lenis;
}

/** Pauses scrolling until the returned release function runs. Safe to call twice. */
export function holdScroll(): () => void {
  holds++;
  apply();
  let released = false;
  return () => {
    if (released) return;
    released = true;
    holds = Math.max(0, holds - 1);
    apply();
  };
}

export function isScrollHeld() {
  return holds > 0;
}

export interface ScrollToOptions {
  /** Seconds; Lenis only. */
  duration?: number;
  /** Pixels to offset the landing point, e.g. the negative height of a fixed header. */
  offset?: number;
}

/**
 * Scrolls to an element or id. Forced through any active hold because callers are
 * often closing the overlay that owns it in the same tick.
 */
export function scrollToTarget(target: string | HTMLElement, { duration = 1.6, offset = 0 }: ScrollToOptions = {}) {
  const el = typeof target === "string" ? document.getElementById(target.replace(/^#/, "")) : target;
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { duration, offset, force: true });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top });
  }
}
