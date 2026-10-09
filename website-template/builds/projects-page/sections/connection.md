# The connection

This section comes after Post-it Board and How to post it have each had their own section. It is the first place the page explains them as one system. It does not restate either project.

Sources, both READMEs on the default branch, read 2026-10-09. How to post it: https://github.com/mogesjohnson/how-to-post-it. Post-it Board: https://github.com/mogesjohnson/post-it-board. No other repo.

## Visitor copy

How to post it is the spec for getting a conversation onto a board. Post-it Board is the board that keeps the note and shows it.

They meet in one place: the `inbox` branch of Post-it Board. How to post it has no inbox. A file pushed to that spec repo does not change the board. The How to post it README calls an earlier "inbox on how-to-post-it" wording a slip.

A writer that can push a file sends one JSON command, `inbox/<name>.json`, on the board's `inbox` branch. A GitHub Action on the board runs `scripts/post.mjs` from `main`, signed in as the bot, writes a result, and removes the command. The spec decides what should be posted. The board is what actually stores it.

A command can add, edit, or delete. A pin is the topic. A page is the note. An add can land on a pin that is already there that day, matched loosely by topic. An edit or a delete needs the exact pin title and does not guess.

The quiet-conversation path is meant to update the same page when the talk continues, so one topic stays one note. That path is designed, and it is not built. Saying "post it" in the car is meant to pin immediately. That path is untested.

The board is live. The join from the car is not.

## Links

- Post-it Board: https://github.com/mogesjohnson/post-it-board
- Inbox docs, on the board repo: https://github.com/mogesjohnson/post-it-board/blob/inbox/inbox/README.md
- How to post it: https://github.com/mogesjohnson/how-to-post-it
- Live board: https://mogesjohnson.github.io/post-it-board/

## What the join is

| Piece | Where it lives | Role |
| --- | --- | --- |
| Spec | `mogesjohnson/how-to-post-it` | Says how a Grok conversation in the car becomes a note. No application, and no inbox branch. The only branch is `main`. |
| Board | `mogesjohnson/post-it-board`, branch `main` | Stores days, pins, and pages. GitHub Pages serves the site. |
| Inbox | `mogesjohnson/post-it-board`, branch `inbox` | Receives one JSON file per command. |
| Writer | `scripts/post.mjs` on `main` | The Action runs this, signed in as the bot account. |

Command shape both READMEs name: `op` is `add`, `edit`, or `delete`. A pin title is the topic. A page title and body are the note. `date` defaults to today in America/New_York.

Statuses both READMEs name: `ok`, `skipped_duplicate`, `skipped_ambiguous`, `skipped_not_found`, `error_invalid`, `error`. A duplicate is the same title and text on that pin within the last 10 minutes. Ambiguous and not-found write nothing.

`add` ignores case, spaces, accents, and punctuation. A narrow typo rule and a whole-word prefix can also match. `edit` and `delete` need an exact pin title plus a target, and they never guess. Deleting a pin deletes its pages.

## Signature move

This is the section that plays the traveling note. When the connection heading reaches the upper third of the viewport, one note moves from the How to post it block to a pin on the Post-it Board block, about 0.8s along one curve. Sample words: `[[placeholder: the sample note's words]]`.

Reduced motion and no JavaScript: the note is already on the pin. Caption: the spec sends the note, and the board keeps it.

## Do not say

- The bot account email, passwords, or Actions secret names as a setup recipe.
- Token scopes, or the steps that would let someone push a command.
- That a Grok transcript can be read. The spec marks that unverified.
- That Ara can write to GitHub. The spec marks that unverified.
- That the car workflow is live.

## Open questions

- `[[placeholder: the sample note's words]]`
- Whether the page shows the status words (`ok`, `skipped_duplicate`, and the rest) or keeps them in the GitHub docs. Default here: one sentence on add versus exact edit, and the status list stays in the builder notes unless you want it on the page.
