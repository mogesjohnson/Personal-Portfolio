import { BookOpen, Command, FolderOpen, PauseCircle, Sparkles, Ticket } from "lucide-react";
import { DemoVideo } from "../project-detail/DemoVideo";
import { demo } from "./demo";
import { ProjectFooter } from "../project-footer/ProjectFooter";
import {
  DetailHero,
  DetailsHeading,
  DetailShell,
  FeatureGrid,
  Ledger,
  Limits,
  Section,
  Shot,
  StackTable,
  Stats,
  StatusDetails,
  type Feature,
} from "../project-detail/ProjectDetail";
import candidates from "./media/candidates.webp";
import deskStart from "./media/desk-start.webp";
import library from "./media/library.webp";
import reviewBay from "./media/review-bay.webp";
import { SwitchyardMotion } from "./SwitchyardMotion";

/* Every fact on this page comes from the switchyard README, docs/VALIDATION.md,
 * IMPLEMENTATION-CONTRACT.md, package.json, Cargo.toml and tauri.conf.json on main
 * (read 2026-10-18). The screenshots are the repo's own browser design preview,
 * which runs on its fixture data. See BRIEF.md. */

const STATIONS = [
  { at: 0.081, label: "Library", body: "Projects you chose. Nothing is imported by default." },
  { at: 0.324, label: "Exact checkout", body: "The checkout you picked. A folder with a similar name doesn't count." },
  { at: 0.522, label: "Open targets", body: "Folder, Terminal, Notes. You review each one first." },
  { at: 0.721, label: "Return Ticket", body: "One sentence for your future self." },
  { at: 0.919, label: "Back with context", body: "Read-only notes from the shared vault, with citations." },
];

const FEATURES: Feature[] = [
  {
    icon: FolderOpen,
    title: "Launch Set",
    body: "Folder, Terminal, Notes, or a set of them. You review each target before Open, and each step reports its own result.",
    tag: "Alt F · Alt T · Alt N",
  },
  {
    icon: Ticket,
    title: "Return Tickets",
    body: "When you stop, leave the next action for one checkout or the whole project. Tickets keep their versions.",
  },
  {
    icon: Command,
    title: "Quick Switch",
    body: "Ctrl+K, arrow keys, Enter. Picking a project selects it to inspect. It doesn't launch anything.",
    tag: "Ctrl K",
  },
  {
    icon: Sparkles,
    title: "Something to do",
    body: "Suggests only Active projects with a next action you wrote, no hold or blocker, and an available checkout. It never invents priorities.",
  },
  {
    icon: PauseCircle,
    title: "Review Bay",
    body: "Human review holds stay put. Held projects drop out of suggestions, and releasing a hold takes a reason.",
  },
  {
    icon: BookOpen,
    title: "Read-only knowledge",
    body: "Ask the linked Obsidian shared brain for a brief with citations you can preview. Switchyard only reads; notes stay untouched.",
    tag: "Obsidian",
  },
];

function Yard() {
  return (
    <div className="sy-yard glass" data-reveal>
      <svg data-yard viewBox="0 0 1100 300" role="img" aria-labelledby="sy-yard-title">
        <title id="sy-yard-title">
          A rail yard: the line leaves the library, passes a switch, and follows the exact-checkout track past four stations. Two side tracks, a same-looking
          folder and a remote reference, stay unlit.
        </title>
        <g className="sy-sleepers">
          {Array.from({ length: 44 }, (_, i) => (
            <line key={i} x1={20 + i * 25} y1={84} x2={20 + i * 25} y2={96} />
          ))}
        </g>
        <path className="sy-rail sy-rail-side" d="M200 190 L640 190" />
        <path className="sy-rail sy-rail-side sy-rail-dashed" d="M200 190 C250 190 250 270 300 270 L640 270" />
        <path className="sy-rail sy-rail-base" d="M20 190 L200 190 C250 190 250 90 300 90 L1080 90" />
        <path className="sy-route" data-route d="M20 190 L200 190 C250 190 250 90 300 90 L1080 90" />
        <text className="sy-side-label" x="656" y="194">
          SAME-LOOKING FOLDER · NOT THIS PROJECT
        </text>
        <text className="sy-side-label" x="656" y="274">
          REMOTE REFERENCE · CANNOT LAUNCH LOCALLY
        </text>
        <g className="sy-switch">
          <circle cx="200" cy="190" r="9" />
          <text x="200" y="222" textAnchor="middle">
            SWITCH
          </text>
        </g>
        {[110, 330, 550, 770, 990].map((x, i) => (
          <circle key={x} className="sy-stop" cx={x} cy={i === 0 ? 190 : 90} r="6" />
        ))}
        <circle className="sy-marker" data-marker cx="1080" cy="90" r="9" />
      </svg>
      <ol className="sy-stations">
        {STATIONS.map((station, i) => (
          <li key={station.label} data-at={station.at}>
            <span>0{i + 1}</span>
            <strong>{station.label}</strong>
            <p>{station.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function SwitchyardPage() {
  return (
    <SwitchyardMotion>
      <DetailShell current="/switchyard" mark="Windows project desk">
        <DetailHero
          kicker="Project · October 2026"
          title="Switchyard"
          status="v0.1.0 personal release · Windows x64 · validated 16 October 2026"
          lead="A personal Windows project desk: open the exact checkout, leave yourself the next step, and come back to read-only context."
        >
          <Shot
            src={deskStart}
            alt="Switchyard's empty desk: a left rail with Library, Return tickets, Review Bay, Knowledge, Action receipts and Settings, a heading reading A good place to begin again, line art of diverging rail tracks, and buttons to choose existing projects or add one folder."
            figure="Fig. 01"
            chrome="Switchyard · browser design preview"
            caption="The empty desk, from the repository's browser design preview, which runs on fixture data and opens nothing. All screenshots here come from it."
            priority
          />
        </DetailHero>

        <Section
          id="desk"
          index="01"
          eyebrow="The desk"
          title="Everything here is a human decision."
          intro="Import is deliberate. It doesn't clone repositories, create missing folders, or invent next actions."
        >
          <FeatureGrid features={FEATURES} />
          <StatusDetails status="Personal v0.1 · 56 frontend + 53 Rust tests passing · unsigned, no updater">
            <Stats
              stats={[
                { value: "56", label: "Frontend tests", note: "Eight suites, all passing." },
                { value: "53", label: "Rust tests", note: "Default native suite passing, with five skipped on purpose. Both production worker gates passed separately." },
                { value: "500", label: "Project cap", note: "With a 20 MiB cap on saved state and 100 MiB per backup." },
                { value: "30 s", label: "Open intent", note: "A prepared open expires, so a stale target can't launch." },
              ]}
            />
            <div className="pd-copy">
              <p>
                Personal-build evidence from 16 October 2026, not a public-release claim. Refresh only checks that the checkout is there and reads Git HEAD and ref
                metadata; whether the tree is clean stays Unknown on purpose. Named SQLite backups are verified with a digest before a restore, and if saved state
                won&apos;t load, the desk opens read-only instead of starting empty.
              </p>
            </div>
            <DetailsHeading>What it will and won’t run</DetailsHeading>
            <Ledger
              yesLabel="It does"
              noLabel="It never"
              yes={[
                "Open an approved local folder in Explorer.",
                "Start cmd.exe /d /q /k in the checked directory, with AutoRun turned off.",
                "Open an existing, checked Markdown note through Obsidian.",
                "Record a receipt for each action it sends.",
              ]}
              no={[
                "Run git status, hooks, project commands, dev servers, or agent CLIs.",
                "Put project text, notes, or filenames into shell code.",
                "Auto-update, start with Windows, send telemetry, or sync to a cloud.",
                "Treat a receipt as proof the window opened or got focus.",
              ]}
            />
            <Limits
              items={[
                "Unsigned, with no updater. You update by installing a reviewed build over the old one.",
                "The setup targets one Windows machine. Some integration paths are fixed to it.",
                "No full accessibility audit (Narrator, IME), multi-monitor or DPI coverage, or 500-project performance trial yet.",
                "The worker is a process-tree control, not a filesystem or network sandbox.",
                "No first-party license has been chosen.",
              ]}
            />
            <DetailsHeading>Stack</DetailsHeading>
            <StackTable
              rows={[
                { layer: "Shell", tech: "Tauri 2", note: "Single-instance, global shortcut, and tray plugins. Current-user NSIS installer." },
                { layer: "Interface", tech: "React 19 · TypeScript · Vite", note: "The desk UI and the browser design preview." },
                { layer: "Native", tech: "Rust · windows-sys", note: "Path checks, dispatch, the worker profile, and recovery." },
                { layer: "Storage", tech: "SQLite (rusqlite)", note: "state.db holds the library, tickets, holds, and receipts. observations.db is replaceable." },
              ]}
            />
          </StatusDetails>
        </Section>

        <Section
          id="screens"
          index="02"
          eyebrow="Screens"
          title="The design preview."
          intro="Fixture projects marked as examples. In this mode, nothing touches files, terminals, notes, or agents."
        >
          <div className="pd-gallery">
            <Shot
              src={library}
              alt="The project library with five example project cards, the Exact target panel with Folder, Terminal and Notes buttons, and the top of a Return Ticket."
              figure="Fig. 02"
              chrome="Library"
              caption="The library, with Exact target on the right: the checkout path, its availability, and the open buttons."
              className="pd-shot-wide"
            />
            <Shot
              src={candidates}
              alt="The Bring your projects to the desk dialog, listing example candidates with checkboxes, two of them marked with an executive review hold."
              figure="Fig. 03"
              chrome="Import"
              caption="Import offers candidates. Nothing is selected for you."
            />
            <Shot
              src={reviewBay}
              alt="The Review Bay page, headed Keep the context. Give it room., showing one held example project."
              figure="Fig. 04"
              chrome="Review Bay"
              caption="Review Bay. Passing checks or time can't release a human hold."
            />
          </div>
        </Section>

        <Section
          id="the-yard"
          index="03"
          eyebrow="How it works"
          title="Throw the switch to the exact checkout."
          intro="One project can have several checkouts, and Switchyard sends you down the one you picked. The app draws itself as diverging rail lines; scroll to run the line."
        >
          <Yard />
        </Section>

        <Section id="demo" index="04" eyebrow="Demo video" title="See it run." intro="A recorded walkthrough of the desk.">
          <DemoVideo
            video={demo}
            backdrop={deskStart}
            chrome="switchyard · demo.mp4"
            figure="Fig. demo"
            caption="Walkthrough of Switchyard."
          />
        </Section>

        <ProjectFooter
          current="/switchyard"
          note={{ label: "Private repository · no source link", title: "The source repository is private and contains machine-specific paths, so this page links nowhere on GitHub." }}
        />
      </DetailShell>
    </SwitchyardMotion>
  );
}
