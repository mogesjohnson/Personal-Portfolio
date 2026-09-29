"use client";

import { useEffect, useState } from "react";
import { Search, FileText, Sun, GitBranch, Mail, CornerDownLeft, FolderGit2, Briefcase, Wrench, User, ExternalLink } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenResume }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigateTo = (elementId: string) => {
    onClose();
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const actions = [
    {
      id: "resume",
      title: "View & Download Resume / CV",
      category: "Documents",
      icon: FileText,
      run: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: "projects",
      title: "Explore Projects & Architecture",
      category: "Navigation",
      icon: FolderGit2,
      run: () => navigateTo("projects"),
    },
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
      title: "Get in Touch / Send Message",
      category: "Outreach",
      icon: Mail,
      run: () => navigateTo("contact"),
    },
    {
      id: "theme",
      title: "Toggle Theme (Light / Dark)",
      category: "Preferences",
      icon: Sun,
      run: () => {
        onClose();
        const isDark = document.documentElement.classList.contains("dark");
        if (isDark) {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("mj-theme", "light");
        } else {
          document.documentElement.classList.add("dark");
          localStorage.setItem("mj-theme", "dark");
        }
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
    ? actions.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.category.toLowerCase().includes(query.toLowerCase())
      )
    : actions;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          setQuery("");
        }
      }

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
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/70 backdrop-blur-sm p-4 pt-20 sm:pt-28"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or jump to section..."
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none font-medium"
          />
          <kbd className="hidden sm:inline-block font-mono text-[10px] text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-700 px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-slate-500">
              No matching commands found.
            </div>
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
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left text-xs transition-colors ${
                    isSelected
                      ? "bg-amber-400 text-slate-950 font-bold shadow-sm"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isSelected ? "text-slate-950" : "text-slate-400"}`} />
                    <span>{action.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-[10px] uppercase tracking-wider ${isSelected ? "text-slate-800" : "text-slate-400"}`}>
                      {action.category}
                    </span>
                    {isSelected && <CornerDownLeft className="h-3 w-3 text-slate-950" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Navigate with &uarr; &darr;</span>
          <span>Select with Enter &crarr;</span>
        </div>
      </div>
    </div>
  );
}
