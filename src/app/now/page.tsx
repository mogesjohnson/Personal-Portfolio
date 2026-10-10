import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { NowPage } from "../../../website-template/builds/now/NowPage";
import "../../../website-template/builds/projects-page/projects.css";
import "../../../website-template/builds/now/now.css";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-dispatch-mono",
});

export const metadata: Metadata = {
  title: "Now | Moges Johnson",
  description:
    "Current work: the Post-it Board handoff, and Shadow Army v2’s terminal screens.",
};

export default function Page() {
  return (
    <div className={mono.variable}>
      <NowPage />
    </div>
  );
}
