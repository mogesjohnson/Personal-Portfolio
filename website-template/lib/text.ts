/**
 * Text effects that don't need GSAP.
 */

export const DECODE_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_=+#";

export interface DecodeOptions {
  /** Milliseconds until every character has settled. */
  duration?: number;
  glyphs?: string;
}

/**
 * Settles `text` into `el` left to right; unsettled positions flicker through random
 * glyphs. Spaces stay spaces so word shapes read early. Returns a cancel function that
 * leaves the final text in place.
 *
 * Write into an aria-hidden element and keep the real text in an sr-only sibling,
 * otherwise screen readers announce the noise.
 */
export function decodeText(el: HTMLElement, text: string, { duration = 650, glyphs = DECODE_GLYPHS }: DecodeOptions = {}): () => void {
  if (document.documentElement.dataset.motion === "reduce") {
    el.textContent = text;
    return () => {};
  }
  const start = performance.now();
  let frame = 0;
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const settled = Math.floor(p * text.length);
    let out = text.slice(0, settled);
    for (let i = settled; i < text.length; i++) {
      out += text[i] === " " ? " " : glyphs[Math.floor(Math.random() * glyphs.length)];
    }
    el.textContent = out;
    if (p < 1) frame = requestAnimationFrame(step);
  };
  frame = requestAnimationFrame(step);
  return () => {
    cancelAnimationFrame(frame);
    el.textContent = text;
  };
}

/** Splits text into characters, swapping spaces for no-break spaces so inline-block spans keep their width. */
export function toChars(text: string): string[] {
  return [...text].map((ch) => (ch === " " ? " " : ch));
}

/**
 * Counts a number up (or down) over `duration` ms with an ease-out curve, writing
 * `format(value)` into `el`. Returns a cancel function.
 */
export function countTo(el: HTMLElement, to: number, { from = 0, duration = 1200, format = (n: number) => String(Math.round(n)) } = {}): () => void {
  if (document.documentElement.dataset.motion === "reduce") {
    el.textContent = format(to);
    return () => {};
  }
  const start = performance.now();
  let frame = 0;
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = format(from + (to - from) * eased);
    if (p < 1) frame = requestAnimationFrame(step);
  };
  frame = requestAnimationFrame(step);
  return () => {
    cancelAnimationFrame(frame);
    el.textContent = format(to);
  };
}
