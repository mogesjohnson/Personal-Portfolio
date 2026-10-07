"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ElementType, type ReactNode, type RefObject } from "react";
import { applyDocumentFlags, prefersFullMotion, subscribeReducedMotion, type FlagOptions } from "../lib/flags";
import { playTitleSequence, type IntroWord } from "../lib/intro";
import { createParticleField, type ParticleFieldOptions } from "../lib/particles/field";
import type { Diagram } from "../lib/particles/formations";
import { trackSpotlight } from "../lib/pointer";
import { startMotion, type RuntimeOptions, type Scene } from "../lib/runtime";
import { holdScroll } from "../lib/scroll";
import { decodeText, toChars } from "../lib/text";
import { centerOf, getTheme, subscribeTheme, toggleTheme, type Theme } from "../lib/theme";

/**
 * React connector: hooks and small components that mount the libraries with the
 * right lifecycle. Everything here is client-only; pass stable arrays and option
 * objects (module constants or useMemo) so effects don't restart every render.
 */

/* ------------------------------------------------------------------ */
/* Hooks                                                                */
/* ------------------------------------------------------------------ */

/** True once hydrated in a browser that allows motion; the server always renders the static version. */
export function useFullMotion() {
  return useSyncExternalStore(subscribeReducedMotion, prefersFullMotion, () => false);
}

/**
 * Re-applies the document flags after hydration (Strict Mode resets <html>) and keeps
 * data-motion in sync if the OS setting changes mid-visit, so motion-only CSS (like
 * the hidden-until-revealed headline) switches off with the scenes. data-intro is left
 * alone on change: re-deriving it could raise the intro overlay over a page in use.
 * Options are read once.
 */
export function useDocumentFlags(options?: FlagOptions) {
  const initial = useRef(options);
  useLayoutEffect(() => {
    applyDocumentFlags(initial.current);
    return subscribeReducedMotion(() => {
      document.documentElement.dataset.motion = prefersFullMotion() ? "full" : "reduce";
    });
  }, []);
}

/** Starts Lenis + every scene in full-motion mode and tears them down on unmount. */
export function useMotionScenes(scenes: Scene[], options?: RuntimeOptions) {
  const fullMotion = useFullMotion();
  useEffect(() => {
    if (!fullMotion) return;
    return startMotion(scenes, options);
  }, [fullMotion, scenes, options]);
}

export function useSpotlight(selector = ".glass") {
  useEffect(() => trackSpotlight(selector), [selector]);
}

/** Holds the page scroll while `active` (menus, modals, palettes). */
export function useScrollHold(active: boolean) {
  useEffect(() => {
    if (!active) return;
    return holdScroll();
  }, [active]);
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribeTheme, getTheme, () => "dark");
}

/** Id of the section crossing the middle band of the viewport. */
export function useActiveSection(ids: string[], rootMargin = "-45% 0px -50% 0px") {
  const [active, setActive] = useState("");
  const key = ids.join(" ");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin },
    );
    key.split(" ").forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [key, rootMargin]);
  return active;
}

/**
 * `scrolled` past a small threshold; `hidden` after moving down past `hideAfter`,
 * shown again on any upward move. Sub-2px moves (smooth-scroll inertia tailing off)
 * keep the current state instead of flickering the bar back in.
 */
export function useScrollDirection({ threshold = 40, hideAfter = 480 } = {}) {
  const [state, setState] = useState({ scrolled: false, hidden: false });
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const down = y > last + 2;
      const up = y < last - 2;
      last = y;
      setState((prev) => {
        const hidden = up ? false : down && y > hideAfter ? true : prev.hidden;
        const scrolled = y > threshold;
        return hidden === prev.hidden && scrolled === prev.scrolled ? prev : { scrolled, hidden };
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, hideAfter]);
  return state;
}

/**
 * Slides an indicator under whichever child of the container matches `selector`
 * (e.g. `a[href="#work"]`), and hides it when nothing matches. Attach the returned
 * refs to the link group and to the indicator element inside it.
 */
export function useSlidingIndicator<C extends HTMLElement = HTMLElement, I extends HTMLElement = HTMLSpanElement>(
  selector: string | null,
): { containerRef: RefObject<C | null>; indicatorRef: RefObject<I | null> } {
  const containerRef = useRef<C>(null);
  const indicatorRef = useRef<I>(null);
  useEffect(() => {
    const bar = indicatorRef.current;
    if (!bar) return;
    const target = selector ? containerRef.current?.querySelector<HTMLElement>(selector) : null;
    if (!target) {
      bar.style.opacity = "0";
      return;
    }
    bar.style.opacity = "1";
    bar.style.width = `${target.offsetWidth}px`;
    bar.style.transform = `translateX(${target.offsetLeft}px)`;
  }, [selector]);
  return { containerRef, indicatorRef };
}

/* ------------------------------------------------------------------ */
/* Components                                                           */
/* ------------------------------------------------------------------ */

interface MotionRootProps {
  scenes: Scene[];
  flags?: FlagOptions;
  runtime?: RuntimeOptions;
  /** Selector for cursor-glow cards; null to disable. */
  spotlight?: string | null;
  children: ReactNode;
}

/** One-stop mount: flags, scroll scenes, and the card spotlight. */
export function MotionRoot({ scenes, flags, runtime, spotlight = ".glass", children }: MotionRootProps) {
  useDocumentFlags(flags);
  useMotionScenes(scenes, runtime);
  useEffect(() => (spotlight ? trackSpotlight(spotlight) : undefined), [spotlight]);
  return <>{children}</>;
}

/** Mounts the particle field in full-motion mode only. Options are read once. */
export function ParticleCanvas({ className = "signal-canvas", ...options }: ParticleFieldOptions & { className?: string }) {
  const fullMotion = useFullMotion();
  const ref = useRef<HTMLCanvasElement>(null);
  const initial = useRef(options);
  useEffect(() => {
    const canvas = ref.current;
    if (!fullMotion || !canvas) return;
    return createParticleField(canvas, initial.current);
  }, [fullMotion]);
  if (!fullMotion) return null;
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

interface SplitCharsProps {
  text: string;
  as?: ElementType;
  className?: string;
  charClassName?: string;
}

/**
 * Text pre-split into character spans on the server, so it renders without JS and
 * scenes can animate the spans. Screen readers get the whole string once.
 */
export function SplitChars({ text, as: Tag = "span", className, charClassName = "split-char" }: SplitCharsProps) {
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      {toChars(text).map((ch, i) => (
        <span className={charClassName} aria-hidden="true" key={i}>
          {ch}
        </span>
      ))}
    </Tag>
  );
}

interface DecodeTextProps {
  text: string;
  /** False on first render so the initial value isn't scrambled; true after a user-driven change. */
  animate: boolean;
  as?: ElementType;
  className?: string;
  duration?: number;
}

/** Text that resolves out of random glyphs whenever `text` changes. */
export function DecodeText({ text, animate, as: Tag = "span", className, duration }: DecodeTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !animate) return;
    return decodeText(el, text, { duration });
  }, [animate, text, duration]);
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </Tag>
  );
}

interface MarqueeProps {
  items: string[];
  direction?: 1 | -1;
  /** Seconds per loop at rest. */
  duration?: number;
  className?: string;
  itemClassName?: string;
}

/** Decorative ticker for velocityMarquees(); the row is rendered twice so -50% loops seamlessly. */
export function Marquee({ items, direction = 1, duration = 40, className = "marquee", itemClassName = "marquee-item" }: MarqueeProps) {
  const row = items.map((item, i) => (
    <span className={itemClassName} key={`${item}-${i}`}>
      {item}
    </span>
  ));
  return (
    <div className={className} data-direction={direction} data-duration={duration} aria-hidden="true">
      <div className="marquee-track">
        <div className="marquee-row">{row}</div>
        <div className="marquee-row">{row}</div>
      </div>
    </div>
  );
}

/**
 * The static half of a diagram formation: the same geometry diagramRecipe() feeds the
 * particles, drawn as SVG. In full motion it is a faint guide under the particles; in
 * reduced motion (or without JS) it is the whole figure. Labels fade in staggered.
 */
export function DiagramSvg({ diagram, className = "diagram" }: { diagram: Diagram; className?: string }) {
  return (
    <svg className={className} viewBox={`0 0 ${diagram.width} ${diagram.height}`} role="img" aria-label={diagram.description}>
      <g>
        {diagram.shapes.map((s, i) => {
          const tone = s.tone ? `shape shape-${s.tone}` : "shape";
          if (s.type === "line") return <line key={i} className={tone} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />;
          if (s.type === "rect") return <rect key={i} className={tone} x={s.x} y={s.y} width={s.w} height={s.h} rx={4} />;
          return <circle key={i} className={tone} cx={s.cx} cy={s.cy} r={s.r} />;
        })}
      </g>
      <g>
        {diagram.labels.map((label, i) => (
          <text
            key={i}
            x={label.x}
            y={label.y}
            textAnchor={label.anchor ?? "start"}
            className={label.size === "lg" ? "diagram-label diagram-label-lg" : "diagram-label"}
            style={{ animationDelay: `${0.35 + i * 0.05}s` }}
          >
            {label.text}
          </text>
        ))}
      </g>
    </svg>
  );
}

/** Corner brackets that frame a particle anchor. */
export function HudFrame() {
  return (
    <span className="hud" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

interface ThemeToggleProps {
  className?: string;
  /** Icon for the current theme, e.g. a sun while dark. */
  icon: (theme: Theme) => ReactNode;
  /** Must match FlagOptions.themeKey if you changed it. */
  storageKey?: string;
}

/** Theme switch whose circular reveal grows from the button itself. */
export function ThemeToggle({ className, icon, storageKey }: ThemeToggleProps) {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      className={className}
      onClick={(e) => toggleTheme({ origin: centerOf(e.currentTarget), storageKey })}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      {icon(theme)}
    </button>
  );
}

interface TitleSequenceProps {
  words: IntroWord[];
  beat?: number;
  /** Small uppercase lines in the top corners. */
  hud?: [string, string];
  shutters?: number;
  rules?: number;
  skipLabel?: string;
  /** Must match FlagOptions.introKey if you changed it. */
  introKey?: string;
}

/** Once-per-session kinetic intro. Renders nothing unless data-intro="on". */
export function TitleSequence({ words, beat, hud = ["", ""], shutters = 6, rules = 4, skipLabel = "Skip intro", introKey }: TitleSequenceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return playTitleSequence(el, { words, beat, introKey, onComplete: () => setDone(true) });
  }, [words, beat, introKey]);

  if (done) return null;

  return (
    <div ref={ref} className="intro" style={{ "--shutters": shutters, "--rules": rules } as CSSProperties}>
      <div className="intro-shutters" aria-hidden="true">
        {Array.from({ length: shutters }, (_, i) => (
          <span className="intro-shutter" key={i} />
        ))}
      </div>
      <div className="intro-plate" aria-hidden="true" />
      <div className="intro-rules" aria-hidden="true">
        {Array.from({ length: rules }, (_, i) => (
          <span className="intro-rule" key={i} />
        ))}
      </div>
      <div className="intro-hud">
        <span>{hud[0]}</span>
        <span>{hud[1]}</span>
        <span className="intro-count" aria-hidden="true">
          000
        </span>
        <button type="button" className="intro-skip">
          {skipLabel} <span aria-hidden="true">↵</span>
        </button>
      </div>
      <div className="intro-stage" aria-hidden="true">
        {words.map((word) => (
          <div className="intro-word" key={word.text}>
            <span className="intro-line">
              {toChars(word.text).map((ch, i) => (
                <span className="intro-char" key={i}>
                  {ch}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
