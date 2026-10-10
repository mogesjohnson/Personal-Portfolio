"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { toggleTheme } from "../../../src/components/live/theme";
import type { Scene, SessionScript, Step } from "./script";

type RowKind = "claude" | "you" | "office" | "audit" | "tool" | "soldier" | "idle" | "done";

type Row = {
  id: string;
  kind: RowKind;
  who?: string;
  text: string;
  live?: boolean;
  clock?: string;
};

type Mode = "idle" | "working" | "done";

type Work = {
  soldier: string;
  word: string;
  secs: number;
  tokens: string;
};

type Phase = "boot" | "idle" | "run";

const GLYPHS = ["·", "✢", "✳", "✶", "✻", "✽"];

class Halt extends Error {
  constructor(readonly reason: string) {
    super(reason);
    this.name = "Halt";
  }
}

function quietMotion() {
  if (document.documentElement.dataset.motion === "reduce") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new Halt(String(signal.reason ?? "abort")));
      return;
    }
    const onAbort = () => {
      window.clearTimeout(timer);
      reject(new Halt(String(signal.reason ?? "abort")));
    };
    const timer = window.setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal.addEventListener("abort", onAbort);
  });
}

async function reveal(text: string, onChunk: (shown: string) => void, signal: AbortSignal, pace: "speak" | "fast") {
  let index = 0;
  while (index < text.length) {
    if (signal.aborted) throw new Halt(String(signal.reason ?? "abort"));
    const span = pace === "fast" ? 8 + Math.floor(Math.random() * 16) : 2 + Math.floor(Math.random() * 11);
    index = Math.min(text.length, index + span);
    onChunk(text.slice(0, index));
    const gap = pace === "fast" ? 12 + Math.random() * 28 : 22 + Math.random() * 74;
    const stall = pace === "speak" && Math.random() < 0.14 ? 140 + Math.random() * 220 : 0;
    await sleep(gap + stall, signal);
  }
}

function tone(who: string) {
  const key = who.toLowerCase();
  if (key === "iron" || key === "igris" || key === "beru" || key === "tusk") return key;
  if (key.includes("post office")) return "info";
  if (key.includes("audit")) return "warn";
  if (key.includes("claude")) return "claude";
  return "dim";
}

function formatTokens(cells: number) {
  const tokens = Math.max(0, Math.round((cells / 10) * 40000));
  if (tokens < 1000) return `↓ ${tokens}`;
  const thousands = tokens / 1000;
  return `↓ ${thousands >= 10 ? Math.round(thousands) : thousands.toFixed(1)}k`;
}

function meterLabel(cells: number) {
  const thousands = Math.round((cells / 10) * 40);
  return `${thousands}k / 200k`;
}

function commandOf(value: string) {
  return value.trim().replace(/\s+/g, " ").replace(/^\//, "").replace(/\.+\s*$/g, "").toLowerCase();
}

function idleSessions(script: SessionScript): Record<string, Row[]> {
  return Object.fromEntries(
    script.soldiers.map((soldier) => [
      soldier.name,
      [{ id: `idle-${soldier.name}`, kind: "idle" as const, text: "Idle. No brief yet." }],
    ]),
  );
}

function Asterisk({ live }: { live: boolean }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!live || quietMotion()) return;
    const id = window.setInterval(() => setTick((value) => value + 1), 120);
    return () => window.clearInterval(id);
  }, [live]);

  const span = GLYPHS.length * 2 - 2;
  const index = tick % span;
  const glyph = live ? GLYPHS[index < GLYPHS.length ? index : span - index] : "✻";
  return <span className={live ? "split-asterisk is-live" : "split-asterisk is-done"} aria-hidden="true">{glyph}</span>;
}

function Meter({ cells, total = 10 }: { cells: number; total?: number }) {
  const filled = Math.max(0, Math.min(total, cells));
  return (
    <span className="split-meter-cells" aria-hidden="true">
      <span className="split-meter-on">{"▓".repeat(filled)}</span>
      {"░".repeat(total - filled)}
    </span>
  );
}

function TranscriptRow({ row }: { row: Row }) {
  if (row.kind === "you") {
    return (
      <p className="split-you">
        <span aria-hidden="true">› </span>
        {row.text}
      </p>
    );
  }
  if (row.kind === "tool") {
    return (
      <p className={row.live ? "split-tool" : "split-tool is-done"} aria-busy={row.live || undefined}>
        <Asterisk live={!!row.live} />
        {row.who ? <span className={`split-tool-who split-who-${tone(row.who)}`}>{row.who}</span> : null}
        <span className={row.live ? "split-verb" : "split-ok"}>{row.text}</span>
        {row.clock ? <span className="split-clock">{row.clock}</span> : null}
      </p>
    );
  }
  const label = row.kind === "claude" ? "Claude" : row.kind === "office" ? "Post office" : row.kind === "audit" ? "Claim audit" : row.who;
  return (
    <p className={`split-msg split-msg-${row.kind}`}>
      {label ? <span className={`split-who split-who-${tone(label)}`}>{label}</span> : null}
      <span className="split-body">{row.text}</span>
    </p>
  );
}

export function Environment({ script }: { script: SessionScript }) {
  const router = useRouter();
  const logRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLInputElement>(null);
  const run = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const idRef = useRef(0);
  const activeRef = useRef(script.initialSoldier);
  const phaseRef = useRef<Phase>("boot");
  const scriptRef = useRef(script);
  scriptRef.current = script;

  const [lines, setLines] = useState<Row[]>([]);
  const [sessions, setSessions] = useState<Record<string, Row[]>>(() => idleSessions(script));
  const [active, setActive] = useState(script.initialSoldier);
  const [modes, setModes] = useState<Record<string, Mode>>({});
  const [meters, setMeters] = useState<Record<string, number>>({});
  const [work, setWork] = useState<Work | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("boot");
  const [draft, setDraft] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const [status, setStatus] = useState("Select 1, 2, or 3.");

  const soldier = script.soldiers.find((item) => item.name === active) ?? script.soldiers[0];

  function nextId() {
    idRef.current += 1;
    return `l${idRef.current}`;
  }

  function setPhaseNow(next: Phase) {
    phaseRef.current = next;
    setPhase(next);
  }

  function patchLine(id: string, patch: Partial<Row>) {
    setLines((current) => current.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  function live(token: number) {
    return token === run.current;
  }

  async function streamRow(kind: RowKind, text: string, signal: AbortSignal, token: number, who?: string, pace: "speak" | "fast" = "speak") {
    if (!live(token)) return;
    const id = nextId();
    const instant = quietMotion();
    setLines((current) => [...current, { id, kind, who, text: instant ? text : "" }]);
    if (!instant) {
      await reveal(text, (shown) => {
        if (live(token)) patchLine(id, { text: shown });
      }, signal, pace);
    }
    if (live(token) && (kind === "claude" || kind === "soldier" || kind === "office" || kind === "audit")) setStatus(text);
  }

  async function streamPane(name: string, text: string, signal: AbortSignal, token: number, kind: RowKind = "soldier") {
    if (!live(token)) return;
    const id = nextId();
    const instant = quietMotion();
    const row = { id, kind, who: name, text: instant ? text : "" };
    setSessions((current) => ({ ...current, [name]: [...(current[name] ?? []), row] }));
    if (instant) return;
    await reveal(
      text,
      (shown) => {
        if (!live(token)) return;
        setSessions((current) => ({
          ...current,
          [name]: (current[name] ?? []).map((item) => (item.id === id ? { ...item, text: shown } : item)),
        }));
      },
      signal,
      "speak",
    );
  }

  async function perform(step: Step, signal: AbortSignal, token: number) {
    const instant = quietMotion();
    if (step.kind === "claude" || step.kind === "office" || step.kind === "audit") {
      await streamRow(step.kind, step.text, signal, token);
      return;
    }
    if (step.kind === "meter") {
      setMeters((current) => ({ ...current, [step.soldier]: step.cells }));
      return;
    }
    if (step.kind === "summon") {
      const switched = activeRef.current !== step.soldier;
      activeRef.current = step.soldier;
      setActive(step.soldier);
      if (switched) {
        setFlash(step.soldier);
        window.setTimeout(() => setFlash((current) => (current === step.soldier ? null : current)), 720);
        if (!instant) paneRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        await streamRow("claude", `Opening ${step.soldier}.`, signal, token, undefined, "fast");
      }
      return;
    }
    if (step.kind === "report") {
      for (const line of step.lines) await streamPane(step.soldier, line, signal, token);
      await streamRow("soldier", step.lines.join(" "), signal, token, step.soldier, "fast");
      return;
    }
    if (step.kind !== "work") return;

    const words = step.words.length > 0 ? step.words : ["Working"];
    const toolId = nextId();
    setModes((current) => ({ ...current, [step.soldier]: "working" }));
    setSessions((current) => ({
      ...current,
      [step.soldier]: (current[step.soldier] ?? []).filter((row) => row.kind !== "idle"),
    }));
    setLines((current) => [...current, { id: toolId, kind: "tool", who: step.soldier, text: `${words[0]}…`, live: true, clock: "0s" }]);
    setWork({ soldier: step.soldier, word: words[0], secs: 0, tokens: "" });
    setStatus(`${step.soldier}. ${words[0]}.`);

    if (instant) {
      const secs = Math.round(step.ms / 1000);
      const label = step.doneLabel ?? "Completed";
      patchLine(toolId, { live: false, text: `${label} · ${secs}s`, clock: undefined });
      setMeters((current) => ({ ...current, [step.soldier]: step.meterTo }));
      setModes((current) => ({ ...current, [step.soldier]: "done" }));
      setSessions((current) => ({
        ...current,
        [step.soldier]: [...(current[step.soldier] ?? []), { id: nextId(), kind: "done", text: `✻ ${label} · ${secs}s` }],
      }));
      setWork(null);
      return;
    }

    const started = performance.now();
    let lastWord = "";
    while (performance.now() - started < step.ms) {
      const elapsed = performance.now() - started;
      const word = words[Math.min(words.length - 1, Math.floor((elapsed / step.ms) * words.length))];
      const secs = Math.floor(elapsed / 1000);
      const cells = (elapsed / step.ms) * step.meterTo;
      const tokens = cells > 0.15 ? formatTokens(cells) : "";
      const clock = `${secs}s${tokens ? ` · ${tokens}` : ""}`;
      setWork({ soldier: step.soldier, word, secs, tokens });
      setMeters((current) => ({ ...current, [step.soldier]: Math.round(cells) }));
      if (live(token)) patchLine(toolId, { text: `${word}…`, clock });
      if (word !== lastWord) {
        lastWord = word;
        setStatus(`${step.soldier}. ${word}.`);
      }
      await sleep(100, signal);
    }

    if (!live(token)) return;
    const secs = Math.round(step.ms / 1000);
    const label = step.doneLabel ?? "Completed";
    patchLine(toolId, { live: false, text: `${label} · ${secs}s`, clock: undefined });
    setMeters((current) => ({ ...current, [step.soldier]: step.meterTo }));
    setModes((current) => ({ ...current, [step.soldier]: "done" }));
    setSessions((current) => ({
      ...current,
      [step.soldier]: [...(current[step.soldier] ?? []), { id: nextId(), kind: "done", text: `✻ ${label} · ${secs}s` }],
    }));
    setWork(null);
    setStatus(`${step.soldier}. ${label}.`);
  }

  async function play(steps: Step[], token: number, signal: AbortSignal, as: Phase) {
    setPhaseNow(as);
    if (as === "boot" && live(token)) setLines([]);
    try {
      for (const step of steps) {
        if (signal.aborted || !live(token)) return;
        await perform(step, signal, token);
      }
      if (token === run.current) {
        setWork(null);
        setPhaseNow("idle");
        fieldRef.current?.focus();
      }
    } catch (error) {
      if (!(error instanceof Halt) || token !== run.current) return;
      if (error.reason === "clear" || error.reason === "supersede") return;
      if (as === "boot") {
        setLines([{ id: nextId(), kind: "claude", text: scriptRef.current.opening }]);
        setWork(null);
        setPhaseNow("idle");
        return;
      }
      setWork(null);
      setModes((current) => {
        const next = { ...current };
        for (const name of Object.keys(next)) {
          if (next[name] === "working") next[name] = "idle";
        }
        return next;
      });
      setLines((current) => [
        ...current.map((row) => (row.live ? { ...row, live: false, text: "Stopped", clock: undefined } : row)),
        { id: nextId(), kind: "claude", text: "Stopped. The session stays open. Type 1, 2, or 3." },
      ]);
      setPhaseNow("idle");
      setStatus("Stopped. Type 1, 2, or 3.");
    }
  }

  function begin(steps: Step[], as: Phase) {
    abortRef.current?.abort(as === "boot" ? "clear" : "supersede");
    const controller = new AbortController();
    abortRef.current = controller;
    const token = ++run.current;
    void play(steps, token, controller.signal, as);
  }

  function start(key: Scene["key"]) {
    if (phaseRef.current === "run") return;
    const scene = scriptRef.current.scenes.find((item) => item.key === key);
    if (!scene) return;
    const duringBoot = phaseRef.current === "boot";
    phaseRef.current = "run";
    setPicked(key);
    setDraft("");
    if (duringBoot) {
      setLines([
        { id: nextId(), kind: "claude", text: scriptRef.current.opening },
        { id: nextId(), kind: "you", text: key },
      ]);
    } else {
      setLines((current) => [...current, { id: nextId(), kind: "you", text: key }]);
    }
    begin(scene.steps, "run");
  }

  function reset() {
    const next = scriptRef.current;
    abortRef.current?.abort("clear");
    run.current += 1;
    abortRef.current = null;
    activeRef.current = next.initialSoldier;
    setActive(next.initialSoldier);
    setLines([]);
    setSessions(idleSessions(next));
    setModes({});
    setMeters({});
    setWork(null);
    setFlash(null);
    setPicked(null);
    setDraft("");
    setStatus("Select 1, 2, or 3.");
    if (quietMotion()) {
      setPhaseNow("idle");
      return;
    }
    begin([{ kind: "claude", text: next.opening }], "boot");
  }

  function stop() {
    if (phaseRef.current === "idle") return;
    abortRef.current?.abort("esc");
  }

  function runCommand(raw: string) {
    const command = commandOf(raw);
    if (!command) return;
    if (command === "clear") {
      reset();
      return;
    }
    if (command === "theme") {
      toggleTheme();
      return;
    }
    if (command === "exit") {
      router.push("/");
      return;
    }
    if (command === "1" || command === "2" || command === "3") {
      start(command);
      return;
    }
    if (phaseRef.current !== "idle") return;
    setLines((current) => [
      ...current,
      { id: nextId(), kind: "you", text: raw.trim() },
      { id: nextId(), kind: "claude", text: "Type 1, 2, or 3." },
    ]);
    setDraft("");
  }

  useEffect(() => {
    if (quietMotion()) {
      setPhaseNow("idle");
      return;
    }
    begin([{ kind: "claude", text: scriptRef.current.opening }], "boot");
    fieldRef.current?.focus();
    return () => {
      abortRef.current?.abort("clear");
      run.current += 1;
    };
    // The opening streams once. Strict mode cancels the first pass.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [lines, work]);

  useEffect(() => {
    const stream = streamRef.current;
    if (stream) stream.scrollTop = stream.scrollHeight;
  }, [sessions, work, active]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const typed = draft.trim();
    setDraft("");
    runCommand(typed);
  }

  function onPromptKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      stop();
      return;
    }
    if ((event.key === "1" || event.key === "2" || event.key === "3") && draft === "" && phaseRef.current !== "run") {
      event.preventDefault();
      start(event.key);
    }
  }

  function onPaneKey(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      stop();
      return;
    }
    if (phaseRef.current === "run") return;
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
    const soldiers = script.soldiers;
    const index = Math.max(0, soldiers.findIndex((item) => item.name === activeRef.current));
    if (event.key === "j" || event.key === "l") {
      event.preventDefault();
      const next = soldiers[(index + (event.key === "j" ? -1 : 1) + soldiers.length) % soldiers.length];
      if (!next) return;
      activeRef.current = next.name;
      setActive(next.name);
    } else if (event.key === "i" || event.key === "k") {
      event.preventDefault();
      streamRef.current?.scrollBy({ top: event.key === "i" ? -32 : 32 });
    } else if (event.key === "Enter") {
      event.preventDefault();
      fieldRef.current?.focus();
    }
  }

  const working = script.soldiers.find((item) => modes[item.name] === "working");
  const placeholder = phase === "run" && work ? `${work.soldier} · ${work.word}…` : "Type 1, 2, or 3";

  return (
    <section className="split-session" aria-label="Claude v2 session" onKeyDown={(event) => {
      if (event.key === "Escape") stop();
    }}>
      <div className="split-plate">
        <div className="split-stage">
          <div className="split-transcript">
            <p className="split-frame-title">Claude’s transcript</p>
            <div className="split-log" ref={logRef}>
              <div className="split-preroll">
                <p className="split-msg split-msg-claude">
                  <span className="split-who split-who-claude">Claude</span>
                  <span className="split-body">{script.opening}</span>
                </p>
              </div>
              {lines.map((row) => (
                <TranscriptRow key={row.id} row={row} />
              ))}
            </div>
          </div>
          {soldier ? (
            <aside
              className={`split-pane split-soldier-${soldier.name.toLowerCase()}${modes[soldier.name] === "working" ? " is-working" : ""}`}
              aria-label="Army pane"
              ref={paneRef}
              tabIndex={0}
              onKeyDown={onPaneKey}
            >
              <div className="split-tabs" role="tablist" aria-label="Soldiers">
                {script.soldiers.map((item) => {
                  const mode = modes[item.name] ?? "idle";
                  return (
                    <button
                      key={item.name}
                      type="button"
                      role="tab"
                      aria-selected={item.name === soldier.name}
                      className={`split-tab split-soldier-${item.name.toLowerCase()}${flash === item.name ? " is-summoned" : ""}`}
                      disabled={phase === "run"}
                      onClick={() => {
                        if (phaseRef.current === "run") return;
                        activeRef.current = item.name;
                        setActive(item.name);
                      }}
                    >
                      {mode === "working" ? <Asterisk live /> : <i aria-hidden="true">{mode === "done" ? "✓" : "○"}</i>}
                      {item.name}
                    </button>
                  );
                })}
              </div>
              <p className="split-frame-title">
                <span className="split-name">{soldier.name}</span>
                <span className="split-dim"> · {modes[soldier.name] === "working" ? "working" : "open"} · {soldier.model}</span>
                <span className={`split-state${modes[soldier.name] === "done" ? " is-done" : ""}${modes[soldier.name] === "working" ? " is-working" : ""}`}>
                  {modes[soldier.name] === "working" ? "working" : modes[soldier.name] === "done" ? "done" : "idle"}
                </span>
              </p>
              <p className="split-meter">
                <Meter cells={meters[soldier.name] ?? 0} />
                <span className="split-dim"> {meterLabel(meters[soldier.name] ?? 0)}</span>
              </p>
              <p className="split-soldier-note">{soldier.note}</p>
              <div className="split-stream" ref={streamRef}>
                {(sessions[soldier.name] ?? []).map((row) =>
                  row.kind === "done" ? (
                    <p className="split-note" key={row.id}>{row.text}</p>
                  ) : row.kind === "idle" ? (
                    <p className="split-idle" key={row.id}>{row.text}</p>
                  ) : (
                    <p className="split-msg" key={row.id}>
                      <span className={`split-who split-who-${tone(soldier.name)}`}>{soldier.name}</span>
                      <span className="split-body">{row.text}</span>
                    </p>
                  ),
                )}
                {work && work.soldier === soldier.name ? (
                  <p className="split-tool" aria-busy="true">
                    <Asterisk live />
                    <span className="split-verb">{work.word}…</span>
                    <span className="split-clock">
                      {work.secs}s{work.tokens ? ` · ${work.tokens}` : ""}
                    </span>
                  </p>
                ) : null}
              </div>
              <p className="split-keys">
                <span>j l</span> panes <span>esc</span> stop <span>Enter</span> prompt
              </p>
            </aside>
          ) : null}
        </div>
        <div className="split-choices" role="group" aria-label="Select 1, 2, or 3">
          <p>Select 1-3</p>
          {script.scenes.map((scene) => (
            <button
              key={scene.key}
              type="button"
              className={picked === scene.key && phase === "run" ? "split-choice is-on" : "split-choice"}
              disabled={phase === "run"}
              onClick={() => start(scene.key)}
            >
              <b>{scene.key}</b>
              <span>{scene.label}</span>
              <small>{scene.detail}</small>
            </button>
          ))}
        </div>
        {script.soldiers.length > 0 ? (
          <p className="split-strip" aria-label="Army strip">
            <span className="split-strip-label">army</span>
            {script.soldiers.map((item) => {
              const mode = modes[item.name] ?? "idle";
              return (
                <span key={item.name} className={`split-soldier-${item.name.toLowerCase()}${mode === "working" ? " is-working" : ""}`}>
                  {mode === "working" ? <Asterisk live /> : <i aria-hidden="true">{mode === "done" ? "✓" : "○"}</i>}
                  {item.name}
                  <Meter cells={Math.round(((meters[item.name] ?? 0) / 10) * 5)} total={5} />
                </span>
              );
            })}
          </p>
        ) : null}
        <form className="split-prompt" onSubmit={onSubmit}>
          <span aria-hidden="true">›</span>
          <input
            ref={fieldRef}
            aria-label="Command"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={onPromptKey}
            placeholder={placeholder}
            autoComplete="off"
            spellCheck={false}
          />
          <button type="submit">Send</button>
        </form>
        <p className="split-status">
          <span>session</span>
          <span>{working ? `army · ${script.soldiers.length} open · ${working.name} working` : `army · ${script.soldiers.length} open · none working`}</span>
        </p>
      </div>
      <p className="split-hint">{script.hint}</p>
      <p className="split-live-status" role="status">{status}</p>
    </section>
  );
}
