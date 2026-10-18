import Image, { type StaticImageData } from "next/image";
import { Play } from "lucide-react";

/**
 * The "Demo video" block at the bottom of a project detail page.
 *
 * Each page passes a `DemoVideoSource` from its own `demo.ts`. To publish a demo,
 * set ONE field there:
 *   file:  a path under /public, e.g. "/videos/replay-studio-demo.mp4"
 *          (put the file at public/videos/replay-studio-demo.mp4). Plays in a native <video>.
 *   embed: a YouTube link in any common form (watch?v=, youtu.be/, /shorts/, /embed/),
 *          which is played through youtube-nocookie.com, or any other https player URL
 *          (e.g. Vimeo's player.vimeo.com/video/<id>), used as the iframe src as is.
 * With both left null the block shows the "Demo coming soon" state. Nothing else changes.
 */
export type DemoVideoSource = {
  file: string | null;
  embed: string | null;
  /** Accessible title for the player, e.g. "REPLAY Studio demo". */
  title: string;
  /** Optional poster frame for `file`: a static import or a /public path. */
  poster?: StaticImageData | string | null;
};

const YOUTUBE_ID = /^[\w-]{11}$/;

function embedSrc(url: string): string | null {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  if (u.protocol !== "https:") return null;
  const host = u.hostname.replace(/^www\.|^m\./, "");
  let id: string | null = null;
  if (host === "youtu.be") id = u.pathname.slice(1);
  else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    id = u.searchParams.get("v") ?? u.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1] ?? null;
  }
  if (id && YOUTUBE_ID.test(id)) return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
  return u.toString();
}

export function DemoVideo({
  video,
  chrome,
  figure,
  backdrop,
  caption,
}: {
  video: DemoVideoSource;
  /** Label in the window bar, e.g. "replay-studio · demo.mp4". */
  chrome: string;
  figure: string;
  /** A real screenshot, dimmed behind the "coming soon" state. */
  backdrop: StaticImageData;
  caption: string;
}) {
  const iframe = !video.file && video.embed ? embedSrc(video.embed) : null;
  const poster = typeof video.poster === "string" ? video.poster : video.poster?.src;
  const live = Boolean(video.file || iframe);

  return (
    <figure className="pd-shot pd-video glass" data-reveal data-state={live ? "live" : "soon"}>
      <div className="pd-shot-bar" aria-hidden="true">
        <span className="pd-dots">
          <i />
          <i />
          <i />
        </span>
        <span>{chrome}</span>
        <span>{figure}</span>
      </div>
      <div className="pd-shot-frame">
        <div className="pd-video-stage">
          {video.file ? (
            <video controls preload="metadata" playsInline poster={poster} aria-label={video.title}>
              <source src={video.file} type="video/mp4" />
              Your browser can’t play this video. <a href={video.file}>Download the MP4</a>.
            </video>
          ) : iframe ? (
            <iframe
              src={iframe}
              title={video.title}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="pd-video-soon">
              <Image src={backdrop} alt="" aria-hidden="true" sizes="(max-width: 900px) 100vw, 72rem" loading="lazy" />
              <div className="pd-video-center">
                <span className="pd-video-play" aria-hidden="true">
                  <Play size={26} strokeWidth={1.6} />
                </span>
                <p className="pd-video-title">Demo coming soon</p>
                <p className="pd-video-sub">The walkthrough isn’t published yet. Until then, the screens above show the real app.</p>
              </div>
              <div className="pd-video-controls" aria-hidden="true">
                <span className="pd-video-rec">
                  <i /> Standby
                </span>
                <span className="pd-video-track">
                  <i />
                </span>
                <span>--:-- / --:--</span>
              </div>
            </div>
          )}
        </div>
        <span className="pd-hud" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
      <figcaption>
        <span>{figure}</span>
        {live ? caption : "No demo video yet."}
      </figcaption>
    </figure>
  );
}
