# TRACE Workbench project page: brief

Stations 1–3 merged (METHODS: section builds may merge). Route `/trace-workbench`, mounted from `src/app/trace-workbench/page.tsx` per CONNECTIONS.md. It follows the REPLAY Studio and Switchyard pages from PR #17.

## Brief

- **Kind:** page (a project detail page, one of the "External site pages").
- **Host app:** this portfolio (`src/app/trace-workbench`). Previewed with `npm run build && npm start`.
- **Audience:** recruiters and engineers coming from the Work section or the site menu.
- **One message:** TRACE Workbench aims to be one interface for Codex, Claude Code, Grok Build, and Gemini CLI to observe and operate Windows. It is early: engineering setup and recorded workflow evidence, with the first two skills selected.
- **Content inventory:** the private repo `mogesjohnson/trace-workbench`. Sources are `README.md` and `SKILLS.md` on `docs/advanced-capabilities` (version `0.1.0-alpha.1`, read 2026-10-18) and PR #4, the landing page `site/index.html`. Every number on the page (38 tests, 207 analysis tools, two REPLAY modules, Calculator 12 × 3 = 36 with two observers, Node.js 26) comes from the README. The skill names, purposes and future candidates come from SKILLS.md. Nothing is invented, and there is no `[[placeholder]]` copy.
- **Not used from PR #4:** two landing-page lines that the README and SKILLS.md don't support. One is "built in the open, verified step by step" (the repo is private). The other is the "0 shortcuts taken in verification" stat. Both are flagged in the PR #4 review.
- **Images:**
  - `calculator-12.webp` and `calculator-36.webp` are the repo's own evidence frames (`evidence/0.1.0-alpha.1/computer-use/frames/…observation-004` and `…-007`), converted to WebP at their native 323 × 534.
  - `landing-hero.webp` and `landing-status.webp` were captured at 1.5x (1440 × 900 viewport) with reduced motion from PR #4 at `1db13de`, served locally.
- **Links:** the user asked for links to the repo and the landing page. The repo is private, and the landing page has no public host yet. So the hero links point to the repo and to PR #4, and they are labelled "collaborators only". The footer note says the same. `portfolio.ts` leaves out `githubUrl`, as REPLAY Studio and Switchyard do, so the Work section shows "Private repository".
- **No demo video:** the repo has no recording of TRACE itself, and the Calculator run is not a TRACE executor. The page has four blocks instead of five, and the evidence gallery takes the demo's place.
- **Motion budget:** calm plus one signature move. That means reveals, split headings and word scrub, plus the setup run. There is no particle field on the detail page. The field lives on the homepage, where this project has its own `trace` formation.

## Overrides of RULES.md (user instruction wins, recorded here)

- **R1/R2 (new palette and type):** the user asked to connect TRACE the way PR #17 connected REPLAY Studio and Switchyard. So the page uses only the `globals.css` tokens and the Newsreader / IBM Plex Mono pairing from `/projects`.
- **R12 (no edits outside the build):** the user asked for this page on the website. So `src/app/trace-workbench`, `src/data/externalPages.ts`, `src/data/portfolio.ts`, the homepage formations, `SignalField.tsx`, README and CONNECTIONS were edited.
- **R14 / METHODS station 0 (branch name):** the branch is `grok/add-trace-workbench`, as the user asked. It is stacked on `grok/add-replay-studio-switchyard` (PR #17). Commits and the PR follow the CONNECTIONS.md layout.

## Concept

The metaphor is **scroll runs the setup**. The README's six setup commands are the one thing a visitor can do with TRACE today, so the page ends on them, laid out as a terminal:

1. A hero framed by the landing page.
2. The two skills, with the status, scope and future skills in one collapsed disclosure.
3. The evidence gallery: two Calculator frames and the landing page's status section.
4. The setup run.

The palette is the site's: amber `--amber` is the run cursor and progress rail, and sky `--sky-text` is the prompts.

## Score

- `splitHeadings`, `batchReveal`, `scrubWords`: the shared kit (`project-detail/scenes.ts`). Reduced motion leaves them static and fully visible.
- **Signature: `setup-run.ts`.**
  - Trigger: the "Run it on Windows" section.
  - Range: start `top 65%`, end `bottom 75%`.
  - Progress drives `--t` (the amber rail's fill) and the `n / 6` command counter. It also sets `.is-dim` on each comment and command line until progress reaches that line's `data-at` cue: 0.02 / 0.06 / 0.20 / 0.26 / 0.40 / 0.54 / 0.68 / 0.80 / 0.86.
  - Static state: the rail is full, every line is lit, and the counter reads `6 / 6`.
- `project-detail/no-intro.ts` turns off the first-visit intro hold, so a visitor who lands here directly can scroll.

## Homepage formation

`trace` in `src/components/live/formations.ts` is new geometry.

- The four agent CLIs sit on the left, and their lines meet at one TRACE interface.
- That interface feeds a Windows window holding the two skills.
- Skill 01 is drawn solid (setup verified). Skill 02 is drawn without the accent (selected; executor not implemented yet).
