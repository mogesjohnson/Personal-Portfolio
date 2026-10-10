import { PrototypeHeader } from "../prototype-headers/PrototypeHeader";
import type { SoldierCard } from "../prototype-headers/Environment";

const lines = [
  { who: "1 · Claude", text: "Sends the brief by name." },
  { who: "2 · Post office", text: "Adds one turn to that soldier's open session." },
  { who: "3 · Soldier", text: "Returns a five-line summary. The report stays on disk." },
  { who: "4 · Claim audit", text: "An edit outside the claim is rejected." },
];

const soldiers: SoldierCard[] = [
  { name: "Iron", model: "claude-sonnet", note: "Idle. A brief arrives by name." },
  { name: "Igris", model: "codex", note: "Idle." },
  { name: "Beru", model: "grok", note: "Idle. Beru never reviews." },
  { name: "Tusk", model: "agy", note: "Idle. Tusk never writes." },
];

export function ProtocolPrototype() {
  return (
    <PrototypeHeader
      current="/agent-protocol"
      mark="Scripted protocol"
      kicker="Prototype"
      title="Agent protocol"
      note="This is the v2 Claude component."
      lead="A mock-up of the protocol, one brief at a time. Each step is a fixed script."
      lines={lines}
      environment={{
        soldiers,
        hint: "Known commands: /send and /audit.",
        refuse: "That command is not in this script.",
        commands: [
          { command: "/send", lines: [lines[0], lines[1], lines[2]] },
          { command: "/audit", lines: [lines[3]] },
        ],
      }}
    />
  );
}
