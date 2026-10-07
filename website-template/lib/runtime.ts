import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { INTRO_DONE_EVENT } from "./flags";
import { holdScroll, setSmoothScroll } from "./scroll";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** What every scene receives. */
export interface MotionContext {
  root: HTMLElement;
  lenis: Lenis;
  /** For breakpoint-specific scenes; reverted with everything else. */
  mm: gsap.MatchMedia;
  /** True on mouse/trackpad devices; gate hover-only effects on it. */
  finePointer: boolean;
  readonly introPlaying: boolean;
  /**
   * Runs `fn` now, or when the title sequence hands off. Either way the tweens it
   * creates are recorded in the runtime's GSAP context and reverted on teardown.
   */
  afterIntro(fn: () => void): void;
}

/**
 * A scene wires one effect. It may return a cleanup for anything GSAP doesn't own
 * (DOM listeners, rAF loops); tweens, ScrollTriggers and SplitTexts made inside it
 * are reverted automatically.
 */
export type Scene = (ctx: MotionContext) => void | (() => void);

export interface RuntimeOptions {
  /** Lenis smoothing; lower is floatier. */
  lerp?: number;
  introEvent?: string;
  /** Called if a scene throws during setup, after the page has been reset to static. */
  onError?: (error: unknown) => void;
}

/**
 * Starts smooth scrolling and every scene. Call only in full-motion mode (see
 * useFullMotion). Returns a teardown that reverts all splits, triggers and listeners.
 *
 * If any scene throws, everything is undone and data-motion flips to "reduce", so the
 * visitor gets the static page instead of a half-animated one.
 */
export function startMotion(scenes: Scene[], { lerp = 0.085, introEvent = INTRO_DONE_EVENT, onError }: RuntimeOptions = {}): () => void {
  const root = document.documentElement;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const lenis = new Lenis({ lerp, anchors: true, stopInertiaOnNavigate: true });
  setSmoothScroll(lenis);
  lenis.on("scroll", ScrollTrigger.update);
  const drive = (time: number) => lenis.raf(time * 1000);
  // Prioritised so Lenis moves the page before anything else reads scroll this frame.
  gsap.ticker.add(drive, false, true);
  gsap.ticker.lagSmoothing(0);

  const cleanups: (() => void)[] = [];
  const mm = gsap.matchMedia();
  const gctx = gsap.context(() => {});

  let introPlaying = root.dataset.intro === "on";
  if (introPlaying) {
    const release = holdScroll();
    const done = () => {
      introPlaying = false;
      release();
    };
    window.addEventListener(introEvent, done, { once: true });
    cleanups.push(() => {
      window.removeEventListener(introEvent, done);
      release();
    });
  }

  const ctx: MotionContext = {
    root,
    lenis,
    mm,
    finePointer,
    get introPlaying() {
      return introPlaying;
    },
    afterIntro(fn) {
      if (!introPlaying) {
        gctx.add(fn);
        return;
      }
      const run = () => gctx.add(fn);
      window.addEventListener(introEvent, run, { once: true });
      cleanups.push(() => window.removeEventListener(introEvent, run));
    },
  };

  const teardown = () => {
    cleanups.splice(0).forEach((fn) => fn());
    mm.revert();
    gctx.revert();
    gsap.ticker.remove(drive);
    gsap.ticker.lagSmoothing(500, 33);
    lenis.destroy();
    setSmoothScroll(null);
  };

  try {
    gctx.add(() => {
      for (const scene of scenes) {
        const cleanup = scene(ctx);
        if (cleanup) cleanups.push(cleanup);
      }
    });
  } catch (error) {
    // Never leave the page half-animated: undo everything and show the static version.
    console.error("[motion] Scenes failed to start; showing the static page.", error);
    teardown();
    root.dataset.motion = "reduce";
    onError?.(error);
    return () => {};
  }

  // Scenes come from a list, not page order; pins only offset triggers that refresh after them.
  ScrollTrigger.sort();
  // Web fonts and late layout shift trigger positions; recalculate once they settle.
  document.fonts.ready.then(() => ScrollTrigger.refresh());

  return teardown;
}
