import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import { TraceWorkbenchPage } from "../../../website-template/builds/trace-workbench/TraceWorkbenchPage";
import "../../../website-template/builds/projects-page/projects.css";
import "../../../website-template/builds/project-footer/project-footer.css";
import "../../../website-template/builds/project-detail/project-detail.css";
import "../../../website-template/builds/trace-workbench/trace.css";

const serif = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dispatch-serif",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-dispatch-mono",
});

export const metadata: Metadata = {
  title: "TRACE Workbench | Moges Johnson",
  description:
    "TRACE Workbench: shared Windows tools so Codex, Claude Code, Grok Build, and Gemini CLI can see a window and operate it.",
};

export default function Page() {
  return (
    <div className={`${serif.variable} ${mono.variable}`}>
      <TraceWorkbenchPage />
    </div>
  );
}
