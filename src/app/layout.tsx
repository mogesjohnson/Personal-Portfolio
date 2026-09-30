import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FLAGS_SCRIPT } from "@/components/live/flags";
import "lenis/dist/lenis.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moges Johnson | Software Engineering & Applied AI",
  description:
    "Explore the software, systems, and applied AI work of Moges Johnson, a software engineering student and Handshake AI Fellow.",
  keywords: [
    "Moges Johnson",
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Web Development",
  ],
  authors: [{ name: "Moges Johnson" }],
  openGraph: {
    title: "Moges Johnson | Software Engineering & Applied AI",
    description:
      "Explore projects and software engineering work by Moges Johnson.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      data-theme="dark"
      data-motion="reduce"
      data-intro="off"
      suppressHydrationWarning
    >
      <head>
        {/* Sets theme, motion, and intro flags before first paint (see components/live/flags.ts). */}
        <script dangerouslySetInnerHTML={{ __html: FLAGS_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
