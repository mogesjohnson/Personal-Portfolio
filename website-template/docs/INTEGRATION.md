# Integration — building a new site on the template

Target: a fresh Next.js 16 App Router project. The working, type-checked example lives in [`../examples/`](../examples/):

| File | What it shows |
| --- | --- |
| `examples/motion.config.ts` | Flags, a diagram, three formations (glyph, diagram, custom), palettes, intro words |
| `examples/layout.example.tsx` | `app/layout.tsx` with the pre-paint flags |
| `examples/experience.example.tsx` | A one-page client shell that uses every scene's markup contract |

## 1. Install and copy

```bash
npm i gsap lenis
cp -r path/to/website-template ./website-template
```

Add a path alias in `tsconfig.json` (the examples use relative imports; your app can use the alias):

```json
{ "compilerOptions": { "paths": { "@motion/*": ["./website-template/*"] } } }
```

## 2. CSS

`src/app/globals.css`:

```css
@import "tailwindcss";
@import "../../website-template/lib/styles/motion.css"; /* pulls in tokens.css */
```

To re-brand, edit `tokens` in `motion-system.json`, then:

```bash
node website-template/scripts/build-tokens.mjs
```

`motion.css` only styles the motion scaffolding. Typography and layout (`.section-title`, `.hero`, `.section`) are yours.

## 3. Layout: flags before paint

Follow `examples/layout.example.tsx`. Three things matter:

1. `{...htmlFlagProps(FLAGS)}` on `<html>`: server defaults (static, no intro) plus `suppressHydrationWarning`.
2. `<FlagsScript {...FLAGS} />` inside `<head>`: the inline script from `lib/flags.ts`. With a Content Security Policy, pass `nonce`.
3. `import "lenis/dist/lenis.css"` once.

This follows `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md`.

Use the **same `FLAGS` object** for `MotionRoot`, `TitleSequence introKey` and `ThemeToggle storageKey`. That's why it lives in `motion.config.ts`.

## 4. The client shell

```tsx
"use client";
const SCENES = scenesFromSpec(); // module scope

export default function Experience() {
  return (
    <MotionRoot scenes={SCENES} flags={FLAGS}>
      <ParticleCanvas formations={FORMATIONS} palettes={PALETTES} burstFrom="brand" />
      <TitleSequence words={INTRO_WORDS} introKey={FLAGS.introKey} />
      <div className="scroll-progress" aria-hidden="true" />
      {/* … sections … */}
    </MotionRoot>
  );
}
```

`MotionRoot` re-applies flags after hydration, keeps `data-motion` in sync with the OS setting, starts Lenis and every scene only in full-motion mode, tears everything down on unmount, and runs the card spotlight. `ParticleCanvas` mounts only in full motion.

To pick scenes per page:

```ts
scenesFromSpec(undefined, { except: ["pinned-horizontal-track"] });
scenesFromSpec(undefined, { overrides: { "batch-reveal": { y: 24, duration: 0.8 } } });
```

Or skip the JSON and compose directly:

```ts
import { batchReveal, splitHeadings } from "@motion/lib/scenes";
const SCENES = [splitHeadings({ selector: "h2" }), batchReveal()];
```

## 5. Markup contract

Each scene finds its elements by selector. These are the defaults in `motion-system.json`:

| Pattern | Markup |
| --- | --- |
| `hero-split-entrance` | `<h1 data-entrance="title"><span class="title-line">…</span>…</h1>`; supporting elements `data-entrance="fade"` |
| `eyebrow-wipe` | `<p class="wipe-label"><span>01</span><span>Label</span><span class="wipe" aria-hidden="true"></span></p>` |
| `section-heading-rise` | `<h2 class="section-title">` |
| `scrub-statement` | `<p data-scrub>` |
| `batch-reveal` | any element with `data-reveal` |
| `velocity-marquee` | `<Marquee items={…} direction={-1} duration={52} />` |
| `parallax-index` | any element with `data-speed="0.35"` (moves relative to its parent) |
| `wordmark-rise` + `variable-weight-proximity` | `<SplitChars as="p" text="NAME" className="wordmark split-line" />` |
| `pinned-horizontal-track` | `[data-hscroll] > .h-viewport > .h-track > .h-card`, optional `.h-progress-fill` |
| `magnetic-buttons` | `data-magnetic` (don't combine with `data-entrance` on the same element; both tween `y`) |
| particle anchor | `<div data-signal="key" style="aspect-ratio: …">` with a formation of that key |
| particle stats | `<span class="live-only" data-signal-stat>` |
| nested scroller | `data-lenis-prevent` on modals, palettes, code blocks |

## 6. Formations

Three ways to make one (all in `examples/motion.config.ts`):

```ts
// a) From text in the live web font
brand: defineFormation({
  width: 600, height: 600, share: 0.9, seed: 11,
  primitives: ({ glyph }) => [
    { weight: 60, make: glyphCloud(glyph("ACME", { fontSize: 170 })) },
    { weight: 17, make: spin(300, 300, 262, 0.07, 1, 64) },
  ],
}),

// b) From a diagram: the same object renders the static SVG via <DiagramSvg diagram={PIPELINE} />
pipeline: diagramRecipe(PIPELINE),

// c) By hand from primitives: segment, rectOutline, rectFill, ring, disc, spin, flow
next: defineFormation({ width: 600, height: 600, share: 0.7, primitives: () => [ … ] }),
```

Tips:
- `share` is the fraction of particles pulled in; below 1, the rest keep drifting, which keeps the page alive.
- Weights are relative; the longest strokes need the most.
- Glyph text must fit the 600×600 sampling square, so lower `fontSize` for longer words.
- Keep anchor boxes the same aspect ratio as the formation space, or it letterboxes.
- Give anchors a static fallback: `DiagramSvg`, or an SVG with `class="signal-static"` (shown only in reduced motion).

## 7. Overlays and navigation

- `useScrollHold(open)` in every overlay. Holds are reference counted, so a menu that opens a palette is safe.
- Navigate with `scrollToTarget(id)`; it works even while the closing overlay still holds the scroll.
- Nav: `useActiveSection(ids)`, `useSlidingIndicator(selector)`, `useScrollDirection()`; styles `.nav-auto`, `.nav-indicator`.
- Full-screen menu: `.reveal-overlay` with children `.reveal-item` and `style={{ "--i": index }}`. Set `--reveal-x / --reveal-y` to your trigger's position.
- Disclosure: `.collapse` + `.is-open` + `inert` while closed.
- Theme: `<ThemeToggle storageKey={FLAGS.themeKey} icon={(t) => …} />`; any other whole-page change can use `circularReveal(update, { origin })`.
- Replay the intro (e.g. from a command palette): `resetIntro(FLAGS); location.reload();`.

## 8. Before you ship

Walk `motion-system.json` → `qa.checklist`. The high-value checks:

- Reduced motion on: the page is complete, the pinned track scrolls horizontally, and nothing is hidden.
- JavaScript off: the headline appears within 3.5s and no overlay is stuck.
- Deep-link to every section id.
- Space / Escape / click / wheel skip the intro without jumping the page.
- Wheel-scroll inside every modal and code block.
- 4–6× CPU throttle: the particle count drops and FPS recovers.
- A real phone: no permanent hole after touch, no horizontal overflow.
