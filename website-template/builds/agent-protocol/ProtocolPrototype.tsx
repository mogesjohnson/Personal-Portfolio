import { PrototypeHeader } from "../prototype-headers/PrototypeHeader";
import type { Scene, SessionScript } from "../prototype-headers/script";

const scenes: Scene[] = [
  {
    key: "1",
    label: "Deliver the brief",
    detail: "The post office adds one turn on Beru, then Beru answers.",
    steps: [
      { kind: "claude", text: "Sending the brief to Beru by name." },
      { kind: "office", text: "One turn added to Beru's open session. No new process starts." },
      { kind: "summon", soldier: "Beru" },
      {
        kind: "work",
        soldier: "Beru",
        ms: 6000,
        meterTo: 3,
        words: ["Taking the turn", "Drafting the note", "Folding five lines"],
      },
      {
        kind: "report",
        soldier: "Beru",
        lines: ["The note is drafted.", "Beru does not review.", "Five lines returned. The rest stays on disk."],
      },
      { kind: "claude", text: "The post office added one turn. Beru returned the summary. No new process was opened." },
    ],
  },
  {
    key: "2",
    label: "Test the claim",
    detail: "Igris tries a path outside the claim. The audit rejects it.",
    steps: [
      { kind: "claude", text: "Sending Igris a path outside the claim, then one inside it." },
      { kind: "summon", soldier: "Igris" },
      {
        kind: "work",
        soldier: "Igris",
        ms: 3200,
        meterTo: 2,
        words: ["Touching src/other/notes.ts", "Waiting on the claim audit"],
        doneLabel: "Outside the claim",
      },
      { kind: "audit", text: "Rejected. src/other/notes.ts is outside the claim. The worktree stays." },
      {
        kind: "work",
        soldier: "Igris",
        ms: 3400,
        meterTo: 4,
        words: ["Touching src/session.ts", "Inside the claim"],
      },
      {
        kind: "report",
        soldier: "Igris",
        lines: [
          "src/session.ts is inside the claim and can land.",
          "src/other/notes.ts was rejected.",
          "No other path was touched.",
        ],
      },
      { kind: "claude", text: "The claim held. Igris changed only the claimed path." },
    ],
  },
  {
    key: "3",
    label: "Start fresh",
    detail: "Iron writes a handoff, then a new session starts.",
    steps: [
      { kind: "claude", text: "Iron is near the handoff. Sending the order to start fresh." },
      { kind: "summon", soldier: "Iron" },
      {
        kind: "work",
        soldier: "Iron",
        ms: 7000,
        meterTo: 9,
        words: ["Context near the handoff", "Writing the handoff summary", "Starting a fresh session", "Appending standing instructions"],
      },
      { kind: "claude", text: "The handoff summary is written. Starting Iron fresh." },
      { kind: "meter", soldier: "Iron", cells: 1 },
      {
        kind: "report",
        soldier: "Iron",
        lines: ["Fresh session is open.", "Standing instructions are appended.", "The old report stays on disk."],
      },
      { kind: "claude", text: "Iron started fresh. The next brief is one more turn in that session." },
    ],
  },
];

const script: SessionScript = {
  initialSoldier: "Tusk",
  opening: "One brief is ready to move. Tusk is on the pane, idle.\n\nSelect 1-3.\n\n1  Deliver the brief\n2  Test the claim\n3  Start fresh",
  hint: "Type 1, 2, or 3. /clear resets the session. /theme switches the site theme. /exit returns to the main website.",
  soldiers: [
    { name: "Iron", model: "claude-sonnet", note: "Can start a fresh session." },
    { name: "Igris", model: "codex", note: "Edits only inside the claim." },
    { name: "Beru", model: "grok", note: "Takes a turn. Never reviews." },
    { name: "Tusk", model: "agy", note: "Idle on this brief. Never writes." },
  ],
  scenes,
};

export function ProtocolPrototype() {
  return (
    <PrototypeHeader
      current="/agent-protocol"
      mark="Scripted protocol"
      kicker="Prototype"
      title="Agent protocol"
      note="This is the v2 Claude component."
      lead="A mock-up of the protocol, one brief at a time. Each step is a fixed script."
      script={script}
    />
  );
}
