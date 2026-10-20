# Switchyard project page: brief

Stations 1–3 merged (METHODS: section builds may merge). Route `/switchyard`, mounted from `src/app/switchyard/page.tsx` per CONNECTIONS.md.

## Brief

- **Kind:** page (a project detail page, one of the "External site pages").
- **Host app:** this portfolio (`src/app/switchyard`). Previewed with `npm run build && npm start`.
- **Audience:** recruiters and engineers coming from the Work section or the site menu.
- **One message:** Switchyard is a personal Windows project desk. It opens the exact checkout you chose, records a Return Ticket when you stop, and reads Obsidian notes as read-only context.
- **Content inventory:** taken from the private repo `mogesjohnson/switchyard`: README, docs, the Rust broker and the UI labels. No `[[placeholder]]` copy. The Return Ticket card uses the app's own field labels and placeholders. The validation numbers (56, 53, 500, 30 s) come from the repo.
- **Constraints:** the repo is private, so the page has no GitHub source link. The screens were captured from the repo's own browser design preview (`vite`, fixture data, no Tauri binary). Only npm dev packages were installed, with `--ignore-scripts`; no executables were downloaded.
- **Motion budget:** calm plus one signature move. That means the hero opening, reveals, split headings and the switch track (see Score). The homepage carries this project's `yard` particle formation.

## Overrides of RULES.md (user instruction wins, recorded here)

- **R1/R2 (new palette and type):** the user asked to keep the site's color scheme. The page uses only the `globals.css` tokens and the `/projects` type pairing.
- **R12 (no edits outside the build):** the user asked for the page on the website, so the `src/` wiring was edited (see the REPLAY Studio brief for the shared list).
- **R14 / METHODS station 0 (branch name):** the branch is `grok/add-replay-studio-switchyard`, as the user asked.

## Concept

The metaphor is **throw the switch to the exact checkout**. It follows the app's own rail-line drawing:

- One route leaves the main line at a switch and runs to the checkout you picked.
- Side tracks show what Switchyard refuses: a same-looking folder, and a remote reference that can't be launched locally.

The palette is the site's: amber is the chosen route and sky is the switch.

## Score

Budget `calm` (`How-Claude-Motion.md`): a few arrivals and one move that carries the argument. One arrival voice, `expo.out`. The opening, headings, reveals and demo loop are the shared shell's, with the same numbers as the REPLAY Studio brief › Score (`heroEntrance` 1.15s letters, followers at +0.25s, the screenshot at +0.45s; `splitHeadings` 1.05s; `batchReveal` 20px, 1.0s, stagger 0.07; the loop plays only on screen). Reduced motion and no-JS show all of it as is.

**Signature: `switch-track.ts`, "the reader throws the switch".**

- Trigger: the yard card (`.sy-yard`). On a desktop it runs from `top 60%` to `bottom 67%`, about 400px of scroll at 1440×900, while the whole map is on screen. On a phone (≤600px), where the station list is the line, it runs from `top 75%` to `bottom 85%`. The functions re-run on refresh.
- Region: at 1440 wide, the 1102×301px rail map and a row of five stations, the full 72rem column (the card is about 470px tall). At 390 wide, a 316×86px map plus the station list drawn as a vertical rail (about 1,200px tall).
- Beats, with route progress `p` mapped 1:1 to scroll:
  1. **Approach** (`p` 0.02 to 0.162): the route draws from the library to the switch. The lever lies along the look-alike side track. The Library stop fills at 0.081.
  2. **Throw** (`p` = 180 / route length ≈ 0.162): the lever swings 90° to the main line and the hub fills sky, in 0.45s on the arrival ease (the feedback register). It swings back if you scroll back.
  3. **Run**: the route draws along the exact-checkout line with `stroke-dashoffset`. The marker rides its leading edge (`getPointAtLength`). Each SVG stop fills, and each station lights from 0.3 opacity, at 0.324 / 0.522 / 0.721 / 0.919 (0.4s).
  4. **Arrive** (`p` = 1): the marker parks at the end of the line.
- Phone: the vertical rail's amber fill is `scaleY(--p)`, with `--p = (p − 0.081) / (0.919 − 0.081)`, and each station's stop fills as it is passed. The two side-track labels repeat in an HTML legend, because the SVG text is about 4px tall there.
- Rest pose (static CSS, reduced motion, no JS, teardown): lever up, hub filled, route fully drawn, marker at the end, every stop and station lit, rail full.
- Failure picture: if a scene throws, the runtime reverts everything and sets `data-motion="reduce"`, which is the rest pose. The side tracks never light in any state.

`project-detail/no-intro.ts` turns off the first-visit intro hold so a visitor who lands here directly can scroll.

## Demo video (added on request, 2026-10-18)

The last section renders `project-detail/DemoVideo.tsx` from this folder's `demo.ts`. Since the review fixes it plays the silent 18-second loop described below. To change it later, edit `demo.ts`: set `file` (with `webm` and `poster`) to an MP4 under `public/videos/`, or set `embed` to a YouTube or other https player URL. With both null the block falls back to its "Demo coming soon" state.

## Trim (on request, 2026-10-18)

The page is cut down to five blocks:

1. The hero: a one-line pitch, the status line, and a real screenshot.
2. The feature grid (six cards at the trim, four since the review fixes), ending in one collapsed "Status · Details" disclosure. The disclosure (a native `<details>`, closed by default) holds the test stats, what works and what doesn't yet, the limits, and the stack.
3. One screenshot gallery.
4. The scroll "how it works" signature move.
5. The demo video.

The slim footer row follows. The overlapping section (the agent diagram on REPLAY Studio; the Return Ticket card and the knowledge diagram on Switchyard) was folded into the feature cards. Its facts were kept, and none were added.

## Review fixes (PR #17 review, 2026-10-18)

- **Demo:** the "Demo coming soon" placeholder is replaced by a silent 18-second loop (`public/videos/switchyard-demo.webm` + `.mp4`, poster `.jpg`). `DemoVideo` renders it through `project-detail/LoopVideo.tsx`: `muted`, `loop`, `playsInline`, a poster, and a Pause/Play button. Since the motion review it plays only while on screen (see Score). With reduced motion it does not autoplay and shows the poster.
- **Screens:** recaptured at 2x (deviceScaleFactor 2) with Playwright on the box, from the source repo's own browser preview.
- **Copy:** plain visitor-benefit wording; four feature cards with one sentence each, larger body text in `--text` (measured 16.6:1 dark, 18.1:1 light).
- **Desk name:** the app hard-codes `JOHN'S DESK` in `src/App.tsx` (the `desk-label` in the top bar); it is not a setting or fixture. For the capture only, a local, uncommitted edit in the source clone changed it to `MY DESK`, and the ` · example` suffix was dropped from the preview's sample project names in `src/preview.ts`. The lime BROWSER DESIGN PREVIEW banner is cropped off. The hero is now the filled library.
