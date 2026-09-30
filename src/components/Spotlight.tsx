"use client";

import { useEffect } from "react";

/** Feeds cursor position to `.card` elements so their hover glow follows the pointer. */
export default function Spotlight() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(".card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
