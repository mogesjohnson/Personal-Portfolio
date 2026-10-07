# Choreography — the motion language

The numbers are what make this system feel art-directed. They're all in `motion-system.json` → `tokens` and `choreography`, and the CSS custom properties are generated from there. This page explains how to use them.

## Easing: one voice, a few accents

| Token | CSS | GSAP | Use it for |
| --- | --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | `expo.out` | **Anything arriving.** Reveals, headline chars, indicator slides, disclosure opening. This is the voice. |
| `--ease-io` | `cubic-bezier(0.7, 0, 0.2, 1)` | `expo.inOut` | Whole-screen state changes: menu reveal, theme reveal, intro shutters. |
| `--ease-in-strong` | `cubic-bezier(0.55, 0.055, 0.675, 0.19)` | `power3.in` | Something covering something (a wipe bar arriving). |
| `--ease-out-strong` | `cubic-bezier(0.215, 0.61, 0.355, 1)` | `power3.out` | The cover leaving; skew relaxing. |
| `--ease-spring` | `linear(…)` approximation | `elastic.out(1, 0.45)` | Returning to rest after the user lets go (magnetic). |
| `--ease-linear` | `linear` | `none` | Anything scrubbed to scroll, and loops. **The scroll is the easing.** |

If you change one thing to re-brand the motion, change `out`. `power4.out` is heavier and more editorial; `back.out(1.4)` is playful; `circ.out` is crisp.

## Duration: two registers, nothing in between

| Register | Range | Examples |
| --- | --- | --- |
| Feedback | 0.2–0.5s | hover colour 0.25s, nav hide 0.5s, intro letters 0.5s |
| Panels | 0.6–0.75s | menu clip 0.7s, disclosure 0.6s, theme reveal 0.75s, remount 0.7s |
| Entrances | 1.0–1.2s | reveals 1.1s, headline 1.15s, wordmark 1.2s |

Keeping a gap between the registers stops the page feeling "sort of animated everywhere". Something is either a quick acknowledgement or a deliberate entrance.

## Stagger scales with the size of the thing

| Unit | Stagger |
| --- | --- |
| Characters (intro, fast) | 0.018s |
| Characters (headline) | 0.035s |
| Characters (wordmark, huge) | 0.04s |
| Words | 0.07–0.1s |
| Blocks / cards | 0.08–0.1s |
| Menu links | 55ms + 150ms delay |

Total stagger time should stay under ~0.6s for a group. Past that, the last item feels late.

## Distance

Small things travel in their own units (`yPercent 60–115` for split text inside an overflow-clipped line). Blocks travel in pixels: 44px for reveals, 28px for hero followers, 14px for content swaps, 40px for cards and menu links. A bigger travel distance reads as more dramatic; don't go past ~60px for body content.

## Scroll trigger lines

| Line | Used for | Why |
| --- | --- | --- |
| `top 95%` | Footer wordmark | Starts as soon as it peeks in; it's the last thing on the page |
| `top 90%` | Generic reveals | Content is mostly visible by the time it settles |
| `top 88%` | Eyebrow wipes | A beat before the heading |
| `top 86%` | Section titles | Just after its eyebrow |
| `top 78%` → `bottom 48%` | Statement scrub | The words finish lighting just past centre, where the eye is |
| `top top` | Pins | |

The eyebrow (88%) fires before the title (86%), so each section introduces itself in order: label, then heading.

## Overlap rules

1. **Hand off before you finish.** The intro dispatches its "done" event at the exit label, so the hero animates while the shutters lift.
2. **Followers start early.** Supporting copy starts 0.25s into the headline's 1.15s.
3. **Cut, then ease.** Change backgrounds and visibility instantly (`set`), and let only the type move.
4. **Return slower than you leave.** Marquee speed-up takes 0.2s; settling back takes 1.2s. The magnetic pull follows in 0.6s and springs back elastically.

## First-visit timing map (5 intro words)

```
0.00  rules draw, HUD rises, counter starts
0.30  word 1        ─┐
0.60  word 2         │ 0.3s beat, hard cuts,
0.90  word 3         │ plate colour changes
1.20  word 4         │
1.50  word 5        ─┘
2.25  EXIT: hand-off event ─► Lenis starts, headline flips, particles burst
      plates fade (0.3s) · shutters lift (0.95s + 0.055s × 5)
2.50  hero copy, CTAs, facts rise
~3.5  intro complete, overlay unmounts, session flag saved
```

Return visits in the same tab skip straight to the hero flip at 0.00.

## Ambient loops

Loops sit in the background and must be slow and desynchronised:
- Status pip: 2.4s ring pulse.
- Bob: 5s, 6px, sibling delays of −1.7s and −3.3s so they never line up.
- Marquees: 34–52s per loop, with two rows in opposite directions at different durations (46s / 52s) to avoid phase lock.
- Particle breathing: ±0.7px at 1.3–1.6 rad/s per particle, phase-shifted.

## Don'ts the reference avoids

- No animated `filter: blur()`.
- No bounce on entrances (elastic is only for returning to rest).
- No scroll-jacking beyond one pinned section, and the pin ends on a call to action.
- No motion that hides text behind it for more than a moment (trails fade faster while scrolling).
- No intro on every visit.
