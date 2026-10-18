import { batchReveal, scrubWords, splitHeadings } from "../../lib/scenes";
import type { Scene } from "../../lib/runtime";

/**
 * The calm score every detail page shares: the same three patterns /projects uses,
 * plus the page's own signature move. Call it at module scope in a client
 * component so the array stays stable across renders.
 */
export function detailScenes(signature: Scene[]): Scene[] {
  return [
    splitHeadings({ selector: ".pd .dispatch-title, .pd-hero-title", duration: 1.05, stagger: 0.06, rotate: 2 }),
    batchReveal({ selector: ".pd [data-reveal]", y: 28, duration: 0.9, stagger: 0.07 }),
    scrubWords({ selector: ".pd [data-scrub]", dim: 0.38, start: "top 80%", end: "bottom 52%" }),
    ...signature,
  ];
}
