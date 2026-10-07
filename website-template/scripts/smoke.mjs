#!/usr/bin/env node
/**
 * Smoke test for the template's pure logic: spec loading, the scene registry,
 * formations, the pre-paint flags script, and text helpers. No browser needed.
 *
 *   node website-template/scripts/smoke.mjs
 *
 * Uses jiti (already installed with Tailwind) to load the TypeScript sources directly.
 */

import assert from "node:assert";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const template = join(dirname(fileURLToPath(import.meta.url)), "..");
const jiti = createJiti(import.meta.url, { interopDefault: true });
const load = (rel) => jiti.import(join(template, rel));

let passed = 0;
const ok = (name, fn) => {
  fn();
  passed++;
  console.log(`  ok - ${name}`);
};

/* Spec + registry ------------------------------------------------- */
const spec = await load("connectors/spec.ts");
const registry = await load("connectors/registry.ts");

ok("spec loads and validates", () => {
  assert.ok(spec.motionSpec.patterns.length >= 40);
  assert.strictEqual(spec.getPattern("velocity-marquee").params.maxBoost, 7);
});
ok("every enabled scene pattern resolves to a registry factory", () => {
  const expected = spec.motionSpec.patterns.filter((p) => p.connector.kind === "scene" && p.enabled !== false).length;
  const scenes = registry.scenesFromSpec();
  assert.strictEqual(scenes.length, expected);
  scenes.forEach((s) => assert.strictEqual(typeof s, "function"));
});
ok("only / except filter by pattern id", () => {
  assert.strictEqual(registry.scenesFromSpec(undefined, { only: ["magnetic-buttons", "parallax-index"] }).length, 2);
  const all = registry.scenesFromSpec().length;
  assert.strictEqual(registry.scenesFromSpec(undefined, { except: ["magnetic-buttons"] }).length, all - 1);
});
ok("missing required params throw a named error", () => {
  const bad = {
    ...spec.motionSpec,
    patterns: [{ id: "x", name: "x", category: "scroll-reveal", connector: { kind: "scene", module: "m", registryKey: "split-headings" }, params: {} }],
  };
  assert.throws(() => registry.scenesFromSpec(bad), /pattern "x" is missing params: selector/);
});
ok("loadSpec rejects duplicate ids and scenes without registryKey", () => {
  const base = { meta: { name: "n" }, tokens: { color: { dark: {}, light: {} } } };
  const p = { id: "a", connector: { kind: "css", module: "m" } };
  assert.throws(() => spec.loadSpec({ ...base, patterns: [p, p] }), /duplicate pattern id/);
  assert.throws(() => spec.loadSpec({ ...base, patterns: [{ id: "b", connector: { kind: "scene", module: "m" } }] }), /registryKey/);
});

/* Formations ------------------------------------------------------ */
const f = await load("lib/particles/formations.ts");
const diagram = {
  width: 640,
  height: 420,
  description: "test",
  labels: [],
  shapes: [
    { type: "rect", x: 222, y: 56, w: 196, h: 72, tone: "accent" },
    { type: "line", x1: 320, y1: 128, x2: 320, y2: 286 },
    { type: "circle", cx: 320, cy: 205, r: 82, tone: "dashed" },
  ],
  flows: [
    {
      pts: [
        [320, 128],
        [320, 286],
      ],
    },
  ],
};

ok("diagramRecipe builds exactly round(pool × share) targets of every kind", () => {
  const formation = f.buildFormation(f.diagramRecipe(diagram, { share: 0.8, seed: 3 }), 1900, { glyph: () => [] });
  assert.strictEqual(formation.targets.length, Math.round(1900 * 0.8));
  const kinds = new Set(formation.targets.map((t) => t.kind));
  assert.ok(kinds.has("point") && kinds.has("spin") && kinds.has("flow"), [...kinds].join());
});
ok("formations are deterministic per seed", () => {
  const make = () => f.assemble(10, 10, [{ weight: 1, make: f.ring(5, 5, 4, 0) }], 50, 42);
  assert.deepStrictEqual(make().targets, make().targets);
});
ok("pointOnPolyline wraps and interpolates", () => {
  const p = f.polyline([
    [0, 0],
    [10, 0],
    [10, 10],
  ]);
  const out = [0, 0];
  f.pointOnPolyline(p, 0.25, out);
  assert.deepStrictEqual(out, [5, 0]);
  f.pointOnPolyline(p, 1.75, out);
  assert.deepStrictEqual(out, [10, 5]);
});
ok("assemble survives empty primitives", () => {
  assert.strictEqual(f.assemble(1, 1, [], 100).targets.length, 0);
});

/* Flags script ---------------------------------------------------- */
const flags = await load("lib/flags.ts");

function runScript(script, { theme = null, seen = false, reduce = false, blocked = false } = {}) {
  const attrs = {};
  const storage = (value) => ({
    getItem: () => {
      if (blocked) throw new Error("blocked");
      return value;
    },
  });
  const documentStub = { documentElement: { setAttribute: (k, v) => (attrs[k] = v) } };
  const windowStub = { matchMedia: () => ({ matches: reduce }) };
  new Function("document", "localStorage", "sessionStorage", "window", script)(documentStub, storage(theme), storage(seen ? "1" : null), windowStub);
  return attrs;
}

ok("flags: first visit → dark / full / intro on", () => {
  assert.deepStrictEqual(runScript(flags.createFlagsScript()), { "data-theme": "dark", "data-motion": "full", "data-intro": "on" });
});
ok("flags: saved light theme and seen intro → light / off", () => {
  const a = runScript(flags.createFlagsScript(), { theme: "light", seen: true });
  assert.strictEqual(a["data-theme"], "light");
  assert.strictEqual(a["data-intro"], "off");
});
ok("flags: reduced motion → reduce / off", () => {
  const a = runScript(flags.createFlagsScript(), { reduce: true });
  assert.strictEqual(a["data-motion"], "reduce");
  assert.strictEqual(a["data-intro"], "off");
});
ok("flags: blocked storage falls back to defaults", () => {
  assert.deepStrictEqual(runScript(flags.createFlagsScript(), { blocked: true }), { "data-theme": "dark", "data-motion": "full", "data-intro": "on" });
});
ok("flags: intro disabled, light default", () => {
  const a = runScript(flags.createFlagsScript({ intro: false, defaultTheme: "light" }), { theme: "dark" });
  assert.strictEqual(a["data-intro"], "off");
  assert.strictEqual(a["data-theme"], "dark");
  assert.strictEqual(runScript(flags.createFlagsScript({ defaultTheme: "light" }))["data-theme"], "light");
});
ok("flags: custom storage keys are embedded safely", () => {
  assert.ok(flags.createFlagsScript({ themeKey: 'a"b' }).includes('localStorage.getItem("a\\"b")'));
});

/* Text ------------------------------------------------------------ */
const text = await load("lib/text.ts");
ok("toChars keeps width with no-break spaces", () => {
  assert.deepStrictEqual(text.toChars("A B"), ["A", " ", "B"]);
});

console.log(`\n${passed} checks passed`);
