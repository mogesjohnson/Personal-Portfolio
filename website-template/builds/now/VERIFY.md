# Verify — /now

Checked 2026-10-20 on `review/now-fixes` (this branch merged with `main` at `74d061a`), production build (`npm run build`, then `npm start -- -p 3103`), headless Chrome 1x over the DevTools protocol. The 2026-10-10 check ran against a dev server and did not build. It is replaced.

## Commands

- `npx tsc --noEmit`: exit 0.
- `npx eslint website-template src`: 5 errors, all in `website-template/builds/prototype-headers/Environment.tsx`, a file this branch does not touch (the 5 known on `main`). None in `builds/now`, `src/app/now`, `src/data`, or `src/components`.
- `npm run build`: exit 0. `/now` prerenders as static.
- `node website-template/scripts/smoke.mjs`: not run. `lib/`, `connectors/`, and the spec did not change.

## Originality (RULES.md)

- [x] Accent colours are the live site tokens, not `motion-system.json`'s kit accents. `BRIEF.md` records the override of R2's palette line.
- [x] Banned-phrase grep: the only hits are `mogesjohnson` in the three outbound URLs in `NowPage.tsx`, the source notes in `BRIEF.md`, and "Moges" in the brief's audience line. No homepage slogan or copy.
- [x] No particle formation.
- [x] The signature (rule draw) is written in `SCORE.md` and implemented in `rule.ts`.
- [x] `CONCEPT.md` reduces each principle to a sentence. No outside site was copied.

## Motion bar (How-Claude-Motion.md, `still`)

- [x] One move. `NowMotion` mounts `ruleDraw()` only: `scaleX` 0 → 1, origin left, 0.9s, `expo.out`, once. Sampled every 150ms from load at 1440: 0, 0.712, 0.926, 0.986, 0.998, 1, 1, 1.
- [x] One arrival voice: `expo.out`. Feedback (link color) is 0.25s, well clear of the entrance register.
- [x] Rest pose is the same picture in reduced motion and without JS: rule `transform: none`, 1152px wide at 1440, 350px at 390.
- [x] CSS failsafe: in full motion the rule is parked at `scaleX(0)` with `nw-rule-failsafe` at 3.5s, and the scene cancels it with `animation: none`.
- [x] Real text in the DOM: the sheet's `innerText` is 1,263 characters in every mode, with JS disabled too. Nothing is split or hidden.
- [x] No clipping: no element in the sheet has `scrollWidth > clientWidth` with hidden overflow, and none extends past the viewport, at 1440 and 390.
- [x] Shared chrome stays shared. /now adds no `DispatchBar` rules. The old `.now-log .dispatch-burger` duplicate and the /now-only amber `aria-current` color are gone, so the bar and menu match `/projects`.
- [x] Designed page, not a leaflet: display title (184px at 1440, 80px at 390), a stamp column per thread with the state word at display size, and the sentences on a 40rem measure inside the 72rem sheet.
- [x] Real type: Geist for words (title, lead, body), IBM Plex Mono for stamps, the same mono the `DispatchBar` uses. The lead no longer inherits the homepage's `.now-head` (`600 11px` Geist Mono), which is why the classes moved to `nw-`.

## QA (`motion-system.json` › `qa.checklist`)

- pass: lint (same 5 pre-existing errors), `tsc`, and `build`.
- pass: first visit. With an empty `sessionStorage` and motion on, the flags mark `data-intro="on"`. `NowMotion` turns it off, so the page is not scroll-locked (wheel 500 scrolled to 388px at 1440, 496px at 390) and the rule draws. Before this fix the same visit stayed `scroll-locked lenis-stopped` at `scrollY` 0, and the rule waited for an intro that never plays.
- n/a: intro skip and intro focus. /now has no intro.
- n/a: deep links. /now has no section ids.
- pass: Ctrl+K on the homepage, type "now": one result, "Open Now". Enter routes to `/now`.
- pass: the `DispatchBar` menu on /now opens from the burger, lists Projects, Now, Shadow Army, Protocol under "External site pages" with Now as `aria-current="page"`, and Escape closes it. The homepage phone menu at 390 lists Now.
- n/a: scrolling inside modals, palettes, or code blocks. /now has none.
- pass: theme. Dark title `rgb(236, 238, 242)`, body `rgb(179, 186, 198)`. Light title `rgb(13, 17, 23)`, body `rgb(58, 67, 81)`.
- pass: reduced motion (`prefers-reduced-motion: reduce` via `Emulation.setEmulatedMedia`): `data-motion="reduce"`, rule drawn, all copy present.
- pass: JavaScript disabled: `data-motion="reduce"`, rule drawn, all copy present, no overlay.
- n/a: pinned track, particle budget.
- pass: no horizontal overflow at 1440 and 390, dark and light, full and reduced (`scrollWidth - innerWidth` = 0 in all eight).
- not run: a real phone and a screen reader pass.
- Console: no errors or warnings in the run.

## Homepage header

`.nav-external` adds Now (28px wide, plus the 16px group gap). Measured with the Résumé pill in place (114px). PR #17 later removed the pill, which gives each width 114px more slack:

| Width | External links shown | Header slack | Overflow |
| --- | --- | --- | --- |
| 1440 | Projects, Now, Shadow Army, Protocol | 312px | 0 |
| 1280 | Projects, Now, Shadow Army, Protocol | 152px | 0 |
| 1201 | Projects, Now, Shadow Army, Protocol | 73px | 0 |
| 1100 | Projects, Now | 149px | 0 |
| 961 | Projects, Now | 70px | 0 |

Slack is the header's inner width minus the widths of its visible children. Every gap between header groups stays at 24px.

Screenshots: outside the repo, in the session scratchpad (`pr14/`).
