"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Title sequence: kinetic words hard-cut across colour plates on a steady beat,
 * then shutters lift to hand off to the hero. Plays once per session, is skippable
 * with any key, click, or scroll, and never renders for reduced-motion visitors.
 */

const WORDS = [
  { text: "CURIOSITY", bg: "#07080c", fg: "#eceef2" },
  { text: "SYSTEMS", bg: "#fbbf24", fg: "#07080c" },
  { text: "ALGORITHMS", bg: "#38bdf8", fg: "#07080c" },
  { text: "APPLIED AI", bg: "#eceef2", fg: "#07080c" },
  { text: "ENGINEERED.", bg: "#07080c", fg: "#fbbf24" },
];

const BEAT = 0.3;
const EXIT_AT = 0.3 + WORDS.length * BEAT + 0.45;

export default function IntroSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const root = document.documentElement;
    if (!el || root.dataset.intro !== "on") return;

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
      window.dispatchEvent(new Event("live:intro-done"));
    };

    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem("mj-intro", "1");
        } catch {}
        root.dataset.intro = "done";
        setDone(true);
      },
    });

    tl.fromTo(q(".intro-rule"), { scaleY: 0 }, { scaleY: 1, duration: 0.8, stagger: 0.06, ease: "expo.inOut" }, 0)
      .from(q(".intro-hud > *"), { yPercent: 120, autoAlpha: 0, duration: 0.6, stagger: 0.05, ease: "expo.out" }, 0.1)
      .to(
        count,
        {
          value: 100,
          duration: EXIT_AT - 0.2,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter) counter.textContent = String(Math.round(count.value)).padStart(3, "0");
          },
        },
        0.1,
      );

    q(".intro-word").forEach((word, i) => {
      const at = 0.3 + i * BEAT;
      tl.set(el, { "--intro-bg": WORDS[i].bg, "--intro-fg": WORDS[i].fg }, at)
        .set(word, { autoAlpha: 1 }, at)
        .fromTo(word.querySelectorAll(".intro-char"), { yPercent: 115 }, { yPercent: 0, duration: 0.5, stagger: 0.018, ease: "expo.out" }, at);
      if (i < WORDS.length - 1) tl.set(word, { autoAlpha: 0 }, at + BEAT);
    });

    tl.addLabel("exit", EXIT_AT)
      .call(handOff, undefined, "exit")
      .to(q(".intro-plate, .intro-stage, .intro-hud, .intro-rules"), { autoAlpha: 0, duration: 0.3, ease: "power2.out" }, "exit")
      .to(q(".intro-shutter"), { yPercent: -100, duration: 0.95, stagger: 0.055, ease: "expo.inOut" }, "exit");

    const skip = () => {
      if (tl.time() >= EXIT_AT) return;
      handOff();
      tl.seek("exit", false);
    };
    const SCROLL_KEYS = [" ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"];
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab" || tl.time() >= EXIT_AT) return;
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
  }, []);

  if (done) return null;

  return (
    <div ref={ref} className="intro">
      <div className="intro-shutters" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <span className="intro-shutter" key={i} />
        ))}
      </div>
      <div className="intro-plate" aria-hidden="true" />
      <div className="intro-rules" aria-hidden="true">
        {Array.from({ length: 4 }, (_, i) => (
          <span className="intro-rule" key={i} />
        ))}
      </div>
      <div className="intro-hud">
        <span>Moges Johnson — Portfolio</span>
        <span>Live Motion / v3</span>
        <span className="intro-count" aria-hidden="true">
          000
        </span>
        <button type="button" className="intro-skip">
          Skip intro <span aria-hidden="true">↵</span>
        </button>
      </div>
      <div className="intro-stage" aria-hidden="true">
        {WORDS.map((word) => (
          <div className="intro-word" key={word.text}>
            <span className="intro-line">
              {[...word.text].map((ch, i) => (
                <span className="intro-char" key={i}>
                  {ch === " " ? " " : ch}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
