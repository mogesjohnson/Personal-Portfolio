# Rules

Binding on every build and every edit in this folder. Numbered so they can be cited (`R4`).

## Originality

- **R1. Every build is an original.** Its copy, composition, palette, type pairing, particle formations and signature move are made for that build's subject.
- **R2. Share techniques, never compositions.** Use `lib/`, `connectors/` and any `motion-system.json` pattern freely. The way the reference site arranges them is its own. Hard guardrail: reproduce nothing from `../src/`, which means none of the following:
  - its copy or section names
  - its "MJ" monogram or owner-name wordmark
  - its system, tree or orbit diagrams
  - its intro word list or colour plates
  - its hero composition (headline left, framed particle mark with satellite labels right)
  - its amber `#fbbf24` / sky `#38bdf8` palette
- **R3. Other sites lend principles, never pages.** When the user cites a site, write the *principle* you take from it in `CONCEPT.md` and build from that sentence. Hard guardrail: take no markup, copy, assets, brand marks or distinctive layout from any other site.
- **R4. Every page build has a signature move.** Name it and specify it in `SCORE.md`, and implement it inside the build folder. A section build instead shifts at least two axes from `motion-system.json` › `remix.variationAxes`.
- **R5. Content comes from the user.** Anything not supplied is written as `[[placeholder: what goes here]]`. Facts about real people, companies and products come only from the user.
- **R6. Draw assets in code** (CSS, SVG, canvas), or use files the user supplies with the rights to use them.

**Originality check.** Run it at the Verify station. Every box must be ticked:

- [ ] Accent colours differ from `tokens.color.*.accent` and `accent-2` in `motion-system.json`.
- [ ] `grep -rniE "moges|curiosity\.|engineered\.|through line|built in practice|projects with purpose|more than the code|always evolving|have a good problem" builds/<slug>` returns nothing.
- [ ] Every formation is new geometry. None reuses the reference recipes `mj`, `contact`, `sys`, `tree`, `orbit` or their coordinates.
- [ ] The signature move (page) or the shifted axes (section) are written in `SCORE.md`.
- [ ] Every cited inspiration is reduced to a principle sentence in `CONCEPT.md`.

## Vault

- **R7. Named use only.** A vault component enters a build only when the user names it in the current request, and only the components named.
- **R8. The user fills the vault.** Harvest only when the user asks, under the name the user gives.
- **R9. Vault originals stay pristine.** Copy a component into the build, then adapt the copy.

## Craft

- **R10. Static first.** A build reads complete with `data-motion="reduce"` and without JavaScript before any motion is added. It keeps every invariant in `motion-system.json` › `remix.keepInvariant`.
- **R11. Meet the reference bars:** `motion-system.json` › `accessibility` and `performance`.

## Repo

- **R12. The reference site is read-only during factory work.** `../src/` changes only on an explicit request for the site itself.
- **R13. The kit changes for every build or not at all.** Build-specific code stays in `builds/<slug>/`. Changes to `lib/`, `connectors/` or the spec go on their own `feat/template-*` or `fix/template-*` branch, with `node website-template/scripts/smoke.mjs` passing.
- **R14. Git.**
  - Branches: one branch per build (`build/<slug>`).
  - Commits: Conventional Commits, scoped to the build (`feat(build-<slug>): …`).
  - Merging: merge to `main` with `--no-ff` once the Verify station is green.
  - Remote: push and open PRs only when the user says so.
