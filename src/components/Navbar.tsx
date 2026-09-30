"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { personalInfo } from "@/data/portfolio";
import { FileText, Command, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
}

export default function Navbar({ onOpenResume, onOpenCommandPalette }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [active, setActive] = useState<string>("");

  const navLinks = [
    { label: "projects", href: "#projects" },
    { label: "experience", href: "#experience" },
    { label: "stack", href: "#stack" },
    { label: "about", href: "#about" },
    { label: "now", href: "#now" },
    { label: "contact", href: "#contact" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ["projects", "experience", "stack", "about", "now", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--background)]/85 border-b border-slate-200/60 dark:border-slate-800/60 transition-colors">
      <div className="scroll-progress absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-500 to-sky-500" aria-hidden="true" />
      <div className="mx-auto max-w-4xl px-6 py-3.5 flex items-center justify-between text-xs font-mono">
        {/* Brand */}
        <Link
          href="/"
          className="font-bold text-slate-900 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors tracking-tight text-sm flex items-center gap-1.5"
        >
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span>{personalInfo.name.toLowerCase().replace(" ", "")}</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-5 text-slate-600 dark:text-slate-400">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href.slice(1) ? "true" : undefined}
              className={`transition-colors ${
                active === link.href.slice(1)
                  ? "text-amber-600 dark:text-amber-400 font-semibold"
                  : "hover:text-slate-950 dark:hover:text-slate-100"
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Command Palette Trigger */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1 px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            title="Open command palette (Cmd+K)"
          >
            <Command className="h-3 w-3" />
            <span>K</span>
          </button>

          {/* Resume Button */}
          <button
            type="button"
            onClick={onOpenResume}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md btn-primary text-slate-950 font-bold transition-all shadow-sm"
          >
            <FileText className="h-3 w-3" />
            <span>Resume</span>
          </button>

          {/* Theme Switcher */}
          <div className="pl-1 border-l border-slate-200 dark:border-slate-800">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenResume}
            className="px-2 py-1 rounded bg-amber-400 text-slate-950 font-bold text-[11px]"
          >
            Resume
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 px-6 py-4 font-mono text-xs space-y-3">
          <nav className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-slate-700 dark:text-slate-300 hover:text-amber-500 font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400"
              >
                <Command className="h-3.5 w-3.5" />
                <span>Command Palette (Cmd+K)</span>
              </button>
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="text-slate-600 dark:text-slate-400"
              >
                github ↗
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
