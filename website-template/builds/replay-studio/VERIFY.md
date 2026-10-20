# REPLAY Studio project page: verify

METHODS station 5, run on 2026-10-20 against `review/f8-fixes` (PR #17), on a Windows 11 machine. The production build ran under `npm start -- -p 3101` and headless Chrome was driven over the DevTools protocol. Inputs were real `Input.dispatchMouseEvent` wheel events, `Emulation.setEmulatedMedia` for `prefers-reduced-motion`, and `Runtime.evaluate` for state. The screenshots stayed outside the repo.

The shared shell (`project-detail/`, `project-footer/`) is verified here and in `../switchyard/VERIFY.md`.

## Commands

| Command | Result |
| --- | --- |
| `npx tsc --noEmit` | Exit 0 |
| `npx eslint website-template src` | 5 errors, all in `builds/prototype-headers/Environment.tsx` (`react-hooks/set-state-in-effect`). They exist on `main` too. None are in files this PR touches. |
| `npm run build` | Exit 0. Compiled; 9/9 static pages, `/replay-studio` included. |
| `node website-template/scripts/smoke.mjs` | 16 checks passed (run although `lib/`, `connectors/` and the spec did not change) |

## Browser check

| Check | Result |
| --- | --- |
| 1440×900 and 390×844, dark and light, full and reduced motion (8 runs per route) | Horizontal overflow 0 in every run. No console errors or warnings apart from Next's CSS preload notice. After a wheel walk to the bottom, 0 `[data-reveal]` nodes are left below opacity 1. |
| Opening, full motion, 1440 | Title letters reach 0.46–0.95 opacity at 450ms and 1.0 at 1.6s. Kicker 0.81, lead 0.41, screenshot 0.21 at 450ms, all 1.0 by 1.6s. The `h1` has `aria-label="REPLAY Studio"` and 14 `aria-hidden` letter boxes, so the real string is read once. |
| Signature, 1440 dark, real wheel input in 60px steps | Starts with the stage whole on screen (top 506px): `t` 0.10 lights step 1. At `t` 0.36 the callout clip is live. At 0.50 both clips are live and steps 1–3 are lit. At 0.77 steps 1–4 are lit. At 0.90 all five are lit. `t` 1.0 and 00:08.0 come with the stage top at 86px. Before the fix, step opacity stayed 1.00 while `.is-dim` was set. |
| Signature, 390 light | 350×327px stage. It runs from top 459px to top 39px, with the same beat order. |
| Reduced motion | `data-motion="reduce"`, 0 hidden nodes in `.pd`, `--t: 1`, timecode 00:08.0, all steps lit, loop paused on its poster. |
| No JavaScript (`Emulation.setScriptExecutionDisabled`) | Complete page: hero, screenshot, timeline at rest. |
| Demo loop | Paused at the top of the page (`t` 0). Plays when in view (`t` 6.13s on the MP4). A reader's Pause sticks after scrolling away and back. It pauses when scrolled off. On this machine headless Chrome fails to decode the WebM with hardware VP9 (`PIPELINE_ERROR_DECODE`; it plays with `--disable-accelerated-video-decode`), and the new fallback switches to the MP4. |
| Menu, 390×560 | The nav overflows (594px content in 428px). A wheel scrolls it 166px while the page stays at `scrollY` 0. Escape closes it and it goes inert. |
| Deep links `#make-a-demo`, `#screens` | Land with the section top at 0. No errors. |
| Theme toggle | Dark to light. The loop toggle follows the tokens (light pill, dark text). |
| Private repo link | The footer link is "Source mogesjohnson/replay-studio Private · collaborators only", with `target="_blank"` and `rel="noopener noreferrer"`. At 390 it takes its own row (350px wide). The homepage Work card reads "View repository Private" with the same attributes. Checked at 1440 and 390, dark and light. |
| `/` and `/projects` | Load in every matrix run, with overflow 0 and no errors. |

## QA checklist (`motion-system.json` › `qa.checklist`)

| Item | Result |
| --- | --- |
| lint, tsc and build pass | Pass for this change. The 5 lint errors above are on `main` already. |
| Intro plays once; reload does not replay | n/a. This page has no title sequence, and `useNoIntroHold` releases the hold. A fresh profile scrolled normally. |
| Skip the intro with keys, wheel or touch | n/a |
| Tab during the intro focuses skip | n/a |
| Deep links load and land | Pass (`#make-a-demo`, `#screens`) |
| Ctrl/⌘K palette | n/a. The DispatchBar pages have no palette. |
| Mobile menu opens, Escape closes, no scroll behind | Pass |
| Scroll inside every modal, palette and code block | Pass for the menu nav (now `data-lenis-prevent`). The `<details>` drawer is not a scroll container. |
| Theme toggle | Pass (dark to light). The circle animation was not timed. |
| OS reduced motion | Pass |
| JavaScript disabled | Pass |
| Resize across 1024px with a pinned track | n/a. There is no pin. |
| CPU throttle with particles | n/a. There is no field. |
| Real phone check | Not run. Only emulated 390×844 and 390×560 (touch emulation). |
| Screen reader pass | Not run with a screen reader. The DOM check shows the title read once through `aria-label`. |

## Originality check (`RULES.md`)

- [x] Accent colours: **override recorded.** The user asked for the site palette (BRIEF › Overrides, R1/R2), so the page uses the `globals.css` tokens, which are the kit's `accent` / `accent-2`. That is by instruction, not a new palette.
- [x] The forbidden-copy grep finds nothing. Its only hits are the GitHub handle in the owner-requested repo link (`mogesjohnson/replay-studio`) and its BRIEF notes.
- [x] There are no particle formations on this page. The homepage `reel` formation was added in the original PR, not here.
- [x] The signature move is written in `BRIEF.md` › Score. This build merges stations 1–3 into the BRIEF.
- [x] No cited inspirations. `How-Claude-Motion.md` principles were applied as written.

## Motion bar (`How-Claude-Motion.md`)

| Bar | Result |
| --- | --- |
| One arrival voice | `expo.out` for every arrival. CSS state changes use `var(--ease-out)`. |
| Registers | Feedback 0.3–0.45s (clips, steps, lever). Entrances 1.0–1.15s (hero, headings, reveals). Nothing sits in the 0.8–0.95s middle. |
| Stagger under 0.6s | Title 0.42s, followers 0.16s, reveal batches 0.07s per item (4 cards: 0.21s). |
| Body travel 8–24px | Reveals 20px, followers 16px, hero screenshot 24px. |
| Scrubs linear | Progress maps 1:1 to scroll. The no-op `scrub: 0.6` was removed. |
| Split text in the DOM once | Yes, through SplitText's `aria-label` and hidden boxes. |
| `data-lenis-prevent` | On the menu nav. The details drawer does not scroll inside. |
| Signature is a sequence on a real region, visible in full motion, finished when reduced | Yes: about 700×300px, four beats, rest pose at `t = 1`. |
| The opening is the loudest beat; later sections still arrive | Yes |
| Loops quiet and late | They play only on screen and pause under reduced motion. |
| One ticker; `Scene`s; module-level SCENES | Yes. The scenes are `ScrollTrigger`s on the runtime's Lenis/gsap ticker, torn down by `startMotion`. |
| Ship gate: pages not one composition with the nouns swapped | The shell is shared by the owner's choice. The stage is this subject's own: an editor timeline played by scroll, with clips going live. |
