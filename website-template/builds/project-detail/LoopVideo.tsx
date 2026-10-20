"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * A short silent demo loop: muted, loop, playsInline, with a poster. It plays only
 * while at least a quarter of it is on screen, so it starts when the reader
 * arrives and costs nothing above the fold. Visitors who ask for reduced motion
 * get the poster and a play button instead of autoplay. A pause button is always
 * available (WCAG 2.2.2, Pause, Stop, Hide), and a reader's pause sticks.
 */
export function LoopVideo({ mp4, webm, poster, title }: { mp4: string; webm?: string | null; poster?: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const heldByReader = useRef(false);
  const inView = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (heldByReader.current) return;
        if (entry.isIntersecting) video.play().catch(() => setPlaying(false));
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // A browser that picks the WebM and then fails to decode it (seen with hardware VP9
  // in headless Chrome) does not try the next <source>. Fall back to the MP4 by hand.
  const onError = () => {
    const video = ref.current;
    if (!video || !webm || !video.currentSrc.endsWith(".webm")) return;
    video.src = mp4;
    video.load();
    if (inView.current && !heldByReader.current) video.play().catch(() => setPlaying(false));
  };

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    heldByReader.current = !video.paused;
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
        onError={onError}
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
