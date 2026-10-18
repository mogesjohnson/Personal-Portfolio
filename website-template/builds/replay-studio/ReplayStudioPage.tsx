import { Clapperboard, EyeOff, FolderLock, Frame, ImagePlay, MessageSquareText, Scissors, ShieldCheck, Upload } from "lucide-react";
import { DemoVideo } from "../project-detail/DemoVideo";
import { demo } from "./demo";
import { ProjectFooter } from "../project-footer/ProjectFooter";
import {
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
import editor from "./media/editor.webp";
import privacyCallout from "./media/privacy-callout.webp";
import review from "./media/review.webp";
import welcome from "./media/welcome.webp";
import { ReplayMotion } from "./ReplayMotion";

/* Every fact on this page comes from the replay-studio README, RELEASES.md, docs/ and
 * package.json at tag v0.2.0-alpha.4 (read 2026-10-18). See BRIEF.md for the source list. */

const FEATURES: Feature[] = [
  {
    icon: Clapperboard,
    title: "Record one window",
    body: "Pick the app, start, and pause or resume from the recording bar. Stop there or with Ctrl+Shift+Space.",
    tag: "Records WebM",
  },
  {
    icon: Scissors,
    title: "Trim the take",
    body: "Drag the trim handles, or park the playhead and press I and O to set the start and the end.",
    tag: "I / O",
  },
  {
    icon: MessageSquareText,
    title: "Timed callouts",
    body: "Drop text over the video, drag or resize it, and set exactly when it is on screen in the inspector.",
  },
  {
    icon: EyeOff,
    title: "Privacy regions",
    body: "Draw a fixed blur over anything private and give it its own active time, separate from the callouts.",
  },
  {
    icon: Frame,
    title: "A finished frame",
    body: "Four canvas looks (Tide, Dusk, Ember, Studio) plus padding and corner radius around the recording.",
  },
  {
    icon: Upload,
    title: "Export H.264 MP4",
    body: "Choose size and quality and save. Export never upscales, keeps the aspect ratio, and never overwrites an existing file.",
    tag: "MP4 · AAC",
  },
];

const STEPS = [
  { cue: 0.04, title: "Record a window", body: "Choose the app and start. Pause, resume, then stop." },
  { cue: 0.24, title: "Trim", body: "Drag the handles, or press I and O at the playhead." },
  { cue: 0.44, title: "Add a callout or privacy region", body: "Drag, resize, and time it in the inspector." },
  { cue: 0.64, title: "Frame it", body: "Canvas look, padding, and corner radius. Then Review." },
  { cue: 0.84, title: "Export", body: "Pick size and quality, save the MP4, and inspect it before sharing." },
];

const TICKS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function Timeline() {
  return (
    <div className="rp-timeline glass" data-timeline data-duration="8" data-reveal>
      <div className="rp-timeline-head">
        <span>Timeline · 3 tracks</span>
        <span className="rp-timecode">
          <b data-timecode>00:08.0</b> / 00:08.0
        </span>
      </div>
      <div className="rp-grid">
        <div className="rp-ruler" aria-hidden="true">
          {TICKS.map((tick) => (
            <span key={tick} style={{ left: `${(tick / 8) * 100}%` }}>
              00:0{tick}
            </span>
          ))}
        </div>

        <div className="rp-track">
          <span className="rp-track-label">Recording</span>
          <div className="rp-lane">
            <div className="rp-film" />
            <div className="rp-trimmed rp-trimmed-in" />
            <div className="rp-trimmed rp-trimmed-out" />
            <span className="rp-handle rp-handle-in" aria-hidden="true" />
            <span className="rp-handle rp-handle-out" aria-hidden="true" />
          </div>
        </div>

        <div className="rp-track">
          <span className="rp-track-label">Text callout</span>
          <div className="rp-lane">
            <div className="rp-clip rp-clip-callout">
              <MessageSquareText size={12} aria-hidden="true" /> Callout
            </div>
          </div>
        </div>

        <div className="rp-track">
          <span className="rp-track-label">Privacy blur</span>
          <div className="rp-lane">
            <div className="rp-clip rp-clip-privacy">
              <EyeOff size={12} aria-hidden="true" /> Privacy region
            </div>
          </div>
        </div>

        <div className="rp-playhead" aria-hidden="true">
          <i />
        </div>
      </div>
      <p className="rp-timeline-foot">
        <span>
          <kbd className="pd-key">Space</kbd> play / pause
        </span>
        <span>
          <kbd className="pd-key">I</kbd> <kbd className="pd-key">O</kbd> set start / end
        </span>
        <span>
          <kbd className="pd-key">Ctrl</kbd> <kbd className="pd-key">Z</kbd> undo
        </span>
        <span>
          <kbd className="pd-key">Delete</kbd> remove overlay
        </span>
      </p>
    </div>
  );
}

function AgentDiagram() {
  return (
    <figure className="pd-diagram" data-reveal aria-label="One command service shared by the editor, the MCP adapter and the JSON CLI">
      <div className="pd-diagram-col">
        <p className="pd-diagram-label">Clients</p>
        <div className="pd-node">
          <strong>REPLAY editor</strong>
          <span>You, in the app</span>
        </div>
        <div className="pd-node">
          <strong>MCP adapter</strong>
          <span>Claude Code and other MCP clients</span>
        </div>
        <div className="pd-node">
          <strong>JSON CLI</strong>
          <span>Scripts and diagnostics</span>
        </div>
      </div>

      <div className="pd-pipe" aria-hidden="true">
        <span>local named pipe</span>
      </div>

      <div className="pd-diagram-core">
        <p className="pd-diagram-label">One source of truth</p>
        <div className="pd-node pd-node-core">
          <strong>App command service</strong>
          <span>Typed edits · revision checks · shared undo / redo · playback acknowledgements</span>
        </div>
      </div>

      <div className="pd-pipe" aria-hidden="true">
        <span>app-owned</span>
      </div>

      <div className="pd-diagram-col">
        <p className="pd-diagram-label">Owned work</p>
        <div className="pd-node pd-node-sky">
          <strong>Capture coordinator</strong>
          <span>Recording outside the editor view</span>
        </div>
        <div className="pd-node pd-node-sky">
          <strong>Projects &amp; jobs</strong>
          <span>Survive a client disconnect</span>
        </div>
        <div className="pd-node pd-node-sky">
          <strong>Review artifacts</strong>
          <span>Frames, contact sheets, audio excerpts</span>
        </div>
        <div className="pd-node pd-node-planned">
          <strong>Narration</strong>
          <span>ElevenLabs · planned, not shipped</span>
        </div>
      </div>
      <figcaption>Redrawn from the agent automation contract in the repository&apos;s docs. The MCP adapter and the CLI attach through an authenticated, per-user Windows named pipe.</figcaption>
    </figure>
  );
}

export function ReplayStudioPage() {
  return (
    <ReplayMotion>
      <DetailShell current="/replay-studio" mark="Windows desktop app">
        <DetailHero
          kicker="Project · October 2026"
          title="REPLAY Studio"
          status="v0.2.0-alpha.4 · experimental Windows x64 prerelease · 17 October 2026"
          lead="A local Windows app for polished demos. Record a window, trim the take, add callouts and privacy blur, and export an MP4. The original video stays untouched, and an agent can drive the same controls you do."
          facts={[
            { label: "Platform", value: "Windows x64 · tested on Windows 11" },
            { label: "Built with", value: "Electron · React 19 · TypeScript" },
            { label: "Tests", value: "167 automated, passing" },
            { label: "Agent surface", value: "28 MCP tools + JSON CLI" },
          ]}
          tags={["Electron", "React 19", "TypeScript", "Vite", "FFmpeg", "MCP", "Node test runner", "MIT"]}
        >
          <Shot
            src={editor}
            alt="REPLAY Studio editor: library on the left, a framed preview with a text callout in the middle, canvas look and frame settings on the right, and a timeline with recording and text callout tracks underneath."
            figure="Fig. 01"
            chrome="REPLAY Studio · editor"
            caption="The editor in v0.2.0-alpha.3. Library, framed preview, appearance inspector, and a timeline with the recording and a timed text callout. A screenshot from the repository’s release evidence."
            priority
          />
        </DetailHero>

        <Section
          id="what-it-does"
          index="01"
          eyebrow="What it does"
          title="From one window to a finished MP4."
          intro="REPLAY keeps your original video and saves every edit locally. Normal editing needs no account and no AI connection, and there is no upload service for recordings."
        >
          <FeatureGrid features={FEATURES} />
        </Section>

        <Section
          id="make-a-demo"
          index="02"
          eyebrow="Make a demo"
          title="Scroll is the playhead."
          intro="The five steps from the README, laid over a sketch of the editor's timeline. Scroll to move the playhead across the take; each step lights as the playhead reaches it."
        >
          <div className="rp-demo">
            <Timeline />
            <ol className="rp-steps">
              {STEPS.map((step, i) => (
                <li key={step.title} data-cue={step.cue} data-reveal>
                  <span className="rp-step-num">0{i + 1}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <p className="rp-note" data-reveal>
            The timeline above is a drawing of the editor&apos;s tracks, not a recording. Edits save automatically, and undo / redo holds up to 40 steps per
            project for the app session, agent edits included.
          </p>
        </Section>

        <Section
          id="screens"
          index="03"
          eyebrow="Screens"
          title="What it looks like."
          intro="Screenshots from the repository's release evidence. The test pattern is synthetic media the checks record and inspect."
        >
          <div className="pd-gallery">
            <Shot
              src={welcome}
              alt="REPLAY Studio first launch: an empty library and a welcome panel reading Make a clear demo. Start with one window, with Record a window and Import a video buttons."
              figure="Fig. 02"
              chrome="First launch"
              caption="An empty studio on first launch, from the v0.1 evidence."
            />
            <Shot
              src={review}
              alt="The Review media panel over the editor, showing a four-frame contact sheet of a colour-bar test pattern with timestamps and a Verified badge."
              figure="Fig. 03"
              chrome="Review media"
              caption="Review builds frames, contact sheets, and audio excerpts from the original, the edit, or the export, with timestamps."
            />
            <Shot
              src={privacyCallout}
              alt="The editor with a test pattern in the Studio canvas look, a text callout track and a privacy blur track on the timeline, and trim handles on the recording."
              figure="Fig. 04"
              chrome="Shared editing"
              caption="Trim handles, a text callout, and a privacy blur on their own tracks, in the Studio canvas look. This take came from the shared-editing checks."
              className="pd-shot-wide"
            />
          </div>
        </Section>

        <Section
          id="agents"
          index="04"
          eyebrow="Agents"
          title="An agent uses the same controls you do."
          intro="Open Agents, name a connection, and choose the folders it may import from and export into. Copy the MCP setup into your client, or use the CLI command it generates. People and agents share the same edits, revision checks, undo, and playback."
        >
          <AgentDiagram />
          <FeatureGrid
            columns={3}
            features={[
              {
                icon: FolderLock,
                title: "Scoped by folder",
                body: "A connection controls the library. File transfers stay inside the import and export folders you approved.",
              },
              {
                icon: ShieldCheck,
                title: "Disconnect or revoke",
                body: "Disconnect ends a session and keeps the approval. Revoke removes it. Activity and sessions stay visible in Agents.",
              },
              {
                icon: ImagePlay,
                title: "Media an agent can inspect",
                body: "Review images reach the agent as real image content, with hashes and timestamp receipts. Audio excerpts come with a WAV and measured levels.",
              },
            ]}
          />
        </Section>

        <Section
          id="verification"
          index="05"
          eyebrow="Verification"
          title="What was checked, and how."
          intro="The checks ran on the development Windows 11 machine with synthetic content. They don't prove it works on every machine or with every app."
        >
          <Stats
            stats={[
              { value: "167", label: "Automated tests", note: "145 app, media and access tests plus 22 CLI / MCP tests, all passing." },
              { value: "28", label: "MCP tools", note: "Capture, editing, playback, export, and media review." },
              { value: "40", label: "Undo steps", note: "Per project, for the app session, shared by people and agents." },
              { value: "6", label: "Import formats", note: "MP4, WebM, MOV, MKV, M4V, and AVI. Recordings are WebM; exports are H.264 MP4." },
            ]}
          />
          <div className="pd-copy">
            <p data-reveal>
              A real Claude Code 2.1.302 process passed the shared editing and playback checks. In the visual check, it read a hidden synthetic number and colour that it could only see in an image REPLAY delivered.
              Source and packaged SDK checks also covered rendered privacy effects, artifact integrity, restart durability, and access isolation.
            </p>
          </div>
          <StackTable
            rows={[
              { layer: "Desktop shell", tech: "Electron", note: "Windows x64 app with an NSIS installer from electron-builder." },
              { layer: "Editor", tech: "React 19 · TypeScript · Vite", note: "The editor UI. A labelled browser preview runs without Electron." },
              { layer: "Media", tech: "FFmpeg · FFprobe", note: "Bundled utilities for H.264 export and inspection. They keep their GPL notices." },
              { layer: "Automation", tech: "MCP adapter · JSON CLI", note: "Bundled with the app, so no separate Node.js install is needed." },
            ]}
          />
        </Section>

        <Section
          id="limits"
          index="06"
          eyebrow="Honest limits"
          title="Still an alpha."
          intro="The README lists these, and so does this page."
        >
          <Ledger
            yesLabel="Works in this alpha"
            noLabel="Not yet"
            yes={[
              "Window recording with pause, resume, and an immediate stop.",
              "End trimming, timed text callouts, and fixed privacy rectangles.",
              "Import of MP4, WebM, MOV, MKV, M4V, and AVI. Imported audio is kept as AAC.",
              "Agent editing, playback control, and visual inspection through MCP or the CLI.",
            ]}
            no={[
              "Interior cuts and privacy regions that track movement.",
              "Microphone and system-audio recording. New takes capture video only.",
              "ElevenLabs narration. It is the next planned slice.",
              "A signed installer, passing hosted CI, and fresh-machine install checks.",
            ]}
          />
          <Limits
            items={[
              "The installer is unsigned, so Windows may show an unknown-publisher warning.",
              "Hosted GitHub Actions never ran a step: an account billing limit blocked the runners.",
              "Claude Desktop and semantic audio listening are unverified.",
            ]}
          />
        </Section>

        <Section id="demo" index="07" eyebrow="Demo video" title="See it run." intro="A recorded walkthrough of the app.">
          <DemoVideo
            video={demo}
            backdrop={editor}
            chrome="replay-studio · demo.mp4"
            figure="Fig. demo"
            caption="Walkthrough of REPLAY Studio."
          />
        </Section>

        <ProjectFooter
          current="/replay-studio"
          note={{ label: "Private repository · no source link", title: "The source repository is private, so this page links nowhere on GitHub." }}
        />
      </DetailShell>
    </ReplayMotion>
  );
}

