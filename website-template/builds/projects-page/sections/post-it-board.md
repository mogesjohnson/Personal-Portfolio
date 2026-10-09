# Post-it Board

Its own section. Visitor copy describes the board. It does not explain How to post it, and it does not explain how a note gets here.

Verified 2026-10-09 against `main` of [mogesjohnson/post-it-board](https://github.com/mogesjohnson/post-it-board): the README (raw), `supabase/schema.sql`, `store.js`, `app.js`, `index.html`, the shape of `config.js` (values not copied), the GitHub Pages API, and the branch-rules API.

## Visitor copy

Post-it Board is a small static website that looks like a middle-school classroom corkboard. It is plain HTML, CSS, and JavaScript. There is no framework and no build step.

Each day gets its own board. Each topic is one pin, a sticky note in yellow, pink, blue, or green. Each pin holds one or more pages of notes. The newest day is first. Arrows step to an older or a newer day. Open a pin to read it, then move between its pages. Esc, or “All pins,” returns to the board.

A link can open one page. The hash looks like the README’s example: `#day=2026-10-05&pin=<id>&page=2`.

Anyone can read the board. A lock icon is where the owner signs in. Everyone else gets a read-only board. The owner tools add a day, a pin, or a page, and they rename, select, and delete. Select mode marks a whole pin or a single page. Delete asks for confirmation, and it is permanent. Deleting a pin deletes its pages. There is no recycle bin.

The shared board stores notes in Supabase. The README says the free plan is enough: Postgres tables, row level security, and Auth, and no Edge Functions. The tables are `days`, `pins`, `pages`, and `board_owners`. The public site can read. A write is kept only for a signed-in board owner. The repository’s setup turns public sign-ups off.

If `config.js` is empty, the board runs in demo mode in that browser only. Notes stay in `localStorage`, and a banner says Supabase is not connected. The live site is not that demo. GitHub Pages serves it from the `main` branch.

Changes to `main` go through a pull request.

## Links

GitHub: https://github.com/mogesjohnson/post-it-board

Live: https://mogesjohnson.github.io/post-it-board/

## Builder notes

Sourced from `main` on 2026-10-09. The latest commit on `main` that day was `703ca04` (2026-10-07), “Merge pull request #3 … README: GitHub Pages is live.”

What the board is:

- README: “A tiny static website that looks like a middle-school classroom corkboard.” `index.html`’s description: “A classroom corkboard of daily notes: one pin per topic, pages inside each pin.”
- Site files: `index.html`, `styles.css`, `app.js`, `store.js`, `config.js`. No `package.json`. No framework and no site build step. `.nojekyll` tells Pages to serve the files as they are.
- Props named in the README and present in `index.html`: cork inside a wooden frame, a paper gold star, and a chalk-tray ledge with a ruler, an apple, and a pencil cup. `index.html` also loads Patrick Hand and Permanent Marker from Google Fonts. The README’s “no dependencies” means no packages. It does not mean the page makes no third-party request.
- The projects page describes those props in words. It does not rebuild the cork, the frame, the apple, or the pencil cup.

Data model, checked in `supabase/schema.sql` and the README:

- `days`: `id`, `board_date` (unique), `title`, `created_at`.
- `pins`: `id`, `day_id` (on delete cascade), `title`, `color` (default `yellow`; yellow, pink, blue, or green), `position`, `created_at`, `updated_at`.
- `pages`: `id`, `pin_id` (on delete cascade), `title`, `body`, `position`, `created_at`, `updated_at`.
- `board_owners`: `user_id` (on delete cascade from `auth.users`), `label`, `created_at`.
- Deleting a day deletes its pins. Deleting a pin deletes its pages. The README says there is no recycle bin. `app.js` uses the same four colors.

Who can do what:

- Schema: anon and any signed-in user can select `days`, `pins`, and `pages`. Insert, update, and delete on those tables require `is_board_owner()` for an authenticated user. `board_owners` is not readable with the anon key. A signed-in user can see only their own row.
- README: the anon key is meant to be public, and row level security keeps it read-only. Do not put a key in the page copy.
- `app.js`: owner tools show when `store.mode === "local"` or any user is signed in. The README also says a signed-in account that is not in `board_owners` still sees the tools, and the database rejects the change. Do not tighten the visitor line into “the buttons are hidden unless you are a board owner.”
- Public sign-ups: the README and the schema tell the owner to turn “Allow new users to sign up” off. This pass did not read that switch back from the live project.

Demo mode versus the live site:

- README: empty `config.js` means demo mode, `localStorage` key `postit.demo.v1`, banner “Demo mode — Supabase not connected,” seeded with a day that has an AI pin (“What is AI”, “LLMs”) and an Agents pin (“LLMs with loops”). That seed is the demo, not a claim about the live board.
- `store.js` treats config as filled only when the URL is `http(s)`, the anon key is longer than 20 characters, and the URL does not contain `YOUR-PROJECT`. Otherwise it uses `LocalStore`.
- `config.js` on `main` is filled in (a Supabase URL and a public anon key, not the example placeholder). Those values were not copied. Pages deploys that tree, so the live site is `SupabaseStore`, and the demo banner stays hidden. Do not say the live site is the demo.

Links and publishing:

- Hash shape is the README example, and `app.js` reads and writes `#day=&pin=&page=`. The page number in the hash is 1-based.
- `gh repo view` reports `homepageUrl` empty. The Pages API reports `status: built`, source branch `main`, path `/`, `https_enforced: true`, and `html_url` equal to the live link. Use that URL. Do not say the repository’s website field is set.
- Branch rules API: `main` has `pull_request`, `non_fast_forward`, and `deletion`. `inbox` has no branch rules. Say that changes to `main` go through a pull request. Do not recite the ruleset id, the bypass list, or the required-approval count.

For the other writer: an `inbox` branch exists on this repository. This section does not say what it is for.

## Do not say

- The bot account email, any password, the names of Actions secrets, token scopes, or steps for pushing to the inbox.
- Inbox command names, statuses, or matching rules.
- How a car, Grok, or Ara posts a note, and any join to How to post it.
- The ruleset id, the bypass settings, or the required-approval count.
- The Supabase project URL, the anon key, or the service-role key. Account emails that appear in schema comments stay off the page too.
- That the live site is in demo mode, or that the demo seed notes are what the live board shows.
- A license. `licenseInfo` is null, and there is no license file. Do not say MIT.
- Any count of days, pins, pages, or visitors. None is in the repo.

## Open questions

- `[[placeholder: confirm on the live Supabase project that public sign-ups are off]]`. The repo documents that step. This pass did not read the live Auth setting.
- `[[placeholder: a real day and pin from the live board, if the page should quote one]]`. The hash date above is the README’s example of the shape, not proof that the day is posted.
- `[[placeholder: a license name, if the page should state one]]`. The repo does not name one.
