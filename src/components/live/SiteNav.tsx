"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Command, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { lockScroll } from "./scroll";
import { cls } from "./ui";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "stack", label: "Toolkit" },
  { id: "contact", label: "Contact" },
];

interface SiteNavProps {
  onOpenResume: () => void;
  onOpenPalette: () => void;
}

export default function SiteNav({ onOpenResume, onOpenPalette }: SiteNavProps) {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const linksRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // Highlight the section currently crossing the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["hero", ...LINKS.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Glass after the first scroll; tuck away while reading downward.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 480 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Slide the indicator under the active link.
  useEffect(() => {
    const indicator = indicatorRef.current;
    const link = linksRef.current?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!indicator) return;
    if (!link) {
      indicator.style.opacity = "0";
      return;
    }
    indicator.style.opacity = "1";
    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.transform = `translateX(${link.offsetLeft}px)`;
  }, [active]);

  useEffect(() => {
    lockScroll(menuOpen);
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header className={cls("nav", scrolled && "is-scrolled", hidden && !menuOpen && "is-hidden", menuOpen && "is-menu")}>
        <a href="#top" className="nav-brand" aria-label="Moges Johnson, back to top">
          <span className="nav-mark">
            MJ
            <i className="pip" />
          </span>
          <span className="nav-name">Moges Johnson</span>
        </a>

        <nav ref={linksRef} className="nav-links" aria-label="Sections">
          {LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? "true" : undefined}>
              {link.label}
            </a>
          ))}
          <span ref={indicatorRef} className="nav-indicator" aria-hidden="true" />
        </nav>

        <div className="nav-actions">
          <button type="button" className="nav-icon nav-command" onClick={onOpenPalette} aria-label="Open command menu" title="Command menu (Ctrl/⌘ K)">
            <Command size={14} />
            <kbd>K</kbd>
          </button>
          <ThemeToggle />
          <button type="button" className="btn btn-amber btn-sm nav-resume" onClick={onOpenResume}>
            Résumé <ArrowUpRight size={15} />
          </button>
          <button
            type="button"
            className="nav-icon nav-burger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={cls("menu", menuOpen && "is-open")} inert={!menuOpen}>
        <nav aria-label="Mobile">
          {LINKS.map((link, i) => (
            <a key={link.id} href={`#${link.id}`} onClick={() => setMenuOpen(false)} style={{ "--i": i } as React.CSSProperties}>
              <span>0{i + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="menu-foot">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onOpenPalette();
            }}
          >
            <Command size={15} /> Command menu
          </button>
          <ThemeToggle className="menu-theme" />
        </div>
      </div>
    </>
  );
}
