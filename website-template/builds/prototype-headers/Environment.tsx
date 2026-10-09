"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { toggleTheme } from "../../../src/components/live/theme";

export type ScriptLine = {
  who: string;
  text: string;
};

export type SoldierCard = {
  name: string;
  model: string;
  note: string;
};

export type EnvironmentCommand = {
  command: string;
  lines: ScriptLine[];
  effect?: "clear" | "theme" | "exit";
  exitHref?: string;
};

export type EnvironmentBlock = {
  includes: string[];
  text: string;
};

export type EnvironmentProps = {
  lines: ScriptLine[];
  soldiers?: SoldierCard[];
  hint: string;
  refuse: string;
  commands: EnvironmentCommand[];
  blocked?: EnvironmentBlock[];
};

const TONES = new Set(["iron", "igris", "beru", "tusk"]);

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ").replace(/\.+\s*$/g, "").toLowerCase();
}

function tone(who: string) {
  const key = who.toLowerCase();
  if (TONES.has(key)) return key;
  if (key.includes("claude") || key === "monarch") return "accent";
  if (key.includes("post office")) return "info";
  if (key === "script") return "warn";
  return "dim";
}

function namedSoldier(command: string, soldiers: SoldierCard[]) {
  const parts = normalize(command).split(" ");
  const verb = parts[0]?.replace(/^\//, "");
  if (verb === "army") return null;
  if (verb === "pane" || verb === "stop" || verb === "fresh" || verb === "send") {
    const found = soldiers.find((soldier) => soldier.name.toLowerCase() === parts[1]);
    if (found) return found;
    if (verb === "send" && !parts[1]) return undefined;
    return null;
  }
  return undefined;
}

function initialSessions(soldiers: SoldierCard[]) {
  return Object.fromEntries(soldiers.map((soldier) => [soldier.name, [{ who: soldier.name, text: soldier.note }]]));
}

function Meter({ cells }: { cells: number }) {
  return (
    <span className="split-meter-cells" aria-hidden="true">
      {"░".repeat(cells)}│
    </span>
  );
}

function LineList({ lines }: { lines: ScriptLine[] }) {
  return lines.map((line, index) => (
    <p className="split-row" key={`${line.who}-${index}`}>
      <span className={`split-who split-who-${tone(line.who)}`}>{line.who}</span>
      {line.text}
    </p>
  ));
}

export function Environment({ lines, soldiers = [], hint, refuse, commands, blocked = [] }: EnvironmentProps) {
  const router = useRouter();
  const logRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState("");
  const [paneDraft, setPaneDraft] = useState("");
  const [active, setActive] = useState(soldiers[0]?.name ?? "");
  const [entries, setEntries] = useState<{ typed: string; lines: ScriptLine[] }[]>([]);
  const [sessions, setSessions] = useState<Record<string, ScriptLine[]>>(() => initialSessions(soldiers));

  const soldier = soldiers.find((item) => item.name === active) ?? soldiers[0];

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [entries]);

  function reset() {
    setEntries([]);
    setSessions(initialSessions(soldiers));
    setActive(soldiers[0]?.name ?? "");
    setPaneDraft("");
  }

  function appendSession(name: string, extra: ScriptLine[]) {
    if (!name || extra.length === 0) return;
    setSessions((current) => ({ ...current, [name]: [...(current[name] ?? []), ...extra] }));
  }

  function run(typed: string) {
    const normalized = normalize(typed);
    if (!normalized) return;

    const block = blocked.find((rule) => rule.includes.every((part) => normalized.includes(normalize(part))));
    if (block) {
      setEntries((current) => [...current, { typed, lines: [{ who: "Script", text: block.text }] }]);
      return;
    }

    const command = commands.find((item) => normalize(item.command) === normalized);
    if (!command) {
      setEntries((current) => [...current, { typed, lines: [{ who: "Script", text: refuse }] }]);
      return;
    }

    if (command.effect === "clear") {
      reset();
      return;
    }

    setEntries((current) => [...current, { typed, lines: command.lines }]);
    if (command.effect === "theme") toggleTheme();
    if (command.effect === "exit" && command.exitHref) router.push(command.exitHref);
    if (command.effect) return;

    const target = namedSoldier(command.command, soldiers);
    if (target) {
      setActive(target.name);
      appendSession(target.name, command.lines);
    } else if (target === undefined && soldier) {
      appendSession(soldier.name, command.lines);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const typed = draft.trim();
    setDraft("");
    run(typed);
  }

  function onPaneSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const typed = paneDraft.trim();
    setPaneDraft("");
    if (!typed || !soldier) return;
    const direct = commands.some((item) => normalize(item.command) === normalize(typed));
    run(direct || typed.startsWith("/") ? typed : `/send ${soldier.name.toLowerCase()} ${typed}`);
  }

  function onPaneKey(event: KeyboardEvent<HTMLElement>) {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      if (event.key === "Escape") event.currentTarget.focus();
      return;
    }
    if (soldiers.length === 0) return;
    const index = Math.max(0, soldiers.findIndex((item) => item.name === active));
    if (event.key === "j" || event.key === "l") {
      event.preventDefault();
      const next = soldiers[(index + (event.key === "j" ? -1 : 1) + soldiers.length) % soldiers.length];
      if (next) setActive(next.name);
    } else if (event.key === "i" || event.key === "k") {
      event.preventDefault();
      streamRef.current?.scrollBy({ top: event.key === "i" ? -32 : 32 });
    } else if (event.key === "Enter") {
      event.preventDefault();
      fieldRef.current?.focus();
    }
  }

  return (
    <section className="split-session" aria-label="Claude v2 session">
      <div className="split-plate">
      <div className="split-stage">
        <div className="split-transcript">
          <p className="split-frame-title">Claude’s transcript</p>
          <div className="split-log" ref={logRef} aria-live="polite">
            <LineList lines={lines} />
            {entries.map((entry, index) => (
              <div className="split-turn" key={`${entry.typed}-${index}`}>
                <p className="split-typed">
                  <span aria-hidden="true">› </span>
                  {entry.typed}
                </p>
                <LineList lines={entry.lines} />
              </div>
            ))}
          </div>
        </div>
        {soldier ? (
          <aside
            className={`split-pane split-soldier-${soldier.name.toLowerCase()}`}
            aria-label="Army pane"
            ref={paneRef}
            tabIndex={0}
            onKeyDown={onPaneKey}
          >
            <div className="split-tabs" role="tablist" aria-label="Soldiers">
              {soldiers.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={item.name === soldier.name}
                  className={`split-tab split-soldier-${item.name.toLowerCase()}`}
                  onClick={() => setActive(item.name)}
                >
                  <i aria-hidden="true">○</i>
                  {item.name}
                </button>
              ))}
            </div>
            <p className="split-frame-title">
              <span className="split-name">{soldier.name}</span>
              <span className="split-dim"> · open · {soldier.model}</span>
              <span className="split-state">○ idle</span>
            </p>
            <p className="split-meter">
              <Meter cells={10} />
              <span className="split-dim"> 0 / 200k handoff</span>
            </p>
            <div className="split-stream" ref={streamRef}>
              <LineList lines={sessions[soldier.name] ?? []} />
            </div>
            <form className="split-field" onSubmit={onPaneSubmit}>
              <span aria-hidden="true">›</span>
              <input
                ref={fieldRef}
                aria-label={`Message ${soldier.name}`}
                value={paneDraft}
                onChange={(event) => setPaneDraft(event.target.value)}
                placeholder={`message ${soldier.name}`}
                autoComplete="off"
                spellCheck={false}
              />
            </form>
            <p className="split-keys">
              <span>j l</span> tabs <span>i k</span> scroll <span>Enter</span> message
            </p>
          </aside>
        ) : null}
      </div>
      {soldiers.length > 0 ? (
        <p className="split-strip" aria-label="Army strip">
          <span className="split-strip-label">army</span>
          {soldiers.map((item) => (
            <span key={item.name} className={`split-soldier-${item.name.toLowerCase()}`}>
              <i aria-hidden="true">○</i>
              {item.name}
              <Meter cells={5} />
            </span>
          ))}
        </p>
      ) : null}
      <form className="split-prompt" onSubmit={onSubmit}>
        <span aria-hidden="true">›</span>
        <input
          aria-label="Command"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Claude’s prompt"
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit">Run</button>
      </form>
      <p className="split-status">
        <span>session</span>
        <span>
          army · {soldiers.length} open · none working
        </span>
      </p>
      </div>
      <p className="split-hint">{hint}</p>
    </section>
  );
}
