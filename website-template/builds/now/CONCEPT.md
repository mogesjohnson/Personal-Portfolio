# Concept — /now

Subject sentence: a status page is a dated sheet. Each thread gets a stamp (what it is, its state, since when) and a few sentences.

## Directions

1. **Dated sheet.** Method: subject-sourced metaphor. Palette: the site tokens in `src/app/globals.css` (override recorded in `BRIEF.md`). Type: Geist at display size for the title and the state words, Geist for the sentences, IBM Plex Mono (the `DispatchBar`'s mono) for stamps and dates. Signature: a hairline rules itself under the title, then rests.
2. **Radar room.** Method: axis shift (a status instrument you turn). Rejected. ideas.md keeps that for later, and this request asked for a short read.
3. **Terminal transcript.** Method: material swap (a fake CLI session). Rejected. `/shadow-army` already is that screen, and this page would copy it.

## Chosen

Direction 1. The page carries two statuses in a few sentences. The sheet sets the title at display size, puts the check date and one line beside it, and gives each thread a row: a stamp column (label, state word, date) and the sentences. It does not reuse the projects essay (Newsreader headline, numbered sections, traveling note), the homepage hero, or the homepage's "Now" strip (`.now-head` / `.now-grid`, a four-column definition list). The build's classes use an `nw-` prefix so they never pick up those homepage rules.

## Principles

- A status page should be readable in one glance. The state word ("Running", "Draft") is the largest thing in each row.
- One arrival voice, and here only one arrival: the rule on `expo.out`. A page spends its motion on the opening (How-Claude-Motion.md › Reduce every inspiration to a principle).
- Shared chrome stays shared. `DispatchBar` is the external-page header, not a new composition. /now adds no rules to it.

## R2 check

- No homepage copy, section names, MJ monogram, diagrams, intro words, or hero layout (headline left with a framed particle mark right). The title sits with a text note, not a mark.
- Palette is the live site palette, recorded as an override in `BRIEF.md`.
- No Newsreader. That serif belongs to `/projects`.
