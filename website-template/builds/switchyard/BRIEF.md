# Switchyard project page: brief

Stations 1–3 merged (METHODS: section builds may merge). Route `/switchyard`, mounted from `src/app/switchyard/page.tsx` per CONNECTIONS.md.

## Brief

- **Kind:** page (a project detail page, one of the "External site pages").
- **Host app:** this portfolio (`src/app/switchyard`). Previewed with `npm run build && npm start`.
- **Audience:** recruiters and engineers coming from the Work section or the site menu.
- **One message:** Switchyard is a personal Windows project desk. It opens the exact checkout you chose, records a Return Ticket when you stop, and reads Obsidian notes as read-only context.
- **Content inventory:** taken from the private repo `mogesjohnson/switchyard`: README, docs, the Rust broker and the UI labels. No `[[placeholder]]` copy. The Return Ticket card uses the app's own field labels and placeholders. The validation numbers (56, 53, 500, 30 s) come from the repo.
- **Constraints:** the repo is private, so the page has no GitHub source link. The screens were captured from the repo's own browser design preview (`vite`, fixture data, no Tauri binary). Only npm dev packages were installed, with `--ignore-scripts`; no executables were downloaded.
- **Motion budget:** calm plus one signature move. That means reveals, split headings, word scrub and the switch track. The homepage carries this project's `yard` particle formation.

## Overrides of RULES.md (user instruction wins, recorded here)

- **R1/R2 (new palette and type):** the user asked to keep the site's color scheme. The page uses only the `globals.css` tokens and the `/projects` type pairing.
- **R12 (no edits outside the build):** the user asked for the page on the website, so the `src/` wiring was edited (see the REPLAY Studio brief for the shared list).
- **R14 / METHODS station 0 (branch name):** the branch is `grok/add-replay-studio-switchyard`, as the user asked.

## Concept

The metaphor is **throw the switch to the exact checkout**. It follows the app's own rail-line drawing:

- One route leaves the main line at a switch and runs to the checkout you picked.
- Side tracks show what Switchyard refuses: a same-looking folder, and a remote reference that can't be launched locally.

The palette is the site's: amber is the chosen route and sky is the switch.

## Score

- The shared kit (`splitHeadings`, `batchReveal`, `scrubWords`). Reduced motion leaves them static and fully visible.
- **Signature: `switch-track.ts`.**
  - Trigger: the yard SVG section.
  - Range: start `top 62%`, end `bottom 80%`.
  - Progress draws the route by `stroke-dashoffset` and moves the marker along it with `getPointAtLength`.
  - The five stations (Library, Exact checkout, Open targets, Return Ticket, Back with context) light up as the marker passes their `data-at` positions.
  - Static state: the route is fully drawn, the marker sits at the end, and every station is lit.
- `project-detail/no-intro.ts` turns off the first-visit intro hold so a visitor who lands here directly can scroll.

## Demo video (added on request, 2026-10-18)

The last section, "Demo video", renders `project-detail/DemoVideo.tsx` from this folder's `demo.ts`. No video exists yet, so the section shows the "Demo coming soon" state: a 16:9 framed player over a dimmed real screenshot. It has no motion beyond a slow standby blink with `data-motion="full"`, and is static under reduced motion. To publish, set one field in `demo.ts`:

- `file`: an MP4 under `public/`, such as `/videos/<slug>-demo.mp4`
- `embed`: a YouTube or other https player URL
