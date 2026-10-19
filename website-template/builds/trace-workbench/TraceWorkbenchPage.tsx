import { Bot, MousePointerClick, ScanSearch, Telescope } from "lucide-react";
import { ProjectFooter } from "../project-footer/ProjectFooter";
import { DetailHero, DetailShell, FeatureGrid, Frame, Ledger, Section, Stats, StatusDetails, type Feature } from "../project-detail/ProjectDetail";
import { LOG, SESSION } from "./evidence";
import { TraceMotion } from "./TraceMotion";

/* The TRACE Workbench landing page (trace-workbench PR #4, site/index.html at 1db13de)
 * rebuilt in the shared project-detail layout as live text. Copy comes from PR #4,
 * README.md and SKILLS.md on docs/advanced-capabilities, minus two lines they don't
 * support ("built in the open, verified step by step" and "0 shortcuts taken"). The
 * evidence log is the repo's recorded Calculator trace (see evidence.ts). There are no
 * screenshots: TRACE has no window of its own yet, and the only real-app captures in the
 * repo (the Calculator evidence frames) are 323 x 534 at 1x. See BRIEF.md. */

const FEATURES: Feature[] = [
  {
    icon: ScanSearch,
    title: "Reverse Engineer Anything",
    body: "Inspect artifacts, gather evidence, and support reconstruction work across binaries and packages.",
    tag: "Setup verified",
  },
  {
    icon: MousePointerClick,
    title: "Computer Use",
    body: "Observe Windows apps, use mouse, keyboard and controls, and check action results. The next implementation priority.",
    tag: "Selected",
  },
  {
    icon: Bot,
    title: "Four agent CLIs",
    body: "Codex, Claude Code, Grok Build, and Gemini CLI. Both skills need acceptance checks with each before claiming universal availability.",
    tag: "Acceptance pending",
  },
  {
    icon: Telescope,
    title: "Future skills",
    body: "Browser operation, screen understanding, voice, recorded-demo production, document intelligence, and recoverable parallel workers.",
    tag: "Under review",
  },
];

/* The landing page's "Run it" terminal: the README setup block with its three comments. */
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
    <div className="tw-run" data-setup-run>
      <span className="tw-rail" aria-hidden="true">
        <i />
      </span>
      <pre>
        <code>
          {RUN.map((line) =>
            line.cmd ? (
              <span key={line.cmd} className="tw-line" data-at={line.at}>
                {`${line.cmd}\n`}
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
  );
}

function EvidenceLog() {
  return (
    <div className="tw-log">
      <p className="tw-log-head">
        <span>session</span> {SESSION}
      </p>
      <ol>
        {LOG.map((row) => (
          <li key={row.seq} className={row.tone ? `is-${row.tone}` : undefined}>
            <span className="tw-log-seq">{String(row.seq).padStart(2, "0")}</span>
            <span className="tw-log-type">{row.type}</span>
            <span className="tw-log-method">{row.method}</span>
            <span className="tw-log-detail">{row.detail}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function TraceWorkbenchPage() {
  return (
    <TraceMotion>
      <DetailShell current="/trace-workbench" mark="AI computer control">
        <DetailHero
          kicker="Project · October 2026"
          title="TRACE Workbench"
          status="v0.1.0-alpha.1 · Windows x64 · development foundation · 18 October 2026"
          lead="One interface for Codex, Claude Code, Grok Build, and Gemini CLI to observe and operate Windows."
        />

        <Section
          id="skills"
          index="01"
          eyebrow="What it does"
          title="Early, honest, and moving."
          intro="TRACE is in its development foundation phase: engineering setup and recorded workflow evidence, with the first two skills selected. The shared desktop executor is not implemented yet. What's here is real, and what's not is stated plainly."
        >
          <FeatureGrid features={FEATURES} columns={2} />
          <StatusDetails status="v0.1.0-alpha.1 · 38 unit tests passed · 207 analysis tools via MCP · executor not yet implemented">
            <Stats
              stats={[
                { value: "38", label: "Unit tests", note: "Passed." },
                { value: "207", label: "Analysis tools", note: "Discovered via MCP." },
                { value: "12 × 3 = 36", label: "Calculator demo", note: "Reviewed by 2 observers." },
                { value: "2", label: "REPLAY modules", note: "Analyzed without changing its package." },
              ]}
            />
          </StatusDetails>
        </Section>

        <Section
          id="evidence"
          index="02"
          eyebrow="Evidence"
          title="Calculator, 12 × 3 = 36."
          intro="The existing Computer Use executor demonstrated the workflow TRACE aims to support, reviewed by two observers: one click per fresh observation of the Calculator window."
        >
          <Frame
            chrome="trace.jsonl · calculator session"
            figure="Fig. 01"
            caption="The 22 records of the 18 October 2026 session from the repo's evidence folder, shown as text. Its screenshots are 323 × 534 at 1x, so they aren't reproduced here."
          >
            <EvidenceLog />
          </Frame>
        </Section>

        <Section
          id="setup"
          index="03"
          eyebrow="How it works"
          title="Run it on Windows."
          intro="Requires a supported Node.js version; verified on Windows x64 with Node.js 26. Review the plan before applying it; setup preserves unrelated settings and backs up existing configuration."
        >
          <Frame
            chrome="powershell · trace workbench"
            figure="Fig. 02"
            caption="The developer setup from the README. Scroll to run it: each command lights up in order."
          >
            <SetupRun />
          </Frame>
          <div className="pd-copy tw-after">
            <p>
              Personal configuration, credentials, raw private analysis, and application binaries stay outside Git. PRs target <code>2–3 commits</code>, max{" "}
              <code>4</code>. See the repository rules before contributing.
            </p>
          </div>
        </Section>

        <Section
          id="scope"
          index="04"
          eyebrow="Scope"
          title="Honest scope."
          intro="The development skill and analysis connection are installed. The Calculator demonstration records the workflow TRACE aims to support; it does not establish a working TRACE executor."
        >
          <Ledger
            yesLabel="Verified"
            noLabel="Not yet"
            yes={[
              "38 unit tests passed.",
              "207 analysis tools discovered through the development MCP connection; static fixture analysis passed and owned processes exited.",
              "Two selected modules from packaged REPLAY analyzed without changing its package.",
              "Calculator 12 × 3 = 36 with the existing Computer Use executor, reviewed by two observers.",
            ]}
            no={[
              "Native decompilation engines.",
              "Live Claude, Grok, and Gemini model sessions.",
              "TRACE's own shared desktop executor, which still needs implementation.",
              "Acceptance checks for both skills with each agent CLI.",
            ]}
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
