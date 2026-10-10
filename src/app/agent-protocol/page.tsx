import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import { ProtocolPrototype } from "../../../website-template/builds/agent-protocol/ProtocolPrototype";
import "../../../website-template/builds/projects-page/projects.css";
import "../../../website-template/builds/prototype-headers/prototype.css";

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
  title: "Agent protocol | Moges Johnson",
  description: "A v2 mock-up of the Claude component: a scripted Shadow Army protocol.",
};

export default function Page() {
  return (
    <div className={`${serif.variable} ${mono.variable}`}>
      <ProtocolPrototype />
    </div>
  );
}
