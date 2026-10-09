"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../../../src/components/live/ThemeToggle";
import { cls } from "../../../src/components/live/ui";
import { holdScroll } from "../../lib/scroll";

const MAIN_SECTIONS = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Toolkit", href: "/#stack" },
  { label: "Contact", href: "/#contact" },
];

export function DispatchBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const release = holdScroll();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      release();
    };
  }, [open]);

  return (
    <>
      <header className="dispatch-bar">
        <Link href="/">Main website</Link>
        <div className="dispatch-bar-end">
          <p>AI-first work</p>
          <ThemeToggle />
          <button
            type="button"
            className="nav-icon nav-burger dispatch-burger"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="projects-menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div id="projects-menu" className={cls("menu", "dispatch-menu", open && "is-open")} inert={!open}>
        <nav aria-label="Pages">
          <p className="menu-label menu-group-start">Main website</p>
          {MAIN_SECTIONS.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} style={{ "--i": index } as React.CSSProperties}>
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
          <p className="menu-label">External site pages</p>
          <Link href="/projects" aria-current="page" onClick={() => setOpen(false)} style={{ "--i": 0 } as React.CSSProperties}>
            <span>01</span>
            Projects
          </Link>
        </nav>
      </div>
    </>
  );
}
