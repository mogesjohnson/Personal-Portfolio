# Methods

The factory line. Run the stations in order. Each one ends on a **done when** line; move on only when it holds.

Section builds may merge stations 1–3 into a single `BRIEF.md` with `## Concept` and `## Score` headings. The done-when lines still apply.

## Stations

### 0. Branch

`git switch main && git switch -c build/<slug>`.
**Done when** you are on `build/<slug>` with a clean tree.

### 1. Brief → `builds/<slug>/BRIEF.md`

Record the following fields:

- Kind: page or section.
- Host app: where it ships and is previewed. If none, say "none".
- Audience.
- The one message a visitor must leave with.
- Content inventory: user-supplied copy, or `[[placeholder]]` entries (R5).
- Constraints: brand, stack, deadline.
- Motion budget: `full` (particles, intro, pins) or `calm` (reveals, transitions, no field).

**Done when** every field holds a value or `ASK`, and each `ASK` has gone to the user as a question.

### 2. Concept → `CONCEPT.md`

Write three directions, each produced by a different [originality method](#originality-methods). Each direction names:

- its metaphor
- a new palette (hex)
- a type pairing
- its signature move (page builds)

Pick one and give the reason. Reduce every cited inspiration to a principle sentence (R3).
**Done when** the chosen direction answers all four of those, and the R2 list has been checked against it.

### 3. Score → `SCORE.md`

The motion score, section by section:

- Each effect as a `motion-system.json` pattern `id` with its params, or as a new effect.
- The signature move specified: trigger, timeline, numbers, static state.
- A first-visit timing map in the CHOREOGRAPHY registers (feedback 0.2–0.5s, panels 0.6–0.75s, entrances 1.0–1.2s).
- Tokens: the new palette written into the build's `motion.config.ts` plan.

**Done when** every effect has a reduced-motion state written beside it.

### 4. Build → `builds/<slug>/`

In this order:

1. **Static layer**: markup and CSS for the whole page, readable with `data-motion="reduce"` and without JS (R10).
2. **Config**: `motion.config.ts` with FLAGS, PALETTES, FORMATIONS and intro words. Use `examples/motion.config.ts` for the shape and fill it with new values.
3. **Scenes**: `scenesFromSpec(spec, { only, overrides })` or direct factories from `lib/scenes.ts`.
4. **Signature move**: its own module in the build folder, written as a `Scene` (`(ctx) => cleanup`) so the runtime tears it down.
5. **Vault components**: only those named in this request (R7). Copy them in (R9).

**Done when** every line of `SCORE.md` maps to code, and the page reads complete in static mode.

### 5. Verify → `VERIFY.md`

Run these and record each result:

```bash
npx tsc --noEmit
npx eslint website-template
npm run build
node website-template/scripts/smoke.mjs   # when lib/, connectors/ or the spec changed
```

Then:

- **Originality check.** Every box in `RULES.md` › Originality check.
- **QA.** Walk `motion-system.json` › `qa.checklist`, marking each item pass, fail or n/a.
- **Browser check.** This needs a host app. Run its production build and drive headless Chrome over the DevTools protocol:
  - Emulate `prefers-reduced-motion` with `Emulation.setEmulatedMedia`.
  - Send real wheel input with `Input.dispatchMouseEvent`.
  - Read state with `Runtime.evaluate`.
  - Capture screenshots for full motion, reduced motion, and a narrow screen.

  Without a host app, write "statically verified only".

**Done when** every command exits 0, every originality box is ticked, and `VERIFY.md` lists each QA item with its result.

### 6. Ship

Commit station by station (`docs(build-<slug>): brief`, `feat(build-<slug>): static layer`, …), then:

```bash
git switch main && git merge --no-ff build/<slug> -m "Merge branch 'build/<slug>'"
```

**Done when** `main` contains the merge commit and `git status` is clean. Push only on the user's word (R14).

### 7. Harvest (only when the user asks)

1. Copy the section into `components/<name>/` under the user's chosen name.
2. Append an entry to the `components:` list in `COMPONENTS.md`'s frontmatter, using the field shape in its comment.
3. Commit as `feat(vault): harvest <name>`.

**Done when** the entry's `path` resolves and its `build` and `commit` fields are filled.

## Originality methods

Each method produces a direction from the subject, not from a reference.

- **Subject-sourced metaphor.** Take the visual system from the subject's own structure: its process, data, materials or vocabulary. A brewery becomes fermentation curves. A law firm becomes clause trees.
- **Axis shift.** Choose a non-reference value on three or more of `motion-system.json` › `remix.variationAxes`.
- **Inversion.** Run a pattern backwards in meaning: reveal becomes conceal, converge becomes disperse, a vertical pin becomes radial, light-on-dark becomes ink-on-paper.
- **Material swap.** Keep the behaviour and change the substance: particles become strokes, glyphs or grid cells, and a circular reveal becomes a polygon or shutter wipe.
- **Constraint draw.** Impose two constraints the reference site lacks, such as two colours only, monospace only, square corners only, one easing only, or zero canvas.
- **Tempo.** Move the whole score to another register: ceremonial and slow, or percussive and fast.

A direction is ready when it could not be mistaken for the reference site with the logo covered.
