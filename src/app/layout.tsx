import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
