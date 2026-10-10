# Verify — /now

Checked 2026-10-10 against the dev server already on http://localhost:3000.

## Commands

- `npx tsc --noEmit` exited 0.
- `npx eslint` on `src/app/now/page.tsx`, `src/data/externalPages.ts`, `src/components/live/SiteNav.tsx`, and `website-template/builds/now` exited 0.
- `npm run build` was not run. A dev server is already using `.next`.
- `node website-template/scripts/smoke.mjs` was not run. `lib/`, `connectors/`, and the spec were not changed.

## Originality

- [x] Accent colours are the live site tokens. BRIEF.md records that override of R2.
- [x] The banned-phrase grep hits only the GitHub and live URLs (`mogesjohnson`) plus the source notes in BRIEF.md. No homepage slogans.
- [x] No particle formation.
- [x] The rule draw is specified in SCORE.md and implemented in `rule.ts`.
- [x] CONCEPT.md reduces the status-page idea to a principle. No outside site was copied.

## Browser

Headless Chrome, real clicks.

- Desktop dark and light: date, title, lead, and rule stack. Two columns. No horizontal overflow.
- 390px: one column. No horizontal overflow. The second block continues below the first.
- Reduced motion: `data-motion="reduce"`, the rule is present (`transform: none`), both blocks are in the HTML.
- Full motion: the rule draws (scale about 1 after the tween).
- Dispatch menu opens. Now is the current item. Fixed mock routes to `/shadow-army`.
- Homepage bar at 1280px lists Projects, Now, Shadow Army, Protocol, with no overflow.
- Homepage bar at 1000px keeps Projects and Now. Shadow Army and Protocol hide. No overflow.
- Phone menu lists Now.
- Command palette search "now" shows Open Now and routes to `/now`.
- Light ink is `rgb(13, 17, 23)` on the title and `rgb(58, 67, 81)` on the body copy.
