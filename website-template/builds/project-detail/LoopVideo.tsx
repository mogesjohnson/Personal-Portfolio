"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * A short silent demo loop: autoplay, muted, loop, playsInline, with a poster.
 * Visitors who ask for reduced motion get the poster and a play button instead of
 * autoplay. A pause button is always available (WCAG 2.2.2, Pause, Stop, Hide).
 */
export function LoopVideo({ mp4, webm, poster, title }: { mp4: string; webm?: string | null; poster?: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) video.play().catch(() => setPlaying(false));
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => setPlaying(false));
    else video.pause();
  };

  return (
    <>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={title}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {webm ? <source src={webm} type="video/webm" /> : null}
        <source src={mp4} type="video/mp4" />
      </video>
      <button type="button" className="pd-video-toggle" onClick={toggle} aria-label={playing ? `Pause ${title}` : `Play ${title}`}>
        {playing ? <Pause size={16} strokeWidth={1.8} aria-hidden="true" /> : <Play size={16} strokeWidth={1.8} aria-hidden="true" />}
        <span>{playing ? "Pause" : "Play"}</span>
      </button>
    </>
  );
}
