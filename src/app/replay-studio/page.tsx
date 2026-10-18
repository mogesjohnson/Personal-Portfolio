import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import { ReplayStudioPage } from "../../../website-template/builds/replay-studio/ReplayStudioPage";
import "../../../website-template/builds/projects-page/projects.css";
import "../../../website-template/builds/project-footer/project-footer.css";
import "../../../website-template/builds/project-detail/project-detail.css";
import "../../../website-template/builds/replay-studio/replay.css";

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
  title: "REPLAY Studio | Moges Johnson",
  description:
    "REPLAY Studio is a local Windows app for polished demos. Record a window, trim, add callouts and privacy masks, and export an MP4.",
};

export default function Page() {
  return (
    <div className={`${serif.variable} ${mono.variable}`}>
      <ReplayStudioPage />
    </div>
  );
}
