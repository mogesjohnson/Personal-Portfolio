import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { Scene } from "./runtime";

/**
 * Scroll scenes. Each factory takes selectors and timing, and returns a Scene for
 * startMotion(). Defaults are the values tuned on the reference site; the matching
 * entries in motion-system.json carry the same numbers so either can drive them.
 */

export const EXPO = "expo.out";

/*
 * One-shot reveals use toggleActions instead of `once: true`. A self-killing trigger
 * that fires during a refresh (e.g. a page loaded at /#contact) mutates ScrollTrigger's
 * internal list mid-loop and crashes. This also replays when scrolled back into view.
 */
export const PLAY_ONCE = "play none play none";

/* ------------------------------------------------------------------ */
/* Headline entrance                                                    */
/* ------------------------------------------------------------------ */

export interface SplitEntranceOptions {
  /** The headline; CSS keeps it visibility:hidden in full-motion mode until this runs. */
  title: string;
  /** Optional per-line wrappers inside the title, split separately so lines never reflow. */
  lines?: string;
  /** Supporting elements that fade up after the characters start. */
  followers?: string;
  duration?: number;
  stagger?: number;
  followerDelay?: number;
  ease?: string;
}

/** Headline characters flip up from below on a hinge once the intro hands off. */
export function splitEntrance({ title, lines, followers, duration = 1.15, stagger = 0.035, followerDelay = 0.25, ease = EXPO }: SplitEntranceOptions): Scene {
  return (ctx) => {
    const el = document.querySelector<HTMLElement>(title);
    if (!el) return;
    const split = SplitText.create(lines ? el.querySelectorAll(lines) : el, { type: "words,chars" });
    gsap.set(split.chars, { yPercent: 70, rotateX: -95, autoAlpha: 0, transformOrigin: "50% 100%", transformPerspective: 700 });
    // `animation: none` cancels the CSS failsafe now that JS owns visibility.
    if (followers) gsap.set(followers, { autoAlpha: 0, y: 28, animation: "none" });
    gsap.set(el, { visibility: "visible", animation: "none" });

    ctx.afterIntro(() => {
      const tl = gsap.timeline();
      tl.to(split.chars, { yPercent: 0, rotateX: 0, autoAlpha: 1, duration, stagger, ease });
      if (followers) tl.to(followers, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08, ease }, followerDelay);
    });
  };
}

/* ------------------------------------------------------------------ */
/* Labels and headings                                                  */
/* ------------------------------------------------------------------ */

export interface WipeLabelsOptions {
  selector: string;
  /** The colour bar inside each label (absolutely positioned, scaleX 0). */
  bar?: string;
  /** Elements hidden until the bar covers them; defaults to every child except the bar. */
  text?: string;
  start?: string;
  inDuration?: number;
  outDuration?: number;
}

/** A colour bar wipes in from the left, the text swaps in underneath, the bar exits right. */
export function wipeLabels({ selector, bar = ".wipe", text, start = "top 88%", inDuration = 0.4, outDuration = 0.45 }: WipeLabelsOptions): Scene {
  return () => {
    gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
      const wipe = el.querySelector(bar);
      if (!wipe) return;
      const content = text ? Array.from(el.querySelectorAll(text)) : Array.from(el.children).filter((child) => child !== wipe);
      gsap
        .timeline({ scrollTrigger: { trigger: el, start, toggleActions: PLAY_ONCE } })
        .set(content, { autoAlpha: 0 })
        .fromTo(wipe, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: inDuration, ease: "power3.in" })
        .set(content, { autoAlpha: 1 })
        .set(wipe, { transformOrigin: "100% 50%" })
        .to(wipe, { scaleX: 0, duration: outDuration, ease: "power3.out" });
    });
  };
}

export interface SplitHeadingsOptions {
  selector: string;
  start?: string;
  duration?: number;
  stagger?: number;
  /** Starting tilt in degrees; gives the rise a slight hand-set feel. */
  rotate?: number;
  ease?: string;
}

/** Section headings rise word by word with a small tilt. */
export function splitHeadings({ selector, start = "top 86%", duration = 1.1, stagger = 0.07, rotate = 3, ease = EXPO }: SplitHeadingsOptions): Scene {
  return () => {
    gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
      const split = SplitText.create(el, { type: "words" });
      gsap.from(split.words, {
        yPercent: 60,
        rotate,
        autoAlpha: 0,
        duration,
        stagger,
        ease,
        scrollTrigger: { trigger: el, start, toggleActions: PLAY_ONCE },
      });
    });
  };
}

export interface ScrubWordsOptions {
  selector: string;
  /** Opacity of words not yet reached. */
  dim?: number;
  start?: string;
  end?: string;
}

/** A statement lights up word by word, tied 1:1 to scroll position. */
export function scrubWords({ selector, dim = 0.14, start = "top 78%", end = "bottom 48%" }: ScrubWordsOptions): Scene {
  return () => {
    gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
      const split = SplitText.create(el, { type: "words" });
      gsap.fromTo(split.words, { opacity: dim }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: el, start, end, scrub: true } });
    });
  };
}

/* ------------------------------------------------------------------ */
/* Generic reveals                                                      */
/* ------------------------------------------------------------------ */

export interface BatchRevealOptions {
  selector?: string;
  y?: number;
  start?: string;
  duration?: number;
  stagger?: number;
  ease?: string;
}

/**
 * Anything marked data-reveal fades up. ScrollTrigger.batch groups elements that
 * enter on the same frame so a row of cards staggers instead of popping together.
 */
export function batchReveal({ selector = "[data-reveal]", y = 44, start = "top 90%", duration = 1.1, stagger = 0.09, ease = EXPO }: BatchRevealOptions = {}): Scene {
  return () => {
    const items = gsap.utils.toArray<HTMLElement>(selector);
    if (!items.length) return;
    gsap.set(items, { autoAlpha: 0, y });
    const show = (batch: Element[]) => gsap.to(batch, { autoAlpha: 1, y: 0, duration, stagger, ease, overwrite: true });
    ScrollTrigger.batch(items, { start, onEnter: show, onEnterBack: show });
  };
}

export interface CharsRiseOptions {
  /** Characters pre-split in markup (so the word renders without JS). */
  chars: string;
  trigger: string;
  start?: string;
  duration?: number;
  stagger?: number;
}

/** Pre-split characters rise out of an overflow:hidden line, e.g. a footer wordmark. */
export function charsRise({ chars, trigger, start = "top 95%", duration = 1.2, stagger = 0.04 }: CharsRiseOptions): Scene {
  return () => {
    const targets = gsap.utils.toArray<HTMLElement>(chars);
    if (!targets.length) return;
    gsap.from(targets, { yPercent: 100, duration, stagger, ease: EXPO, scrollTrigger: { trigger, start, toggleActions: PLAY_ONCE } });
  };
}

export interface ParallaxOptions {
  /** Elements carry their speed in this attribute, e.g. data-speed="0.35". */
  attribute?: string;
  /** Pixels of travel at speed 1, each way. */
  distance?: number;
}

/** Elements drift against the scroll relative to their parent section. */
export function parallax({ attribute = "data-speed", distance = 140 }: ParallaxOptions = {}): Scene {
  return () => {
    gsap.utils.toArray<HTMLElement>(`[${attribute}]`).forEach((el) => {
      const speed = Number(el.getAttribute(attribute)) || 0.3;
      gsap.fromTo(
        el,
        { y: () => speed * distance },
        {
          y: () => speed * -distance,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        },
      );
    });
  };
}

/* ------------------------------------------------------------------ */
/* Marquees                                                             */
/* ------------------------------------------------------------------ */

export interface VelocityMarqueeOptions {
  selector?: string;
  track?: string;
  /** Scroll velocity (px/s) per +1x speed. */
  velocityDivisor?: number;
  maxBoost?: number;
  /** Velocity (px/s) per degree of skew. */
  skewDivisor?: number;
  maxSkew?: number;
  /** Seconds of stillness before the marquee eases back to cruising speed. */
  settleAfter?: number;
}

/**
 * Infinite tickers that speed up, reverse and skew with scroll velocity. Markup:
 * .marquee[data-direction][data-duration] > .marquee-track > two identical rows,
 * so translating the track by -50% loops seamlessly.
 */
export function velocityMarquees({
  selector = ".marquee",
  track = ".marquee-track",
  velocityDivisor = 350,
  maxBoost = 7,
  skewDivisor = 260,
  maxSkew = 7,
  settleAfter = 0.18,
}: VelocityMarqueeOptions = {}): Scene {
  return () => {
    const loops = gsap.utils.toArray<HTMLElement>(selector).flatMap((el) => {
      const row = el.querySelector<HTMLElement>(track);
      if (!row) return [];
      const dir = Number(el.dataset.direction ?? 1) >= 0 ? 1 : -1;
      const tween = gsap.fromTo(
        row,
        { xPercent: dir > 0 ? 0 : -50 },
        { xPercent: dir > 0 ? -50 : 0, duration: Number(el.dataset.duration ?? 40), ease: "none", repeat: -1 },
      );
      tween.totalTime(tween.duration() * 200); // room to run backwards
      return [{ tween, row }];
    });
    if (!loops.length) return;

    let direction = 1;
    let settle: gsap.core.Tween | null = null;
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate(self) {
        const v = self.getVelocity();
        direction = self.direction;
        const boost = 1 + Math.min(Math.abs(v) / velocityDivisor, maxBoost);
        const skew = gsap.utils.clamp(-maxSkew, maxSkew, v / -skewDivisor);
        loops.forEach(({ tween, row }) => {
          gsap.to(tween, { timeScale: direction * boost, duration: 0.2, overwrite: true });
          gsap.to(row, { skewX: skew, duration: 0.3, overwrite: "auto" });
        });
        settle?.kill();
        settle = gsap.delayedCall(settleAfter, () => {
          loops.forEach(({ tween, row }) => {
            gsap.to(tween, { timeScale: direction, duration: 1.2, ease: "power2.out", overwrite: true });
            gsap.to(row, { skewX: 0, duration: 0.8, ease: "power3.out", overwrite: "auto" });
          });
        });
      },
    });
    return () => {
      trigger.kill();
      settle?.kill();
    };
  };
}

/* ------------------------------------------------------------------ */
/* Pinned horizontal track                                              */
/* ------------------------------------------------------------------ */

export interface PinnedHorizontalOptions {
  section: string;
  track: string;
  viewport: string;
  items: string;
  /** Optional bar whose scaleX follows progress. */
  progress?: string;
  /** Below this width the track stacks vertically and items batch-reveal instead. */
  minWidth?: number;
  scrub?: number;
}

/**
 * On wide screens the section pins and its track scrolls sideways for exactly the
 * overflow distance. Cards swing in on a 3D hinge using `containerAnimation`, which
 * maps their horizontal position inside the moving track to scroll progress.
 */
export function pinnedHorizontal({ section, track, viewport, items, progress, minWidth = 1024, scrub = 0.8 }: PinnedHorizontalOptions): Scene {
  return ({ mm }) => {
    const root = document.querySelector<HTMLElement>(section);
    const row = root?.querySelector<HTMLElement>(track);
    const view = root?.querySelector<HTMLElement>(viewport);
    if (!root || !row || !view) return;
    const cards = gsap.utils.toArray<HTMLElement>(items, root);

    mm.add(`(min-width: ${minWidth}px)`, () => {
      const distance = () => Math.max(0, row.scrollWidth - view.clientWidth);
      const slide = gsap.to(row, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: () => `+=${distance()}`, pin: true, scrub, anticipatePin: 1, invalidateOnRefresh: true },
      });
      if (progress) {
        gsap.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: () => `+=${distance()}`, scrub: true } });
      }
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0.2, scale: 0.92, rotateY: -14 },
          { autoAlpha: 1, scale: 1, rotateY: 0, ease: "none", scrollTrigger: { trigger: card, containerAnimation: slide, start: "left 98%", end: "left 62%", scrub: true } },
        );
      });
    });

    mm.add(`(max-width: ${minWidth - 1}px)`, () => {
      gsap.set(cards, { autoAlpha: 0, y: 40 });
      const show = (batch: Element[]) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: EXPO });
      ScrollTrigger.batch(cards, { start: "top 90%", onEnter: show, onEnterBack: show });
    });
  };
}
