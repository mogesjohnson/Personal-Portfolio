# TRACE Workbench project page: brief

Stations 1–3 merged (METHODS: section builds may merge). Route `/trace-workbench`, mounted from `src/app/trace-workbench/page.tsx` per CONNECTIONS.md. It follows the REPLAY Studio and Switchyard pages from PR #17.

## Brief

- **Kind:** page (a project detail page, one of the "External site pages").
- **Host app:** this portfolio (`src/app/trace-workbench`). Previewed with `npm run build && npm start`.
- **Audience:** recruiters and engineers coming from the Work section or the site menu.
- **One message:** TRACE Workbench is one interface for Codex, Claude Code, Grok Build, and Gemini CLI to observe and operate Windows. It is early: engineering setup and recorded workflow evidence, with the first two skills selected.
- **What the page is:** the TRACE landing page (trace-workbench PR #4, `site/index.html` at `1db13de`), rebuilt natively in the shared project-detail layout as live text (owner request and the PR #18 review, 2026-10-18). It has the same four-section rhythm as /switchyard and /replay-studio:
  - The hero (eyebrow, title, version line, pitch) is `DetailHero`. The version line follows the house format: `v0.1.0-alpha.1 · Windows x64 · foundation · 18 October 2026` (package.json, checks.json `win32`/`x64`, and the evidence date; "foundation" is short for the README's "development foundation").
  - Its Fig. 01 is the landing page's signal field, ported to `SignalFieldFigure.tsx` (a canvas client component) inside the shared `Frame`, at the hero figures' 2560 × 1544 aspect. It follows the theme tokens, draws at devicePixelRatio (capped at 2), pauses off-screen and in a hidden tab, respawns when the frame resizes, and holds one seeded still frame under reduced motion.
  - "01 What it does" is PR #4's "Status" section. It has a four-card `FeatureGrid`: the two skills from PR #4 and SKILLS.md, the four agent CLIs (README, SKILLS.md), and the future skills under review (SKILLS.md). Its stats go in `StatusDetails` with `Stats`.
  - "02 Evidence" is Fig. 02: the recorded Calculator session (`evidence/0.1.0-alpha.1/computer-use/trace.jsonl`, 22 records) as a text log inside the shared `Frame`. The rows are condensed from each record's fields, and the display values come from `independent-review.json`. See `evidence.ts`.
  - "03 How it works" is PR #4's "Setup" section, with its terminal as Fig. 03 in a `Frame` and its rules line in `.pd-copy`.
  - "04 Scope" is PR #4's "Honest scope" note, as a `Ledger` of what is verified and what isn't yet (README "Verified" and "Scope", SKILLS.md).
  - The footer is `ProjectFooter`.
- **Copy:** from PR #4, README.md and SKILLS.md (on `docs/advanced-capabilities`, 0.1.0-alpha.1), minus two lines they don't support. One is "built in the open, verified step by step" (the repo is private). The other is the "0 shortcuts taken in verification" stat. Its slot in the four-stat grid holds a README fact instead: two REPLAY modules analyzed without changing the package. PR #4 drops the same two lines. Nothing is invented, and there is no `[[placeholder]]` copy.
- **Left out from PR #4:** the hero link row and the three doc links. The repo is private and the landing page has no public host, so the page links nowhere on GitHub, like /switchyard. The footer note says so. `portfolio.ts` leaves out `githubUrl`, as REPLAY Studio and Switchyard do.
- **No screenshots:** figures may only be crisp 2x captures of TRACE actually working, never a webpage screenshot.
  - TRACE has no app window yet; its executor is not implemented.
  - The only real-app captures in the repo are the six Calculator evidence frames in `evidence/0.1.0-alpha.1/computer-use/frames/`, which are 323 × 534 at 1x. A fresh 2x capture would not be that recorded evidence, and it needs the Windows machine.
  - So the landing-page screenshots and the Calculator frames were removed, and `media/` is gone. All three figures are drawn live (a canvas and two text figures) in the shared `Frame`, so they follow the light and dark themes.
- **No demo video:** there is no recording of TRACE itself.
- **Motion budget:** calm plus one signature move. That means reveals, split headings and word scrub, plus the setup run. The hero's signal field is the landing page's ambient drift, kept to its frame; the homepage has this project's `trace` formation.

## Overrides of RULES.md (user instruction wins, recorded here)

- **R1/R2 (new palette and type):** the user asked for the page to line up exactly with /switchyard and /replay-studio. So it uses only the shared project-detail components, the `globals.css` tokens, and the Newsreader / IBM Plex Mono pairing.
- **R12 (no edits outside the build):** the user asked for this page on the website. So `src/app/trace-workbench`, `src/data/externalPages.ts`, `src/data/portfolio.ts`, the homepage formations, `SignalField.tsx`, README and CONNECTIONS were edited.
  - The shared `project-detail/ProjectDetail.tsx` gained `Frame`, the figure frame that `Shot` already drew, now usable for code-drawn figures. `Shot` renders through it with the same DOM as before.
  - `externalPages.ts` gained an optional `menuLabel`. TRACE shows as "TRACE" in the two large mobile menus so it fits on one line at 390 px. The shared `.dispatch-bar` keeps its link and label on one line and hides the label below 30rem, where it wrapped on every project page.
- **R14 / METHODS station 0 (branch name):** the branch is `grok/add-trace-workbench`, as the user asked, stacked on `grok/add-replay-studio-switchyard` (PR #17).

## Score

- `splitHeadings`, `batchReveal`, `scrubWords`: the shared kit (`project-detail/scenes.ts`). Reduced motion leaves them static and fully visible.
- **Signature: `setup-run.ts`.**
  - Trigger: the "Run it on Windows" section.
  - Range: start `top 65%`, end `bottom 75%`.
  - Progress drives `--t` (the amber rail's fill). It also sets `.is-dim` on each comment and command line until progress reaches that line's `data-at` cue: 0.02 / 0.06 / 0.20 / 0.26 / 0.40 / 0.54 / 0.68 / 0.80 / 0.86.
  - Static state: the rail is full and every line is lit.
- `project-detail/no-intro.ts` turns off the first-visit intro hold.
- `trace.css` holds only the signal field, the evidence log and the setup run, inside their Frames. Everything else is shared CSS.

## Homepage formation

`trace` in `src/components/live/formations.ts` is new geometry.

- The four agent CLIs meet at one TRACE interface.
- That interface feeds a Windows window holding the two skills.
- Skill 01 is drawn solid (setup verified). Skill 02 is drawn without the accent (selected; executor not implemented yet).
