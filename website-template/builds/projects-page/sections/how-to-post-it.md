# How to post it

Its own section. It names the Post-it Board as the place notes are meant to land. It does not explain how a note is accepted. That join is the connection section.

Source: `mogesjohnson/how-to-post-it` on `main`, read 2026-10-09 with `gh repo view`, the README API, and the docs the README status table points at (`docs/transcript-automation.md`, `docs/ara-instructions.md`, `docs/ai-studio-prompt.md`), plus `docs/main-workflow-goal.md` and `docs/risks.md`. No other repository was opened.

## Visitor copy

How to post it is a documentation and spec repository. Its subject is a conversation with Grok in a Tesla, and the place that conversation is meant to land is the Post-it Board. This repository is not a live car workflow.

The goal is zero friction while driving. One pin per topic. One page per conversation. No screens, no typing, no taps.

Two ways of posting are written down. Neither is live. The board is the live product. These two paths are not.

The recommended way is transcript automation. The design is: when a conversation goes quiet, summarize it and pin it, even if nobody said "post it." Quiet means 8 seconds by default, and that wait can be set from 5 to 30 seconds. Eight seconds is a minimum quiet time in the design, not a promise that a note appears then. The design is written. The method for reading a transcript is unverified, and the automation is not built.

The second way is to say "post it" to Ara, the car's Grok. Instructions for that are written. They are untested. The repository does not establish that Ara can write to GitHub.

A custom Android voice app was considered earlier. It is superseded, and it was not built.

The license is MIT.

https://github.com/mogesjohnson/how-to-post-it

## Links

- This repository: https://github.com/mogesjohnson/how-to-post-it
- License file: https://github.com/mogesjohnson/how-to-post-it/blob/main/LICENSE
- The board named as the destination, which is not a site for this repo: https://mogesjohnson.github.io/post-it-board/

This repo has no homepage URL. Do not invent one.

## Builder notes

- The README calls this a documentation and spec repo, with no app and no secrets. That holds for an application. The tree on `main` is the README, `LICENSE`, `.gitignore`, seven docs, three JSON templates, and one shell helper, `scripts/send-test-command.sh`. A scan of those files found no secret-shaped strings. The only branch is `main`. GitHub reports the language as Shell because of the helper. The page does not mention the helper, the templates, or how to run anything. The helper talks to the board. That is not a live car path.
- The GitHub description still says "voice app spec, AI Studio prompt, and architecture." It is behind the README. Do not use it as the lede. The voice app is the superseded path.
- Status table in the README, matched by the docs: the board is live; transcript automation is designed, its transcript-reading method is unverified, and it is not built; Ara's "post it" instructions are written, and her GitHub access is unverified; the Android voice app is superseded, the generation prompt is kept, and the app was not built.
- `docs/transcript-automation.md` says the reading step is unverified and that the silence loop, summary, and dedup after that step are specified, including pseudocode. Specified is not built. Issue #4, "Build the transcript poller," is open.
- Silence, from the README and the transcript doc: default 8 seconds, tunable from 5 to 30. The same docs say this is a minimum quiet time, checked on a poll, not a deadline. A GitHub Actions cron cannot run more often than every 5 minutes, so cron cannot mean "posted within 8 seconds." The written design checks from an always-on machine while a conversation looks active, on a 5–10 second poll. Those are design figures, not measured results. Visitor copy keeps the 8 second default and the 5–30 range, and it does not quote the poll or the cron.
- The Ara instruction file also answers "pin it" and "post that." Visitor copy says "post it" only. The same file tells her to say "Posted." and to honor "don't post this." None of that has been tested. The doc records that no `ara-` result has appeared yet. This section does not describe result files.
- The transcript design is meant to update the same page if the conversation continues, and not to pin twice. Say that only as design, and do not specify the command. The connection section owns the join.
- Issue #2 is open: whether an outside script can read the Grok app's conversation transcript. Issue #3 is an open, documentation-only fallback if that read fails. The page does not describe either fallback, including the Android prompt.
- License file: MIT. Copyright (c) 2026 Moges Johnson. Created 2026-10-06, updated 2026-10-07. Public.
- `docs/main-workflow-goal.md` is the plain-language overview. Its "start here" title is a pointer at a pinned Grok chat. The page does not repeat that title.

## Do not say

- That the car posting is live, that a transcript can be read, or that Ara can write to GitHub.
- That a note appears 8 seconds after silence, or any measured posting time. The 8 seconds is a designed quiet threshold. The path is not built.
- The bot email, token recipes, secret names, or keystore notes.
- Undocumented endpoint instructions, or how a transcript would be read.
- The inbox protocol: ops, statuses, typo matching, and which branch owns the inbox.
- How the test script or the JSON templates work.
- Anything beyond one sentence on the custom Android voice app. Do not spec the widget, the voice session, Bluetooth, or the generation prompt.
- The GitHub description's voice-app-first framing.
- Setup chores from the checklist, including passwords, tokens, and where a machine should run.

## Open questions

- Whether a car voice conversation comes back as text, or only as a title and timestamps. The docs leave this unverified. Issue #2 is open. Do not answer it on the page.
- Whether timestamps are precise enough for an 8 second threshold. The docs say minute-level or "2 min ago" times would not do, and that this has not been checked on a real car conversation.
- Whether Ara can create a file in GitHub. Instructions exist. They are untested.
- Issue #4 is the build of the transcript poller, and it is open. There is no tuned silence value from real drives. The documented default remains 8 seconds, inside 5–30, until then.
- The always-on machine in the design is not named.
- Issue #3, the fallback if a transcript cannot be read, is documentation only. The overview says that if the text cannot be read at all, that fallback still needs some other way to get the text. The page does not present it as a ready path.
