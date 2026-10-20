# Verify — /trace-workbench

Checked 2026-10-20 at `64745ba` on `review/f9-fixes` (stacked on PR #17), production build (`npm run build`, then `npm start -- -p 3102`), headless Chrome 155 over the DevTools protocol.

## Commands

- `npx tsc --noEmit`: exit 0.
- `npx eslint website-template src`: 5 errors, all in `website-template/builds/prototype-headers/Environment.tsx` (the 5 known on `main`). 0 warnings. Moving the stage images to `next/image` removed the 2 earlier warnings in this build.
- `npm run build`: exit 0. Every route prerenders as static, `/trace-workbench` included.
- `node website-template/scripts/smoke.mjs`: 16/16 checks passed.

## Originality (RULES.md)

- [x] Accent colours are the live site tokens, not `motion-system.json`'s kit accents. `BRIEF.md` records the R1/R2 palette override.
- [x] Banned-phrase grep over `builds/trace-workbench` returns nothing.
- [x] The `trace` formation is new geometry: four agent boxes fan into one hub, which reaches a window holding two skill boxes. No coordinates are shared with `mj`, `contact`, `sys`, `tree` or `orbit`. `recipeTrace()` and `diagrams.trace` read the same `traceAgents` / `traceHub` constants, so the static SVG matches the particles.
- [x] The signature is written in `BRIEF.md` › Score and implemented in `look-again.ts`.
- [x] No outside site is cited.

## Motion bar (How-Claude-Motion.md, `calm`)

- [x] The signature is TRACE's own sequence, not REPLAY's `timelineScrub` with the nouns swapped. The stage (about 760×450px at 1440, 205px tall at 390) plays once on its own clock, starting at `center 62%`:
  - 0–0.45s: four sight marks close on the window (observe).
  - 0.5–1.6s: an SVG cursor travels to the Dusk swatch and presses, and an amber ring goes out over 0.5s (act).
  - 2.15s: after a 0.5s hold, a hard cut to Dusk, with no crossfade.
  - 2.3s: a dashed "Tide → Dusk" box lands over 0.7s (look again).
  The steps `trace_computer_observe`, `trace_computer_act` and "fresh observation" light up at each beat. Scrolling back above the stage rewinds it, and scrolling down replays it.
- [x] Sampled with real wheel input at 1440 dark: everything at 0 before the trigger, with steps at 0.34. Then +150ms marks 0.97, +900ms cursor 12px from rest, +1750ms ring ending with step 02 lit, +2350ms Dusk at 1.00 (a clean cut) with the box at 0.65, and +3600ms the rest pose. The same sequence ran at 390 light.
- [x] One arrival voice: `expo.out`. Registers are 0.12–0.5s (feedback and marks), 0.7s (box) and 1.1s (cursor travel).
- [x] Hold, then cut: the picture swaps; it never crossfades.
- [x] The rest pose is the CSS: Dusk, marks, the cursor on the swatch, the box, and every step lit. Reduced motion, no JS and a failed scene all show it.
- [x] Teardown runs through the runtime context, on one ticker (ScrollTrigger and Lenis). There is no rAF of its own, and nothing reads `scrollY`. The page has no canvas.
- [x] `data-lenis-prevent`: n/a, the page has no inner scroller.
- [x] `trace.css` has no hardcoded colours. The stage uses `--glass`, `--glass-border`, `--shadow`, `--sky`, `--sky-text`, `--amber` and `--bg`, checked in light and dark.

## QA (`motion-system.json` › `qa.checklist`)

- pass: lint (the same 5 pre-existing errors), `tsc`, `build` and smoke.
- pass: reduced motion (`Emulation.setEmulatedMedia`) at 1440 and 390, dark and light. It shows the rest pose, and both loops are paused on their posters. Nothing is stuck hidden: the only nodes under 0.99 opacity are the 2 closed-menu labels, which `/replay-studio` has too.
- pass: with JavaScript disabled, the page shows the rest pose.
- pass: no horizontal overflow and no console errors in every run.
- pass: loop lengths are 5.6s and 13.2s. The second loop was re-recorded on 2026-10-20 (1440 × 864, 30 fps, H.264 and VP9, 378 KB and 269 KB). Its frames were checked: the callout appears, "Follow the cut." is typed, the box moves up, the playhead goes to 00:08.9, and playback runs.
- pass: homepage Work item 06 draws `trace` as SVG under reduced motion and as SVG plus the live canvas in full motion.
- pass: footer cycle Switchyard → `/trace-workbench` → `/shadow-army`.
- n/a: intro, pinned track, particle budget on this page.
- not run: a real phone and a screen reader pass.

## Copy check, 2026-10-20

The repo moved to `0.1.0-alpha.3` (`e20568b`) after the page was written. The hero status line, the Work card's version, architecture and tradeoff, and the stage intro were updated to match its README and `docs/VERIFICATION.md`. The stage intro now says the run was on the REPLAY Studio preview, because the README still lists a real REPLAY workflow as remaining.

## Known gaps

- `docs/pr-assets/pr18/` and `alignment.md` show the page before the 2026-10-19 revamp. Whether they stay in the repo is the owner's call.
- Shared-shell suggestions for PR #17 (not changed here): `project-detail/scenes.ts` `batchReveal` at `y: 28, duration: 0.9` sits outside the bar (8–24px of travel, 1.0–1.2s entrances), and `LoopVideo.tsx` autoplays loops while they are off screen.

Screenshots: outside the repo, in the session scratchpad (`pr18/before`, `pr18/after`).
