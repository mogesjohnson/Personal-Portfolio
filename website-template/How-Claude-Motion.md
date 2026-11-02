# How to generate a site with this motion

Read this when the job is a new page or section, or when the bar is the smooth motion associated with Claude. The stations, the binding rules, and the live numbers live in other files. This one is the thinking that connects them.

**Done when** the build is a first edition an enterprise would put their name on: several pages in one designed world, a viewport-scale hero, a motion score that uses this kit, a signature a visitor can point at, and a reduced-motion picture that is still the same site. Covering the name does not make it the portfolio homepage, a previous build, or claude.com.

`RULES.md` R1–R6 are binding. `METHODS.md` is the station order. `motion-system.json` wins wherever a number here drifts. A request for a website means a site. A notice is what you build only when the user asks for a notice.

## The job

A first edition. The quality bar stays fixed. The composition is invented for the subject.

## The leaflet is a failed site

On 2026-10-17 two models were given this guide and asked for Weekday Kiln. Both shipped a single document. Both were rejected after they were opened in a browser at 1440px.

Claude Opus 4.6 (`page.html`, served alone) was a cream page, `#f5f0e8`, column `max-width: 640px`, system serif, and a hairline. The largest text on the page was `[[placeholder: studio name]]`. The signature was a small red stroke beside a pill that said "Cool to the touch." The rest was a definition list of placeholder tokens. That is a first-week HTML exercise. It is not a site.

Gemini 3.8 Flash (`index.html` plus `weekday-kiln.css`) used a dark ground and celadon / terracotta, then stopped. The shell was `max-width: 860px`. The "signature" was a cone already resting at 52°, about 96px tall, inside a card. Under it, two bordered boxes repeated the brief: "This week's firing is cooled and unloaded" and "There is a single weekly firing, and pickup starts when that firing is cool." The schedule was rows. The policies were four equal cards. Visible `[[placeholder]]` tokens ran through the header, the hours, the fee, and the footer. A dark theme and two accent colors do not make an enterprise site. Those two boxes are a basic component. The rest is a styled document.

Both obeyed the worst reading of this guide. `still` was treated as the mature choice. "One signature" became one tiny SVG. "Silence" became every section. R5 became a page whose headline was a placeholder. `/now`'s hairline was copied as the ceiling. The test prompt had asked for one page and for placeholders, and the guide did not contain a gate that would reject the result. Obedience is not the bar. A site that looks like this does not ship.

Name this failure the **leaflet**. A leaflet is one column, one idea repeated in a card, system fonts or a default serif, a mark smaller than the body text, and either placeholder tokens or a sentence where a section should be. If the work on screen is a leaflet, it is not done. Rebuild it. Do not explain it.

The portfolio homepage in `../src/` is the teacher. Commit `956e586` (Live Motion) is co-authored by Claude Sonnet 5.5. The kit in this folder was distilled from that code. Commit `5440238` (the spec, the schema, the token pipeline) is co-authored by Claude Opus 5.5. Later pages in `builds/` use the same techniques and are different sites. That spread is the workflow.

Claude's public web, read 2026-10-17, works the same way. Opus 5.5, Haiku 5.5, and the other launch pages do not share a hero. The HTML names `TuskHero` on `https://www.anthropic.com/claude-opus-5-5`, `MooSanity` on `https://www.anthropic.com/claude-haiku-5-5`, and `WillyHero` in shared CSS. Each launch got its own signature. A recipe that rebuilds one of them, or rebuilds this homepage, has not started.

## Generate

Run `METHODS.md` for the files and the git stations. The decisions below happen inside stations 1–4.

### 1. Name the subject's structure

Write one sentence that is the subject's own material: its process, its parts, its vocabulary. A brewery is fermentation. A launch is an assembly. A status page is a dated sheet.

**Done when** the sentence contains none of the homepage's compositions and none of Anthropic's (no monogram, no chalk card, no clay hero, no orbit).

### 2. Choose a budget

| Budget | Use it when | What the visitor gets |
| --- | --- | --- |
| `full` | The user asked for a website, an enterprise site, a launch, or a full send. This is the default. | A site of at least four pages. Shared chrome. A hero that fills the first viewport. The kit's runtime. Several scenes. One living thing or a custom medium that occupies a real region of the screen. A signature that is a sequence, not a single tween. |
| `calm` | The user asked for an essay or a reading page. | Sections with a few arrivals and one move that carries the argument, as `/projects` does. Still a designed page, not a narrow column of cards. |
| `still` | The user asked for a notice, a plaque, or a one-glance status. | One move, and the type sits. `/now` is this, and it is a small page on purpose. It is not the model for a website. |
| `script` | The user asked for a performance of steps. | A timed score, as the prototypes do. |

A website that picks `still` has refused the job. The kiln builds picked `still` and produced leaflets. If the request says "website," write `full`.

**Done when** `BRIEF.md` records the budget, and a website brief says `full`.

### 3. Write three directions

Use three different methods from `METHODS.md` › Originality methods (subject-sourced metaphor, axis shift, inversion, material swap, constraint draw, tempo). Each direction names a metaphor, a new palette, a type pairing, and, for a page, a signature move.

**Done when** one direction is chosen because of the subject, and `CONCEPT.md` records the other two and why they lost.

### 4. Reduce every inspiration to a principle

claude.com, anthropic.com, the homepage, and any other site you admire each contribute one sentence in `CONCEPT.md`. Build from that sentence.

Principles that survived the 2026-10-17 reading, ready to reuse as sentences:

- One arrival voice. Their homepage words use `cubic-bezier(0.16, 1, 0.3, 1)`, the same curve as this kit's `--ease-out` / `expo.out`.
- Two registers with a gap. Product UI answers in about 0.15–0.4s. Entrances take about 0.7–1.2s. The muddy middle reads as unfinished.
- Body copy travels a short distance, about 8–24px, on opacity and translate. A longer travel is the signature, and it is earned.
- Split text keeps a real word in the DOM for assistive tech. Some languages stay `inline` so they are never broken into boxes.
- If the engine never starts, the words are already visible. Their guards sit around 1.5s and 6s. This kit uses 3.5s for entrances and 6s for an intro overlay.
- Reduced motion is a finished picture: full opacity, no travel, loops paused, one held frame. Their Haiku script says it in a comment: one picture of one moment, no clock.
- Sequence is the hierarchy. Pictures, then the line, then the name, then permission to scroll. One group fading up together flattens that.
- A page spends its motion on the opening. After that, most of the page stays still. claude.com's system is a 10–20px lift. The brand homepage adds one scrubbed bleed. Launch pages spend the clock on the first screen.
- Hold a frame, then cut, when the subject is a picture. Haiku's stills stay up for about half a second at 12 fps and then swap. A crossfade would turn them into video.
- Texture stays small. Opus's print filter displaces by `0.6` and blurs by `0.7`. A headline that waves has left the bar.
- Infinite motion is quiet and late. A chalk line keeps a little wear after it is drawn. A scroll cue starts after the intro, at 8s, and pauses when focused. A logo marquee runs 48s and pauses under reduced motion.
- Skip lands on the rest pose. Haiku's skip holds a 250ms veil and jumps to the settled frame. It does not restart the story, and it does not dump the reader mid-draw.
- Each subject gets its own medium. Haiku is a chalk clock. Opus 5.5 is a printed word over a horizon. Sonnet 5.5 is another hero (`MobyHero`) whose engine was not fetched. `WillyHero` is a fourth. Swapping the title on one component is how a factory goes stale.

Their brand stays theirs. Ivory `#faf9f5`, ink `#141413`, clay `#d97757`, Anthropic Serif / Sans / Mono, the `:Claude:` ligature, the chalk-line hero, and the grain mask are not a palette you may reuse (R3, R6). This portfolio's amber `#fbbf24` and sky `#38bdf8` stay on this portfolio (R2). A linked page of this site follows `CONNECTIONS.md` and `src/app/globals.css`.

**Done when** every cited site is one principle sentence, and the chosen palette is none of the palettes named above.

### 5. Score the jobs

Walk the page top to bottom. Give each moment one job, or silence.

| Job | Kit patterns | Silence when |
| --- | --- | --- |
| Arrive | `hero-split-entrance`, `section-heading-rise`, `batch-reveal`, `wordmark-rise`, `eyebrow-wipe` | The sentence is the point and a rise would delay reading |
| Scrub | `scrub-statement`, `parallax-index`, `scroll-progress-bar` | The line is short enough to read at once |
| Pin | `pinned-horizontal-track` | A second pin would stack. One pin, and it ends on a call to action |
| React | `magnetic-buttons`, `variable-weight-proximity`, `velocity-marquee`, `particle-pointer`, `glass-spotlight` | The page is a document, or the pointer is coarse |
| Change state | `circular-theme-reveal`, `menu-circle-reveal`, `grid-rows-disclosure`, `decode-title`, `keyed-remount-enter` | |
| Ambient | `pip-pulse`, `satellite-bob`, `ambient-backdrop` | A second loop would phase-lock with the first. Loops are slow and out of phase |
| One living thing | `signal-field` plus a formation drawn for this subject | The subject has no geometry of its own |

The signature move is a job the table does not already name. CSS, a canvas clock, a scrub of one spatial idea, or a shader that removes itself if it fails are all legitimate media. Specify it in `SCORE.md`: trigger, timeline of several beats, numbers, the region of the viewport it owns, the rest pose, and the failure picture. Implement it as a `Scene`.

The `Scene` function may be short. The thing on screen may not. A 96px cone inside a card, or a hairline under a date, is a notice's move. On a website the signature is large enough that a visitor can describe it after one look. `ruleDraw` and `travelingNote` prove a Scene can be small when the page was asked to be small. Copying their size onto a website is how the leaflet happened.

A full site keeps, at least: arrivals on the hero, one living thing or a custom stage, the signature sequence, a route transition, and one scroll-linked scene. Silence is for a moment that would be worse if it moved. Deleting the score down to one tween is the leaflet.

`motion-system.json` › `recipes` lists jobs a kind of page might need (launch, studio, docs, pipeline, event). Treat a recipe as a checklist you delete from. A launch page that enables every id in `product-launch` is the homepage in a new color.

Shift at least two `remix.variationAxes` on a section build, and name the signature on a page build (R4). The axes are ease voice, entrance geometry, particle language, transition shape, and scroll feel. Native scroll with CSS scroll-driven animation is the light end of scroll feel. Lenis at `lerp` 0.085 is the kit default, and it is a choice.

A fictional subject is a complete world (R5). Invent the company, the people, the places, the figures, and the prices. Set `fiction: true` in `BRIEF.md`. A visible `[[placeholder]]` is a failed build. Real people and real companies still get only facts the user supplied.

**Done when** every effect has a reduced-motion picture, the signature is written as a sequence with a viewport region, a website score still has the full-site minimum above, and the copy contains no placeholder token.

### 6. Build static, then motion

Follow `METHODS.md` station 4 in order.

1. Markup and CSS that read complete with `data-motion="reduce"` and without JavaScript (R10). Hidden-until-revealed nodes get the CSS failsafe.
2. `motion.config.ts` for a fresh app: flags, palettes, formations, intro words. Shape is `examples/motion.config.ts`. Values are new.
3. Scenes from `scenesFromSpec` or from the factories in `lib/scenes.ts`.
4. The signature module.
5. A vault component only when the user names it in this request (R7).

Inside this portfolio, the route is `../src/app/<slug>/page.tsx` and the build stays in `builds/<slug>/`. Import `lib/` and `connectors/`. Copy nothing from `../src/` (R2, R12). `CONNECTIONS.md` has the host path, the live palette, and the nav.

**Done when** every line of `SCORE.md` maps to code, and the reduced-motion picture matches the score.

### 7. Verify

`METHODS.md` station 5, plus `motion-system.json` › `qa.checklist`, plus the originality check in `RULES.md`.

### Ship gate

Open the built pages at a desktop width before calling them done. Reject the build, and rebuild the offending page, when any of these are true:

- One column narrower than the viewport is the whole site, with empty margin as the design.
- The first screen is a heading, a sentence, and a card.
- The signature is smaller than the headline, or it is a single `scale` / `rotate` on a icon-sized SVG.
- Any visitor-visible `[[placeholder]]`.
- System UI as the only type, or one weight of one face and a wall of 16px text.
- Every section is the same component: label, title, paragraph, or a grid of equal cards.
- There is one page when the request was a website.
- Motion is absent in full mode, or the only motion is a 0.2s color fade.
- The pages share one composition with the nouns swapped.

The motion bar for this guide:

- Arrivals share one ease. Feedback sits in 0.2–0.5s, panels in 0.6–0.75s, entrances in 1.0–1.2s, unless the whole score was shifted to one tempo on purpose. The gap between registers stays.
- A group's stagger stays under about 0.6s.
- Scrubbed motion uses a linear tween. The scroll is the easing.
- Anything split or decoded has the real string in the DOM once.
- A modal, menu, or code block that scrolls carries `data-lenis-prevent` while Lenis is running.
- The signature is visible in full motion and already complete when motion is reduced.
- With the name covered, the page matches none of the forbidden compositions in R2 and none of the Anthropic heroes named above.

**Done when** `VERIFY.md` records each command, each QA item, and each originality box.

## Why it feels smooth

Smoothness here is a small set of decisions applied to every effect. It is not a library list.

**One voice.** `--ease-out` is `cubic-bezier(0.16, 1, 0.3, 1)` / `expo.out`, for anything arriving. Full-screen changes use `--ease-io`. A wipe that covers uses `--ease-in-strong` and leaves on `--ease-out-strong`. A magnetic control returns on `--ease-spring`. Scrubs and loops are linear. Changing the voice re-brands the motion: `power4.out` is heavier, `back.out(1.4)` is playful, `circ.out` is crisp. One voice per build.

claude.com publishes the same family as tokens (`--ease-out-expo`, `--ease-out-quart`, `--ease-out-cubic`, `--ease-in-out-quart`). Their `--ease-out-cubic` is `cubic-bezier(.215, .61, .355, 1)`, which is this kit's `--ease-out-strong`. Their product reveals default to `--ease-out-power2` (`cubic-bezier(.25, 1, .5, 1)`) over 0.75s and 10px. Same craft, a lighter register.

**Hard cuts and soft landings.** Backgrounds and word changes cut (`gsap.set` or a class). Letters and rules ease. The contrast is the energy. A calm page may keep only the landing, as `/now` does.

**Hand-off.** The intro dispatches `motion:intro-done` while its exit is still playing, and the hero starts on that event. Followers start about 0.25s into a 1.15s headline. Nothing waits for the previous tween to finish. `ctx.afterIntro` is how a scene joins that hand-off, and the runtime owns the scroll hold so a page without a hero title still unlocks.

**One clock.** Lenis is driven from `gsap.ticker` with priority, then anything that reads scroll (ScrollTrigger, the particle field) runs on that same ticker. `lagSmoothing(0)` keeps a hitch from time-warping the scroll. A canvas that reads `window.scrollY` on its own clock shimmers against its anchors.

**One living thing.** A single field that re-forms at `[data-signal]` anchors reads as one object following the reader. Many unrelated effects read as decoration. Formations are new geometry (`lib/particles/formations.ts`: `segment`, `ring`, `spin`, `flow`, `glyphCloud`, `diagramRecipe`). The homepage recipes `mj`, `contact`, `sys`, `tree`, and `orbit` stay on the homepage (R2). `share` below 1 leaves some particles drifting, which keeps the page alive. The same coordinates draw the static SVG.

**Input has weight, where the subject wants a body.** Scroll velocity can skew a marquee and then settle slower than it sped up. A pointer can move a control, swell a wordmark, or push particles. Clicks can impulse. A reading page skips this job.

**The picture survives.** Server HTML ships `data-motion="reduce"`. An inline head script upgrades the flags before paint. Scene setup is inside one `gsap.context`. On throw, the runtime reverts and sets `data-motion="reduce"`. `PLAY_ONCE` (`play none play none`) replays a reveal without the `once: true` crash on deep links. Gotcha ids worth reading before a build: `once-true-refresh-crash`, `modal-wont-scroll`, `reduced-motion-clipped-track`, `font-glyph-fallback`, `touch-hole`, `headline-clipping`.

**Budget adapts.** The field starts near 1900 / 1100 / 850 by device and shrinks by 25% below 42 FPS, floor 600. `devicePixelRatio` is capped. Loops that sit on top of a 60fps canvas are expensive. Their Haiku card chose a 12 FPS clock on purpose. A still page chooses zero.

## How the teacher became the kit

The homepage does not import this folder. `LiveMotion` composes `src/components/live/*`. The kit is that system with the brand pulled out into parameters.

| Layer | Homepage | Kit | What a new build is free to change |
| --- | --- | --- | --- |
| Flags before paint | `src/components/live/flags.ts` | `lib/flags.ts`, `connectors/next.tsx` | Storage keys, default theme, whether an intro exists |
| CSS motion | `src/app/globals.css` | `lib/styles/motion.css`, `tokens.css` | Palette, type, layout. Motion scaffolding stays |
| Shell | `LiveMotion.tsx` | `MotionRoot`, `useMotionScenes` | Which scenes mount. The array is the composition |
| Runtime | `motion.ts`, `scroll.ts` | `lib/runtime.ts`, `lib/scroll.ts` | `lerp`, the scene list. Teardown and the one clock stay |
| Scenes | functions inside `motion.ts` | `lib/scenes.ts`, `lib/pointer.ts`, `connectors/registry.ts` | Params, and which ids are absent |
| Intro | `IntroSequence.tsx` | `lib/intro.ts`, `TitleSequence` | Words, plate colors, beat. Or no intro |
| Field | `SignalField.tsx`, `formations.ts` | `lib/particles/field.ts`, `formations.ts`, `ParticleCanvas` | New formations and palettes. Or no field |
| State motion | nav, theme, decode, clock | `connectors/react.tsx`, `lib/text.ts`, `lib/theme.ts` | Which of these the subject uses |

`scenesFromSpec()` turns enabled `connector.kind: "scene"` patterns into a `Scene[]`. `only`, `except`, and `overrides` pick per page. A duration edited in the JSON changes every page that does not override it. Build-specific code stays in `builds/<slug>/` (R13).

### The same kit, four different sites

**Homepage, full.** One field morphs across the page. A skippable intro plays once per session and hands off to a headline. Scroll scenes (wipe, heading rise, scrubbed statement, batch reveal, velocity marquees, a pinned track, a wordmark) share `expo.out`. The theme reveal is a circular view transition. Static mode is SVG from the same geometry. This composition is the teacher's. R2 lists the pieces that stay here.

**`/projects`, calm.** `DispatchMotion` mounts four scenes: heading rise, a shorter reveal (`y: 24`, `0.9s`), a scrub on the lead, and `travelingNote()`. The note is parked on one repository and flies back along one curve when the connection heading arrives, on `expo.out` in `0.8s`. Reduced motion and no-JS already show it at the join. The page uses Newsreader and IBM Plex Mono. It has no field and no intro. The motion is the argument: two repos, then the join.

**`/now`, still.** `NowMotion` mounts `ruleDraw()` only. CSS shows the finished hairline. In full motion the line scales from 0 to 1 on X, origin left, `0.9s`, `expo.out`, once. The concept rejected a radar and a terminal because those were other pages' compositions. Shared chrome (`DispatchBar`) stayed shared.

**Prototypes, script.** Shadow Army and the protocol page play a session: summon, work for a few seconds, report. The score is a typed script (`builds/prototype-headers/script.ts`), not a scroll timeline. A process wants steps. A marketing page wants scroll. The subject decides.

## Wiring

Scenes are a module-level array so React does not restart the runtime every render.

```tsx
"use client";

import type { ReactNode } from "react";
import { useMotionScenes } from "../../connectors/react";
import { batchReveal, splitHeadings } from "../../lib/scenes";
import type { Scene } from "../../lib/runtime";
import { signatureMove } from "./signature";

const SCENES: Scene[] = [
  splitHeadings({ selector: ".title", duration: 1.05, stagger: 0.06 }),
  batchReveal({ selector: "[data-reveal]", y: 24, duration: 0.9 }),
  signatureMove(),
];

export function PageMotion({ children }: { children: ReactNode }) {
  useMotionScenes(SCENES);
  return children;
}
```

A signature that runs once:

```tsx
export function signatureMove(): Scene {
  return ({ afterIntro }) => {
    afterIntro(() => {
      const el = document.querySelector(".mark");
      if (!el) return;
      gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "expo.out", transformOrigin: "left center" });
    });
  };
}
```

The static CSS already shows `.mark` finished. `afterIntro` runs immediately when no intro is playing, and it records the tween for teardown. This snippet is the shape of a Scene. It is not a website signature. The kiln cone was this snippet pointed at a tiny path. A full-send signature is a timeline on a stage that fills a region of the viewport.

A fresh Next app follows `docs/INTEGRATION.md`: flags in the root layout, `MotionRoot`, `ParticleCanvas` only in full motion, formations from `defineFormation` / `diagramRecipe` / `glyphCloud`. Sample glyphs after `document.fonts.ready`. Match the anchor's aspect ratio to the formation box.

`useScrollHold` is reference-counted. Overlays use it. `scrollToTarget` still works while a closing overlay holds the scroll.

## What was on the public sites

Read 2026-10-17 from fetched HTML, CSS, and script lists. Nothing in this section was timed in a browser. Where a second pass read a minified file, that is said. Re-fetch before treating a duration as current.

### Three surfaces, three stacks

| Surface | What it is | Motion engine |
| --- | --- | --- |
| `https://www.anthropic.com/` | Webflow, published 16 Oct 2026, site `67ce28cfec624e2b733f8a52` | CSS word reveals. One GSAP 3.15 scrub (ScrollTrigger, plus TextPlugin and SplitText loaded and registered). A 12 FPS canvas clock on one card. Logo Lottie. jQuery. |
| `https://claude.com/` | Next.js (Turbopack), CSS modules, next/font (Anthropic Sans, Serif, Mono) | CSS transitions and keyframes. `scroll-behavior: smooth`. An opacity veil on route change. Lottie played only while on screen. A hero video. No GSAP string in the HTML or in the 23 script files scanned. |
| `https://www.anthropic.com/claude-opus-5-5`, `/claude-haiku-5-5`, `/news`, `/research`, `/claude/opus` | A second Next.js app. Sanity project `4zrzovbb`, dataset `website`, on the news and research routes | A different hero per launch. Haiku is a 12 fps canvas clock. Opus 5.5 is a print filter plus a WebGL horizon. The Opus script list also includes a Motion runtime (`MotionConfigContext`, `layoutId`, `projection`). Package name not present in the bundle. |
| `https://platform.claude.com/` | Next.js, Tailwind, `cds-*` design system, logged-out shell | CSS keyframes around 0.2s, `@starting-style`, one `clip-path` veil at 600ms, scroll-driven `animation-timeline` on a dialog. A user setting can force reduced motion. |

`https://claude.ai/` returned 403 to the client that fetched it. The logged-in product shell was not seen.

`data-lenis-prevent` appears on the anthropic homepage nav. No `new Lenis` and no Lenis script were in that page. The attribute is leftover. This kit does run Lenis, from `lib/runtime.ts`, because the homepage's field and scroll scenes share its clock. A build that wants the lighter product-site feel picks the native-scroll end of the scroll-feel axis and leaves scroll-coupled scenes off.

### Parameters worth stealing as technique

Anthropic homepage, from inline CSS and script in that pass:

- Words: opacity and `translateY(24px)`, **800ms**, `cubic-bezier(0.16, 1, 0.3, 1)`, random delay 100–500ms, revealed by an IntersectionObserver at threshold 0.2. A `html.js-anim` guard clears after 1500ms.
- Reduced motion on those words: `transition: none`, opacity 1, `translateY(0)`.
- One scrub, built after 1400ms, skipped when reduced motion is on: `scrub: 0.8`, `power2.out`, distance `0.3 * innerHeight`. It animates `max-width`, margin, and radius. That is a layout scrub, and it is the expensive one. Prefer transform and opacity unless the signature is a shape change.
- Haiku card clock: `FPS = 12`. Title **0.7s** from 8px on `--moo-ease: cubic-bezier(0.2, 0.8, 0.2, 1)`. Copy **0.45s** from 6px, stagger 60ms. If canvas is missing, the real heading shows.
- Marquee: 48s linear, paused on hover and under reduced motion.
- Nav dropdown: 400ms `cubic-bezier(.77, 0, .175, 1)` and `grid-template-rows` from `0fr` to `1fr`.

claude.com, from the CSS chunks:

- Reveal default **0.75s**, `--ease-out-power2`, **10px**, stagger `--reveal-index * 0.1s`.
- Heading words: opacity only, **1s**, same power2 ease.
- Nav slides down **1s** from `-20px`. Mobile panel is a `clip-path` inset. Items rise from `20px`.
- Route veil: fixed, inset 0, opacity. Entering holds opacity 1 for **0.3s ease-out**. Exiting returns to 0. Base transition **0.4s ease-in**. Scroll resets with `behavior: "instant"`. Reduced motion sets the veil to `display: none`. This is not `document.startViewTransition`.
- Reduced motion also sets `scroll-behavior: auto` and crushes durations to **0.01ms**, one iteration.
- Search panel: **0.25s** `--ease-out-quart`. Confirmed in the CSS this session, along with the ease tokens and the clay value `#d97757`.

Shared launch CSS, hero JS not opened:

- `SectionHero` lockup: **0.8s**, `cubic-bezier(.33, 1, .68, 1)`, delays 0.4 / 0.5 / 0.6s, from 18px. A hint bobs 3px over 1.6s.
- `WillyHero`: `--hero-ease: cubic-bezier(.2, .7, .2, 1)`, open delay **1.3s**, rises 0.7s / 0.72s. If the engine never marks the phase, words return after **6s**.
Launch pages, read from source the same day, not watched in a browser:

- Haiku 5.5 (`MooSanity` / `mountLaunchHero`) is the full chalk clock. Stills cut on a 25-frame cycle at 12 fps. They do not crossfade. The line draws with a cubic ease-in-out, the name is sampled onto the arc, and a `.flat` class shows the real words if that fails. Skip is a 250ms veil, then a jump to the settled frame. Reduced motion holds that frame, line included. The homepage card is a port of this engine with one picture set and fades where the launch page cuts.
- Opus 5.5 (`TuskHero`) is a different medium. SVG type sits under a still print filter (`feTurbulence`, displacement scale `0.6`, blur `0.7`). The client mounts a WebGL horizon, `stopMotion` prints, and an intro controller with `idle: 2400` and `duration: 3200`. The frame table and the easing polynomials were not extracted. Take the principle (a printed word, one horizon, a rest pose). Leave the shader, the filter, and the crops.
- Sonnet 5.5 (`MobyHero`) has skip and scroll-down in the HTML. Its engine script was not fetched. Shared CSS gives it a small glow (14px blur, flood `#c9d4ff` at 0.16). Do not invent its clock.
- Fable's hero uses a WebGL renderer and, if that throws, removes the canvas and marks the hero unsupported.
- Claude on Mars scrubs one quote with GSAP, `scrub: 0.5`, `power2.out`, opacity and y only. That is the same job as `scrub-statement`.
- platform.claude.com is a product shell at another speed: about 60–450ms, with a snap curve and one overshoot for pills. Dialog edges use `animation-timeline: scroll()`. A login veil is `clip-path` over **600ms** on `cubic-bezier(0.22, 1, 0.36, 1)`, with `motion-reduce:transition-none`. Those timings stay on product chrome. A marketing headline that moves in 60ms, or a menu that takes 6s, has mixed the registers.

Posts that tell an agent to paste GSAP, Lenis, and a component pack into every site are prompting advice. They are not how these pages are built. This kit already has GSAP and Lenis for a score that needs one clock. A page whose opening is CSS, or a 12 fps canvas, uses those and leaves the rest of the kit quiet.

Geist’s case study covers the early identity. Jack Clark’s line there is that Geist helped define the brand. It does not describe the 2026 heroes. Awwwards lists honorable mentions for Claude on Mars and The Way of Code. claude.com was not a Site of the Day. The bar is the craft above, not an award.

### A neighboring product

Claude Motion, documented 8 Oct 2026 at `https://support.claude.com/en/articles/17454997-get-started-with-claude-motion`, is an artifact that animates the user's own text, charts, shapes, and images as code and exports an MP4. It is a beta on Team and Enterprise. It does not use a video model. The principle that transfers: motion is code over real content, and one number can change without rebuilding the piece. The website factory is the other expression of that principle. An MP4 explainer is a different deliverable.

## Freedom, with the bar held

The invariants, from `motion-system.json` › `remix.keepInvariant`, plus the ones this reading added:

- Pre-paint flags and a static-first server render.
- A finished picture for every pattern when motion is reduced or JavaScript is absent.
- One ticker for anything coupled to scroll.
- One teardown, and a fail-to-static catch.
- Real text in the DOM for anything split or scrambled.
- One arrival voice per build.
- A gap between the feedback register and the entrance register. Product-shell timings stay on product chrome.
- The opening is the loudest beat. Later pages and sections still move, each with a job, at the entrance or feedback register. A site that goes still after the first sentence is a leaflet.
- A rest pose that reduced motion, a failed canvas, and a skip all land on.
- Texture at a small amplitude. Loops, if any, are slow, late, and paused when they would fight reading or focus.
- A new medium for the subject. The signature is named in `SCORE.md` and written in the build.

Everything else is open: metaphor, palette, type, which jobs fire, which axes shift, whether the living thing is particles or strokes or a single rule, whether the score is scroll or a script, whether the tempo is ceremonial or percussive. Two builds that need the logo covered to tell them apart are one build. Write the next one from the subject's sentence.
