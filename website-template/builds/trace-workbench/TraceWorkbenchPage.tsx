import { AppWindow, Bot, MousePointerClick, ScanSearch } from "lucide-react";
import { ProjectFooter } from "../project-footer/ProjectFooter";
import { DetailHero, DetailShell, FeatureGrid, Frame, Section, type Feature } from "../project-detail/ProjectDetail";
import { TraceMotion } from "./TraceMotion";

/* Short project page, in the same shell as /replay-studio. Facts are from
 * mogesjohnson/trace-workbench main (0.1.0-alpha.2, read 2026-10-19): README.md,
 * SKILLS.md, docs/VERIFICATION.md, docs/OBSERVED-WORKFLOW.md, and the alpha.2
 * receipts checks.json, computer-live.json, and independent-review.json.
 * The test line is the numbers. The three examples are recorded runs. See BRIEF.md. */

const FEATURES: Feature[] = [
  {
    icon: ScanSearch,
    title: "Reverse Engineer Anything",
    body: "Inspect an artifact and keep the evidence. The analysis connection is up.",
    tag: "207 tools",
  },
  {
    icon: MousePointerClick,
    title: "Computer Use",
    body: "See a window, then click, type, and check what changed.",
    tag: "6 tools",
  },
  {
    icon: AppWindow,
    title: "One desktop at a time",
    body: "One session holds the mouse and keyboard, then releases them.",
    tag: "Lease",
  },
  {
    icon: Bot,
    title: "Four agent CLIs",
    body: "Codex, Claude Code, Grok Build, and Gemini CLI. Codex passed a connection check.",
    tag: "Configured",
  },
];

/* Three recorded runs. Cues are how far down the scroll the row lights. */
const EXAMPLES = [
  {
    at: 0.18,
    kicker: "Calculator",
    title: "12 × 3 = 36",
    body: "Five clicks on Windows Calculator. The six frames read 0, 1, 12, 12×, 3, 36. Two reviewers checked them on 18 October. This run used the earlier executor.",
  },
  {
    at: 0.48,
    kicker: "A window TRACE owns",
    title: "Type, click, check",
    body: "Its own executor, the same day. Seven actions and eight fresh screenshots. It typed, set the text, raised a counter from 0 to 2, and checked a box. A second review matched the frames to the receipt.",
  },
  {
    at: 0.78,
    kicker: "Packaged REPLAY",
    title: "Two modules, package unchanged",
    body: "Reverse Engineer Anything parsed two modules from the packaged REPLAY app and left that package as it was.",
  },
];

function Examples() {
  return (
    <ol className="tw-examples" data-examples>
      {EXAMPLES.map((example, index) => (
        <li key={example.title} data-at={example.at}>
          <span className="tw-ex-num">0{index + 1}</span>
          <div>
            <p className="tw-ex-kicker">{example.kicker}</p>
            <strong>{example.title}</strong>
            <p>{example.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function TraceWorkbenchPage() {
  return (
    <TraceMotion>
      <DetailShell current="/trace-workbench" mark="AI computer control">
        <DetailHero
          kicker="Project · October 2026"
          title="TRACE Workbench"
          status="v0.1.0-alpha.2 · Windows x64 · preview · 19 October 2026"
          lead="Local tools so Codex, Claude Code, Grok Build, and Gemini CLI can observe Windows and operate it."
          facts={[
            { label: "Tests", value: "109 passed" },
            { label: "Skipped", value: "1" },
            { label: "Computer tools", value: "6" },
            { label: "Analysis tools", value: "207" },
          ]}
        />

        <Section
          id="skills"
          index="01"
          eyebrow="What it does"
          title="Two skills, four agents."
          intro="109 tests passed. The one skip is a file-symlink check that needs Windows developer mode."
        >
          <FeatureGrid features={FEATURES} columns={2} />
        </Section>

        <Section
          id="examples"
          index="02"
          eyebrow="Examples"
          title="Three recorded runs."
          intro="Calculator, a window TRACE owns, and two modules inside packaged REPLAY. Scroll to move through them."
        >
          <Frame
            chrome="trace · recorded runs"
            figure="Fig. 01"
            caption="Calculator used the earlier executor. Key chords, scrolling, dragging, and a full task with each agent are still open."
          >
            <Examples />
          </Frame>
        </Section>

        <ProjectFooter
          current="/trace-workbench"
          note={{ label: "Private repository · no source link", title: "The trace-workbench repository is private, so this page links nowhere on GitHub." }}
        />
      </DetailShell>
    </TraceMotion>
  );
}
