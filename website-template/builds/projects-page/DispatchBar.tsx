"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { externalPages } from "../../../src/data/externalPages";
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

function indexLabel(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function DispatchBar({ current = "/projects", mark = "AI-first work" }: { current?: string; mark?: string }) {
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
          <p>{mark}</p>
          <ThemeToggle />
          <button
            type="button"
            className="nav-icon nav-burger dispatch-burger"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="dispatch-menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div id="dispatch-menu" className={cls("menu", "dispatch-menu", open && "is-open")} inert={!open}>
        <nav aria-label="Pages">
          <p className="menu-label menu-group-start">Main website</p>
          {MAIN_SECTIONS.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} style={{ "--i": index } as React.CSSProperties}>
              <span>{indexLabel(index)}</span>
              {item.label}
            </a>
          ))}
          <p className="menu-label">External site pages</p>
          {externalPages.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href === current ? "page" : undefined}
              onClick={() => setOpen(false)}
              style={{ "--i": index } as React.CSSProperties}
            >
              <span>{indexLabel(index)}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
