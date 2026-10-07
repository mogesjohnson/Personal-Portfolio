# Website motion template

A reusable motion system distilled from this portfolio's **Live Motion** redesign (PR #3): a pre-paint flag system, GSAP + Lenis scroll scenes, a Canvas 2D particle field that re-forms at each section, View Transitions, and a static fallback for every effect.

It is a **kit, not a clone**. The techniques and tuned numbers are kept. Every piece of the original content (name, copy, monogram, diagrams, intro words, colour plates) has become a parameter.

## What's here

```
website-template/
├── motion-system.json          The blueprint: 43 patterns, tokens, architecture, choreography,
│                               particle engine, accessibility, performance, gotchas, QA, recipes
├── motion-system.schema.json   JSON Schema for the blueprint (editor validation)
├── connectors/
│   ├── spec.ts                 Loads + validates the JSON, typed access
│   ├── registry.ts             JSON pattern → running GSAP scene (scenesFromSpec)
│   ├── react.tsx               Hooks + components (MotionRoot, ParticleCanvas, TitleSequence, …)
│   └── next.tsx                FlagsScript + htmlFlagProps for app/layout.tsx
├── lib/
│   ├── flags.ts                Pre-paint data-theme / data-motion / data-intro
│   ├── scroll.ts               Lenis handle, reference-counted scroll holds, scrollToTarget
│   ├── runtime.ts              startMotion(): Lenis on the GSAP ticker, context, teardown, fail-to-static
│   ├── scenes.ts               Scroll scenes (split entrance, wipes, scrub, batch, marquee, pin, parallax)
│   ├── pointer.ts              Magnetic, variable-weight proximity, card spotlight
│   ├── text.ts                 Decode-from-noise, count-up, char splitting
│   ├── theme.ts                Circular View Transition reveal, theme store
│   ├── intro.ts                Once-per-session kinetic title sequence
│   ├── particles/
│   │   ├── formations.ts       Primitives, seeded assembly, glyph sampling, diagram → particles
│   │   └── field.ts            The particle engine
│   └── styles/
│       ├── tokens.css          Generated from motion-system.json (don't edit)
│       └── motion.css          Transitions, keyframes, failsafes, reduced-motion, intro styles
├── examples/                   Type-checked starting point for a new site
│   ├── motion.config.ts        Flags, diagram, formations, palettes, intro words
│   ├── layout.example.tsx      app/layout.tsx with pre-paint flags
│   └── experience.example.tsx  One-page shell using every scene's markup contract
├── scripts/
│   ├── build-tokens.mjs        motion-system.json tokens → tokens.css
│   └── smoke.mjs               16 logic checks (spec, registry, formations, flags, text)
└── docs/
    ├── ANIMATION-AUDIT.md      How the live site uses animation and transitions, with findings
    ├── BUILD-HISTORY.md        How the site was made, from the git and PR record
    ├── CHOREOGRAPHY.md         The motion language: eases, durations, staggers, timing maps
    └── INTEGRATION.md          Wiring the kit into a new Next.js 16 app, step by step
```

## How the JSON connects to code

Every entry in `patterns` has a `connector`:

| `connector.kind` | What it means | Where it runs |
| --- | --- | --- |
| `scene` | Live-wired. `params` become the factory's options. | `connectors/registry.ts` → `lib/scenes.ts`, `lib/pointer.ts` |
| `css` | A class or rule in the CSS library | `lib/styles/motion.css` |
| `component` / `hook` | React building block | `connectors/react.tsx` |
| `lib` / `engine` | Framework-free function | `lib/*` |

So this is all it takes to run every scroll scene the JSON enables:

```tsx
// tsconfig paths: "@motion/*": ["./website-template/*"]
import { scenesFromSpec } from "@motion/connectors/registry";
import { MotionRoot } from "@motion/connectors/react";

const SCENES = scenesFromSpec(); // module scope: stable across renders
// …
<MotionRoot scenes={SCENES}>{page}</MotionRoot>
```

Change `"duration": 1.1` to `0.8` on `section-heading-rise` in the JSON and the headings speed up, with no code change. Set `"enabled": false` to drop a scene. Use `scenesFromSpec(spec, { only, except, overrides })` to choose per page.

Tokens work the same way: edit `tokens` in the JSON, then run

```bash
node website-template/scripts/build-tokens.mjs
```

## Dependencies

Same as the reference site: `gsap@^3.15`, `lenis@^1.3`, `react@19`, `next@16`. Import `lenis/dist/lenis.css` once.

## Verified

- `npx tsc --noEmit` and `npx eslint website-template`: clean, including `examples/` (the root tsconfig includes this folder, so the site's own type-check covers it).
- `npm run build`: the site still builds with the folder in the tree.
- `node website-template/scripts/smoke.mjs` runs 16 checks covering spec loading and validation, every scene pattern resolving to a factory, missing-param errors, formation determinism and counts, polyline maths, the flags script in five browser states (including blocked storage), and char splitting.

Not yet verified: the scenes and particle field running inside a fresh app in a real browser. They are generalised from the code running on the live site, but [INTEGRATION.md](docs/INTEGRATION.md) is the first place they will meet a new page.

## Start here

1. [docs/ANIMATION-AUDIT.md](docs/ANIMATION-AUDIT.md): what the site does and why it works.
2. [docs/CHOREOGRAPHY.md](docs/CHOREOGRAPHY.md): the numbers that make it feel designed.
3. [docs/INTEGRATION.md](docs/INTEGRATION.md): build something new with it.
4. `motion-system.json` → `recipes` and `remix`: ideas for taking it somewhere different.
