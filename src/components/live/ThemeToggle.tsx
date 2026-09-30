"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { getTheme, subscribeTheme, toggleTheme } from "./theme";

export default function ThemeToggle({ className = "nav-icon" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "dark");
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      className={className}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
