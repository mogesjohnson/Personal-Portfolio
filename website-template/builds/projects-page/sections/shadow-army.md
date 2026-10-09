# Shadow Army

## Visitor copy

This section is v1, and v1 is legacy. A Claude-first design comes next.

Shadow Army is a personal CLI that commands other AI coding CLIs with isolated context. The v1 README's tagline is "One monarch. Many shadows. Zero shared baggage." That README describes v1 as the `sa` CLI that starts a new process for every message, and it says this v1 line is frozen at the tag `v1.0.0`.

The binaries are `sa` and `shadow`. One Monarch plans and delegates. Each Soldier receives a Brief with only what the task needs, and returns a Report. Soldiers never see each other's transcripts. Shared notes live in the Shadow Vault (`.shadow/`). A Formation is a saved preset of a monarch and soldiers for a kind of job.

The v1 README lists the soldiers below. These names are that list, not products this page checked on its own: Codex (`gpt6-astra`) as Monarch, Codex (`gpt6.1-sol`) as a work-horse, Claude (Opus 5.5) as a second orchestrator and reviewer, Claude (Sonnet 5.5) as a work-horse, Grok Build (`grok`) as a work-horse that never reviews, and Antigravity (`agy`) for research and testing only, with no coding. The same README says the hard rules — Grok never reviews, and `agy` never writes — are enforced in code.

The v1 README names four layers that keep soldiers apart: disjoint path claims in the brief, a git worktree per soldier, a vault lock registry with a TTL and a heartbeat, and a claim audit that rejects edits outside the claim.

Soldiers do not edit the working folder while they work. `sa run` applies the result as uncommitted edits. Nothing is committed for the user.

The v1 README names the stack as TypeScript on Node, with Ink, commander, execa, and vitest, under the MIT license. `package.json` requires Node `>=20`. The repository is private, so the GitHub link does not open for a visitor without access.

## Links

- GitHub: https://github.com/mogesjohnson/shadow-army

## Builder notes

Read 2026-10-09 with `gh` against `mogesjohnson/shadow-army` only. The CLI was not run. Tests were not run. `docs/claude-first.md` was not opened.

- `gh repo view mogesjohnson/shadow-army --json name,description,visibility,url,isPrivate,defaultBranchRef,licenseInfo,createdAt,updatedAt,pushedAt,homepageUrl`: visibility `PRIVATE`, `isPrivate` true, default branch `main`, license MIT, homepage empty. Description: "Shadow Army: a CLI that commands other AI CLIs as an army with isolated context." `createdAt` `2026-10-01T21:43:05Z`. `pushedAt` `2026-10-08T19:25:33Z`.
- README on `main`, `gh api repos/mogesjohnson/shadow-army/readme -H "Accept: application/vnd.github.raw"`: status line `status: v1 legacy, Claude-first design next`. The following blockquote says v1 is legacy and frozen at the `v1.0.0` tag. The same file has the tagline, the Monarch / Soldier / Brief / Report / Shadow Vault / Formation table, the soldier table, the "enforced in code" sentence, the four layers, the uncommitted-apply section, the tech paragraph (TypeScript on Node, Ink, commander, execa, vitest), and MIT. Roadmap boxes F1 through F9 are all `- [ ]`. The README body still describes the CLI. The empty boxes are not treated as proof that the CLI is finished, or that it is only a sketch.
- Tags, `gh api repos/mogesjohnson/shadow-army/tags --paginate`: only `v1.0.1` at `4e11ec96ef7f3df1b06a571a5fcb86d5c400bb71` and `v1.0.0` at `5d0704c193ccb8774eddb9105350a3e5cd7046b4`. `main` HEAD is `f7e121fa7f4f6f5cdf6dafbb7548236eb61264c3`.
- `package.json` via `gh api repos/mogesjohnson/shadow-army/contents/package.json -H "Accept: application/vnd.github.raw"`, and the same path with `?ref=v1.0.0` and `?ref=v1.0.1`: `"version"` is `0.1.0` on main and on both tags. Those fetches also have `"private": true`, `"license": "MIT"`, `bin` `sa` and `shadow` both pointing at `dist/cli.js`, and `engines.node` `>=20`. The README tech paragraph does not say `>=20`. Do not call the package version 1.0.0.
- README at the `v1.0.0` tag (`readme?ref=v1.0.0`) does not say legacy or frozen. Its status line is `status: pre-alpha — README first, code feature by feature`.
- README at the `v1.0.1` tag has the same legacy status line and the same frozen-at-`v1.0.0` sentence as main.
- `gh api repos/mogesjohnson/shadow-army/compare/v1.0.0...v1.0.1`: 9 ahead, 0 behind. The file list includes `README.md`, `docs/claude-first.md`, `docs/legacy/*`, `src/adapters/runParsers.ts`, `src/adapters/runParsers.test.ts`, and `src/workspace/audit.ts`, `git.ts`, `links.ts`, `links.test.ts`, `session.ts`. Commit subjects in that range include link-audit fixes (#58), cached input token counting (#62), and the note that the README gained the "v1 is legacy" line (#63). The freeze sentence is the current README's claim. History after `v1.0.0` is not empty, and `v1.0.1` is not a docs-only tag.
- `gh api repos/mogesjohnson/shadow-army/compare/v1.0.1...main`: 12 ahead, 0 behind. Files are only `docs/adr/0008` through `0014` and `docs/spec/v2.md`. `README.md` is not in that diff. Those later docs were not used for visitor copy.
- `gh api repos/mogesjohnson/shadow-army/compare/v1.0.0...main`: 21 ahead, 0 behind.
- Unauthenticated `curl.exe -s -o NUL -w "%{http_code}" https://api.github.com/repos/mogesjohnson/shadow-army` returned `404`.
- "Enforced in code" is the README's sentence. The enforcement source was not opened. Commit messages that mention CI were not re-run.

## Do not say

- That the package version is 1.0.0.
- That roadmap items F1–F9 are done, or that the empty boxes prove the CLI was never built. This read was not a test run.
- The soldier model names as products this page verified. If they appear, attribute them to the v1 README.
- The contents of `docs/claude-first.md`, the v2 spec, or the ADRs. One sentence that a Claude-first design comes next is the limit.
- That the `v1.0.0` tag's own README already called v1 legacy. It called the status pre-alpha.
- Setup steps, token or secret names, permission-bypass flags, or the git commands the README gives for keeping or undoing a run.
- That a visitor without access can open the code. The repository is private, and the public API returns 404.

## Open questions

- [[placeholder: what a visitor should be told about tag v1.0.1, since the current README says v1 is frozen at v1.0.0 while that later tag also contains code commits]]
- [[placeholder: whether the page should keep the phrase "enforced in code" once someone has read the enforcement source; this pass only has the README sentence]]
- The repository stays private until it is published. The private note stays while that is true.
