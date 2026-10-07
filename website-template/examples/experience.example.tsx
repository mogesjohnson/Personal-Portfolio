"use client";

/**
 * Example client shell for a one-page site built on the template. It shows the markup
 * contract each scene in motion-system.json expects; the content is placeholder.
 * Render it from a server page.tsx: `export default function Page() { return <Experience />; }`
 */

import { useState } from "react";
import {
  DecodeText,
  DiagramSvg,
  HudFrame,
  Marquee,
  MotionRoot,
  ParticleCanvas,
  SplitChars,
  ThemeToggle,
  TitleSequence,
  useActiveSection,
  useScrollDirection,
  useScrollHold,
  useSlidingIndicator,
} from "../connectors/react";
import { scenesFromSpec } from "../connectors/registry";
import { scrollToTarget } from "../lib/scroll";
import { FLAGS, FORMATIONS, INTRO_WORDS, PALETTES, PIPELINE } from "./motion.config";

/* Module scope so the arrays are stable and effects don't restart on render. */
const SCENES = scenesFromSpec();
const SECTIONS = [
  { id: "features", label: "Features" },
  { id: "how", label: "How it works" },
  { id: "contact", label: "Contact" },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);
const FEATURES = ["Realtime", "Typed", "Edge-ready", "Observable"];

function Nav() {
  const active = useActiveSection(SECTION_IDS);
  const { scrolled, hidden } = useScrollDirection();
  const { containerRef, indicatorRef } = useSlidingIndicator<HTMLElement>(active ? `a[href="#${active}"]` : null);
  const [menuOpen, setMenuOpen] = useState(false);
  useScrollHold(menuOpen);

  return (
    <>
      <header className={["nav-auto", scrolled && "is-scrolled", hidden && !menuOpen && "is-hidden"].filter(Boolean).join(" ")}>
        <nav ref={containerRef} style={{ position: "relative", display: "flex" }} aria-label="Sections">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined}>
              {s.label}
            </a>
          ))}
          <span ref={indicatorRef} className="nav-indicator" aria-hidden="true" />
        </nav>
        <ThemeToggle storageKey={FLAGS.themeKey} icon={(theme) => (theme === "dark" ? "☀" : "☾")} />
        <button type="button" onClick={() => setMenuOpen((o) => !o)} aria-expanded={menuOpen} aria-controls="menu">
          Menu
        </button>
      </header>
      <div id="menu" className={menuOpen ? "reveal-overlay is-open" : "reveal-overlay"} inert={!menuOpen}>
        {SECTIONS.map((s, i) => (
          <a
            key={s.id}
            className="reveal-item"
            href={`#${s.id}`}
            style={{ "--i": i } as React.CSSProperties}
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              scrollToTarget(s.id);
            }}
          >
            {s.label}
          </a>
        ))}
      </div>
    </>
  );
}

function Features() {
  const [index, setIndex] = useState(0);
  const [switched, setSwitched] = useState(false);
  return (
    <section id="features" className="section">
      <p className="wipe-label">
        <span>02</span>
        <span>Features</span>
        <span className="wipe" aria-hidden="true" />
      </p>
      <h2 className="section-title">
        Built to <span className="hollow">move.</span>
      </h2>
      <div role="tablist" aria-label="Features">
        {FEATURES.map((f, i) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={index === i}
            className={index === i ? "rail-tab is-active" : "rail-tab"}
            onClick={() => {
              setIndex(i);
              setSwitched(true);
            }}
          >
            {f}
          </button>
        ))}
      </div>
      {/* Keyed remount replays the CSS entrance on every switch. */}
      <div className="enter-up" key={index} role="tabpanel">
        <DecodeText as="h3" text={FEATURES[index]} animate={switched} />
      </div>
      <Marquee items={FEATURES} duration={40} />
    </section>
  );
}

export default function Experience() {
  return (
    <MotionRoot scenes={SCENES} flags={FLAGS}>
      <ParticleCanvas formations={FORMATIONS} palettes={PALETTES} burstFrom="brand" />
      <TitleSequence words={INTRO_WORDS} hud={["Acme — Launch", "Motion / v1"]} introKey={FLAGS.introKey} />
      <div className="scroll-progress" aria-hidden="true" />
      <Nav />

      <main>
        <section className="hero">
          <h1 data-entrance="title">
            <span className="title-line">Ideas,</span>
            <span className="title-line hollow">in motion.</span>
          </h1>
          <p data-entrance="fade">A placeholder lede. Swap in your own copy.</p>
          {/* The wrapper fades in; the link inside is magnetic. Both tween `y`, so keep them on separate elements. */}
          <div data-entrance="fade">
            <a className="btn-shine" href="#features" data-magnetic>
              See features
            </a>
          </div>
          <div data-entrance="fade" style={{ position: "relative", aspectRatio: "1", maxWidth: 560 }} data-signal="brand">
            <HudFrame />
          </div>
          <p>
            <span className="live-only" data-signal-stat>
              Live signal
            </span>
            <span className="static-only">Static mode</span>
          </p>
        </section>

        <section className="statement">
          <p data-scrub>Good motion explains. It shows where things come from and where they go.</p>
          <span data-speed="0.35" aria-hidden="true">
            01
          </span>
        </section>

        <Features />

        <section id="how" className="section">
          <div style={{ position: "relative", aspectRatio: "640 / 420" }} data-signal="pipeline" data-reveal>
            <DiagramSvg diagram={PIPELINE} />
          </div>
          <div data-hscroll>
            <div className="h-progress" aria-hidden="true" style={{ height: 2 }}>
              <span className="h-progress-fill" />
            </div>
            <div className="h-viewport">
              <ol className="h-track">
                {["Ingest", "Transform", "Serve", "Observe"].map((step) => (
                  <li className="h-card glass" key={step}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div style={{ position: "relative", aspectRatio: "1", maxWidth: 420 }} data-signal="next" data-reveal>
            <HudFrame />
          </div>
          <a className="link-nudge" href="mailto:hello@example.com" data-magnetic>
            hello@example.com →
          </a>
        </section>
      </main>

      <footer>
        <SplitChars as="p" text="ACME" className="wordmark split-line" />
      </footer>
    </MotionRoot>
  );
}
