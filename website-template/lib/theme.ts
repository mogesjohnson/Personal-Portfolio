import { DEFAULT_FLAG_OPTIONS, type Theme } from "./flags";

export type { Theme };

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/** Notifies on any data-theme change, whoever made it (toggle, other tab, devtools). */
export function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export interface Origin {
  x: number;
  y: number;
}

export interface RevealOptions {
  /** Where the circle grows from; defaults to the viewport centre. */
  origin?: Origin;
  duration?: number;
  easing?: string;
  /** Grow the new state (default) or shrink the old state away. */
  direction?: "grow" | "shrink";
}

/**
 * Runs a synchronous DOM update behind a circular clip-path reveal using the View
 * Transitions API. Falls back to an instant update when the API is missing or the
 * visitor prefers reduced motion. Needs the `::view-transition-*(root)` rules from
 * motion.css so the browser's default cross-fade doesn't fight the clip.
 */
export function circularReveal(update: () => void, { origin, duration = 750, easing = "cubic-bezier(0.7, 0, 0.2, 1)", direction = "grow" }: RevealOptions = {}) {
  const root = document.documentElement;
  if (typeof document.startViewTransition !== "function" || root.dataset.motion === "reduce") {
    update();
    return;
  }
  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;
  // Distance to the farthest corner, so the circle always covers the screen.
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const small = `circle(0px at ${x}px ${y}px)`;
  const large = `circle(${radius}px at ${x}px ${y}px)`;
  const grow = direction === "grow";
  const transition = document.startViewTransition(update);
  transition.ready
    .then(() => {
      root.animate(
        { clipPath: grow ? [small, large] : [large, small] },
        { duration, easing, pseudoElement: grow ? "::view-transition-new(root)" : "::view-transition-old(root)" },
      );
    })
    .catch(() => {});
}

export interface SetThemeOptions extends RevealOptions {
  storageKey?: string;
}

export function setTheme(next: Theme, { storageKey = DEFAULT_FLAG_OPTIONS.themeKey, ...reveal }: SetThemeOptions = {}) {
  circularReveal(() => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(storageKey, next);
    } catch {}
  }, reveal);
}

export function toggleTheme(options: SetThemeOptions = {}) {
  setTheme(getTheme() === "dark" ? "light" : "dark", options);
}

/** Centre of an element, for use as a reveal origin (e.g. the toggle that was clicked). */
export function centerOf(el: Element): Origin {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}
