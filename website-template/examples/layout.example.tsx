/**
 * Example app/layout.tsx (server component). Copy into your app and adjust imports.
 * In your app, also: import "lenis/dist/lenis.css" and a globals.css that does
 *   @import "tailwindcss";
 *   @import "../../website-template/lib/styles/motion.css";
 */

import type { ReactNode } from "react";
import { FlagsScript, htmlFlagProps } from "../connectors/next";
import { FLAGS } from "./motion.config";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" {...htmlFlagProps(FLAGS)}>
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router layouts use <head>; the rule only exempts files under app/. */}
      <head>
        {/* Sets theme, motion and intro flags before first paint. */}
        <FlagsScript {...FLAGS} />
      </head>
      <body className="ambient">{children}</body>
    </html>
  );
}
