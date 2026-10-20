# Score — /now

Budget: `still`. One move, and the type sits.

## Rule draw (signature)

- New effect, not a `motion-system.json` pattern. Implemented in `rule.ts` as `ruleDraw()`, mounted alone by `NowMotion.tsx`.
- Region: the full measure of the sheet (72rem at desktop, 1152px at 1440; 350px at 390), directly under the title row.
- Trigger: once, when the runtime starts, only when `data-motion="full"`. /now has no title sequence, so `NowMotion` turns a session's `data-intro="on"` off before the runtime starts. Without that, a first visit that lands on /now is scroll-locked and the rule waits for an intro that never plays.
- Timeline: `.nw-rule` scales from 0 to 1 on X, origin left, 0.9s, `expo.out`. One beat.
- First-visit timing: starts at hydration and lands inside the 1.0–1.2s entrance window. No second beat.
- Rest pose: the rule drawn at full width. Reduced motion, no JS, and a scene that throws all land on it.
- Failure picture: in full motion, CSS parks the rule at `scaleX(0)` with the kit's 3.5s failsafe (`nw-rule-failsafe`), so it is drawn even if the scene never runs. The scene cancels the failsafe (`animation: none`) when it takes over.

## Everything else

- Silence. No reveals, no scrub, no pointer effects. All text is in the HTML from the server render and never hidden.
- Feedback register: link color on hover and focus, 0.25s. The shared `DispatchBar` keeps its own menu motion.
- Tokens: `--text`, `--text-2`, `--muted`, `--amber-text`, `--line` from the site. No build palette.

## Reduced motion and no JS

| Effect | Reduced motion / no JS |
| --- | --- |
| Rule draw | Rule is already drawn (`transform: none`) |
| Page copy | All of it is in the HTML, at full opacity |
| Link hover | Color change only, no travel |
