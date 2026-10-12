# How to post it

Its own section. It names the Post-it Board as the place notes land. It does not explain how the board accepts a note. That join is the connection section.

Updated 2026-10-11 from the owner's current facts and `mogesjohnson/how-to-post-it` on `main` (README, `docs/`, `poller/`). This replaces the 2026-10-09 reading, which described the transcript path as designed but not built, with an 8-second silence threshold. That reading is kept at the end of this file, marked superseded.

## Visitor copy

How to post it holds the docs and the code for getting a conversation with Grok in a Tesla onto the Post-it Board. The docs start at `docs/main-workflow-goal.md`. The code is the transcript poller in `poller/`: Node, no dependencies, and 41 unit tests.

The goal is zero friction while driving. No screens, no typing, no taps. One pin per topic, and one living summary for each topic.

Transcript automation is the primary path, and it has been live since October 11, 2026. The Grok phone app mirrors voice conversations with Ara, the car's Grok, into grok.com history, with timestamps. A poller on an always-on Linux machine reads that history, picks out the voice chats, and waits until a chat has been quiet for 10 minutes. Then it summarizes the chat and sends the result to the board.

The summary comes from a free open-weights model that runs locally: Qwen3.5-2B, CPU only, through llama.cpp. It uses about 1.5–2 GB of RAM and takes roughly 5–20 seconds per summary. It was chosen after testing Gemma 4 E2B and Qwen3.5 0.8B and 4B. An earlier plan to use GitHub Models was retired.

Each topic is one running summary, capped at 1,500 characters. A new chat is merged into the topic it matches, or it starts a new topic. Matching is conservative: a miss makes a separate topic rather than a wrong merge. Every Sunday, a compaction pass trims any summary over 1,500 characters to about 1,000. A health check and twice-daily monitoring watch the poller.

On October 11, 2026, a script outside the browser read full voice-chat text with millisecond timestamps (issue #2). The history requests it relies on are private and undocumented, so the design accepts the terms-of-service risk and the risk that they break.

The second way is to say "post it" to Ara, who can post directly by pushing a file to the board's inbox. That path has not been tested in the car yet.

Superseded: the earlier plan for a custom Android voice app, running its own Ara session through xAI's voice API and built from a Google AI Studio prompt, was never built. Its 8-second silence timer is gone too. Quiet now means 10 minutes.

The license is MIT.

## Links

- This repository: https://github.com/mogesjohnson/how-to-post-it
- Start here: https://github.com/mogesjohnson/how-to-post-it/blob/main/docs/main-workflow-goal.md
- Poller: https://github.com/mogesjohnson/how-to-post-it/tree/main/poller
- License file: https://github.com/mogesjohnson/how-to-post-it/blob/main/LICENSE
- The board named as the destination, which is not a site for this repo: https://mogesjohnson.github.io/post-it-board/

This repo has no homepage URL. Do not invent one.

## Builder notes

- Status as of 2026-10-11: transcript automation is live; Ara's "post it" is written and untested in the car; the Android voice app is superseded and was never built.
- The README now says the repo holds the documentation and spec plus the poller (`poller/`). It contains no secrets: the poller reads them from a local file on the machine that runs it.
- Read path: the poller uses grok.com's own web requests (the conversation list and the load-responses request). These are private and undocumented. The page names the risk. It does not give request details.
- Quiet threshold: 10 minutes. This is a wait before summarizing, not a promised posting time. Do not quote a measured end-to-end time; none was supplied.
- Model figures (about 1.5–2 GB RAM, roughly 5–20 seconds per summary) are the owner's numbers. Do not add others.
- Topic papers: one running summary per topic, capped at 1,500 characters; weekly Sunday compaction trims summaries over 1,500 to about 1,000.
- Issue #2 ("Can an outside script read the Grok app's conversation transcript?") is still open on GitHub. The owner verified the read on 2026-10-11. Say "verified (issue #2)"; do not say the issue is closed.
- The GitHub repo description still reads "voice app spec, AI Studio prompt, and architecture." It is behind the README. Do not use it as the lede.
- `docs/ai-studio-prompt.md` is marked superseded, optional legacy, in the repo. One sentence on the page is enough.
- Cost: the whole system runs at $0. The connection section carries that line, since it spans both repos.

## Do not say

- Secrets, cookie or token details, request headers, or how to call the grok.com requests.
- The Supabase project ref or URL, the bot or owner account emails, or Actions secret names.
- Any private chat content, including the title of the pinned Grok chat that `docs/main-workflow-goal.md` points at.
- That Ara's "post it" path has been tested in the car.
- That a note appears a set number of seconds or minutes after a chat ends.
- Anything beyond one sentence on the Android voice app. Do not spec the widget, the voice session, or the AI Studio prompt.
- How the test script or the JSON templates work.

## Open questions

- Whether Ara can push the inbox file from the car. The instructions exist. They are untested.
- The always-on machine is not named on the page.

## Superseded: the 2026-10-09 reading

Kept for history. None of this is current.

- The repo was documentation only, with no application code. Transcript automation was "designed," its transcript-reading method unverified, and the poller (issue #4) not built.
- Silence threshold: default 8 seconds, tunable from 5 to 30, checked from an always-on machine on a 5–10 second poll. Replaced by the 10-minute quiet window.
- The goal line read "one pin per topic, one page per conversation." Replaced by one living summary per topic.
- The custom Android voice app (its own Ara session through xAI's realtime voice API, generated from a Google AI Studio prompt) was already superseded and not built. Issue #3 was a documentation-only fallback if the transcript could not be read; the read now works.
