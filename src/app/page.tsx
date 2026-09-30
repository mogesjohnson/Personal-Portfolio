"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import About from "@/components/About";
import NowSection from "@/components/NowSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ResumeModal from "@/components/ResumeModal";
import CommandPalette from "@/components/CommandPalette";
import Spotlight from "@/components/Spotlight";

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      <div className="mx-auto max-w-4xl px-6 flex flex-col gap-10">
        <main className="flex flex-col gap-10">
          <Hero onOpenResume={() => setResumeOpen(true)} />
          <Projects />
          <Experience />
          <Skills />
          <About />
          <NowSection />
          <Contact />
        </main>
        <Footer />
      </div>

      <Spotlight />

      {/* Global Modals */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenResume={() => setResumeOpen(true)}
      />
    </div>
  );
}
