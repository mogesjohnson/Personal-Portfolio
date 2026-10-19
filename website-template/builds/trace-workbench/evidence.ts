/* The Calculator session from trace-workbench evidence/0.1.0-alpha.1/computer-use/trace.jsonl
 * (docs/advanced-capabilities, recorded 18 October 2026), one row per record. The detail
 * column is condensed from each record's own fields; the display values come from
 * independent-review.json, which opened every retained frame. Nothing here is invented. */

export type LogRow = { seq: number; type: string; method: string; detail: string; tone?: "warn" | "ok" };

export const SESSION = "calculator-2026-10-18T19-40-37-862Z";

export const LOG: LogRow[] = [
  { seq: 1, type: "discovery", method: "sky.list_apps", detail: "Windows Calculator · 0 matched" },
  { seq: 2, type: "launch", method: "sky.launch_app", detail: "calc.exe · resolved · 2446 ms" },
  { seq: 3, type: "selection", method: "sky.get_window", detail: "Calculator · window 134542" },
  { seq: 4, type: "observation", method: "sky.get_window_state", detail: "non-target capture · withdrawn, no input", tone: "warn" },
  { seq: 5, type: "recovery", method: "sky.activate_window", detail: "exact window · resolved · 110 ms" },
  { seq: 6, type: "observation", method: "sky.get_window_state", detail: "frame 323×534 · shows 0" },
  { seq: 7, type: "intent", method: "sky.click", detail: "One · x 44, y 450" },
  { seq: 8, type: "result", method: "sky.click", detail: "resolved · 109 ms" },
  { seq: 9, type: "observation", method: "sky.get_window_state", detail: "shows 1" },
  { seq: 10, type: "intent", method: "sky.click", detail: "Two · x 122, y 450" },
  { seq: 11, type: "result", method: "sky.click", detail: "resolved · 117 ms" },
  { seq: 12, type: "observation", method: "sky.get_window_state", detail: "shows 12" },
  { seq: 13, type: "intent", method: "sky.click", detail: "Multiply · x 279, y 344" },
  { seq: 14, type: "result", method: "sky.click", detail: "resolved · 159 ms" },
  { seq: 15, type: "observation", method: "sky.get_window_state", detail: "shows 12 ×" },
  { seq: 16, type: "intent", method: "sky.click", detail: "Three · x 200, y 450" },
  { seq: 17, type: "result", method: "sky.click", detail: "resolved · 116 ms" },
  { seq: 18, type: "observation", method: "sky.get_window_state", detail: "shows 3, 12 × pending" },
  { seq: 19, type: "intent", method: "sky.click", detail: "Equals · x 279, y 502" },
  { seq: 20, type: "result", method: "sky.click", detail: "resolved · 116 ms" },
  { seq: 21, type: "observation", method: "sky.get_window_state", detail: "shows 12 × 3 = 36" },
  { seq: 22, type: "completion", method: "visual assertion", detail: "12 × 3 = 36 · verified · 5 actions", tone: "ok" },
];
