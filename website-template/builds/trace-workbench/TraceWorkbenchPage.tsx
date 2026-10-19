import { AppWindow, Bot, Eye, MousePointerClick } from "lucide-react";
import { DemoVideo } from "../project-detail/DemoVideo";
import { ProjectFooter } from "../project-footer/ProjectFooter";
import { DetailHero, DetailShell, FeatureGrid, Section, Shot, type Feature } from "../project-detail/ProjectDetail";
import again from "./media/again.jpg";
import { demo } from "./demo";
import look from "./media/look.jpg";
import { TraceMotion } from "./TraceMotion";

/* What TRACE is, how a person uses it, and one real run: computer use on the
 * REPLAY Studio browser preview (sample project "A little less busy"). TRACE
 * clicked the Dusk canvas look. The sample is the preview's own made-up app.
 * No test ledger. Sources and the run are in BRIEF.md. */

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

const STEPS = [
  { at: 0.12, title: "Look", body: "REPLAY Studio is open on its sample. The canvas is Tide, blue-green." },
  { at: 0.42, title: "Act", body: "One click. Dusk, the purple look." },
  { at: 0.72, title: "Look again", body: "The same window. The frame around the sample has turned purple." },
];

export function TraceWorkbenchPage() {
  return (
    <TraceMotion>
      <DetailShell current="/trace-workbench" mark="AI computer control">
        <DetailHero
          kicker="Project · October 2026"
          title="TRACE Workbench"
          status="v0.1.0-alpha.2 · Windows x64 · preview · 19 October 2026"
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
          intro="Scroll. This is a real run on REPLAY Studio. One click changes the canvas from Tide to Dusk."
        >
          <div className="tw-run" data-look>
            <figure className="tw-stage">
              <img src={look.src} alt="REPLAY Studio sample in the Tide look, blue-green frame." />
              <img className="tw-after" src={again.src} alt="" aria-hidden="true" />
            </figure>
            <ol className="tw-steps">
              {STEPS.map((step, index) => (
                <li key={step.title} data-at={step.at}>
                  <span>0{index + 1}</span>
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

        <ProjectFooter
          current="/trace-workbench"
          note={{ label: "Private repository · no source link", title: "The trace-workbench repository is private, so this page links nowhere on GitHub." }}
        />
      </DetailShell>
    </TraceMotion>
  );
}
