# REPLAY Studio project page: brief

Stations 1–3 merged (METHODS: section builds may merge). Route `/replay-studio`, mounted from `src/app/replay-studio/page.tsx` per CONNECTIONS.md.

## Brief

- **Kind:** page (a project detail page, one of the "External site pages").
- **Host app:** this portfolio (`src/app/replay-studio`). Previewed with `npm run build && npm start`.
- **Audience:** recruiters and engineers coming from the Work section or the site menu.
- **One message:** REPLAY Studio is a local Windows app that turns a recorded window into a polished, privacy-safe MP4, and an agent can drive the same editor through a local MCP bridge.
- **Content inventory:** taken from the private repo `mogesjohnson/replay-studio` at tag `v0.2.0-alpha.4` (README, docs, `src/types.ts`, evidence images). No `[[placeholder]]` copy. Every number on the page (167 tests, 28 MCP tools, 40 TypeScript files, 6 import formats, Claude Code 2.1.302) comes from those files. Nothing is invented.
- **Constraints:** the repo is private, so the page has no GitHub source link and says so in the footer. Screens are the repo's own evidence images, converted to WebP. `agent-access.png` was left out because it shows a local Windows user path. No executables were downloaded.
- **Motion budget:** calm plus one signature move. That means the hero opening, reveals, split headings and the timeline scrub (see Score). There is no particle field on the detail page; the field lives on the homepage, where this project has its own `reel` formation.

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

Budget `calm` (`How-Claude-Motion.md`): a few arrivals and one move that carries the argument. One arrival voice, `expo.out` / `cubic-bezier(0.16, 1, 0.3, 1)`. Scroll-coupled work runs on the kit runtime's ticker (Lenis drives the clock), and every scene is a `Scene` the runtime tears down.

| Moment | Job | Pattern and numbers | Reduced motion and no JS |
| --- | --- | --- | --- |
| Hero | Arrive, the loudest beat | `heroEntrance` (`project-detail/scenes.ts`). The title letters rise from 60% in 1.15s with a 0.035s stagger (0.42s across 13 letters). Kicker, status and pitch follow at +0.25s (16px, 1.0s, stagger 0.08). The screenshot lands at +0.45s (24px, 1.1s). CSS hides these only in full motion, with a 3.5s failsafe. | Shown as they are |
| Section headings | Arrive | `splitHeadings` by word: 1.05s, stagger 0.06, 2° tilt | Static |
| Cards, screens, status line, timeline, demo | Arrive | `batchReveal`: 20px, 1.0s, stagger 0.07. The hero and the closed details drawer are excluded. | Static |
| How it works | Signature | `timeline-scrub.ts`, below | The rest pose |
| Demo loop | Ambient | `LoopVideo` plays only while 25% of it is on screen. A reader's pause sticks. A WebM that fails to decode falls back to the MP4. | Poster frame, paused, with a Play button |

**Signature: `timeline-scrub.ts`, "scroll is the playhead".**

- Trigger: the timeline stage (`[data-timeline]`), from `center 80%` to `center 30%`. That is about 450px of scroll at 1440×900, and the whole stage stays on screen for the entire run.
- Region: the timeline card, 702×298px at 1440 wide, with the five steps beside it. At 390 wide it is 350×327px with the steps below.
- Beats, with progress `t` mapped 1:1 to scroll (no added easing):
  1. `t = 0`: the playhead is at the in point, the timecode reads 00:00.0, and all five steps are dimmed to 0.32.
  2. Each step lights at its cue (0.04 / 0.24 / 0.44 / 0.64 / 0.84) with a 0.4s opacity change on the arrival ease.
  3. The callout clip is live while `t` is in [0.25, 0.625). The privacy clip is live while `t` is in [0.4375, 0.6875). Live means a sky border and glow over 0.3s, the feedback register.
  4. `t = 1`: the playhead is at the out point and the timecode reads 00:08.0.
- Rest pose (static CSS, reduced motion, no JS, teardown): `--t: 1`, timecode 00:08.0, every step lit, no clip live.
- Failure picture: if a scene throws, the runtime reverts everything and sets `data-motion="reduce"`, which is the rest pose.
- The steps carry no `data-reveal`. The playhead owns their opacity.

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

- **Demo:** the "Demo coming soon" placeholder is replaced by a silent 18-second loop (`public/videos/replay-studio-demo.webm` + `.mp4`, poster `.jpg`). `DemoVideo` renders it through `project-detail/LoopVideo.tsx`: `muted`, `loop`, `playsInline`, a poster, and a Pause/Play button. Since the motion review it plays only while on screen (see Score). With reduced motion it does not autoplay and shows the poster.
- **Screens:** recaptured at 2x (deviceScaleFactor 2) with Playwright on the box, from the source repo's own browser preview.
- **Copy:** plain visitor-benefit wording; four feature cards with one sentence each, larger body text in `--text` (measured 16.6:1 dark, 18.1:1 light).
- **Sample recording:** the colour-bar test pattern is gone. The editor shows a made-up invoicing app ("Harbor", Dana Whitfield, dana.whitfield@example.com, a 555 number). All of it is fake; the name and email are covered by a privacy blur, and a timed callout reads "One click sends the invoice." The source is `v0.2.0-alpha.4`, the latest release (17 October 2026).
