# TRACE Workbench project page: brief

Route `/trace-workbench`. Same shell as `/replay-studio`. The owner asked for a revamp on 2026-10-19: the page felt plain, tests do not belong on it, and it should say what TRACE is, how it is used, and show a simple demo. The demo was made by driving the REPLAY Studio preview with TRACE computer use.

## What the page is

- Hero: what TRACE is, plus Fig. 01, the REPLAY sample as TRACE first saw it (Tide).
- 01 What it is: four cards. One window, a fresh picture, one move, four agent CLIs. No test row, no ledger.
- 02 How it's used: scroll fades that picture into the picture after one click (Dusk). Three steps light up with the fade. That is the signature move (`look-again.ts`).
- 03 Demo: a six-second silent loop of the same fade.
- Footer: private repository, no GitHub link.

## The run

19 October 2026. REPLAY Studio browser preview at `http://127.0.0.1:5199/` (repo `replay-studio`, `npm run dev`). The preview's own sample project is "A little less busy", a made-up app named fold. TRACE computer use opened that Edge window, looked, and clicked the Dusk canvas swatch. The frame around the sample changed from blue-green to purple. The Edge chrome is cropped off the figures. The click is the only action the page claims.

Not used: the developer's real REPLAY library. A first launch of the installed app opened an existing recording, and that window was closed without publishing any frame from it.

## Sources for the words

`mogesjohnson/trace-workbench` `main` at `7b2ff921c6c4f129cb7d37ee0a1df801659ae2a0`, package `0.1.0-alpha.2`: README (four CLIs, Windows preview, six computer tools, one desktop lease) and `skills/trace-computer-use/SKILL.md` (observe, one action, fresh picture, release).

## Overrides of RULES.md

- **R1/R2:** shared project-detail components, site tokens, Newsreader / IBM Plex Mono, so the page still lines up with `/replay-studio`.
- **R12:** the page, its media, `public/videos/trace-workbench-demo.*`, the homepage card metrics, and this brief.
- **R14:** branch `grok/add-trace-workbench`, stacked on PR #17.
