import { Command, DatabaseBackup, FolderOpen, GitBranch, PauseCircle, Sparkles } from "lucide-react";
import {
  DetailFooter,
  DetailHero,
  DetailShell,
  FeatureGrid,
  Ledger,
  Limits,
  Section,
  Shot,
  StackTable,
  Stats,
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
    body: "Folder, Terminal, Notes, or a Launch Set of them. You review each target before Open, and each step reports its own result.",
    tag: "Alt F · Alt T · Alt N",
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
    body: "Picks only from Active projects that have a next action you wrote, no hold or blocker, and a checkout that is available now. It filters by your time and energy estimates and never invents priorities.",
  },
  {
    icon: PauseCircle,
    title: "Review Bay",
    body: "Human review holds stay put. Held projects drop out of suggestions and can't open an ordinary terminal. Releasing a hold takes a reason.",
  },
  {
    icon: GitBranch,
    title: "Bounded refresh",
    body: "Checks that the checkout is there and reads Git HEAD and ref metadata. Whether the tree is clean, tests, and runtime health stay Unknown on purpose.",
  },
  {
    icon: DatabaseBackup,
    title: "Backups & recovery",
    body: "Named SQLite backups are verified with a digest before a restore. If saved state won't load, the desk opens read-only instead of starting empty.",
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

function ReturnTicket() {
  return (
    <figure className="sy-ticket" data-reveal aria-label="The parts of a Return Ticket">
      <div className="sy-ticket-stub">
        <span>Keep your place</span>
        <strong>Return ticket</strong>
        <em>Project-wide or one checkout</em>
      </div>
      <div className="sy-ticket-body">
        <p className="sy-ticket-eyebrow">Next time, start with…</p>
        <p className="sy-ticket-line">The one useful step for your future self.</p>
        <dl className="sy-ticket-fields">
          <div>
            <dt>Note</dt>
            <dd>Optional context</dd>
          </div>
          <div>
            <dt>Blocker</dt>
            <dd>Leave blank if unblocked</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>Unestimated</dd>
          </div>
          <div>
            <dt>Energy</dt>
            <dd>Optional</dd>
          </div>
        </dl>
        <p className="sy-ticket-actions">Complete · Archive · Trash · Versions · Undo</p>
      </div>
      <figcaption>Labels and placeholders follow the app&apos;s ticket dialog.</figcaption>
    </figure>
  );
}

function KnowledgeDiagram() {
  return (
    <figure className="pd-diagram" data-reveal aria-label="Switchyard asks a fixed read-only reader for a brief from the shared Obsidian vault">
      <div className="pd-diagram-col">
        <p className="pd-diagram-label">The desk</p>
        <div className="pd-node">
          <strong>Knowledge view</strong>
          <span>Link an existing shared-brain registration and ask for a brief</span>
        </div>
        <div className="pd-node">
          <strong>Query</strong>
          <span>Up to 2,000 characters</span>
        </div>
      </div>
      <div className="pd-pipe" aria-hidden="true">
        <span>fixed reader</span>
      </div>
      <div className="pd-diagram-core">
        <p className="pd-diagram-label">Read-only worker</p>
        <div className="pd-node pd-node-core">
          <strong>Isolated Python reader</strong>
          <span>One-process Windows Job Object · 256 MiB memory cap · 8-second timeout · at most two at once</span>
        </div>
      </div>
      <div className="pd-pipe" aria-hidden="true">
        <span>read-only</span>
      </div>
      <div className="pd-diagram-col">
        <p className="pd-diagram-label">Shared brain</p>
        <div className="pd-node pd-node-sky">
          <strong>Obsidian vault</strong>
          <span>Registry and notes stay untouched</span>
        </div>
        <div className="pd-node pd-node-sky">
          <strong>Brief</strong>
          <span>Up to 6,000 characters, with citations you can preview</span>
        </div>
        <div className="pd-node pd-node-sky">
          <strong>Notes</strong>
          <span>Open an existing Markdown file in Obsidian</span>
        </div>
      </div>
      <figcaption>Drawn from the README&apos;s Shared knowledge and Security boundaries sections.</figcaption>
    </figure>
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
          lead="A personal Windows project desk. Choose the exact checkout, remember your next step, and come back to source-backed context. It never guesses what you should work on."
          facts={[
            { label: "Platform", value: "Windows x64 · WebView2" },
            { label: "Built with", value: "Tauri 2 · Rust · React · TypeScript" },
            { label: "Saved state", value: "SQLite, on this machine only" },
            { label: "Tests", value: "56 frontend + 53 Rust, passing" },
          ]}
          tags={["Tauri 2", "Rust", "React 19", "TypeScript", "Vite", "SQLite", "Obsidian", "Windows"]}
        >
          <Shot
            src={deskStart}
            alt="Switchyard's empty desk: a left rail with Library, Return tickets, Review Bay, Knowledge, Action receipts and Settings, a heading reading A good place to begin again, line art of diverging rail tracks, and buttons to choose existing projects or add one folder."
            figure="Fig. 01"
            chrome="Switchyard · browser design preview"
            caption="The empty desk. The repository ships a browser design preview that runs on fixture data and opens nothing. That is what these screenshots show."
            priority
          />
        </DetailHero>

        <Section
          id="the-yard"
          index="01"
          eyebrow="How it works"
          title="Throw the switch to the exact checkout."
          intro="One project can have several checkouts, and Switchyard sends you down the one you picked. The app draws itself as diverging rail lines; this is that drawing, with stations. Scroll to run the line."
        >
          <Yard />
        </Section>

        <Section
          id="return-tickets"
          index="02"
          eyebrow="Return Tickets"
          title="Leave yourself one sentence."
          intro="When you stop, write the next action. A ticket can cover one checkout or the whole project. Replacing an existing next action means deciding what happens to the old one first."
        >
          <div className="sy-ticket-row">
            <ReturnTicket />
            <div className="pd-copy">
              <p data-reveal>
                Tickets keep their versions. You can complete, archive, or trash one, look through up to 200 versions, or undo the latest change you&apos;re
                allowed to undo in that scope.
              </p>
              <p data-reveal>
                Tickets save the desk&apos;s own state. They don&apos;t write anything into the shared vault.
              </p>
            </div>
          </div>
        </Section>

        <Section
          id="desk"
          index="03"
          eyebrow="The desk"
          title="Everything here is a human decision."
          intro="Import is deliberate. The app doesn't clone repositories, create missing folders, or invent next actions, and a folder with a similar name never counts as the same project."
        >
          <FeatureGrid features={FEATURES} />
        </Section>

        <Section
          id="screens"
          index="04"
          eyebrow="Screens"
          title="The design preview."
          intro="Captured from the repository's browser preview on fixture projects marked as examples. In this mode, nothing touches files, terminals, notes, or agents."
        >
          <div className="pd-gallery">
            <Shot
              src={library}
              alt="The project library with five example project cards, the Exact target panel with Folder, Terminal and Notes buttons, and the top of a Return Ticket."
              figure="Fig. 02"
              chrome="Library"
              caption="The library after importing the fixture projects. Exact target on the right, with the checkout path, its availability, and the open buttons."
              className="pd-shot-wide"
            />
            <Shot
              src={candidates}
              alt="The Bring your projects to the desk dialog, listing example candidates with checkboxes, two of them marked with an executive review hold."
              figure="Fig. 03"
              chrome="Import"
              caption="Import offers candidates. Nothing is selected for you, and a review hold comes along with its project."
            />
            <Shot
              src={reviewBay}
              alt="The Review Bay page, headed Keep the context. Give it room., showing one held example project."
              figure="Fig. 04"
              chrome="Review Bay"
              caption="Review Bay. A human hold stays a hold, and passing checks or time can't release it."
            />
          </div>
        </Section>

        <Section
          id="knowledge"
          index="05"
          eyebrow="Shared knowledge"
          title="Context from the vault, read-only."
          intro="Knowledge links a project to its existing shared-brain registration in Obsidian and asks for a brief. Switchyard only reads: it doesn't capture memories, edit notes, rebuild the index, or change agent permissions."
        >
          <KnowledgeDiagram />
        </Section>

        <Section
          id="boundaries"
          index="06"
          eyebrow="Boundaries"
          title="What it will and won't run."
          intro="The UI can't hand the native side an arbitrary program, command line, or project script. The terminal action opens a fixed Windows console in the checked folder, and you type whatever comes next."
        >
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
        </Section>

        <Section
          id="validation"
          index="07"
          eyebrow="Validation"
          title="Checked on the machine it was built for."
          intro="Personal-build evidence from 16 October 2026, not a public-release claim."
        >
          <Stats
            stats={[
              { value: "56", label: "Frontend tests", note: "Eight suites, all passing." },
              { value: "53", label: "Rust tests", note: "Default native suite passing, with five skipped on purpose. Both production worker gates passed separately." },
              { value: "500", label: "Project cap", note: "With a 20 MiB cap on saved state and 100 MiB per backup." },
              { value: "30 s", label: "Open intent", note: "A prepared open expires, so a stale target can't launch." },
            ]}
          />
          <StackTable
            rows={[
              { layer: "Shell", tech: "Tauri 2", note: "Single-instance, global shortcut, and tray plugins. Current-user NSIS installer." },
              { layer: "Interface", tech: "React 19 · TypeScript · Vite", note: "The desk UI and the browser design preview." },
              { layer: "Native", tech: "Rust · windows-sys", note: "Path checks, dispatch, the worker profile, and recovery." },
              { layer: "Storage", tech: "SQLite (rusqlite)", note: "state.db holds the library, tickets, holds, and receipts. observations.db is replaceable." },
            ]}
          />
        </Section>

        <Section id="limits" index="08" eyebrow="Honest limits" title="A personal v0.1." intro="The README and the validation notes list these.">
          <Limits
            items={[
              "Unsigned, with no updater. You update by installing a reviewed build over the old one.",
              "The setup targets one Windows machine. Some integration paths are fixed to it.",
              "No full accessibility audit (Narrator, IME), multi-monitor or DPI coverage, or 500-project performance trial yet.",
              "The worker is a process-tree control, not a filesystem or network sandbox.",
              "No first-party license has been chosen.",
            ]}
          />
        </Section>

        <DetailFooter
          note="The source repository is private and contains machine-specific paths, so this page links nowhere on GitHub."
          next={{ href: "/replay-studio", label: "REPLAY Studio", blurb: "Record a window, trim, add callouts and privacy masks, export MP4." }}
        />
      </DetailShell>
    </SwitchyardMotion>
  );
}

