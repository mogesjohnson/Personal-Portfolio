import { Bot, Clapperboard, EyeOff, FolderLock, MessageSquareText, Scissors, Upload } from "lucide-react";
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
    body: "Pick the app, then pause, resume, or stop from the recording bar.",
    tag: "WebM",
  },
  {
    icon: Scissors,
    title: "Trim the take",
    body: "Drag the trim handles, or press I and O at the playhead.",
    tag: "I / O",
  },
  {
    icon: MessageSquareText,
    title: "Callouts and privacy blur",
    body: "Timed text callouts and fixed blur regions, each with its own time on screen.",
  },
  {
    icon: Upload,
    title: "Frame and export",
    body: "Four canvas looks, padding, and corner radius, then an H.264 MP4 that never upscales or overwrites a file.",
    tag: "MP4 · AAC",
  },
  {
    icon: Bot,
    title: "Agents share the controls",
    body: "28 MCP tools and a JSON CLI drive the same edits, undo, and playback you use, over an authenticated per-user named pipe.",
    tag: "MCP · CLI",
  },
  {
    icon: FolderLock,
    title: "Scoped and revocable",
    body: "A connection only reaches the import and export folders you approve. Disconnect it, or revoke it.",
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

export function ReplayStudioPage() {
  return (
    <ReplayMotion>
      <DetailShell current="/replay-studio" mark="Windows desktop app">
        <DetailHero
          kicker="Project · October 2026"
          title="REPLAY Studio"
          status="v0.2.0-alpha.4 · experimental Windows x64 prerelease · 17 October 2026"
          lead="A local Windows app for polished demos: record a window, trim it, add callouts and privacy blur, and export an MP4."
        >
          <Shot
            src={editor}
            alt="REPLAY Studio editor: library on the left, a framed preview with a text callout in the middle, canvas look and frame settings on the right, and a timeline with recording and text callout tracks underneath."
            figure="Fig. 01"
            chrome="REPLAY Studio · editor"
            caption="The editor in v0.2.0-alpha.3: library, framed preview, appearance inspector, and a timeline with a timed text callout. From the repository’s release evidence."
            priority
          />
        </DetailHero>

        <Section
          id="what-it-does"
          index="01"
          eyebrow="What it does"
          title="From one window to a finished MP4."
          intro="Your original video is kept and every edit saves locally. Normal editing needs no account and no AI connection."
        >
          <FeatureGrid features={FEATURES} />
          <StatusDetails status="Alpha · 167 automated tests passing · unsigned Windows installer">
            <Stats
              stats={[
                { value: "167", label: "Automated tests", note: "145 app, media and access tests plus 22 CLI / MCP tests, all passing." },
                { value: "28", label: "MCP tools", note: "Capture, editing, playback, export, and media review." },
                { value: "40", label: "Undo steps", note: "Per project, for the app session, shared by people and agents." },
                { value: "6", label: "Import formats", note: "MP4, WebM, MOV, MKV, M4V, and AVI. Recordings are WebM; exports are H.264 MP4." },
              ]}
            />
            <div className="pd-copy">
              <p>
                The checks ran on the development Windows 11 machine with synthetic content. A real Claude Code 2.1.302 process passed the shared editing and playback
                checks, and in the visual check it read a hidden synthetic number and colour it could only see in an image REPLAY delivered.
              </p>
            </div>
            <DetailsHeading>What works, and what doesn’t yet</DetailsHeading>
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
            <DetailsHeading>Stack</DetailsHeading>
            <StackTable
              rows={[
                { layer: "Desktop shell", tech: "Electron", note: "Windows x64 app with an NSIS installer from electron-builder." },
                { layer: "Editor", tech: "React 19 · TypeScript · Vite", note: "The editor UI. A labelled browser preview runs without Electron." },
                { layer: "Media", tech: "FFmpeg · FFprobe", note: "Bundled utilities for H.264 export and inspection. They keep their GPL notices." },
                { layer: "Automation", tech: "MCP adapter · JSON CLI", note: "Bundled with the app, so no separate Node.js install is needed." },
              ]}
            />
          </StatusDetails>
        </Section>

        <Section
          id="screens"
          index="02"
          eyebrow="Screens"
          title="What it looks like."
          intro="From the repository's release evidence. The test pattern is synthetic media the checks record and inspect."
        >
          <div className="pd-gallery">
            <Shot
              src={welcome}
              alt="REPLAY Studio first launch: an empty library and a welcome panel reading Make a clear demo. Start with one window, with Record a window and Import a video buttons."
              figure="Fig. 02"
              chrome="First launch"
              caption="An empty studio on first launch."
            />
            <Shot
              src={review}
              alt="The Review media panel over the editor, showing a four-frame contact sheet of a colour-bar test pattern with timestamps and a Verified badge."
              figure="Fig. 03"
              chrome="Review media"
              caption="Review builds timestamped frames, contact sheets, and audio excerpts that you or an agent can inspect."
            />
            <Shot
              src={privacyCallout}
              alt="The editor with a test pattern in the Studio canvas look, a text callout track and a privacy blur track on the timeline, and trim handles on the recording."
              figure="Fig. 04"
              chrome="Shared editing"
              caption="Trim handles, a text callout, and a privacy blur on their own tracks, in the Studio canvas look."
              className="pd-shot-wide"
            />
          </div>
        </Section>

        <Section
          id="make-a-demo"
          index="03"
          eyebrow="How it works"
          title="Scroll is the playhead."
          intro="The five steps from the README over a sketch of the editor's timeline. Each step lights as the playhead reaches it."
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
        </Section>

        <Section id="demo" index="04" eyebrow="Demo video" title="See it run." intro="A recorded walkthrough of the app.">
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
