# Score — /now

## Rule draw (signature)

- New effect, not a `motion-system.json` pattern.
- Trigger: once, after the runtime starts, only when `data-motion="full"`.
- Timeline: `.now-rule` scales from 0 to 1 on X, origin left, 0.9s, `expo.out`.
- Static and reduced motion: the rule is already full width. No text is hidden.
- First visit: the rule finishes inside the 1.0–1.2s entrance window. There is no intro and no second beat.

## Everything else

- No reveals, no scrub, no Lenis-driven effect beyond the runtime the connector starts.
- Tokens: `--text`, `--text-2`, `--muted`, `--amber-text`, `--line`, `--bg` from the site. No build palette.

## Reduced motion

| Effect | Reduced / no JS |
| --- | --- |
| Rule draw | Rule is already drawn |
| Page copy | All of it is in the HTML |
