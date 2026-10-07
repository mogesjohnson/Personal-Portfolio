import { createFlagsScript, serverFlags, type FlagOptions } from "../lib/flags";

/**
 * Next.js App Router connector (server components; no "use client").
 *
 * Follows node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md:
 * an inline <head> script fixes up <html> attributes before first paint, and
 * suppressHydrationWarning lets React accept the DOM the script changed.
 *
 *   // app/layout.tsx
 *   export default function RootLayout({ children }: { children: React.ReactNode }) {
 *     return (
 *       <html lang="en" {...htmlFlagProps(FLAGS)}>
 *         <head>
 *           <FlagsScript {...FLAGS} />
 *         </head>
 *         <body className="ambient">{children}</body>
 *       </html>
 *     );
 *   }
 *
 * With a strict Content Security Policy the inline script needs a nonce; pass it
 * through `nonce`.
 */

export function FlagsScript({ nonce, ...options }: FlagOptions & { nonce?: string }) {
  return <script nonce={nonce} dangerouslySetInnerHTML={{ __html: createFlagsScript(options) }} />;
}

/** Server-safe defaults for <html> (static, no intro) plus suppressHydrationWarning. */
export function htmlFlagProps(options?: FlagOptions) {
  return { ...serverFlags(options), suppressHydrationWarning: true };
}
