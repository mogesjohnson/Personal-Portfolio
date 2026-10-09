import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import { ProjectsPage } from "../../../website-template/builds/projects-page/ProjectsPage";
import "../../../website-template/builds/projects-page/projects.css";

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
  title: "Projects | Moges Johnson",
  description:
    "Three AI-first repositories: Shadow Army v1, Post-it Board, and How to post it, with the join between the last two.",
};

export default function Page() {
  return (
    <div className={`${serif.variable} ${mono.variable}`}>
      <ProjectsPage />
    </div>
  );
}
