import raw from "../motion-system.json";

/**
 * Typed access to motion-system.json. Only the parts code reads are typed; the rest
 * of the spec is documentation for people and agents.
 */

export type ConnectorKind = "scene" | "css" | "component" | "hook" | "lib" | "engine" | "script";

export interface PatternConnector {
  kind: ConnectorKind;
  /** Path relative to website-template/. */
  module: string;
  export?: string;
  /** Key in connectors/registry.ts for kind "scene". */
  registryKey?: string;
  /** CSS class (kind "css") or markup contract the pattern expects. */
  className?: string;
}

export interface PatternSpec {
  id: string;
  name: string;
  category: string;
  enabled?: boolean;
  /** Passed to the connector's factory; names match the factory's options. */
  params?: Record<string, unknown>;
  connector: PatternConnector;
}

export interface TokenSpec {
  color: { dark: Record<string, string>; light: Record<string, string> };
  layout: Record<string, string>;
  easing: Record<string, { css: string; gsap: string; use: string }>;
  duration: Record<string, { css: string; seconds: number; use: string }>;
}

export interface MotionSpec {
  meta: { name: string; version: string };
  tokens: TokenSpec;
  patterns: PatternSpec[];
}

function fail(message: string): never {
  throw new Error(`[motion-spec] ${message}`);
}

/** Checks the shape code depends on and returns the spec typed. */
export function loadSpec(json: unknown): MotionSpec {
  if (!json || typeof json !== "object") fail("spec is not an object");
  const spec = json as Partial<MotionSpec>;
  if (!spec.meta?.name) fail("meta.name is missing");
  if (!spec.tokens?.color?.dark || !spec.tokens.color.light) fail("tokens.color.dark / tokens.color.light are missing");
  if (!Array.isArray(spec.patterns)) fail("patterns must be an array");
  const seen = new Set<string>();
  for (const p of spec.patterns) {
    if (!p.id) fail("a pattern has no id");
    if (seen.has(p.id)) fail(`duplicate pattern id "${p.id}"`);
    seen.add(p.id);
    if (!p.connector?.kind || !p.connector.module) fail(`pattern "${p.id}" has no connector.kind / connector.module`);
    if (p.connector.kind === "scene" && !p.connector.registryKey) fail(`scene pattern "${p.id}" has no connector.registryKey`);
  }
  return spec as MotionSpec;
}

export const motionSpec: MotionSpec = loadSpec(raw);

export function getPattern(id: string, spec: MotionSpec = motionSpec): PatternSpec {
  return spec.patterns.find((p) => p.id === id) ?? fail(`unknown pattern "${id}"`);
}

export function patternsByCategory(category: string, spec: MotionSpec = motionSpec): PatternSpec[] {
  return spec.patterns.filter((p) => p.category === category);
}
