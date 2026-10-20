import type { DemoVideoSource } from "../project-detail/DemoVideo";

/** The look-then-look-again loop captured while TRACE drove the REPLAY preview. */
export const demo: DemoVideoSource = {
  file: "/videos/trace-workbench-demo.mp4",
  webm: "/videos/trace-workbench-demo.webm",
  embed: null,
  title: "TRACE changes the REPLAY canvas from Tide to Dusk",
  poster: "/videos/trace-workbench-demo.jpg",
};

/** A longer run on the same sample: new callout, typing, a drag, a scrub, then play. */
export const moreDemo: DemoVideoSource = {
  file: "/videos/trace-workbench-more.mp4",
  webm: "/videos/trace-workbench-more.webm",
  embed: null,
  title: "TRACE adds a text callout on the REPLAY sample, drags it, scrubs the timeline, and presses play",
  poster: "/videos/trace-workbench-more.jpg",
};
