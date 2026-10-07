# How this website was made

This comes from the repository's git history and GitHub pull requests (`git log`, `gh pr view`). It does not cover the chat sessions or prompts behind them, which aren't stored in the repo.

## Which model built it

The commits and PRs credit **Claude Sonnet 5.5**, not Opus 5.5. PRs #1, #2 and #3 each end with:

```
Co-authored-by: Claude Sonnet 5.5 <noreply@anthropic.com>
```

and the PR #3 description ends with "🤖 Generated with Claude Code". No commit in the history names Opus 5.5. PR #3 also includes two commits that its description attributes to **Codex** ("Codex's two previously unpushed commits"). So the site is a Claude Code (Sonnet 5.5) build layered on a Codex pass, steered and merged by the repo owner.

This template folder was written by Claude Opus 5.5 by reading that code.

## Timeline

| Date | Commit | What happened | Credited |
| --- | --- | --- | --- |
| 2026-09-29 | `110c2cf` | Create Next App scaffold | owner |
| 2026-09-29 | `50dfdb7` | First portfolio: Hero, Navbar, Projects, CommandPalette, ResumeModal, ThemeToggle | owner |
| 2026-09-29 | `2c69dff`, `e2a3a04` | Repo link, hero cleanup | owner |
| 2026-09-30 | `540b505` (PR #1) | **Visual redesign:** ambient backdrop, glass cards with cursor spotlight, experience timeline, scroll progress, active nav link. Explicitly avoided `backdrop-filter` and animated blur for scroll performance; respected `prefers-reduced-motion`. | Claude Sonnet 5.5 |
| 2026-09-30 | `b532b7d` (PR #2) | Removed terminal-style UI (console, project drawer, git-clone button) | Claude Sonnet 5.5 |
| 2026-09-30 | `d26e5bc` | "Redesign portfolio experience 2.1" | Codex (per PR #3) |
| 2026-09-30 | `325819b` | "Prevent hero headline clipping" | Codex (per PR #3) |
| 2026-09-30 | `956e586` (PR #3) | **Live Motion:** particle signal field, formations, title sequence, Lenis + ScrollTrigger scenes, View Transitions theme reveal, static SVG fallbacks. 37 files, +5,060 / −1,588. Removed 13 legacy components. | Claude Sonnet 5.5 |

## How PR #3 was built and checked

From the PR description:

**Shipped**
- One Canvas 2D particle field that morphs between the monogram, each project's diagram, and the contact mark.
- A skippable kinetic title sequence, once per session.
- GSAP ScrollTrigger + Lenis scenes: pinned horizontal experience timeline, scrubbed quote, velocity-reactive marquees, variable-weight footer wordmark.
- Light/dark toggle with a View Transitions circular reveal.
- Reduced-motion and no-JS visitors get a fully static page with SVG diagrams from the same geometry.

**Bugs found during testing, and fixed**
1. Deep links like `/#contact` crashed. `ScrollTrigger` `once: true` killed itself mid-refresh. Fixed with `toggleActions: "play none play none"`.
2. Space to skip the intro also scrolled a screen. Fixed with `preventDefault` on scroll keys.
3. Command palette navigation did nothing while its scroll lock was held, and kept stale search text. Fixed by starting Lenis before `scrollTo`, and by mounting the palette only while open.
4. The résumé modal couldn't scroll under Lenis. Fixed with `data-lenis-prevent`.

**Test plan**
- `npm run lint`, `tsc --noEmit`, `npm run build` pass.
- 21 automated browser checks: intro skip, Ctrl+K, theme toggle, résumé scroll, palette + nav + mobile menu, repeat visit.
- Screenshots reviewed on desktop, mobile, light theme and reduced motion.
- Still open: a check on a real phone (headless Chrome held 59–60 FPS; the particle count auto-scales if frames drop).

## Takeaways for reuse

- **Constraints came first.** PR #1 set the performance rules (no animated blur, reduced motion respected) before PR #3 added heavy motion, and PR #3 kept them.
- **Subtraction preceded addition.** PR #2 removed UI so PR #3 had a clean surface.
- **Testing found real bugs.** Three of the four fixes above only show up under real interaction (deep links, keyboard, overlays). Keep the QA checklist in `motion-system.json`.
