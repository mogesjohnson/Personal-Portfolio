# Animation & transition audit — Live Motion (commit `956e586`)

This audit covers how the portfolio uses animation and transitions, why it reads as professional, and what I found wrong or fragile. Line references point at the site's source (`src/…`). Every effect is catalogued with its parameters in `../motion-system.json` → `patterns`.

## Verdict

The motion is **systemic, not decorative**. One particle field follows the reader and changes shape per section. One ease voice (`expo.out`) and two duration registers (≈1.1s entrances, ≈0.25s feedback) run through everything. Every effect has a defined reduced-motion and no-JS state, and the engineering underneath (one clock, one teardown, fail-to-static) is what lets that much motion stay smooth and safe.

There was one real accessibility bug (finding 1) and a handful of edge cases and costs worth knowing before you reuse it. Findings 1 and 2 have since been fixed in the site.

## How it's put together

```
<head> flags script ──► data-theme / data-motion / data-intro on <html>   (before paint)
        │
CSS ────┴─► tokens, transitions, keyframes, failsafes, live/static switches
        │
React shell (LiveMotion) ── useFullMotion() ──► initLiveMotion()   ── only in full mode
        │                                        │
        │                    Lenis ◄── gsap.ticker (priority) ──► ScrollTrigger.update
        │                                        │
        │                    gsap.context + gsap.matchMedia ──► 9 scroll/pointer scenes
        │
        ├─► IntroSequence ── 'live:intro-done' ──► hero entrance, Lenis start, particles
        └─► SignalField (Canvas 2D) on the same gsap.ticker ── reads [data-signal] anchors
```

## Inventory

### Boot and safety

| Effect | Tool | Detail | Source |
| --- | --- | --- | --- |
| Pre-paint flags | Inline ES5 script | theme from localStorage, motion from media query, intro from sessionStorage | `components/live/flags.ts:11` |
| Entrance failsafes | CSS `animation: x 0s 3.5s forwards` | Headline hidden only in full mode; shown after 3.5s if JS never arrives | `app/globals.css:975-993` |
| Intro failsafe | Same trick, 6s | Overlay hides itself if JS never runs | `app/globals.css:411-422` |
| Fail-to-static | try/catch around scene setup | Revert everything, set `data-motion="reduce"` | `components/live/motion.ts:42-60` |

### Intro (first visit per session)

| Effect | Tool | Detail |
| --- | --- | --- |
| Rules draw down | GSAP `scaleY` | 0.8s, stagger 0.06, `expo.inOut` |
| HUD rises | GSAP `from yPercent 120` | 0.6s, stagger 0.05 |
| Counter 000→100 | GSAP tween of a plain object, `onUpdate` writes text | `power2.inOut`, runs the whole intro |
| Word cuts on colour plates | `tl.set` on CSS vars + visibility | 0.3s beat, five words, hard cuts |
| Letters rise per word | GSAP `yPercent 115 → 0` | 0.5s, stagger 0.018, `expo.out` |
| Shutters lift | GSAP `yPercent → -100` on 6 columns | 0.95s, stagger 0.055, `expo.inOut` |
| Skip | key / click / wheel / touch → `tl.seek("exit")` | Scroll keys are `preventDefault`ed |

### Scroll

| Effect | Tool | Trigger | Timing |
| --- | --- | --- | --- |
| Headline char flip | SplitText chars, `rotateX -95 → 0`, perspective 700 | intro hand-off | 1.15s, stagger 0.035 |
| Hero supporting copy | `autoAlpha` + `y 28` | +0.25s after chars | 1s, stagger 0.08 |
| Eyebrow wipe | timeline: bar in (power3.in) → swap text → bar out (power3.out) | `top 88%` | 0.4s + 0.45s |
| Section titles | SplitText words, `yPercent 60, rotate 3` | `top 86%` | 1.1s, stagger 0.07 |
| Statement scrub | words opacity 0.14 → 1, `scrub: true` | `top 78%` → `bottom 48%` | scroll-linked |
| Generic reveals | `ScrollTrigger.batch` on `[data-reveal]`, `y 44` | `top 90%` | 1.1s, stagger 0.09 |
| Velocity marquees | repeat −1 tween; `timeScale` & `skewX` from `getVelocity()` | always | up to 8× and 7°, settles after 0.18s |
| Ghost number parallax | `y ±speed×140`, scrub | section in view | scroll-linked |
| Pinned experience | `pin`, `x: -overflow`, `scrub 0.8`, `containerAnimation` for card hinge | `top top` (≥1024px) | scroll-linked |
| Footer wordmark | pre-split chars `yPercent 100 → 0` | `top 95%` | 1.2s, stagger 0.04 |
| Reading progress | CSS `animation-timeline: scroll(root)` | always | scroll-linked, zero JS |

### Pointer

| Effect | Tool | Detail |
| --- | --- | --- |
| Magnetic buttons | `gsap.quickTo` x/y, `elastic.out(1, 0.45)` | follows 28% / 40% of offset |
| Variable-weight wordmark | rAF-coalesced, `font-weight` 250 → 900 by distance² | 320px radius, CSS transition smooths |
| Glass spotlight | delegated pointermove → `--mx/--my` → radial-gradient | CSS only fades it in |
| Particle push / swirl | in the particle loop | 120px (70px touch), 35% tangential |
| Click shockwave | velocity impulse | 280px radius |
| Button shine | CSS `::after` translateX | 0.7s |

### Transitions and state changes

| Effect | Tool | Detail |
| --- | --- | --- |
| Theme switch | View Transitions + `clip-path: circle()` from the toggle | 750ms, `cubic-bezier(0.7,0,0.2,1)` |
| Mobile menu | CSS `clip-path` circle from burger, links stagger via `--i` | 0.7s; visibility delayed on close |
| Nav glass / hide | class toggles from scroll listener | transform 0.5s `--ease-out` |
| Active link pill | IntersectionObserver band + width/translateX transition | 0.5s |
| Project title | decode-from-noise rAF loop | 650ms; skipped on first render |
| Project panel / case-file view | React `key` remount → CSS `stage-in` | 0.7s / 0.5s |
| Case file open | `grid-template-rows 0fr → 1fr` + `inert` | 0.6s |
| Tab rail | `::before` scaleY, padding shift, arrow rotate 45° | 0.45s |
| Diagram labels | CSS fade with inline `animationDelay` stagger | 0.35s + i×0.05s |

### Particle field

About 1,900 particles (1,100 on touch, 850 on phones) in typed arrays, ticking on the GSAP ticker after Lenis. Anchors (`data-signal`) score by visible fraction with 0.25 hysteresis. The winning formation is fitted to the anchor's live rect every frame. Morphs pair particles and targets left to right and stagger wake times, so shapes draw in a sweep. Flow targets carry "packets" along diagram paths. Trails come from a partial `destination-out` fade that strengthens with scroll speed. FPS below 42 shrinks the pool by 25%. Full numbers are in `motion-system.json` → `particleEngine`.

## Why it reads as professional

1. **Continuity.** The particle field never disappears. It re-forms, so sections feel like scenes in one film, not separate slides.
2. **One voice.** `expo.out` for every arrival. Entrances sit at 1.0–1.2s and feedback at 0.2–0.5s, with nothing in the muddy middle.
3. **Hard cuts plus soft landings.** Backgrounds and words *cut*; letters *ease*. The contrast gives energy without mush.
4. **Overlap.** The hero starts while the intro's shutters are still lifting (hand-off at the exit label), and supporting copy starts 0.25s into the headline. Nothing waits for something else to finish.
5. **Input has weight.** Velocity, proximity and clicks all feed back into motion.
6. **Restraint where reading happens.** Trails fade harder during scroll. Labels get a halo stroke over particles. The statement scrub is opacity only.
7. **Static is designed, not degraded.** The SVG fallback comes from the same coordinates as the particles, and the captions change to "Static mode".

## Findings

Ordered by impact. **1 and 2 are now fixed in the site** (verified in headless Chrome, see below). 3–7 are left as they are; the template handles 1–5.

### 1. Experience cards are unreachable in static mode on wide screens (accessibility bug), FIXED

`.xp-viewport` is `overflow: hidden` so the pinned scene can slide the track (`app/globals.css:1866`). Without the pin (reduced motion, no JS, or the fail-to-static path) nothing replaces it at ≥1024px. With 4 roles plus the "next" card at `clamp(300px, 29vw, 420px)` each, only the first two or three cards fit. The rest, including the call to action, can't be seen or reached.

*Fixed in* `src/app/globals.css`: at ≥1024px, `[data-motion="reduce"] .xp-viewport` gets `overflow-x: auto`, `overscroll-behavior-x: contain` and proximity scroll-snap aligned to the page grid. Full-motion mode still uses the pin. The template ships the same rule (`motion.css`, `.h-viewport`).

### 2. Turning on reduced motion mid-visit hides the headline for ~3.5s, FIXED

When the OS setting changes, `useFullMotion` flips and the scenes are torn down, but `data-motion` stays `"full"`. Reverting GSAP's `animation: none` re-arms the CSS failsafe (`visibility: hidden` with a 3.5s delay). The global reduced-motion override shortens durations, not delays. `.live-only` captions also stay visible with no canvas.

*Fixed in* `src/components/live/LiveMotion.tsx`: the flags layout effect now subscribes to the media query and updates `data-motion` (only that flag; re-deriving `data-intro` mid-visit could raise the intro overlay). The template's `useDocumentFlags` does the same.

### 3. Scroll locks depend on effect ordering

`lockScroll(bool)` is a single on/off switch shared by the nav menu (`SiteNav.tsx:75`) and the palette/modal (`LiveMotion.tsx:73`). "Menu → Command menu" works only because React runs the child's `lockScroll(false)` before the parent's `lockScroll(true)`. A future overlay could unlock the page under another.

*Fix:* reference-counted holds. The template's `holdScroll()` returns its own release.

### 4. Lenis restart lives inside the hero scene (latent)

After the intro, `lenis.start()` is called from `heroEntrance`'s `play()` (`motion.ts:89-90`). It works because the hero always exists, but a page without `.hero-title` would stay scroll-locked after its intro. Tweens created in that deferred `play()` also sit outside the `gsap.context`, so teardown doesn't revert them.

*Fix:* the template's runtime owns the intro hold and runs deferred work through `ctx.add()`.

### 5. The nav comes back whenever smooth scroll slows down (behaviour to choose deliberately)

`setHidden(y > 480 && y > last + 2)` evaluates `false` on moves under 2px, which Lenis produces at the tail of every scroll. The bar hides only while you're moving fast and reappears as you settle. That may be the intent ("show at rest"), but it reads like a flicker on long reads.

*Template:* `useScrollDirection` keeps the current state on sub-2px moves; pick the behaviour you want.

### 6. Backdrop blur over a 60fps canvas (cost worth profiling)

PR #1 deliberately avoided `backdrop-filter` for scroll performance. PR #3 reintroduced it on `.glass` at ≥1024px with hover (`globals.css:390-394`), and the scrolled nav also blurs. Both sit over a canvas that repaints every frame, so every visible glass card's backdrop is re-blurred every frame, including the cards that hinge in during the pinned scrub. PR #3 measured 59–60 FPS in headless Chrome. Profile on a mid-range laptop with integrated graphics before adding more glass.

### 7. Smaller notes

- `pickAnchor()` runs `querySelectorAll` and reads one rect per anchor every frame. That's fine for 5 anchors; cache the NodeList if you add many.
- ScrollTriggers are created in function order, not page order (the pin comes last). It works here; with more pins, create them in page order or call `ScrollTrigger.sort()` (the template does).
- The variable-weight wordmark reflows its line on every frame the cursor moves over it. Fine for one line; don't scale it to paragraphs.
- `LiveClock` ticks every second even off-screen. Negligible, but an IntersectionObserver gate is free.

## Verification of fixes 1 and 2

Production build (`next build` + `next start`) driven over the Chrome DevTools Protocol, reduced motion emulated with `Emulation.setEmulatedMedia`, real wheel input with `Input.dispatchMouseEvent`:

| Check | Before | After |
| --- | --- | --- |
| Reduced motion, 1440px: horizontal wheel over the track | `scrollLeft` stays 0; cards 4–5 unreachable | scrolls the full 863px; last card fully visible |
| Full motion, 1440px: track overflow | `hidden` (pin owns it) | `hidden` (unchanged) |
| OS switches to reduced mid-visit | `data-motion` stays `full`; headline `visibility: hidden` | `data-motion="reduce"`; headline visible |
| OS switches back to full | — | `data-motion="full"`; headline visible; particle canvas remounted |
| Reduced motion, 800px | — | cards stacked, no horizontal scroller |
| Console errors / exceptions | none | none |

Findings 3–7 are refactors or behaviour choices and were not changed in the site.
