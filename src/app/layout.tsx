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
  title: "Moges Johnson | Full Stack Software Engineer",
  description:
    "Personal website and portfolio of Moges Johnson - Full Stack Engineer specializing in React, Next.js, and TypeScript.",
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
    title: "Moges Johnson | Full Stack Software Engineer",
    description:
      "Explore projects, technical stack, and software engineering work by Moges Johnson.",
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
