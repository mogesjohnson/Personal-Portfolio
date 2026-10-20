import type { DemoVideoSource } from "../project-detail/DemoVideo";

/**
 * The demo video at the bottom of /switchyard. Set ONE of `file` or `embed`; leave
 * both null to show the "Demo coming soon" placeholder.
 *
 *   file:  "/videos/switchyard-demo.mp4"  -> put the MP4 at public/videos/switchyard-demo.mp4
 *   embed: "https://www.youtube.com/watch?v=VIDEO_ID" (or youtu.be/…, /shorts/…, or any https player URL)
 *   poster (optional, file only): "/videos/switchyard-demo.jpg"
 */
export const demo: DemoVideoSource = {
  file: "/videos/switchyard-demo.mp4",
  webm: "/videos/switchyard-demo.webm",
  embed: null,
  title: "Switchyard demo loop",
  poster: "/videos/switchyard-demo.jpg",
};
