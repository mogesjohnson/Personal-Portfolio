# REPLAY Studio project page: brief

Stations 1–3 merged (METHODS: section builds may merge). Route `/replay-studio`, mounted from `src/app/replay-studio/page.tsx` per CONNECTIONS.md.

## Brief

- **Kind:** page (a project detail page, one of the "External site pages").
- **Host app:** this portfolio (`src/app/replay-studio`). Previewed with `npm run build && npm start`.
- **Audience:** recruiters and engineers coming from the Work section or the site menu.
- **One message:** REPLAY Studio is a local Windows app that turns a recorded window into a polished, privacy-safe MP4, and an agent can drive the same editor through a local MCP bridge.
- **Content inventory:** taken from the private repo `mogesjohnson/replay-studio` at tag `v0.2.0-alpha.4` (README, docs, `src/types.ts`, evidence images). No `[[placeholder]]` copy. Every number on the page (167 tests, 28 MCP tools, 40 TypeScript files, 6 import formats, Claude Code 2.1.302) comes from those files. Nothing is invented.
- **Constraints:** the repo is private, so the page has no GitHub source link and says so in the footer. Screens are the repo's own evidence images, converted to WebP. `agent-access.png` was left out because it shows a local Windows user path. No executables were downloaded.
- **Motion budget:** calm plus one signature move. That means reveals, split headings, word scrub and the timeline scrub. There is no particle field on the detail page; the field lives on the homepage, where this project has its own `reel` formation.

## Overrides of RULES.md (user instruction wins, recorded here)

- **R1/R2 (new palette and type):** the user asked to "keep the color scheme" and match the main page. The page uses only the `globals.css` tokens and the Newsreader / IBM Plex Mono pairing from `/projects`.
- **R12 (no edits outside the build):** the user asked for these pages on the website. So `src/app/replay-studio`, `src/data/externalPages.ts`, `src/data/portfolio.ts`, the Work section and the homepage formations were edited.
- **R14 / METHODS station 0 (branch name):** the branch is `grok/add-replay-studio-switchyard`, as the user asked. The commit and PR follow the CONNECTIONS.md layout.

## Concept

The metaphor is **scroll is the playhead**. The page is laid out like the app's own editor:

- a hero framed by the real editor screenshot
- a feature grid
- a three-track timeline sketch (Recording, Text callout, Privacy blur)
- screens
- the agent bridge diagram
- verification numbers
- known limits

The palette is the site's: amber `--accent` is the playhead and sky `--sky` the overlays.

## Score

- `splitHeadings`, `batchReveal`, `scrubWords`: the shared kit (`project-detail/scenes.ts`). Reduced motion leaves them static and fully visible.
- **Signature: `timeline-scrub.ts`.**
  - Trigger: the "Make a demo" section.
  - Range: start `top 65%`, end `bottom 75%`.
  - Progress drives `--t` (the playhead position), the timecode over an 8.0 s take, and `.is-dim` on the five README steps until the playhead reaches each step's cue (0.04 / 0.24 / 0.44 / 0.64 / 0.84).
  - Static state: the playhead sits at the end, every step is lit, and the timecode reads the full duration.
- `project-detail/no-intro.ts` turns off the first-visit intro hold so a visitor who lands here directly can scroll.

## Demo video (added on request, 2026-10-18)

The last section, "Demo video", renders `project-detail/DemoVideo.tsx` from this folder's `demo.ts`. No video exists yet, so the section shows the "Demo coming soon" state: a 16:9 framed player over a dimmed real screenshot. It has no motion beyond a slow standby blink with `data-motion="full"`, and is static under reduced motion. To publish, set one field in `demo.ts`:

- `file`: an MP4 under `public/`, such as `/videos/<slug>-demo.mp4`
- `embed`: a YouTube or other https player URL

## Trim (on request, 2026-10-18)

The page is cut down to five blocks:

1. The hero: a one-line pitch, the status line, and a real screenshot.
2. The feature grid, with six cards, ending in one collapsed "Status · Details" disclosure. The disclosure (a native `<details>`, closed by default) holds the test stats, what works and what doesn't yet, the limits, and the stack.
3. One screenshot gallery.
4. The scroll "how it works" signature move.
5. The demo video.

The slim footer row follows. The overlapping section (the agent diagram on REPLAY Studio; the Return Ticket card and the knowledge diagram on Switchyard) was folded into the feature cards. Its facts were kept, and none were added.

## Review fixes (PR #17 review, 2026-10-18)

- **Demo:** the "Demo coming soon" placeholder is replaced by a silent 18-second loop (`public/videos/replay-studio-demo.webm` + `.mp4`, poster `.jpg`). `DemoVideo` renders it through `project-detail/LoopVideo.tsx`: autoplay (started on mount), `muted`, `loop`, `playsInline`, a poster, and a Pause/Play button. With reduced motion it does not autoplay and shows the poster.
- **Screens:** recaptured at 2x (deviceScaleFactor 2) with Playwright on the box, from the source repo's own browser preview.
- **Copy:** plain visitor-benefit wording; four feature cards with one sentence each, larger body text in `--text` (measured 16.6:1 dark, 18.1:1 light).
- **Sample recording:** the colour-bar test pattern is gone. The editor shows a made-up invoicing app ("Harbor", Dana Whitfield, dana.whitfield@example.com, a 555 number). All of it is fake; the name and email are covered by a privacy blur, and a timed callout reads "One click sends the invoice." The source is `v0.2.0-alpha.4`, the latest release (17 October 2026).
