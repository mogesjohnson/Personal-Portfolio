# Moges Johnson — Portfolio

A personal portfolio for Moges Johnson, built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Live Motion (v3)

The site is built around one idea: a single living particle field that follows the reader down the page.

- **Signal field.** One full-screen Canvas 2D layer of ~1,900 particles (fewer on phones). Elements marked `data-signal="<formation>"` act as anchors. While one is on screen, the particles spring into its formation, fitted to the element's box: the MJ monogram in the hero, each project's diagram in the work section, and the contact mark at the end. Between anchors they drift through a flow field. The cursor pushes them around, and a click sends out a shockwave.
- **Title sequence.** A roughly two-second kinetic intro that hard-cuts words across colour plates, then lifts away to the hero. It plays once per session, and any key, click, or scroll skips it.
- **Scroll scenes.** GSAP ScrollTrigger and Lenis drive the headline reveals, a scrubbed word-by-word quote, velocity-reactive marquees, a pinned horizontal experience timeline, and a variable-weight footer wordmark.
- **Transitions.** The theme switch uses the View Transitions API as a circular reveal from the toggle. Project titles decode from noise when you switch projects.
- **Accessibility.** With `prefers-reduced-motion`, nothing animates. The particle field never mounts, and the diagrams render as static SVG from the same geometry. Without JavaScript the page renders fully and statically.

The field lowers its particle count automatically if the frame rate drops. The live count and FPS appear under the hero.

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The intro plays once per browser session. Use **Replay the Live Motion intro** in the command menu (`Ctrl+K` / `Cmd+K`) to see it again.

## Verify

```bash
npm run lint
npm run build
```

## Where things live

| Path | What it does |
| --- | --- |
| [`src/data/portfolio.ts`](src/data/portfolio.ts) | All content: projects, experience, education, skills, contact |
| [`src/components/live/LiveMotion.tsx`](src/components/live/LiveMotion.tsx) | Page composition and global state |
| [`src/components/live/SignalField.tsx`](src/components/live/SignalField.tsx) | The particle engine |
| [`src/components/live/formations.ts`](src/components/live/formations.ts) | Formation geometry, shared by the particles and the SVG fallback |
| [`src/components/live/motion.ts`](src/components/live/motion.ts) | Lenis + GSAP scroll choreography |
| [`src/components/live/IntroSequence.tsx`](src/components/live/IntroSequence.tsx) | Title sequence |
| [`src/components/live/flags.ts`](src/components/live/flags.ts) | Theme, motion, and intro flags set before first paint |
| [`src/app/globals.css`](src/app/globals.css) | Design tokens and styles |
