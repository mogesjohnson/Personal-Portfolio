"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, GitBranch, Mail, CornerDownLeft, FolderGit2, Briefcase, Wrench, User, ExternalLink, SunMoon, Clapperboard } from "lucide-react";
import { externalPages } from "@/data/externalPages";
import { personalInfo } from "@/data/portfolio";
import { scrollToSection } from "@/components/live/scroll";
import { toggleTheme } from "@/components/live/theme";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenResume }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigateTo = (elementId: string) => {
    onClose();
    scrollToSection(elementId);
  };

  const actions = [
    {
      id: "resume",
      title: "View & Download Resume / CV",
      category: "Documents",
      keywords: "",
      icon: FileText,
      run: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: "work",
      title: "Explore selected work",
      category: "Navigation",
      icon: FolderGit2,
      run: () => navigateTo("work"),
    },
    ...externalPages.map((page) => ({
      id: page.id,
      title: page.command,
      category: "Navigation",
      keywords: page.keywords,
      icon: FolderGit2,
      run: () => {
        onClose();
        router.push(page.href);
      },
    })),
    {
      id: "experience",
      title: "View Work Experience & Timeline",
      category: "Navigation",
      icon: Briefcase,
      run: () => navigateTo("experience"),
    },
    {
      id: "stack",
      title: "Inspect Technical Stack & Skills",
      category: "Navigation",
      icon: Wrench,
      run: () => navigateTo("stack"),
    },
    {
      id: "about",
      title: "Read Engineering Philosophy & Bio",
      category: "Navigation",
      icon: User,
      run: () => navigateTo("about"),
    },
    {
      id: "contact",
      title: "Get in Touch",
      category: "Outreach",
      icon: Mail,
      run: () => navigateTo("contact"),
    },
    {
      id: "theme",
      title: "Toggle Theme (Light / Dark)",
      category: "Preferences",
      icon: SunMoon,
      run: () => {
        onClose();
        toggleTheme();
      },
    },
    {
      id: "intro",
      title: "Replay the Live Motion Intro",
      category: "Preferences",
      icon: Clapperboard,
      run: () => {
        try {
          sessionStorage.removeItem("mj-intro");
        } catch {}
        window.scrollTo(0, 0);
        window.location.reload();
      },
    },
    {
      id: "github",
      title: "Visit GitHub Profile & Code Repositories",
      category: "External",
      icon: GitBranch,
      run: () => {
        onClose();
        window.open(personalInfo.socialLinks.github, "_blank");
      },
    },
    {
      id: "linkedin",
      title: "Visit LinkedIn Profile & Experience",
      category: "External",
      icon: ExternalLink,
      run: () => {
        onClose();
        window.open(personalInfo.socialLinks.linkedin, "_blank");
      },
    },
  ];

  const filtered = query.trim()
    ? actions.filter((action) => {
        const haystack = `${action.title} ${action.category} ${"keywords" in action ? action.keywords : ""}`.toLowerCase();
        return haystack.includes(query.toLowerCase());
      })
    : actions;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].run();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filtered, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      data-lenis-prevent
      className="palette-dialog fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 sm:pt-28"
      onClick={onClose}
    >
      <div
        className="palette-panel w-full max-w-xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="palette-search">
          <Search className="palette-icon" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or jump to section..."
            className="palette-input"
          />
          <kbd className="palette-kbd">ESC</kbd>
        </div>

        <div className="palette-list">
          {filtered.length === 0 ? (
            <div className="palette-empty">No matching commands found.</div>
          ) : (
            filtered.map((action, idx) => {
              const Icon = action.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={action.run}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={isSelected ? "palette-row is-selected" : "palette-row"}
                >
                  <span className="palette-row-main">
                    <Icon className="palette-icon" />
                    <span>{action.title}</span>
                  </span>
                  <span className="palette-row-meta">
                    <span className="palette-meta">{action.category}</span>
                    {isSelected && <CornerDownLeft className="palette-icon" />}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="palette-foot">
          <span>Navigate with &uarr; &darr;</span>
          <span>Select with Enter &crarr;</span>
        </div>
      </div>
    </div>
  );
}
