"use client";

import { useEffect, useLayoutEffect, useState, useSyncExternalStore } from "react";
import CommandPalette from "@/components/CommandPalette";
import ResumeModal from "@/components/ResumeModal";
import { applyDocumentFlags } from "./flags";
import HeroScene from "./HeroScene";
import IntroSequence from "./IntroSequence";
import { initLiveMotion } from "./motion";
import { lockScroll } from "./scroll";
import { AboutScene, ContactScene, ExperienceScene, SiteFooter, ThroughLine, ToolkitScene } from "./sections";
import SignalField from "./SignalField";
import SiteNav from "./SiteNav";
import WorkScene from "./WorkScene";

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** "full" once hydrated in a browser that allows motion; the server always renders the static version. */
function useFullMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => !window.matchMedia(REDUCE_QUERY).matches,
    () => false,
  );
}

/** Feeds the pointer position to glass cards so their glow follows the cursor. */
function useSpotlight() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(".glass");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
}

export default function LiveMotion() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const fullMotion = useFullMotion();

  useLayoutEffect(() => {
    applyDocumentFlags();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!fullMotion) return;
    return initLiveMotion();
  }, [fullMotion]);

  useEffect(() => {
    lockScroll(resumeOpen || paletteOpen);
  }, [resumeOpen, paletteOpen]);

  useSpotlight();

  const openResume = () => setResumeOpen(true);

  return (
    <div className="site" id="top">
      {fullMotion && <SignalField />}
      <IntroSequence />
      <div className="progress" aria-hidden="true" />

      <SiteNav onOpenResume={openResume} onOpenPalette={() => setPaletteOpen(true)} />

      <main>
        <HeroScene onOpenResume={openResume} />
        <ThroughLine />
        <WorkScene />
        <ExperienceScene />
        <AboutScene />
        <ToolkitScene />
        <ContactScene />
      </main>

      <SiteFooter />

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      {/* Mounted only while open so each opening starts with an empty search. */}
      {paletteOpen && <CommandPalette isOpen onClose={() => setPaletteOpen(false)} onOpenResume={openResume} />}
    </div>
  );
}
