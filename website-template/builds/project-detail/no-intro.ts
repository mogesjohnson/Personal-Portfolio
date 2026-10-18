import { useLayoutEffect } from "react";

/**
 * The flags script marks a session's first page with data-intro="on", and the
 * motion runtime holds the scroll until the homepage title sequence says it is
 * done. Pages without the title sequence (/projects and the project detail
 * pages) would leave a visitor who lands on them first stuck. This turns the
 * flag off before the runtime starts (layout effects run before
 * useMotionScenes' effect). The homepage intro still plays
 * on the visitor's first homepage visit, because the session flag is left alone.
 */
export function useNoIntroHold() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro === "on") root.dataset.intro = "off";
  }, []);
}
