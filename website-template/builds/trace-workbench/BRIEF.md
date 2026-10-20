# TRACE Workbench project page: brief

Route `/trace-workbench`. Same shell as `/replay-studio`. The owner asked for a revamp on 2026-10-19: the page felt plain, tests do not belong on it, and it should say what TRACE is, how it is used, and show a simple demo. The demo was made by driving the REPLAY Studio preview with TRACE computer use.

- **Kind:** page (a project detail page of the portfolio).
- **Host app:** the portfolio, `src/app/trace-workbench/page.tsx`.
- **Audience:** people reading the portfolio, from the homepage Work section, the menus, or the project-footer cycle.
- **The one message:** TRACE lets an agent CLI see one Windows window, do one thing, and look again.
- **Content inventory:** owner-supplied. Words from the sources below; pictures and loops from the two runs below. `fiction: false`. No placeholders.
- **Constraints:** the site palette and fonts, the shared project-detail shell, and the private repo (no source link).
- **Motion budget:** `calm`. A few arrivals from the shared shell, plus one signature that carries the argument.

## What the page is

- Hero: what TRACE is, plus Fig. 01, the REPLAY sample as TRACE first saw it (Tide).
- 01 What it is: four cards. One window, a fresh picture, one move, four agent CLIs. No test row, no ledger.
- 02 How it's used: the observation stage, the signature move (`look-again.ts`, score below). Beside it, three steps labelled with the loop from the skill: `trace_computer_observe`, `trace_computer_act`, then the fresh observation that the action returns.
- 03 Demo: a six-second silent loop of the real click, Tide to Dusk.
- 04 Doing more: a one-minute silent loop of a longer run on the same sample. TRACE adds a text box, types "Follow the cut.", drags that box up, scrubs the playhead, and presses play.
- Footer: private repository, no GitHub link. The hero has no repo or landing-page link either.

## Score

The shared shell (`builds/project-detail/scenes.ts`) gives the arrivals: split headings, a batch reveal on `[data-reveal]`, and a scrub on the hero lead. The two demo loops are `LoopVideo`: they autoplay muted in full motion and hold their poster under reduced motion. TRACE adds one scene.

**Signature: observe, act, observe** (`look-again.ts`, a `Scene` torn down by the runtime).

- **Region:** the stage in section 02, the left 1.7fr of the content width, at the screenshots' 1920 × 1120 aspect. About 760 × 450 px at a 1440 px viewport, and the full content width (about 360 × 210 px) at 390 px. The steps column beside it, or below it on a phone, follows the same beats.
- **Trigger:** a ScrollTrigger on the stage, `start: "center 62%"`, `toggleActions: "play none none reset"`. It plays once at its own tempo. It is not scrubbed: the agent keeps its own clock. Scrolling back above the stage rewinds it, so it plays again on the way down.
- **Beats** (seconds from the trigger; every arrival is `expo.out`):
  1. **Observe, 0–0.45.** Four sky sight marks close on the window: opacity 0 → 1, scale 1.04 → 1, 0.45s. Step 01 lights: opacity 0.34 → 1, 0.35s.
  2. **Act, 0.5–2.1.** The cursor fades in (0.2s, linear) and travels from about 30% of the stage width left and 49% of its height down to the Dusk swatch, 1.1s. It presses at 1.5s (scale 0.84, 0.12s) and returns (0.3s). At 1.62s an amber ring rings out from the swatch: scale 0.3 → 1.7, opacity 1 → 0, 0.5s. Step 02 lights.
  3. **Look again, 2.15–3.0.** The old frame has held for half a second. Then the picture cuts, with no crossfade, to the fresh observation (Dusk). The sight marks close again (0.45s), step 03 lights, and at 2.3s a dashed sky box with the tag "Tide → Dusk" lands on the frame that changed: opacity 0 → 1, scale 1.03 → 1, 0.7s.
- **Rest pose:** the Dusk picture, sight marks on, the cursor resting on the Dusk swatch, the changed frame boxed, all three steps lit, the ring gone. This is the CSS in `trace.css`.
- **Reduced motion, no JS, or a failed scene:** the rest pose. The runtime never starts under reduced motion, and on a throw it reverts every set and tween back to the CSS.
- **Registers:** feedback 0.12–0.5s (press, ring, step lights, sight marks), panel 0.7s (the diff box), entrance 1.1s (the cursor travel, the one long move). Headings from the shell are 1.05s.

## The runs

19 October 2026. REPLAY Studio browser preview at `http://127.0.0.1:5199/` (repo `replay-studio`, `npm run dev`). The preview's own sample project is "A little less busy", a made-up app named fold. TRACE computer use opened that Edge window, looked, and clicked the Dusk canvas swatch. The frame around the sample changed from blue-green to purple. The Edge chrome is cropped off the figures. Sections 02 and 03 claim only that click. The cursor and sight marks on the stage are drawn in code. They mark where that click landed and what changed. They are not a capture.

The longer run, the same day, stayed on that sample and on Tide so it would not repeat the click. TRACE clicked Text, replaced "Add your text" with "Follow the cut.", dragged the new box up the canvas, dragged the playhead along the timeline, and clicked Play. The published cut starts once the editor is clear and runs about a minute. The cursor is in the picture. Section 04 claims these actions.

Not used: the developer's real REPLAY library. A first launch of the installed app opened an existing recording, and that window was closed without publishing any frame from it.

## Sources for the words

`mogesjohnson/trace-workbench` `main` at `7b2ff921c6c4f129cb7d37ee0a1df801659ae2a0`, package `0.1.0-alpha.2`, read 2026-10-19 with `gh` (the repo is private):

- The page: `README.md` (four CLIs, Windows preview, six computer tools, one desktop lease) and `skills/trace-computer-use/SKILL.md` (observe, one action with `trace_computer_act`, read the fresh observation it returns, release).
- The homepage Work card in `src/data/portfolio.ts`: also `SKILLS.md`, `docs/VERIFICATION.md` (six tools over stdio, seven actions and eight fresh frames on 18 October, 207 analysis tools), and `docs/OBSERVED-WORKFLOW.md` (the 18 October Calculator run on the earlier executor).

## Overrides of RULES.md

- **R1/R2:** shared project-detail components, site tokens, Newsreader / IBM Plex Mono, so the page still lines up with `/replay-studio`. The palette is the site's, not a new one. The sky / amber split on the stage (sky observes, amber acts) uses the site tokens.
- **R12:** the page, its media, `public/videos/trace-workbench-demo.*`, `public/videos/trace-workbench-more.*`, the homepage card and `trace` formation, the menu label, and this brief.
- **R14:** branch `grok/add-trace-workbench`, stacked on PR #17. Commits follow `CONNECTIONS.md` › Pull requests (`[F9] Action`), not Conventional Commits.
