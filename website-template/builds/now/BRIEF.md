# Brief — /now

- Kind: page.
- Host app: the portfolio at `C:\Users\johns\projects\website`, route `/now`.
- Audience: someone checking what Moges is actually in the middle of.
- One message: two threads are open. The post-it repos already stand apart. The missing piece is handing a chat to the board's writer. Shadow Army v2 is still a spec, and the work in it is the terminal screens.
- Content inventory: the sentences in `NowPage.tsx`. Facts are from the owner (2026-10-10) and from the repo reads the same day. Nothing else is invented.
- Constraints: site palette and shared `DispatchBar` (CONNECTIONS.md). This overrides R2's ban on the live amber/sky palette for a page of this site. Do not publish secrets, the v2 spec, ADRs, vault notes, or transcripts. Do not restates the `/projects` essays.
- Motion budget: calm. One rule draws in. No particle field, no intro.
- Deferred: the ideas.md radar, timeline, and shelf. This request is a short status, not that room.

## Sources checked 2026-10-10

- `mogesjohnson/how-to-post-it` README and `docs/main-workflow-goal.md`. Latest commit `32b0e4f` (2026-10-07).
- `mogesjohnson/post-it-board` recent commits. Latest `703ca04` (2026-10-07).
- `mogesjohnson/shadow-army` README and recent commits through `f7e121f` (2026-10-08). Spec headings only. The spec body is not visitor copy.

## What the docs confirm

Post-it Board and How to post it are each in good shape. The board is live. The inbox is live: a JSON file on the board's `inbox` branch starts GitHub Actions, which runs `scripts/post.mjs` and writes the note. The open work is the front of that pipe. A conversation's context still has to reach a writer that files the command. The written watcher is designed and not built. Quiet, in that design, defaults to 8 seconds and can be set from 5 to 30. Ara's "post it" path is written and untested. Whether a car chat comes back as text is still open.

The owner described that writer as an agent that sends a GitHub pull request. The README does not. `main` changes through a pull request. The post itself is the inbox command, and that push runs the script. The page says it that way.

Shadow Army's README still marks v1 as legacy and points at a Claude-first design. Commits since the v1 line are the v2 spec: spike findings, steering, a clear state, and the design canvas at version 14. The spec status line is draft. The visual work in that spec is the terminal: a docked pane, an army strip, meters, tags, drawn at 144, 110, and 80 columns and 24 rows. A demo prototype of those screens is what comes next. `/shadow-army` on this site stays a fixed mock.
