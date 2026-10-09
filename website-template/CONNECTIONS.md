# Connections

Owner decisions that `AGENT.md`, `RULES.md`, and `docs/INTEGRATION.md` leave unstated. `docs/INTEGRATION.md` describes a fresh Next.js app. This folder already lives inside the portfolio repo.

Read this before linking a build into the portfolio, changing colors or navigation, or opening a pull request. When a hex value here and `../src/app/globals.css` disagree, the CSS file wins.

## Where a linked page lives

- The portfolio repo is `C:\Users\johns\projects\website` (GitHub `mogesjohnson/Personal-Portfolio`). This folder is `website-template/`. It is not a route.
- Routes live in `../src/app/`, not a top-level `app/`.
- A page linked from the main site has its route at `../src/app/<slug>/page.tsx` and its build at `builds/<slug>/`. Shared `lib/` and `connectors/` are imported, not copied.
- `/projects` is a page of the main site. It uses the root layout in `../src/app/layout.tsx`, so the theme, fonts, and pre-paint flags stay shared with the homepage. A site that needs its own `<html>` flags is a separate layout and a full page load.

## Palette

The live palette is `../src/app/globals.css`. Tokens in `motion-system.json` belong to the factory kit. They are not the portfolio colors.

The theme is `html[data-theme]`. Dark is the default. A saved choice lives in `localStorage` under `mj-theme`. The flags script in `../src/components/live/flags.ts` applies it before paint. It keeps the saved choice and does not follow `prefers-color-scheme`. Tailwind's `dark:` variant is remapped to `[data-theme="dark"]`.

A page of this site uses `../src/components/live/ThemeToggle.tsx`, the same shifter as the homepage, so the choice stays one choice.

Dark (`:root`):

| Token | Value |
| --- | --- |
| `--bg` | `#07080c` |
| `--text` | `#eceef2` |
| `--text-2` | `#b3bac6` |
| `--muted` | `#7d8595` |
| `--amber` / `--amber-text` | `#fbbf24` |
| `--sky` | `#38bdf8` |
| `--sky-text` | `#7dd3fc` |
| `--on-amber` | `#0b0d12` |

Light (`[data-theme="light"]`):

| Token | Value |
| --- | --- |
| `--bg` | `#f4f2ee` |
| `--text` | `#0d1117` |
| `--text-2` | `#3a4351` |
| `--muted` | `#5f6878` |
| `--amber` | `#f59e0b` |
| `--amber-text` | `#b45309` |
| `--sky` | `#0284c7` |
| `--sky-text` | `#0369a1` |

The body wash is the amber and sky gradients on `body::before`. Page backgrounds stay transparent so that wash shows.

`/projects` follows these tokens. An earlier draft painted its own paper field (`#f4f0e6`, `#1c1915`, `#9a4e2c`). The owner replaced that with the site palette and the shared shifter. `.dispatch` maps ink, paper, and copper onto `--text`, `--bg`, and `--amber-text`.

The résumé popup (`../src/components/ResumeModal.tsx`) uses the same tokens through the `.resume-*` rules in `globals.css`. Print styles still use white paper and `#111` text. Both résumé controls stay: the header button and the hero "View résumé" button.

## Navigation

The owner placed Projects in the header and kept both résumé buttons.

- The desktop pill lists Work, Experience, About, Toolkit, and Contact. Projects is a `.nav-external` link outside the pill.
- The mobile menu has two centered labels. "Main website" heads the homepage sections. "External site pages" heads pages that leave the homepage, starting with Projects.
- On `/projects`, the bar link "Main website" goes to `/`. Section links are `/#work`, `/#experience`, `/#about`, `/#stack`, and `/#contact`, so they map back to the homepage.
- The work section stays free of a second Projects link.
- The command palette keeps "Explore selected work" as a scroll to `#work`. "Open Projects" (`id` `projects-page`) closes the palette and routes to `/projects`.

A third centered group was suggested ("Reach", for Résumé and Schedule a chat) and was not added. The Active Directory lab becomes an external page only after that page exists.

## Projects page

The owner's brief is three GitHub repos: `mogesjohnson/shadow-army`, `mogesjohnson/post-it-board`, and `mogesjohnson/how-to-post-it`. Shadow Army on the page is v1. The two post-it repos stay separate, then a connection section joins them. `shadow-army` is private, so read it with `gh`. The public API returns 404.

Checked copy lives in `builds/projects-page/sections/`. Those files win when they disagree with `builds/projects-page/SPEC.md`.

## Pull requests

This repo has no `.github` workflows and no commit-msg hook. Nothing here points at the pull-request rules.

The owner said to look in `C:\Users\johns\projects` for the GitHub workflow markdown, and otherwise in `AIConnections`. The rules that match are in `C:\Users\johns\projects\GITHUB_VERSION_CONTROL_PROMPT`, not in `AIConnections`:

- `files/docs/version-control/02-branches.md`
- `files/docs/version-control/03-commits.md`
- `files/docs/version-control/04-pull-requests.md`
- `files/docs/version-control/06-merging.md`
- `files/.github/pull_request_template.md`

For this portfolio, take that layout. Review comments and a test suite wait until the owner asks for them.

- Branch: `<author>/<id>-<short-purpose>`. With no GitHub issue, the id is a local feature id `[F1]`, `[F2]`, and so on. `[F0]` is reserved by that template.
- Commit subject: `[F<n>] Action`. Imperative, no `feat:` or `fix:` prefix, no trailing period, at most 72 characters.
- PR body, in order: one or two sentences of behavior, `Validation:`, `Tracking:`, then the template's six checklist boxes. Tick a box only after checking it. An open box says why on the same line.
- Subject and body stay free of closing keywords (`closes`, `fixes`, `resolves`, and the other forms in `03-commits.md`).
- Merges are merge commits. `gh pr merge <n> --merge --match-head-commit <sha>`. The template says the author merges when the owner allows it. When the owner says to merge, say that in the merge body.

The portfolio work from this session is already on `main`:

| PR | Change | Merge |
| --- | --- | --- |
| [#5](https://github.com/mogesjohnson/Personal-Portfolio/pull/5) | Résumé popup uses the site palette | `dc2e5cd` |
| [#6](https://github.com/mogesjohnson/Personal-Portfolio/pull/6) | AI-first projects page at `/projects` | `f3d6098` |
| [#7](https://github.com/mogesjohnson/Personal-Portfolio/pull/7) | Nav groups: Main website and External site pages | `b411391` |
