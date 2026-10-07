import { magnetic, proximityWeight, type MagneticOptions, type ProximityWeightOptions } from "../lib/pointer";
import type { Scene } from "../lib/runtime";
import {
  batchReveal,
  charsRise,
  parallax,
  pinnedHorizontal,
  scrubWords,
  splitEntrance,
  splitHeadings,
  velocityMarquees,
  wipeLabels,
  type BatchRevealOptions,
  type CharsRiseOptions,
  type ParallaxOptions,
  type PinnedHorizontalOptions,
  type ScrubWordsOptions,
  type SplitEntranceOptions,
  type SplitHeadingsOptions,
  type VelocityMarqueeOptions,
  type WipeLabelsOptions,
} from "../lib/scenes";
import { motionSpec, type MotionSpec } from "./spec";

/**
 * Connects motion-system.json to code: every pattern whose connector.kind is "scene"
 * names a registry key here, and its `params` become the factory's options. Editing
 * a duration in the JSON changes the running site; nothing else needs to change.
 */

type Params = Record<string, unknown>;
type Factory = (params: Params, id: string) => Scene;

function scene<O>(factory: (options: O) => Scene, required: (keyof O & string)[] = []): Factory {
  return (params, id) => {
    const missing = required.filter((key) => params[key] === undefined);
    if (missing.length) throw new Error(`[motion-spec] pattern "${id}" is missing params: ${missing.join(", ")}`);
    return factory(params as O);
  };
}

export const sceneRegistry: Record<string, Factory> = {
  "split-entrance": scene<SplitEntranceOptions>(splitEntrance, ["title"]),
  "wipe-labels": scene<WipeLabelsOptions>(wipeLabels, ["selector"]),
  "split-headings": scene<SplitHeadingsOptions>(splitHeadings, ["selector"]),
  "scrub-words": scene<ScrubWordsOptions>(scrubWords, ["selector"]),
  "batch-reveal": scene<BatchRevealOptions>(batchReveal),
  "chars-rise": scene<CharsRiseOptions>(charsRise, ["chars", "trigger"]),
  parallax: scene<ParallaxOptions>(parallax),
  "velocity-marquees": scene<VelocityMarqueeOptions>(velocityMarquees),
  "pinned-horizontal": scene<PinnedHorizontalOptions>(pinnedHorizontal, ["section", "track", "viewport", "items"]),
  magnetic: scene<MagneticOptions>(magnetic),
  "proximity-weight": scene<ProximityWeightOptions>(proximityWeight, ["container", "chars"]),
};

export interface ScenesFromSpecOptions {
  /** Only these pattern ids. */
  only?: string[];
  /** Skip these pattern ids. */
  except?: string[];
  /** Per-pattern param overrides, merged over the JSON params. */
  overrides?: Record<string, Params>;
}

/**
 * Builds the Scene list for startMotion() from the spec. Call once at module scope
 * (or in useMemo) so the array is stable across renders.
 */
export function scenesFromSpec(spec: MotionSpec = motionSpec, { only, except, overrides = {} }: ScenesFromSpecOptions = {}): Scene[] {
  return spec.patterns.flatMap((p) => {
    if (p.enabled === false || p.connector.kind !== "scene") return [];
    if (only && !only.includes(p.id)) return [];
    if (except?.includes(p.id)) return [];
    const key = p.connector.registryKey ?? "";
    const factory = sceneRegistry[key];
    if (!factory) throw new Error(`[motion-spec] pattern "${p.id}" points at unknown registry key "${key}"`);
    return [factory({ ...p.params, ...overrides[p.id] }, p.id)];
  });
}
