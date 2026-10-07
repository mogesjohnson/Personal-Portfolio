/**
 * Document-level flags that must be correct before first paint:
 *   data-theme   dark | light        (saved choice, falls back to `defaultTheme`)
 *   data-motion  full | reduce       (prefers-reduced-motion)
 *   data-intro   on | off | done     (title sequence plays once per session)
 *
 * The server renders the safe defaults from `SERVER_FLAGS` (static page, no intro) so
 * the site works without JavaScript. The inline script from `createFlagsScript()`
 * upgrades them in <head> before the body paints; CSS keys every motion-only rule
 * off these attributes, so nothing animates until the browser has opted in.
 */

export type Theme = "dark" | "light";
export type MotionMode = "full" | "reduce";
export type IntroState = "on" | "off" | "done";

export interface FlagOptions {
  /** localStorage key for the saved theme. */
  themeKey?: string;
  /** sessionStorage key that marks the intro as seen for this tab. */
  introKey?: string;
  defaultTheme?: Theme;
  /** Set false for sites without a title sequence; data-intro then stays "off". */
  intro?: boolean;
}

export const DEFAULT_FLAG_OPTIONS: Required<FlagOptions> = {
  themeKey: "site-theme",
  introKey: "site-intro",
  defaultTheme: "dark",
  intro: true,
};

/** Fired on window when the title sequence hands the page over. */
export const INTRO_DONE_EVENT = "motion:intro-done";

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

/** Attributes to render on <html> on the server; pair with suppressHydrationWarning. */
export function serverFlags(options: FlagOptions = {}) {
  const o = { ...DEFAULT_FLAG_OPTIONS, ...options };
  return { "data-theme": o.defaultTheme, "data-motion": "reduce", "data-intro": "off" } as const;
}

/**
 * The inline <head> script. Kept ES5 and dependency-free because it runs while the
 * HTML is still parsing, before any bundle has loaded.
 */
export function createFlagsScript(options: FlagOptions = {}): string {
  const o = { ...DEFAULT_FLAG_OPTIONS, ...options };
  const other: Theme = o.defaultTheme === "dark" ? "light" : "dark";
  const q = JSON.stringify;
  const intro = o.intro
    ? `var s=false;try{s=sessionStorage.getItem(${q(o.introKey)})==="1"}catch(e){}d.setAttribute("data-intro",r||s?"off":"on");`
    : `d.setAttribute("data-intro","off");`;
  return (
    `(function(){try{var d=document.documentElement;var t=null;try{t=localStorage.getItem(${q(o.themeKey)})}catch(e){}` +
    `d.setAttribute("data-theme",t===${q(other)}?${q(other)}:${q(o.defaultTheme)});` +
    `var r=window.matchMedia(${q(REDUCE_QUERY)}).matches;d.setAttribute("data-motion",r?"reduce":"full");` +
    intro +
    `}catch(e){}})()`
  );
}

/**
 * Re-applies the flags on the client. In development React's Strict Mode remount
 * resets <html> to its JSX attributes, dropping what the inline script set.
 * Never downgrades data-intro from "done".
 */
export function applyDocumentFlags(options: FlagOptions = {}) {
  const o = { ...DEFAULT_FLAG_OPTIONS, ...options };
  const d = document.documentElement;
  let theme: string | null = null;
  let seen = false;
  try {
    theme = localStorage.getItem(o.themeKey);
    seen = sessionStorage.getItem(o.introKey) === "1";
  } catch {}
  const reduce = window.matchMedia(REDUCE_QUERY).matches;
  const other: Theme = o.defaultTheme === "dark" ? "light" : "dark";
  d.dataset.theme = theme === other ? other : o.defaultTheme;
  d.dataset.motion = reduce ? "reduce" : "full";
  if (d.dataset.intro !== "done") d.dataset.intro = o.intro && !reduce && !seen ? "on" : "off";
}

export function readFlags(): { theme: Theme; motion: MotionMode; intro: IntroState } {
  const d = document.documentElement.dataset;
  return {
    theme: d.theme === "light" ? "light" : "dark",
    motion: d.motion === "full" ? "full" : "reduce",
    intro: d.intro === "on" ? "on" : d.intro === "done" ? "done" : "off",
  };
}

/** Records that the intro played so it is skipped for the rest of the session. */
export function markIntroSeen(options: FlagOptions = {}) {
  const o = { ...DEFAULT_FLAG_OPTIONS, ...options };
  try {
    sessionStorage.setItem(o.introKey, "1");
  } catch {}
  document.documentElement.dataset.intro = "done";
}

/** Clears the seen marker; the next hard load plays the intro again. */
export function resetIntro(options: FlagOptions = {}) {
  const o = { ...DEFAULT_FLAG_OPTIONS, ...options };
  try {
    sessionStorage.removeItem(o.introKey);
  } catch {}
}

export function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function prefersFullMotion() {
  return !window.matchMedia(REDUCE_QUERY).matches;
}
