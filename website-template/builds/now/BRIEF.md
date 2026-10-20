# Brief — /now

- Kind: page.
- Host app: the portfolio at `C:\Users\johns\projects\website`, route `/now`.
- Audience: someone checking what Moges is actually in the middle of.
- One message: two threads are open. The car-to-board Post-it path has run on its own since 2026-10-11. Shadow Army v2 is still a spec.
- Content inventory: the sentences in `NowPage.tsx`. Every one traces to a source below. Nothing else is invented. A claim that could not be checked was cut.
- Constraints: site palette and shared `DispatchBar` (CONNECTIONS.md). This overrides R2's ban on the live amber/sky palette for a page of this site. Do not publish secrets, cookie or request details, bot or account emails, the v2 spec's contents, ADRs, vault notes, or chat transcripts. Do not restate the `/projects` essays. The `/projects` section files' "Do not say" lists apply here too.
- Motion budget: `still` (How-Claude-Motion.md › Choose a budget: "a one-glance status"). One move, the rule under the title. No reveals, no particle field, no intro.
- Deferred: the ideas.md radar, timeline, and shelf. This request is a short status, not that room.

## Sources, checked 2026-10-20

This replaces the 2026-10-10 reading. That reading said the transcript watcher was "designed and not built", that quiet meant 8 seconds (5–30), and that the missing piece was handing a chat to the board's writer. PR #16 (merged to `main` as `74d061a`) corrected all three on 2026-10-11, and the repos confirm it.

On `main` of this repo:

- `website-template/builds/projects-page/sections/how-to-post-it.md` (updated 2026-10-11): transcript automation is the primary path and has been live since 2026-10-11; a poller on an always-on machine reads the voice chats, waits for 10 minutes of quiet, summarizes with a local model, and sends the result to the board; one running summary per topic; Ara's "post it" is written and untested in the car; the 8-second timer is superseded.
- `website-template/builds/projects-page/sections/connection.md` (updated 2026-10-11): the poller is the writer; it pushes to the board's `inbox` branch; GitHub Actions runs `scripts/post.mjs`; "the board is live, and so is the transcript path from the car."
- `website-template/builds/projects-page/sections/shadow-army.md`: the prototype is a v2 mock-up of the Claude component, the session at `/shadow-army` and the protocol at `/agent-protocol`; the repository is private; do not describe the v2 spec or the ADRs.

With `gh`, 2026-10-20:

- `mogesjohnson/how-to-post-it` README on `main`. Goal: "No screens, no typing, no taps while driving." Status table: poller built and "running on the box"; "Ara pushes to inbox on 'post it'": instructions written, "Untested". Commits: `cd88042` (2026-10-11) "quiet threshold 10 min", `9da71bd` (2026-10-12) "Add the transcript poller", `03efd1b` / PR #12 merge `2b651cd` (2026-10-18) "Poller: skip throwaway chats (directions, weather, lookups, timers, music, greetings) before summarizing".
- `mogesjohnson/post-it-board` `main`. `bb24625` / PR #7 merge `6c5c93a` (2026-10-18): "Topics view as a folder tree … name search". README: Topics is a folder tree with "Search folders by name".
- `mogesjohnson/shadow-army` (private) README on `main`: `status: v1 legacy, Claude-first design next`; "your Claude Code session is the Monarch, and every soldier is a live session of its own CLI"; "v1 is frozen at the `v1.0.0` tag". `docs/spec/v2.md` status line only: "Draft for review". Latest commit on `main`: `ab04992` (2026-10-14), "Merge PR #74: adopt the owner's v2.1 picks in spec v0.5". The page says "spec revised 14 Oct 2026" and nothing about the spec's contents.

## Cut, and why

- "A docked soldier pane, an army strip, meters, short tags", "144, 110, and 80 columns, on 24 rows", "canvas version 14". These are v2 spec contents, which this brief and `shadow-army.md` keep off visitor pages. They are also out of date: the spec now sets the v2.1 "Margin" composition (ADR-0015) as the default, with the pane shown only when asked for.
- "A demo prototype of those screens is next." An owner statement from 2026-10-10 that no repo confirms today.
- "The Shadow Army page on this site stays a fixed mock." PR #13 made the prototype pages play scripted scenes. The page now calls them a mock-up, as `shadow-army.md` does.
- "Whether a car chat comes back as text is still open." Answered 2026-10-11: issue #2 verified the read.
- `post-it-board` `426dbd0` (2026-10-18), a read-only MCP server and Supabase Edge Function for Grok connectors. Its own commit calls the server a draft, not deployed, and the board README still says "No Edge Functions". Deployment could not be confirmed, so the page leaves it out.
- The private Shadow Army repo link. It returns 404 for a visitor. The page says the repository is private instead.

## Not on this page, by rule

Cookie, token, or request details; the bot account email; Actions secret names; the always-on machine's name; any end-to-end posting time; private chat content.
