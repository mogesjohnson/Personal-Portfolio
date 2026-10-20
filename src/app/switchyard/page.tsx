import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import { SwitchyardPage } from "../../../website-template/builds/switchyard/SwitchyardPage";
import "../../../website-template/builds/projects-page/projects.css";
import "../../../website-template/builds/project-footer/project-footer.css";
import "../../../website-template/builds/project-detail/project-detail.css";
import "../../../website-template/builds/switchyard/switchyard.css";

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
  title: "Switchyard | Moges Johnson",
  description:
    "Switchyard is a personal Windows project desk with Return Tickets and read-only Obsidian context.",
};

export default function Page() {
  return (
    <div className={`${serif.variable} ${mono.variable}`}>
      <SwitchyardPage />
    </div>
  );
}
