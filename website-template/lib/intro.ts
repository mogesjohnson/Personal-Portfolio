import { gsap } from "gsap";
import { DEFAULT_FLAG_OPTIONS, INTRO_DONE_EVENT, markIntroSeen } from "./flags";

/**
 * Title sequence: kinetic words hard-cut across colour plates on a steady beat, a
 * counter runs to 100, then shutters lift to hand off to the page. Plays once per
 * session, is skippable with any key, click, wheel or touch, and never starts unless
 * data-intro="on" (which the flags script never sets for reduced-motion visitors).
 *
 * Expected markup (see connectors/react.tsx <TitleSequence>):
 *   .intro
 *     .intro-shutters > .intro-shutter × n
 *     .intro-plate
 *     .intro-rules > .intro-rule × n
 *     .intro-hud > … .intro-count
 *     .intro-stage > .intro-word × words > .intro-line > .intro-char × chars
 */

export interface IntroWord {
  text: string;
  /** Plate colour while this word is on screen. */
  bg: string;
  fg: string;
}

export interface TitleSequenceOptions {
  words: IntroWord[];
  /** Seconds each word holds. 0.3 reads as a confident cut; above 0.45 it starts to drag. */
  beat?: number;
  /** Seconds before the first word. */
  lead?: number;
  /** Seconds the last word holds before the exit. */
  hold?: number;
  introKey?: string;
  introEvent?: string;
  /** Called once the shutters have fully lifted. */
  onComplete?: () => void;
}

const SCROLL_KEYS = [" ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"];

export function playTitleSequence(el: HTMLElement, options: TitleSequenceOptions): () => void {
  const { words, beat = 0.3, lead = 0.3, hold = 0.45, introKey = DEFAULT_FLAG_OPTIONS.introKey, introEvent = INTRO_DONE_EVENT, onComplete } = options;
  const root = document.documentElement;
  if (root.dataset.intro !== "on") return () => {};

  const exitAt = lead + words.length * beat + hold;
  el.style.animation = "none"; // JS is driving now; cancel the CSS failsafe
  root.classList.add("intro-lock");
  const q = gsap.utils.selector(el);
  const counter = q(".intro-count")[0] as HTMLElement | undefined;
  const count = { value: 0 };

  let handedOff = false;
  const handOff = () => {
    if (handedOff) return;
    handedOff = true;
    root.classList.remove("intro-lock");
    // The page starts its entrance while the shutters are still lifting.
    window.dispatchEvent(new Event(introEvent));
  };

  const tl = gsap.timeline({
    onComplete: () => {
      markIntroSeen({ introKey });
      onComplete?.();
    },
  });

  tl.fromTo(q(".intro-rule"), { scaleY: 0 }, { scaleY: 1, duration: 0.8, stagger: 0.06, ease: "expo.inOut" }, 0)
    .from(q(".intro-hud > *"), { yPercent: 120, autoAlpha: 0, duration: 0.6, stagger: 0.05, ease: "expo.out" }, 0.1)
    .to(
      count,
      {
        value: 100,
        duration: exitAt - 0.2,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counter) counter.textContent = String(Math.round(count.value)).padStart(3, "0");
        },
      },
      0.1,
    );

  q(".intro-word").forEach((word, i) => {
    const w = words[i];
    if (!w) return;
    const at = lead + i * beat;
    // Hard cuts: plates and words switch with set(), only the characters move.
    tl.set(el, { "--intro-bg": w.bg, "--intro-fg": w.fg }, at)
      .set(word, { autoAlpha: 1 }, at)
      .fromTo(word.querySelectorAll(".intro-char"), { yPercent: 115 }, { yPercent: 0, duration: 0.5, stagger: 0.018, ease: "expo.out" }, at);
    if (i < words.length - 1) tl.set(word, { autoAlpha: 0 }, at + beat);
  });

  tl.addLabel("exit", exitAt)
    .call(handOff, undefined, "exit")
    .to(q(".intro-plate, .intro-stage, .intro-hud, .intro-rules"), { autoAlpha: 0, duration: 0.3, ease: "power2.out" }, "exit")
    .to(q(".intro-shutter"), { yPercent: -100, duration: 0.95, stagger: 0.055, ease: "expo.inOut" }, "exit");

  const skip = () => {
    if (tl.time() >= exitAt) return;
    handOff();
    tl.seek("exit", false);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Tab" || tl.time() >= exitAt) return;
    // Skipping shouldn't also jump the page a screen down.
    if (SCROLL_KEYS.includes(e.key)) e.preventDefault();
    skip();
  };
  window.addEventListener("keydown", onKey);
  window.addEventListener("wheel", skip, { passive: true });
  window.addEventListener("touchstart", skip, { passive: true });
  el.addEventListener("click", skip);

  return () => {
    tl.kill();
    root.classList.remove("intro-lock");
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("wheel", skip);
    window.removeEventListener("touchstart", skip);
    el.removeEventListener("click", skip);
  };
}
