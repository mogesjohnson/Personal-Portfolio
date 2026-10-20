# Switchyard project page: verify

METHODS station 5, run on 2026-10-20 against `review/f8-fixes` (PR #17), with the same setup as `../replay-studio/VERIFY.md`: a production build on port 3101 and headless Chrome over CDP, with real wheel input and emulated reduced motion. The commands, the QA checklist rows that belong to the shared shell, and the motion bar rows for the opening, reveals and loop are recorded there and hold here. This file records what is Switchyard's own.

## Commands

| Command | Result |
| --- | --- |
| `npx tsc --noEmit` | Exit 0 |
| `npx eslint website-template src` | Only the 5 errors in `builds/prototype-headers/Environment.tsx` that `main` already has |
| `npm run build` | Exit 0. `/switchyard` prerendered. |
| `node website-template/scripts/smoke.mjs` | 16 checks passed |

## Browser check

| Check | Result |
| --- | --- |
| 1440×900 and 390×844, dark and light, full and reduced motion | Overflow 0 in all 8 runs. No console errors. 0 reveal nodes stuck after a walk. |
| Opening, 1440 | Letters 0.60–0.95 at 450ms and 1.0 by 1.6s. `h1` `aria-label="Switchyard"` with 11 hidden letter boxes. |
| Signature, 1440 dark, 60px wheel steps | Before entry, `p` is 0.02 and the lever lies along the look-alike track (`rotate(0)`). The Library stop fills at `p` 0.11. **The throw** happens between `p` 0.114 and 0.248 (stage top 503px to 443px): the lever goes to `rotate(-90deg)`. Stops and stations then light in order: 2 lit at sample `p` 0.38, 3 at 0.65, 4 at 0.79, and all 5 at 0.92. `p` reaches 1 with the stage top at 83px, so the 1102×301px map is whole on screen for the entire run. Before the fix it was 64% done while the map's lower third was still below the fold. |
| Signature, 390 light | Rail `--p` rises with the list (0.06, 0.24, 0.43, 0.62, 0.72 as the stations scroll up). The lever throws between `p` 0.129 and 0.204. The side-track labels show in the HTML legend; the 4px SVG text is hidden. |
| Resize 1440 to 390 to 1440 with the yard in view | Progress recomputes (`--p` 0.57, 0.43, 0.62). Overflow 0, no errors. |
| Reduced motion | Route offset 0px, every stop and station lit, lever up, rail full, loop on its poster. |
| No JavaScript | Complete page, yard at rest. |
| Demo loop | WebM decode fails in this headless Chrome. The fallback plays the MP4 (`t` 3.95s in view) and pauses off screen. |
| Deep link `#the-yard` | Lands with the section top at 0. |
| Private repo link | "Source mogesjohnson/switchyard Private · collaborators only", `_blank`, `noopener noreferrer`. On its own row at 390. Work card "View repository Private". Checked at 1440 and 390, dark and light. |

## QA checklist

The same results as `../replay-studio/VERIFY.md` › QA checklist. These pages share the shell, the bar, the menu and the loop. Theme toggle: dark to light, pass. Menu Escape: pass. Real phone and screen reader: not run.

## Originality check (`RULES.md`)

- [x] Accent colours: **override recorded.** Site palette by user instruction (BRIEF › Overrides, R1/R2).
- [x] The forbidden-copy grep finds nothing. Its only hits are the GitHub handle in the owner-requested repo link and its BRIEF notes.
- [x] No new particle formation on this page. The homepage `yard` formation came with the original PR.
- [x] The signature move is written in `BRIEF.md` › Score.
- [x] No cited inspirations.

## Motion bar, Switchyard's own rows

| Bar | Result |
| --- | --- |
| Signature is a sequence on a real region | Four beats (approach, throw, run, arrive). It takes the full 72rem column at desktop. On a phone the station list becomes a full-height rail. |
| Feedback register | The throw is 0.45s, and stops and stations take 0.4s, all on `var(--ease-out)`. |
| Scrubs linear | Route progress maps 1:1 to scroll. The no-op `scrub: 0.6` was removed. |
| Finished when reduced | Yes. The static CSS is the thrown, fully drawn yard. |
| Ship gate | The shell is shared by the owner's choice. The stage is this subject's own: a rail switch thrown toward the exact checkout, with side tracks that never light. |
