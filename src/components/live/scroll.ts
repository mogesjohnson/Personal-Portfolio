import type Lenis from "lenis";

/** Shared handle to the smooth-scroll instance, which only exists in full-motion mode. */
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    // Callers are often closing an overlay that still holds the scroll lock.
    lenis.start();
    lenis.scrollTo(el, { duration: 1.6 });
  } else {
    el.scrollIntoView();
  }
}

/** Pauses smooth scrolling while an overlay (modal, menu, intro) owns the wheel. */
export function lockScroll(locked: boolean) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}
