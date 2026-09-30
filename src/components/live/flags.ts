/**
 * Document-level flags that must be correct before first paint:
 *   data-theme   dark | light              (saved choice, dark by default)
 *   data-motion  full | reduce             (prefers-reduced-motion)
 *   data-intro   on | off | done           (title sequence plays once per session)
 *
 * The server renders safe defaults (reduce / off) so the page works without
 * JavaScript. FLAGS_SCRIPT upgrades them inline in <head> before the body paints.
 */

export const FLAGS_SCRIPT = `(function(){try{var d=document.documentElement;var t=null;try{t=localStorage.getItem("mj-theme")}catch(e){}d.setAttribute("data-theme",t==="light"?"light":"dark");var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;d.setAttribute("data-motion",r?"reduce":"full");var s=false;try{s=sessionStorage.getItem("mj-intro")==="1"}catch(e){}d.setAttribute("data-intro",r||s?"off":"on")}catch(e){}})()`;

/**
 * Re-applies the flags on the client. In development React's Strict Mode remount
 * resets <html> to its JSX attributes, which would drop what the inline script set.
 */
export function applyDocumentFlags() {
  const d = document.documentElement;
  let theme: string | null = null;
  let seen = false;
  try {
    theme = localStorage.getItem("mj-theme");
    seen = sessionStorage.getItem("mj-intro") === "1";
  } catch {}
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  d.dataset.theme = theme === "light" ? "light" : "dark";
  d.dataset.motion = reduce ? "reduce" : "full";
  if (d.dataset.intro !== "done") d.dataset.intro = reduce || seen ? "off" : "on";
}
