import { Bot, Clapperboard, EyeOff, MessageSquareText, Scissors, Upload } from "lucide-react";
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
import calloutBlur from "./media/callout-blur.webp";
import editor from "./media/editor.webp";
import privacyInspector from "./media/privacy-inspector.webp";
import timeline from "./media/timeline.webp";
import { ReplayMotion } from "./ReplayMotion";

/* Every fact on this page comes from the replay-studio README, docs/ and package.json
 * at tag v0.2.0-alpha.4, the latest release (17 October 2026; read 2026-10-18). The
 * screens and the demo loop were captured at 2x from that tag's browser preview with a
 * made-up invoicing recording ("Harbor"); every name, email and number in it is fake.
 * See BRIEF.md for the source list. */

const FEATURES: Feature[] = [
  {
    icon: Clapperboard,
    title: "Record one window",
    body: "Pick an app and record just that window, with pause and resume.",
    tag: "WebM",
  },
  {
    icon: Scissors,
    title: "Trim, call out, blur",
    body: "Cut the dead air, add timed text, and blur anything private.",
    tag: "I / O",
  },
  {
    icon: Upload,
    title: "Export a clean MP4",
    body: "Frame it and export H.264 MP4 without overwriting files.",
    tag: "MP4",
  },
  {
    icon: Bot,
    title: "Let an AI agent help",
    body: "Approved agents can edit too, only in folders you pick.",
    tag: "MCP · CLI",
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
            <div className="rp-clip rp-clip-callout" data-span="0.25 0.625">
              <MessageSquareText size={12} aria-hidden="true" /> Callout
            </div>
          </div>
        </div>

        <div className="rp-track">
          <span className="rp-track-label">Privacy blur</span>
          <div className="rp-lane">
            <div className="rp-clip rp-clip-privacy" data-span="0.4375 0.6875">
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
            alt="REPLAY Studio editor showing a recording of an invoicing app. A text callout reads One click sends the invoice, the client's name and email at the top are blurred, and the timeline underneath has recording, text callout and privacy blur tracks."
            figure="Fig. 01"
            chrome="REPLAY Studio · editor"
            caption="The v0.2.0-alpha.4 editor with a sample recording: a timed callout, a blurred client name and email, and the timeline underneath. The sample app and its data are made up."
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
          <FeatureGrid features={FEATURES} columns={2} />
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
                The tests ran on the developer&apos;s Windows 11 PC with made-up test videos. In a real Claude Code 2.1.302 session, the agent made edits, controlled
                playback, and correctly read a number and colour it could only see in a frame REPLAY sent it.
              </p>
              <p>
                An agent connection only reaches the import and export folders you approve. You can disconnect it for the session or revoke it for good.
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
          intro="Captured at 2x from v0.2.0-alpha.4. The recording shows a made-up invoicing app; the client's name and email are fake and blurred to show the privacy tool."
        >
          <div className="pd-gallery">
            <Shot
              src={calloutBlur}
              alt="Close-up of the framed preview: an invoicing app with a dark callout reading One click sends the invoice under the Send invoice button, and the client's name and email blurred at the top."
              figure="Fig. 02"
              chrome="Preview"
              caption="What viewers see: the callout appears on cue and the blur hides the client's details."
            />
            <Shot
              src={privacyInspector}
              alt="The privacy blur selected on the preview, with the inspector on the right showing when it appears and ends and its position and size."
              figure="Fig. 03"
              chrome="Privacy blur"
              caption="Draw a blur box over anything private, then set when it starts and ends."
            />
            <Shot
              src={timeline}
              alt="The timeline: a recording track with trim handles, a text callout track starting at five seconds, and a privacy blur track that runs the whole video."
              figure="Fig. 04"
              chrome="Timeline"
              caption="Each callout and blur gets its own track, so you can see what shows when."
              className="pd-shot-wide"
            />
          </div>
        </Section>

        <Section
          id="make-a-demo"
          index="03"
          eyebrow="How it works"
          title="Scroll is the playhead."
          intro="Making a demo takes five steps. Scroll to move the playhead; each step lights up as it passes."
        >
          <div className="rp-demo">
            <Timeline />
            <ol className="rp-steps">
              {STEPS.map((step, i) => (
                <li key={step.title} data-cue={step.cue}>
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

        <Section
          id="demo"
          index="04"
          eyebrow="Demo"
          title="See it run."
          intro="An 18-second silent loop: import a take, add a callout, blur the client's details, then play it back."
        >
          <DemoVideo
            video={demo}
            backdrop={editor}
            chrome="replay-studio · demo loop"
            figure="Fig. 05"
            caption="Recorded in the v0.2.0-alpha.4 browser preview at 1.2x speed, with a made-up recording."
          />
        </Section>

        <ProjectFooter current="/replay-studio" repo={{ href: "https://github.com/mogesjohnson/replay-studio", name: "mogesjohnson/replay-studio", private: true }} />
      </DetailShell>
    </ReplayMotion>
  );
}
