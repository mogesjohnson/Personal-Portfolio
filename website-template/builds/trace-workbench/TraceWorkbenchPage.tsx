import Image from "next/image";
import { AppWindow, Bot, Eye, MousePointerClick } from "lucide-react";
import { DemoVideo } from "../project-detail/DemoVideo";
import { ProjectFooter } from "../project-footer/ProjectFooter";
import { DetailHero, DetailShell, FeatureGrid, Section, Shot, type Feature } from "../project-detail/ProjectDetail";
import again from "./media/again.jpg";
import { demo, moreDemo } from "./demo";
import look from "./media/look.jpg";
import { TraceMotion } from "./TraceMotion";

/* What TRACE is, how a person uses it, and two real runs on the REPLAY Studio
 * browser preview (sample project "A little less busy"). The first run clicks
 * the canvas from Tide to Dusk. The second adds a text box, types, drags,
 * scrubs the timeline, and presses play. The sample is the preview's own
 * made-up app. No test ledger. Sources and the runs are in BRIEF.md. */

const FEATURES: Feature[] = [
  {
    icon: AppWindow,
    title: "One window",
    body: "Name the window. TRACE holds the desktop until that session lets go.",
    tag: "One lease",
  },
  {
    icon: Eye,
    title: "A fresh picture",
    body: "Every action starts from the latest screenshot of that window.",
    tag: "Observe",
  },
  {
    icon: MousePointerClick,
    title: "One move",
    body: "A click, a key, or a line of text. Then stop, and look at what changed.",
    tag: "Act",
  },
  {
    icon: Bot,
    title: "Four agent CLIs",
    body: "Codex, Claude Code, Grok Build, and Gemini CLI share the same tools.",
    tag: "MCP",
  },
];

/* The loop from skills/trace-computer-use/SKILL.md: observe, one action, then
 * read the fresh observation that action returns. */
const STEPS = [
  { call: "trace_computer_observe", title: "Look", body: "REPLAY Studio is open on its sample. The canvas is Tide, blue-green." },
  { call: "trace_computer_act", title: "Act", body: "One click. Dusk, the purple look." },
  { call: "fresh observation", title: "Look again", body: "The same window. The frame around the sample has turned purple." },
];

export function TraceWorkbenchPage() {
  return (
    <TraceMotion>
      <DetailShell current="/trace-workbench" mark="AI computer control">
        <DetailHero
          kicker="Project · October 2026"
          title="TRACE Workbench"
          status="v0.1.0-alpha.3 · Windows x64 · preview · 19 October 2026"
          lead="Shared Windows tools so Codex, Claude Code, Grok Build, and Gemini CLI can see a window and operate it."
        >
          <Shot
            src={look}
            alt="REPLAY Studio showing a sample project named A little less busy. A made-up task app called fold sits in a blue-green frame, with a callout reading A clearer view of your day. The Tide canvas look is selected."
            figure="Fig. 01"
            chrome="REPLAY Studio · sample"
            caption="What TRACE sees: the REPLAY Studio preview, on its made-up sample. The canvas look is Tide."
            priority
          />
        </DetailHero>

        <Section
          id="what"
          index="01"
          eyebrow="What it is"
          title="See a window. Do one thing."
          intro="TRACE is the shared hands for those four agents. It keeps one desktop at a time, and it checks the picture after every move."
        >
          <FeatureGrid features={FEATURES} columns={2} />
        </Section>

        <Section
          id="how"
          index="02"
          eyebrow="How it's used"
          title="Look. Then look again."
          intro="This is a real TRACE run on the REPLAY Studio preview. One click changes the canvas from Tide to Dusk."
        >
          <div className="tw-run" data-look>
            <figure className="tw-stage">
              <Image src={look} sizes="(max-width: 800px) 100vw, 50rem" alt="Before the click: REPLAY Studio on its sample, in the Tide look with a blue-green frame." />
              <Image className="tw-after" src={again} sizes="(max-width: 800px) 100vw, 50rem" alt="After one click on the Dusk swatch: the same window, with the frame around the sample now purple." />
              <span className="tw-sight" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className="tw-diff" aria-hidden="true">
                <b>Tide → Dusk</b>
              </span>
              <span className="tw-ring" aria-hidden="true" />
              <span className="tw-cursor" aria-hidden="true">
                <svg viewBox="0 0 16 24" focusable="false">
                  <path d="M1 1v19.5l5-4.8 3.4 7.3 3.3-1.5-3.3-7.1H16z" />
                </svg>
              </span>
            </figure>
            <ol className="tw-steps">
              {STEPS.map((step, index) => (
                <li key={step.title} data-step={index}>
                  <span>
                    0{index + 1} · <code>{step.call}</code>
                  </span>
                  <strong>{step.title}</strong>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section
          id="demo"
          index="03"
          eyebrow="Demo"
          title="See that click."
          intro="Six seconds, silent. The sample project is made up. The click is real."
        >
          <DemoVideo
            video={demo}
            backdrop={look}
            chrome="trace · replay sample"
            figure="Fig. 02"
            caption="TRACE on the REPLAY Studio preview. Tide, then one click, then Dusk."
          />
        </Section>

        <Section
          id="more"
          index="04"
          eyebrow="Doing more"
          title="The rest of the edit."
          intro="Same sample, same window. A second text box, the line typed into it, the box dragged up, the playhead pulled along the timeline, then play."
        >
          <DemoVideo
            video={moreDemo}
            backdrop={look}
            chrome="trace · replay sample"
            figure="Fig. 03"
            caption="TRACE on the REPLAY sample. The cursor adds Follow the cut, drags that callout up, scrubs to about nine seconds, and starts playback."
          />
        </Section>

        <ProjectFooter
          current="/trace-workbench"
          note={{ label: "Private repository · no source link", title: "The trace-workbench repository is private, so this page links nowhere on GitHub." }}
        />
      </DetailShell>
    </TraceMotion>
  );
}
