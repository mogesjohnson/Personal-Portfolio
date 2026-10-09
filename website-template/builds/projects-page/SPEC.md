# Projects page — spec

Spec only. No page code in this pass.

The section files are the checked copy. Each project was read on its own on 2026-10-09, and the connection was written separately:

- `sections/shadow-army.md`
- `sections/post-it-board.md`
- `sections/how-to-post-it.md`
- `sections/connection.md`

Where this file and a section file disagree, the section file wins.

## Brief

| Field | Value |
| --- | --- |
| Kind | Page |
| Host app | The portfolio Next.js app at the repo root. Route `/projects`. The route file, when this is built, is `src/app/projects/page.tsx`. The page shares the existing root layout. It is a page of the main site, linked from it. |
| Build folder | `website-template/builds/projects-page/` |
| Audience | A visitor who followed a link from the homepage, or who wants the GitHub repos behind the AI-first work. |
| Message | Three repositories. Two of them are one system, shown apart and then joined. Shadow Army on this page is v1, and v1 is legacy. |
| Motion budget | Calm. No particle field, no intro sequence. |
| Content | Facts below, or `[[placeholder]]`. Nothing invented. |

## Scope

In:

- [mogesjohnson/shadow-army](https://github.com/mogesjohnson/shadow-army), and only its v1 line.
- [mogesjohnson/post-it-board](https://github.com/mogesjohnson/post-it-board).
- [mogesjohnson/how-to-post-it](https://github.com/mogesjohnson/how-to-post-it).
- A connection section that joins the last two after each has had its own section.

Out:

- Any other repository, including the Active Directory lab, the C++ suite, and this portfolio.
- The Claude-first redesign of Shadow Army. The page may say, in one sentence, that v1 is legacy and a Claude-first design is what comes next. It does not explain that design, and it does not link into `docs/claude-first.md` as if this page were about it.
- Building, routing, or styling the page. That is a later pass.

## Page order

The order is fixed.

1. Intro.
2. Shadow Army. The section states up front that it is about v1, and that v1 is legacy.
3. Post-it Board, on its own.
4. How to post it, on its own.
5. The connection. This section is the first place the two post-it repositories are explained together.

Each project section ends with its GitHub link. Post-it Board also links its live site. The connection section links both repositories again.

## Intro

One short opening: this page is the AI-first work, and each project links to its repository.

Do not call the page a complete list of every repository. The inventory of this spec is the three repositories above.

`[[placeholder: one sentence in Moges's voice for the opening]]`

## Shadow Army — v1, legacy

The section's first line is a note, in the page's own words, with this meaning: this section is v1, and v1 is legacy.

Source, README on `main`, read 2026-10-09:

- On `main` and on tag `v1.0.1`, the README status line is `v1 legacy, Claude-first design next`, and it says v1 is frozen at `v1.0.0`.
- The README at tag `v1.0.0` does not say legacy. Its status line is `pre-alpha — README first, code feature by feature`.
- Tags that exist: `v1.0.0` and `v1.0.1`. `v1.0.1` is 9 commits after `v1.0.0` and that range includes source files, not only the legacy note. `main` is 12 docs-only commits after `v1.0.1` (`docs/adr/0008`–`0014` and `docs/spec/v2.md`). Those later docs stay off the page.
- `package.json` `version` is `0.1.0` on `main` and on both tags. The page must not call the package version 1.0.0. Node `>=20` is `engines` in `package.json`. The README tech line does not say it.
- The page talks about the v1 line. It does not describe the Claude-first document. What to tell a visitor about `v1.0.1` is still `[[placeholder]]`.

What v1 is, from that README:

- A personal CLI that commands other AI coding CLIs as an army with isolated context.
- Tagline in the README: "One monarch. Many shadows. Zero shared baggage."
- Commands: `sa` and `shadow` (`package.json` `bin`).
- Modeled on a chief-of-staff pattern: one Monarch plans and delegates, each soldier gets a brief with only what the task needs, and a report comes back. Soldiers never see each other's transcripts.
- Terms to use if the page needs them: Monarch, Soldier, Brief, Report, Shadow Vault (`.shadow/`), Formation.
- The v1 README's soldier table, quoted as that table and not as an independent product claim: Codex (`gpt6-astra`) as Monarch, Codex (`gpt6.1-sol`) as work-horse, Claude (Opus 5.5) as second orchestrator and reviewer, Claude (Sonnet 5.5) as work-horse, Grok Build (`grok`) as work-horse that never reviews, Antigravity (`agy`) for research and testing only, no coding. The hard rules (Grok never reviews, `agy` never writes) are enforced in code.
- Four ways v1 keeps soldiers apart: disjoint path claims in the brief, a git worktree per soldier, a vault lock registry with TTL and heartbeat, and a claim audit that rejects out-of-scope edits.
- Soldiers do not edit the working folder directly. `sa run` applies the result as uncommitted edits. Nothing is committed for the user.
- Stack named in the README and `package.json`: TypeScript on Node `>=20`, Ink, commander, execa, vitest. MIT license.
- The repo is private (`visibility: PRIVATE`, and `package.json` `"private": true`). The GitHub link is still the one requested. The page says the repository is private, so a visitor without access will not see the code.

Do not use the README roadmap checkboxes as proof. On 2026-10-09 every box from F1 through F9 was unchecked, while the README body describes the CLI above. The page does not say the roadmap is finished, and it does not say the CLI was run as a test for this spec.

GitHub link: https://github.com/mogesjohnson/shadow-army

## Post-it Board

Its own section. It does not explain How to post it, and it does not explain the car workflow. Those belong later.

Source, README on `main`, read 2026-10-09:

- A static site that looks like a classroom corkboard. Plain HTML, CSS, and vanilla JS. No framework, no build step, no dependencies.
- Live site, GitHub Pages from `main`: https://mogesjohnson.github.io/post-it-board/
- Data model: a day, then a pin (one topic), then one or more pages (notes). Pin colors named in the README: yellow, pink, blue, green.
- Storage: Supabase. Tables `days`, `pins`, `pages`, and `board_owners`, with row level security. The anon key can read. A write is kept only for a signed-in board owner. Turning public sign-ups off is what the setup doc says. This pass did not read that switch on the live project.
- Anyone can read the board. The owner tools show for demo mode and for any signed-in user. An account that is not in `board_owners` still sees the tools, and the database rejects the write. Do not say the buttons are hidden unless you are a board owner.
- Demo mode uses `localStorage` when `config.js` is empty. `config.js` on `main` is filled, and Pages serves that tree, so the live site is not the demo. Do not describe the demo seed notes as the live board.
- Deleting a pin deletes its pages. Deleting a day deletes its pins. There is no license file. Do not say MIT.
- Shareable hashes look like `#day=2026-10-05&pin=<id>&page=2`.
- `main` is protected by a pull-request ruleset. The page may say changes to `main` go through a pull request. It does not recite the ruleset id or the bypass settings.

GitHub link: https://github.com/mogesjohnson/post-it-board

Live link: https://mogesjohnson.github.io/post-it-board/

## How to post it

Its own section. It names the board as the place notes land, and it does not yet explain the inbox protocol. That belongs in the connection.

Source, README on the default branch, read 2026-10-09:

- A documentation and spec repository. No application source and no secrets. The tree also has `scripts/send-test-command.sh` and three JSON templates. The page does not mention them. The only branch is `main`. The GitHub description still leads with the voice app and is behind the README. Do not use it as the lede.
- Subject: how a conversation with Grok in a Tesla reaches the Post-it Board.
- Goal, from the README: zero friction while driving. One pin per topic, one page per conversation. No screens, no typing, no taps.
- Two ways, with the status table from that README:
  - Transcript automation (recommended): when a conversation goes quiet, summarize it and pin it, even if nobody said "post it". Status: designed. The transcript-reading method is unverified, and it is not built.
  - Ara, the car's Grok, on the words "post it": instructions are written. Status: untested. The README says Ara's ability to create files in GitHub is unverified.
- A custom Android voice app is superseded and was not built. One sentence is enough. The page does not spec that app.
- Silence threshold named in the README: default 8 seconds, tunable from 5 to 30. That is a minimum quiet time in the design, not a promise that a note appears then. Do not say a note posts within 8 seconds.
- MIT license.

The page must not say the car workflow is live. The board is live. The two ways of posting from the car are not built or not tested, as the table says.

GitHub link: https://github.com/mogesjohnson/how-to-post-it

## The connection

This is the first section that explains the two repositories as one system.

Facts both READMEs agree on:

- How to post it is the spec for how a conversation becomes a note. Post-it Board is the board that stores and shows the note.
- The inbox is the `inbox` branch of `mogesjohnson/post-it-board`. How to post it has no inbox branch. A file pushed to How to post it does nothing to the board. The How to post it README calls an earlier "inbox on how-to-post-it" wording a slip.
- A writer that can push a file sends one JSON command to `inbox/<name>.json` on that branch. A GitHub Actions workflow runs `scripts/post.mjs` from `main`, signed in as the bot account, writes a result file, and removes the command.
- Command ops named in both READMEs: `add`, `edit`, `delete`. A pin is the topic. A page is the note.
- Statuses named in both READMEs: `ok`, `skipped_duplicate`, `skipped_ambiguous`, `skipped_not_found`, `error_invalid`, `error`.
- `add` can match an existing pin on that day loosely (case, spacing, punctuation, a narrow typo rule, a whole-word prefix). `edit` and `delete` need an exact pin title and do not guess.
- The transcript path is meant to send an `edit` when the same conversation continues, so one topic stays one page. That path is designed, not built.
- The "post it" path is meant to pin immediately. That path is untested.

The section's job is the join: spec on one side, board on the other, inbox in the middle. It is not a second copy of either project section.

## Leave off the page

These are in the source repos. They do not go on the page.

- The bot account email, passwords, and the names of Actions secrets as a setup recipe.
- Token scopes, keystore notes, or steps that would help someone push to the inbox.
- Any claim that a Grok transcript can be read through an undocumented endpoint. The source marks that as unverified.
- Any claim that Ara can write to GitHub. The source marks that as unverified.
- Shadow Army's Claude-first design, beyond the one legacy sentence.
- Soldier model names presented as products this spec verified. If the page lists soldiers, it attributes the list to the v1 README.

## Concept

Three directions. One is chosen.

1. **Dispatch desk.** Chosen. The subject is work moving from a speaker to a destination: a brief to a soldier, a conversation to a pin. The page is paper and ink, with one copper mark for the thing that travels. Palette: paper `#f4f0e6`, ink `#1c1915`, copper `#9a4e2c`. Type: a serif for titles, a monospace for repository names and commands.
2. **Index only.** A typographic list of links, no diagram. Rejected. The connection section would have nothing to show.
3. **Read the pin backwards.** Open on a finished note and trace it back to the car. Rejected. The request is two separate sections first, and the connection after them.

Principle from the board itself: a note should look like it landed, not like a dashboard widget. The page does not copy the board's cork, wood frame, apple, or pencil cup.

Originality checks for the later build:

- Accents stay off the template tokens `accent` and `accent-2`, and off the reference amber `#fbbf24` and sky `#38bdf8`.
- No copy, section names, monogram, diagrams, intro words, or hero layout from `src/`.
- No particle field, so no reuse of the reference formations.

## Signature move

**The traveling note.** When the connection section enters, one note moves from the How to post it block to a pin in the Post-it Board block. Trigger: the connection heading reaches the upper third of the viewport. Duration: about 0.8s. The path is a single curve. The note is a small rectangle with one line of text, `[[placeholder: the sample note's words]]`.

Static and reduced motion: the note is already sitting on the pin, and a caption reads that the spec sends the note and the board keeps it. No travel.

This move is not a pattern in `motion-system.json`. The rest of the page uses patterns that already exist:

| Place | Pattern id |
| --- | --- |
| Section titles | `section-heading-rise` |
| Supporting lines | `batch-reveal` |
| Intro sentence, if it is one long line | `scrub-statement` |
| GitHub and live links | `link-nudge` |
| Project blocks as they enter | `batch-reveal` |

No `signal-field`, no `title-sequence`, no `pinned-horizontal-track`.

## Homepage link

When the page exists, the main site links to `/projects` from the work area. The label is `[[placeholder: the words on that link]]`. This spec does not add that link. It only records where it goes.

## Open points

- The opening sentence and the sample note's words are still placeholders.
- Shadow Army stays private until you publish it. The page should keep the private note for as long as that is true.
- `v1.0.0` is the freeze tag the README names. `v1.0.1` also exists. The page does not explain the difference until you say what `v1.0.1` changed.
