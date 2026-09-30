import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { setLenis } from "./scroll";

gsap.registerPlugin(ScrollTrigger, SplitText);

const EXPO = "expo.out";

/**
 * Wires every scroll-linked scene on the page. Only called in full-motion mode;
 * returns a cleanup that reverts all splits, triggers, and listeners.
 */
export function initLiveMotion(): () => void {
  const root = document.documentElement;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const lenis = new Lenis({ lerp: 0.085, anchors: true, stopInertiaOnNavigate: true });
  setLenis(lenis);
  lenis.on("scroll", ScrollTrigger.update);
  const drive = (time: number) => lenis.raf(time * 1000);
  // Prioritised so Lenis moves the page before anything else reads scroll this frame.
  gsap.ticker.add(drive, false, true);
  gsap.ticker.lagSmoothing(0);

  const introPlaying = root.dataset.intro === "on";
  if (introPlaying) lenis.stop();

  const cleanups: (() => void)[] = [];
  const mm = gsap.matchMedia();
  const ctx = gsap.context(() => {});
  const teardown = () => {
    cleanups.forEach((fn) => fn());
    mm.revert();
    ctx.revert();
    gsap.ticker.remove(drive);
    lenis.destroy();
    setLenis(null);
  };

  try {
    ctx.add(() => {
      heroEntrance(introPlaying, () => lenis.start(), cleanups);
      eyebrowWipes();
      sectionTitles();
      throughLine();
      reveals();
      marquees(cleanups);
      parallax();
      footerWordmark();
      experienceTrack(mm);
    });
  } catch (error) {
    // Never leave the page half-animated: undo everything and show the static version.
    console.error("[live-motion] Scroll scenes failed to start; showing the static page.", error);
    teardown();
    root.dataset.motion = "reduce";
    return () => {};
  }

  if (finePointer) {
    cleanups.push(magnetic());
    cleanups.push(variableWeight());
  }

  // Fonts and late layout shift positions; recalculate once everything settles.
  document.fonts.ready.then(() => ScrollTrigger.refresh());

  return teardown;
}

/*
 * Note: one-shot reveals use toggleActions / idempotent callbacks instead of
 * `once: true`. A self-killing trigger that fires during a refresh (e.g. when the
 * page loads already scrolled to #contact) mutates ScrollTrigger's list mid-loop.
 */
const PLAY_ONCE = "play none play none"; // also plays when scrolled back into view from below

/* Hero: headline characters flip up once the title sequence hands off. */
function heroEntrance(waitForIntro: boolean, onStart: () => void, cleanups: (() => void)[]) {
  const title = document.querySelector<HTMLElement>(".hero-title");
  if (!title) return;
  const split = SplitText.create(title.querySelectorAll(".hero-line"), { type: "words,chars" });
  gsap.set(split.chars, { yPercent: 70, rotateX: -95, autoAlpha: 0, transformOrigin: "50% 100%", transformPerspective: 700 });
  gsap.set(".hero-reveal", { autoAlpha: 0, y: 28, animation: "none" });
  gsap.set(title, { visibility: "visible", animation: "none" });

  const play = () => {
    onStart();
    gsap
      .timeline()
      .to(split.chars, { yPercent: 0, rotateX: 0, autoAlpha: 1, duration: 1.15, stagger: 0.035, ease: EXPO })
      .to(".hero-reveal", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08, ease: EXPO }, 0.25);
  };

  if (waitForIntro) {
    window.addEventListener("live:intro-done", play, { once: true });
    cleanups.push(() => window.removeEventListener("live:intro-done", play));
  } else {
    play();
  }
}

/* Section labels: a colour bar wipes across and leaves the text behind. */
function eyebrowWipes() {
  gsap.utils.toArray<HTMLElement>(".eyebrow").forEach((el) => {
    const bar = el.querySelector(".wipe");
    const text = el.querySelectorAll(".eyebrow-index, .eyebrow-text");
    if (!bar) return;
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: "top 88%", toggleActions: PLAY_ONCE } })
      .set(text, { autoAlpha: 0 })
      .fromTo(bar, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.4, ease: "power3.in" })
      .set(text, { autoAlpha: 1 })
      .set(bar, { transformOrigin: "100% 50%" })
      .to(bar, { scaleX: 0, duration: 0.45, ease: "power3.out" });
  });
}

function sectionTitles() {
  gsap.utils.toArray<HTMLElement>(".section-title").forEach((el) => {
    const split = SplitText.create(el, { type: "words" });
    gsap.from(split.words, {
      yPercent: 60,
      rotate: 3,
      autoAlpha: 0,
      duration: 1.1,
      stagger: 0.07,
      ease: EXPO,
      scrollTrigger: { trigger: el, start: "top 86%", toggleActions: PLAY_ONCE },
    });
  });
}

/* The philosophy line lights up word by word as it scrolls through the viewport. */
function throughLine() {
  const quote = document.querySelector<HTMLElement>(".through-quote");
  if (!quote) return;
  const split = SplitText.create(quote, { type: "words" });
  gsap.fromTo(
    split.words,
    { opacity: 0.14 },
    {
      opacity: 1,
      stagger: 0.1,
      ease: "none",
      scrollTrigger: { trigger: quote, start: "top 78%", end: "bottom 48%", scrub: true },
    },
  );
}

function reveals() {
  const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
  gsap.set(items, { autoAlpha: 0, y: 44 });
  const show = (batch: Element[]) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.09, ease: EXPO, overwrite: true });
  ScrollTrigger.batch(items, {
    start: "top 90%",
    onEnter: (batch) => show(batch),
    onEnterBack: (batch) => show(batch),
  });
}

/* Marquees run forever, and scroll velocity speeds them up, reverses them, and skews them. */
function marquees(cleanups: (() => void)[]) {
  const loops = gsap.utils.toArray<HTMLElement>(".marquee").map((el) => {
    const track = el.querySelector<HTMLElement>(".marquee-track");
    const dir = Number(el.dataset.direction ?? 1) >= 0 ? 1 : -1;
    const tween = gsap.fromTo(
      track,
      { xPercent: dir > 0 ? 0 : -50 },
      { xPercent: dir > 0 ? -50 : 0, duration: Number(el.dataset.duration ?? 40), ease: "none", repeat: -1 },
    );
    tween.totalTime(tween.duration() * 200); // room to run backwards
    return { tween, track };
  });
  if (!loops.length) return;

  let direction = 1;
  let settle: gsap.core.Tween | null = null;
  const trigger = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate(self) {
      const v = self.getVelocity();
      if (self.direction !== direction) direction = self.direction;
      const boost = 1 + Math.min(Math.abs(v) / 350, 7);
      const skew = gsap.utils.clamp(-7, 7, v / -260);
      loops.forEach(({ tween, track }) => {
        gsap.to(tween, { timeScale: direction * boost, duration: 0.2, overwrite: true });
        gsap.to(track, { skewX: skew, duration: 0.3, overwrite: "auto" });
      });
      settle?.kill();
      settle = gsap.delayedCall(0.18, () => {
        loops.forEach(({ tween, track }) => {
          gsap.to(tween, { timeScale: direction, duration: 1.2, ease: "power2.out", overwrite: true });
          gsap.to(track, { skewX: 0, duration: 0.8, ease: "power3.out", overwrite: "auto" });
        });
      });
    },
  });
  cleanups.push(() => {
    trigger.kill();
    settle?.kill();
  });
}

function parallax() {
  gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
    const speed = Number(el.dataset.speed) || 0.3;
    gsap.fromTo(
      el,
      { y: () => speed * 140 },
      {
        y: () => speed * -140,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
      },
    );
  });
}

function footerWordmark() {
  const chars = gsap.utils.toArray<HTMLElement>(".footer-word .fw-char");
  if (!chars.length) return;
  gsap.from(chars, {
    yPercent: 100,
    duration: 1.2,
    stagger: 0.04,
    ease: EXPO,
    scrollTrigger: { trigger: ".footer-word", start: "top 95%", toggleActions: PLAY_ONCE },
  });
}

/* Experience: on wide screens the timeline pins and scrolls sideways. */
function experienceTrack(mm: gsap.MatchMedia) {
  const section = document.querySelector<HTMLElement>(".xp-pin");
  const track = section?.querySelector<HTMLElement>(".xp-track");
  const viewport = section?.querySelector<HTMLElement>(".xp-viewport");
  if (!section || !track || !viewport) return;
  const cards = gsap.utils.toArray<HTMLElement>(".xp-card", section);

  mm.add("(min-width: 1024px)", () => {
    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
    const slide = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    gsap.fromTo(
      ".xp-progress-fill",
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance()}`, scrub: true } },
    );
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { autoAlpha: 0.2, scale: 0.92, rotateY: -14 },
        {
          autoAlpha: 1,
          scale: 1,
          rotateY: 0,
          ease: "none",
          scrollTrigger: { trigger: card, containerAnimation: slide, start: "left 98%", end: "left 62%", scrub: true },
        },
      );
    });
  });

  mm.add("(max-width: 1023px)", () => {
    gsap.set(cards, { autoAlpha: 0, y: 40 });
    ScrollTrigger.batch(cards, {
      start: "top 90%",
      onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: EXPO }),
      onEnterBack: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: EXPO }),
    });
  });
}

/* Buttons marked data-magnetic lean toward the cursor and spring back. */
function magnetic() {
  const handlers = gsap.utils.toArray<HTMLElement>("[data-magnetic]").map((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.set(el, { x: 0, y: 0 });
    };
  });
  return () => handlers.forEach((off) => off());
}

/* Footer wordmark: letters near the cursor swell to a heavier weight of the variable face. */
function variableWeight() {
  const word = document.querySelector<HTMLElement>(".footer-word");
  if (!word) return () => {};
  const chars = Array.from(word.querySelectorAll<HTMLElement>(".fw-char"));
  let frame = 0;
  let px = 0;
  let py = 0;
  const update = () => {
    frame = 0;
    chars.forEach((ch) => {
      const r = ch.getBoundingClientRect();
      const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
      const t = Math.max(0, 1 - d / 320);
      ch.style.fontWeight = String(Math.round(250 + 650 * t * t));
    });
  };
  const move = (e: PointerEvent) => {
    px = e.clientX;
    py = e.clientY;
    if (!frame) frame = requestAnimationFrame(update);
  };
  const leave = () => chars.forEach((ch) => (ch.style.fontWeight = ""));
  word.addEventListener("pointermove", move);
  word.addEventListener("pointerleave", leave);
  return () => {
    cancelAnimationFrame(frame);
    word.removeEventListener("pointermove", move);
    word.removeEventListener("pointerleave", leave);
    leave();
  };
}
