# Graph

## Files

```
website-template/
├─ CLAUDE.md              imports AGENT.md + RULES.md
├─ AGENT.md               role, vocabulary, entry points, defaults
├─ RULES.md               binding rules R1–R14 + originality check
├─ METHODS.md             build stations 0–7 + originality methods
├─ COMPONENTS.md          vault index (YAML frontmatter only)
├─ CONNECTIONS.md         owner decisions: host path, palette, nav, pull requests
├─ GRAPH.md               this map
├─ README.md              human overview
├─ motion-system.json     43 patterns, tokens, engine, choreography, a11y, perf, QA, recipes, remix
├─ motion-system.schema.json   schema for the spec
├─ connectors/            spec.ts (load) · registry.ts (pattern → scene) · react.tsx (hooks, components) · next.tsx (head script)
├─ lib/                   flags · scroll · theme · runtime · scenes · pointer · text · intro
│  ├─ particles/          formations.ts (geometry) · field.ts (engine)
│  └─ styles/             tokens.css (generated) · motion.css (transitions, failsafes, reduced motion)
├─ scripts/               build-tokens.mjs (spec → tokens.css) · smoke.mjs (16 logic checks)
├─ examples/              motion.config.ts · layout.example.tsx · experience.example.tsx
├─ docs/                  ANIMATION-AUDIT · BUILD-HISTORY · CHOREOGRAPHY · INTEGRATION
├─ builds/<slug>/         one folder per build: BRIEF · CONCEPT · SCORE · code · VERIFY   (created by station 1)
└─ components/<name>/     harvested vault sections                                 (created by station 7)

../src/                   reference site: read-only teacher (R12)
```

## Flows

```
request ─► METHODS stations ─► builds/<slug>/ ─► merge to main ─► (user asks) harvest ─► components/<name>/ + COMPONENTS.md
motion-system.json ─► connectors/spec.ts ─► connectors/registry.ts ─► lib/scenes.ts + lib/pointer.ts ─► lib/runtime.ts startMotion()
motion-system.json tokens ─► scripts/build-tokens.mjs ─► lib/styles/tokens.css ─► lib/styles/motion.css
lib/flags.ts ─► connectors/next.tsx (head script, pre-paint) + connectors/react.tsx (useDocumentFlags)
Diagram ─► lib/particles/formations.ts diagramRecipe ─► field.ts (live)   ·   Diagram ─► react.tsx DiagramSvg (static)
lib/intro.ts ── motion:intro-done ──► lib/runtime.ts (releases scroll) + lib/particles/field.ts (starts)
../src/ ─► (techniques only) ─► lib/ ; findings ─► docs/ANIMATION-AUDIT.md
```
