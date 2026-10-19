import { ArrowUpRight, MousePointerClick, ScanSearch } from "lucide-react";
import { ProjectFooter } from "../project-footer/ProjectFooter";
import {
  DetailHero,
  DetailsHeading,
  DetailShell,
  FeatureGrid,
  Limits,
  Section,
  Shot,
  Stats,
  StatusDetails,
  type Feature,
} from "../project-detail/ProjectDetail";
import calculator12 from "./media/calculator-12.webp";
import calculator36 from "./media/calculator-36.webp";
import landingHero from "./media/landing-hero.webp";
import landingStatus from "./media/landing-status.webp";
import { TraceMotion } from "./TraceMotion";

/* Every fact on this page comes from the trace-workbench README.md and SKILLS.md on
 * the docs/advanced-capabilities branch (v0.1.0-alpha.1, read 2026-10-18) and from
 * PR #4, the landing page (site/index.html). The two Calculator frames are the
 * repo's own evidence images (evidence/0.1.0-alpha.1/computer-use/frames); the two
 * landing-page screens were captured from PR #4. Nothing else was added. See BRIEF.md. */

const REPO = "https://github.com/mogesjohnson/trace-workbench";
const LANDING_PR = "https://github.com/mogesjohnson/trace-workbench/pull/4";

const FEATURES: Feature[] = [
  {
    icon: ScanSearch,
    title: "Reverse Engineer Anything",
    body: "Inspect artifacts, gather evidence, and support reconstruction work.",
    tag: "Setup verified",
  },
  {
    icon: MousePointerClick,
    title: "Computer Use",
    body: "Observe Windows apps, use mouse/keyboard and controls, and check action results.",
    tag: "Selected · next priority",
  },
];

/* The README's setup block, grouped the way PR #4's landing page labels it. */
const RUN = [
  { at: 0.02, comment: "install dependencies" },
  { at: 0.06, cmd: "npm ci" },
  { at: 0.2, comment: "configure development analysis tools" },
  { at: 0.26, cmd: "node bin/trace.cjs plan" },
  { at: 0.4, cmd: "node bin/trace.cjs apply" },
  { at: 0.54, cmd: "node scripts/link-grok-skill.cjs --plan" },
  { at: 0.68, cmd: "node scripts/link-grok-skill.cjs --apply" },
  { at: 0.8, comment: "verify the setup" },
  { at: 0.86, cmd: "node bin/trace.cjs doctor" },
];

function SetupRun() {
  return (
    <div className="tw-run glass" data-setup-run data-reveal>
      <div className="tw-run-head">
        <span>powershell · trace workbench</span>
        <span>
          <b data-step-count>6 / 6</b> commands
        </span>
      </div>
      <div className="tw-run-body">
        <span className="tw-rail" aria-hidden="true">
          <i />
        </span>
        <pre>
          <code>
            {RUN.map((line) =>
              line.cmd ? (
                <span key={line.cmd} className="tw-line tw-cmd" data-at={line.at} data-cmd="">
                  <span className="tw-prompt" aria-hidden="true">
                    &gt;{" "}
                  </span>
                  {line.cmd}
                  {"\n"}
                </span>
              ) : (
                <span key={line.comment} className="tw-line tw-comment" data-at={line.at}>
                  {`# ${line.comment}\n`}
                </span>
              ),
            )}
          </code>
        </pre>
      </div>
      <p className="tw-run-note">
        These commands configure development analysis tools. Review the plan before applying it; setup preserves unrelated settings and backs up existing
        configuration.
      </p>
    </div>
  );
}

export function TraceWorkbenchPage() {
  return (
    <TraceMotion>
      <DetailShell current="/trace-workbench" mark="Computer control for AI agents">
        <DetailHero
          kicker="Project · October 2026"
          title="TRACE Workbench"
          status="Version 0.1.0-alpha.1 · development foundation"
          lead="One interface for Codex, Claude Code, Grok Build, and Gemini CLI to observe and operate Windows."
          tags={["Codex", "Claude Code", "Grok Build", "Gemini CLI", "Windows", "Node.js", "MCP"]}
        >
          <ul className="tw-links" aria-label="TRACE Workbench links">
            <li>
              <a href={REPO} target="_blank" rel="noopener noreferrer">
                Repository <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={LANDING_PR} target="_blank" rel="noopener noreferrer">
                Landing page (PR #4) <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </li>
            <li className="tw-links-note">Private repository: links open for collaborators only.</li>
          </ul>
          <Shot
            src={landingHero}
            alt="The TRACE Workbench landing page: a dark hero over a particle field, the eyebrow Shared computer control for AI agents, the title TRACE Workbench, the line One interface for Codex, Claude Code, Grok Build, and Gemini CLI to observe and operate Windows, and the buttons View on GitHub and Where it stands."
            figure="Fig. 01"
            chrome="TRACE Workbench · landing page"
            caption="The landing page from PR #4 (site/index.html), with the signal-field hero."
            priority
          />
        </DetailHero>

        <Section
          id="skills"
          index="01"
          eyebrow="Skills"
          title="The first two skills."
          intro="Shared tools that give agents abilities beyond written instructions. The shared desktop executor is not implemented yet. This version contains engineering setup and recorded workflow evidence."
        >
          <FeatureGrid features={FEATURES} columns={2} />
          <StatusDetails status="0.1.0-alpha.1 · 38 unit tests passed · shared desktop executor not implemented yet">
            <Stats
              stats={[
                { value: "38", label: "Unit tests", note: "All passed." },
                {
                  value: "207",
                  label: "Analysis tools",
                  note: "Discovered through the development MCP connection; static fixture analysis passed and owned processes exited.",
                },
                {
                  value: "2",
                  label: "REPLAY modules",
                  note: "Two selected modules from packaged REPLAY were analyzed without changing its package.",
                },
                {
                  value: "12 × 3 = 36",
                  label: "Calculator demo",
                  note: "Demonstrated by the existing Computer Use executor, reviewed by two observers.",
                },
              ]}
            />
            <DetailsHeading>Scope</DetailsHeading>
            <Limits
              items={[
                "The development skill and analysis connection are installed.",
                "Native decompilation engines and live Claude/Grok/Gemini model sessions were not tested.",
                "The Calculator demonstration records the workflow TRACE aims to support; it does not establish a working TRACE executor.",
                "Selected scope does not mean both skills are finished. The next implementation priority is Computer Use, while preserving the verified analysis setup.",
                "Both skills need acceptance checks with Codex, Claude Code, Grok Build, and Gemini CLI before claiming universal availability.",
              ]}
            />
            <DetailsHeading>Future skills under review</DetailsHeading>
            <Limits
              items={[
                "Browser operation and debugging: complete web workflows and inspect browser errors/performance.",
                "Screen understanding: identify interactive regions from screenshots.",
                "Voice and listening: generate narration, transcribe audio, and align speech timing.",
                "Recorded-demo production and inspection: coordinate REPLAY editing and verify recorded footage/exports.",
                "Document intelligence: extract structured content from scans, PDFs, tables, and Office files.",
                "Recoverable parallel workers: run isolated Windows jobs with restore points and task recovery.",
              ]}
            />
            <div className="pd-copy">
              <p>Future candidates have no assigned release or implementation approval.</p>
            </div>
          </StatusDetails>
        </Section>

        <Section
          id="screens"
          index="02"
          eyebrow="Evidence"
          title="Recorded workflow evidence."
          intro="The existing Computer Use executor demonstrated Calculator 12 × 3 = 36, reviewed by two observers. It records the workflow TRACE aims to support; it does not establish a working TRACE executor."
        >
          <div className="pd-gallery tw-gallery">
            <Shot
              src={calculator12}
              alt="Windows Calculator in Standard mode showing 12, with the pointer on the 2 key."
              figure="Fig. 02"
              chrome="Calculator · observation"
              caption="A retained observation frame from the recorded workflow: 12 entered."
              className="tw-shot-calc"
            />
            <Shot
              src={calculator36}
              alt="Windows Calculator in Standard mode showing the expression 12 × 3 = and the result 36, with the pointer on the equals key."
              figure="Fig. 03"
              chrome="Calculator · observation"
              caption="The final frame: 12 × 3 = 36."
              className="tw-shot-calc"
            />
            <Shot
              src={landingStatus}
              alt="The landing page's Where it stands section: the heading Early, honest, and moving., two skill cards for Reverse Engineer Anything and Computer Use, and a row of stats: 38 unit tests passed, 207 analysis tools discovered via MCP, and the 12 × 3 = 36 Calculator demo."
              figure="Fig. 04"
              chrome="TRACE Workbench · where it stands"
              caption="The landing page's status section from PR #4."
              className="pd-shot-wide"
            />
          </div>
        </Section>

        <Section
          id="run-it"
          index="03"
          eyebrow="Setup"
          title="Run it on Windows."
          intro="Requires a supported Node.js version; verified on Windows x64 with Node.js 26. Scroll to run the setup."
        >
          <SetupRun />
        </Section>

        <ProjectFooter
          current="/trace-workbench"
          note={{ label: "Private repository · collaborators only", title: "The trace-workbench repository is private, so its GitHub links open only for collaborators." }}
        />
      </DetailShell>
    </TraceMotion>
  );
}
