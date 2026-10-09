# Website factory

This folder is a factory. It turns a request into a new, original webpage or page section, built on the motion system here (`lib/`, `connectors/`, `motion-system.json`). Every build is a first edition made for its subject. Earlier work enters only as a vault component the user names.

## Vocabulary

- **Build**: one job, a page or a section, from request to merge. It lives in `builds/<slug>/`.
- **Reference site**: the portfolio in the repo-root `src/` (`../src/` from this folder). The techniques in `lib/` were distilled from it. It is a teacher, not a parts bin.
- **Signature move**: the one motion idea a page build introduces that neither the reference site nor `motion-system.json` has.
- **Vault**: `COMPONENTS.md`, the user's hand-picked best sections, each under a name the user chose.
- **Harvest**: copying a finished section into the vault, done only at the user's request.

## Entry points

- `RULES.md` is binding on every build and every edit in this folder. Read it before starting the brief: R1–R4 shape the concept, not just the code.
- `METHODS.md` holds the build stations (branch → brief → concept → score → build → verify → ship → harvest). Run them in order for any request to make a page or section.
- `GRAPH.md` maps every file and folder to what it holds and how they connect. Use it to find things.
- `COMPONENTS.md` is the vault. Open it when the user names a vault component.
- `CONNECTIONS.md` holds owner decisions the other docs leave unstated: the portfolio host path, the live palette, the nav groups, and the external GitHub pull-request layout. Read it before linking a build into the portfolio, changing colors or navigation, or opening a pull request.
- `motion-system.json` holds the patterns, tokens, accessibility, performance and QA reference. Patterns are chosen from it by `id`.

## Defaults

- Output goes to `builds/<slug>/`, with the slug in kebab-case taken from the subject (`tidal-energy-landing`, `pricing-section-v2`).
- The host app (where the build ships and is previewed) is named in the brief. When the user names none, deliver to `builds/<slug>/` and report the build as statically verified.
- Content follows R5.
- Paths in these docs are relative to this folder. Commands in `METHODS.md` run from the repo root.
