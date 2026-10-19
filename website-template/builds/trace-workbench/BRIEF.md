# TRACE Workbench project page: brief

Route `/trace-workbench`, mounted from `src/app/trace-workbench/page.tsx`. Same shell as `/replay-studio` (the owner said that page is the one to keep). Shorter, on the owner's request of 2026-10-19: a direct test line, then a few recorded examples. The Shadow Army page was the length reference.

## Brief

- **Kind:** page. **Host:** this portfolio. **Audience:** someone coming from the Work section or the menu.
- **One message:** TRACE is local Windows tools for Codex, Claude Code, Grok Build, and Gemini CLI. Two skills: reverse engineering, and computer use.
- **What the page is:** two sections in the shared project-detail components.
  - Hero: eyebrow, title, version line, one-sentence pitch, and four facts. The facts are the test line: 109 passed, 1 symlink skip, 6 computer tools, 207 analysis tools.
  - 01 What it does: four cards. The intro sentence names the skip (a file-symlink check that needs Windows developer mode).
  - 02 Examples: three recorded runs in one frame. Scroll lights each row. That is the signature move (`example-run.ts`).
  - Footer: private repository, no GitHub link. `portfolio.ts` leaves out `githubUrl`.
- **Left off on purpose:** the landing-page signal field, the 22-row Calculator log, the setup-command terminal, the scope ledger, and the future-skills list. The owner asked for the test result in one place, then examples tied to the project.
- **No screenshots.** The Calculator frames are 323×534 and the alpha.2 fixture frames are 564×697, both at 1x. The examples are text.

## Sources

Read 2026-10-19 with `gh` from `mogesjohnson/trace-workbench` `main` at `7b2ff921c6c4f129cb7d37ee0a1df801659ae2a0`, package `0.1.0-alpha.2`. Nothing on the page is newer than these files.

- `README.md`: version, Windows preview, the four CLIs, the two skills, six MCP tools, 109 passed and 1 skipped, 207 analysis tools, four client registrations, and what remains open.
- `SKILLS.md`: skill status. Computer Use's executor and six tools are implemented. Acceptance with every host is still open. Grok and Gemini live coverage is reported separately.
- `docs/VERIFICATION.md` and `evidence/0.1.0-alpha.2/checks.json`: 109 passed, 0 failed, 1 skipped. Skip reason: creating a file symlink needs developer mode on that Windows host. Review date 19 October 2026. Codex connection check passed. Full agent-task acceptance is pending.
- `evidence/0.1.0-alpha.2/computer-live.json` and `independent-review.json`: seven actions, eight PNGs, typing, value, coordinate click, invoke, checkbox, lease. Visible end state: counter 2, option checked.
- `docs/OBSERVED-WORKFLOW.md`: Calculator, five clicks, frames `0 → 1 → 12 → 12× → 3 → 36`, two reviewers, 18 October 2026. That run used the earlier executor. It does not establish the alpha.2 executor.
- `docs/VERIFICATION.md` analysis table: two packaged REPLAY modules parsed, package hash unchanged. That check is from the alpha.1 foundation and is still the recorded REPLAY example.

## Overrides of RULES.md

- **R1/R2:** the page uses the shared project-detail components, the site tokens, and Newsreader / IBM Plex Mono, so it lines up with `/replay-studio`.
- **R12:** `src/app/trace-workbench`, `src/data/portfolio.ts`, the homepage `trace` formation, `README.md`, and `CONNECTIONS.md` carry the same facts. The formation draws both skills solid, because Computer Use now has an executor.
- **R14:** branch `grok/add-trace-workbench`, stacked on `grok/add-replay-studio-switchyard` (PR #17).

## Score

- Shared kit: `splitHeadings`, `batchReveal`, `scrubWords`. Reduced motion leaves them static.
- **Signature: `example-run.ts`.** The examples list is the trigger. Start `top 65%`, end `bottom 75%`. Progress sets `.is-dim` on each row until it passes that row's `data-at` (0.18, 0.48, 0.78). Static state: every row lit.
