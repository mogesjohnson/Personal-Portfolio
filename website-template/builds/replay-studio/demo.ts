import type { DemoVideoSource } from "../project-detail/DemoVideo";

/**
 * The demo video at the bottom of /replay-studio. Set ONE of `file` or `embed`; leave
 * both null to show the "Demo coming soon" placeholder.
 *
 *   file:  "/videos/replay-studio-demo.mp4"  -> put the MP4 at public/videos/replay-studio-demo.mp4
 *   embed: "https://www.youtube.com/watch?v=VIDEO_ID" (or youtu.be/…, /shorts/…, or any https player URL)
 *   poster (optional, file only): "/videos/replay-studio-demo.jpg"
 */
export const demo: DemoVideoSource = {
  file: "/videos/replay-studio-demo.mp4",
  webm: "/videos/replay-studio-demo.webm",
  embed: null,
  title: "REPLAY Studio demo loop",
  poster: "/videos/replay-studio-demo.jpg",
};
