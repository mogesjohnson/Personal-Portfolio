import { Command, FolderOpen, PauseCircle, Ticket } from "lucide-react";
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
import library from "./media/library.webp";
import returnTickets from "./media/return-tickets.webp";
import reviewBay from "./media/review-bay.webp";
import { SwitchyardMotion } from "./SwitchyardMotion";

/* Every fact on this page comes from the switchyard README, docs/VALIDATION.md,
 * IMPLEMENTATION-CONTRACT.md, package.json, Cargo.toml and tauri.conf.json on main
 * (v0.1.0, no tags or GitHub releases yet; read 2026-10-18). The screenshots and the
 * demo loop were captured at 2x from the repo's browser design preview with its sample
 * projects. For the capture only, the desk label was changed from the hard-coded
 * "JOHN'S DESK" to "MY DESK" and the " · example" suffix was dropped from the sample
 * names; the preview banner is cropped off. See BRIEF.md. */

const STATIONS = [
  { at: 0.081, label: "Library", body: "Only the projects you added. Nothing comes in on its own." },
  { at: 0.324, label: "Exact checkout", body: "The copy of the project you picked, never a folder with a similar name." },
  { at: 0.522, label: "Open targets", body: "Folder, Terminal, Notes. You check each one before it opens." },
  { at: 0.721, label: "Return Ticket", body: "A one-sentence note to your future self about the next step." },
  { at: 0.919, label: "Back with context", body: "Your Obsidian notes for the project, read but never edited, with sources." },
];

const FEATURES: Feature[] = [
  {
    icon: FolderOpen,
    title: "Launch Set",
    body: "Opens the folder, terminal and notes you checked, together.",
    tag: "Alt F · Alt T · Alt N",
  },
  {
    icon: Ticket,
    title: "Return Tickets",
    body: "A one-sentence note to yourself about the next step.",
  },
  {
    icon: Command,
    title: "Quick Switch",
    body: "Ctrl+K finds any project. Picking one never launches it.",
    tag: "Ctrl K",
  },
  {
    icon: PauseCircle,
    title: "Review Bay",
    body: "On-hold projects stay parked until a person releases them.",
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
        <g className="sy-switch" data-switch data-x="200">
          {/* The lever lies along the side track while waiting, and stands toward the main line once thrown. */}
          <g className="sy-lever">
            <line x1="200" y1="190" x2="240" y2="190" />
            <circle cx="240" cy="190" r="5" />
          </g>
          <circle className="sy-switch-hub" cx="200" cy="190" r="9" />
          <text x="200" y="222" textAnchor="middle">
            SWITCH
          </text>
        </g>
        {[110, 330, 550, 770, 990].map((x, i) => (
          <circle key={x} className="sy-stop" cx={x} cy={i === 0 ? 190 : 90} r="6" data-at={STATIONS[i].at} />
        ))}
        <circle className="sy-marker" data-marker cx="1080" cy="90" r="9" />
      </svg>
      <ul className="sy-legend" aria-hidden="true">
        <li>Same-looking folder · not this project</li>
        <li>Remote reference · cannot launch locally</li>
      </ul>
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
            src={library}
            alt="Switchyard's library, headed MY DESK / WINDOWS: five project cards, the Portfolio card selected, and on the right its exact folder with Folder, Terminal and Notes buttons above a Return Ticket that reads Finish the mobile menu, then publish the case-study page."
            figure="Fig. 01"
            chrome="Switchyard · library"
            caption="The library with a Return Ticket on Portfolio. Captured from the app's browser preview, which uses sample projects and never touches your files."
            priority
          />
        </DetailHero>

        <Section
          id="desk"
          index="01"
          eyebrow="The desk"
          title="You decide what happens next."
          intro="Switchyard only shows projects you added. It never clones repositories, creates folders, or guesses your next step."
        >
          <FeatureGrid features={FEATURES} columns={2} />
          <StatusDetails status="Personal v0.1 · 56 frontend + 53 Rust tests passing · unsigned, no updater">
            <Stats
              stats={[
                { value: "56", label: "Frontend tests", note: "Eight suites, all passing." },
                { value: "53", label: "Rust tests", note: "Native suite passing, with five tests skipped on purpose." },
                { value: "500", label: "Project cap", note: "With a 20 MiB cap on saved state and 100 MiB per backup." },
                { value: "30 s", label: "Open window", note: "A prepared open expires after 30 seconds, so an out-of-date target can't launch." },
              ]}
            />
            <div className="pd-copy">
              <p>
                Tested on the developer&apos;s Windows PC on 16 October 2026. It&apos;s a personal build, not a public release. Refresh only checks that the folder
                is there and reads its Git branch; it doesn&apos;t claim to know whether you have uncommitted changes. Backups are checked before a restore, and if
                saved data won&apos;t load, the desk opens read-only instead of starting empty.
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
          title="What it looks like."
          intro="Captured at 2x from the app's browser preview with sample projects. In the preview, nothing on your computer is opened or changed."
        >
          <div className="pd-gallery">
            <Shot
              src={candidates}
              alt="The Bring your projects to the desk dialog listing sample projects with checkboxes. Portfolio and Shadow Army are ticked, and the button reads Import 2 targets."
              figure="Fig. 02"
              chrome="Add projects"
              caption="Adding projects: you tick the ones you want. Nothing is pre-selected."
            />
            <Shot
              src={reviewBay}
              alt="The Review Bay page, headed Keep the context. Give it room., showing the Shadow Army project on review, waiting for a decision."
              figure="Fig. 03"
              chrome="Review Bay"
              caption="Review Bay: a project on hold stays on hold until a person releases it and gives a reason."
            />
            <Shot
              src={returnTickets}
              alt="The Return tickets page: Portfolio has an active ticket reading Finish the mobile menu, then publish the case-study page, with Edit, Complete, Undo version and History links. Other projects have none."
              figure="Fig. 04"
              chrome="Return tickets"
              caption="Return Tickets: each project keeps the notes you left yourself, with earlier versions you can restore."
              className="pd-shot-wide"
            />
          </div>
        </Section>

        <Section
          id="the-yard"
          index="03"
          eyebrow="How it works"
          title="Throw the switch to the exact checkout."
          intro="One project can live in several folders. Switchyard opens the one you picked, never a look-alike. Scroll to follow the line."
        >
          <Yard />
        </Section>

        <Section
          id="demo"
          index="04"
          eyebrow="Demo"
          title="See it run."
          intro="An 18-second silent loop: add projects, pick one, leave a Return Ticket, then check the Review Bay."
        >
          <DemoVideo
            video={demo}
            backdrop={library}
            chrome="switchyard · demo loop"
            figure="Fig. 05"
            caption="Recorded in the browser preview with sample projects, at 1.5x speed."
          />
        </Section>

        <ProjectFooter current="/switchyard" repo={{ href: "https://github.com/mogesjohnson/switchyard", name: "mogesjohnson/switchyard", private: true }} />
      </DetailShell>
    </SwitchyardMotion>
  );
}
