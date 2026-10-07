# Website motion template

A reusable motion system distilled from this portfolio's **Live Motion** redesign (PR #3): a pre-paint flag system, GSAP + Lenis scroll scenes, a Canvas 2D particle field that re-forms at each section, View Transitions, and a static fallback for every effect.

It is a **kit, not a clone**. The techniques and tuned numbers are kept. Every piece of the original content (name, copy, monogram, diagrams, intro words, colour plates) has become a parameter.

## What's here

The file map lives in [GRAPH.md](GRAPH.md). In short: `motion-system.json` is the blueprint, `lib/` holds the libraries, `connectors/` glues them to React, Next.js and the JSON, `examples/` is a type-checked starter, and `docs/` holds the audit and guides.

## Factory

This folder also runs as a factory that produces new, original pages and sections. Agents start at [AGENT.md](AGENT.md) (Claude loads it through [CLAUDE.md](CLAUDE.md)). The rules are in [RULES.md](RULES.md), the build stations in [METHODS.md](METHODS.md), and the vault of hand-picked sections in [COMPONENTS.md](COMPONENTS.md).

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
