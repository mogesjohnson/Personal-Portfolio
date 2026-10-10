import { PrototypeHeader } from "../prototype-headers/PrototypeHeader";
import type { Scene, SessionScript } from "../prototype-headers/script";

const scenes: Scene[] = [
  {
    key: "1",
    label: "Create the pull request",
    detail: "Iron posts it from his own session, then reports back.",
    steps: [
      { kind: "claude", text: "Sending Iron to create the pull request." },
      { kind: "summon", soldier: "Iron" },
      {
        kind: "work",
        soldier: "Iron",
        ms: 7000,
        meterTo: 4,
        words: ["Reading the branch", "Making the pull request", "Posting", "Updating you"],
      },
      {
        kind: "report",
        soldier: "Iron",
        lines: ["Posted. The pull request is up.", "I made it in this session.", "The body stays on disk."],
      },
      {
        kind: "claude",
        text: "Iron has completed the pull request. A review can be done by Opus 5.5 or GPT-6 Astra.",
      },
    ],
  },
  {
    key: "2",
    label: "Name the files in the claim",
    detail: "Igris reads the claim and returns the paths.",
    steps: [
      { kind: "claude", text: "Sending Igris to read the claim and name the files." },
      { kind: "summon", soldier: "Igris" },
      {
        kind: "work",
        soldier: "Igris",
        ms: 5200,
        meterTo: 3,
        words: ["Opening the claim", "Reading the paths", "Writing five lines"],
      },
      {
        kind: "report",
        soldier: "Igris",
        lines: [
          "Claimed paths: src/session.ts, src/post-office.ts, src/claim.ts.",
          "I will edit only those paths.",
          "The full report stays on disk.",
        ],
      },
      { kind: "claude", text: "Igris named three claimed files and nothing outside them." },
    ],
  },
  {
    key: "3",
    label: "Review the diff",
    detail: "Tusk reviews. Tusk does not write.",
    steps: [
      { kind: "claude", text: "Sending Tusk to review the diff. Tusk does not write." },
      { kind: "summon", soldier: "Tusk" },
      {
        kind: "work",
        soldier: "Tusk",
        ms: 5600,
        meterTo: 3,
        words: ["Reading the diff", "Checking the claim", "Writing the review"],
      },
      {
        kind: "report",
        soldier: "Tusk",
        lines: ["Review only. No files written.", "The claim matches the diff.", "Two notes are enough to return."],
      },
      { kind: "claude", text: "Tusk finished the review and wrote nothing. The session stays open." },
    ],
  },
];

const script: SessionScript = {
  initialSoldier: "Beru",
  opening: "The session is open. Beru is on the pane, idle.\n\nSelect 1-3.\n\n1  Create the pull request\n2  Name the files in the claim\n3  Review the diff",
  hint: "Type 1, 2, or 3. /clear resets the session. /theme switches the site theme. /exit returns to the main website.",
  soldiers: [
    { name: "Iron", model: "claude-sonnet", note: "Writes and opens the pull request." },
    { name: "Igris", model: "codex", note: "Reads the claim and names files." },
    { name: "Beru", model: "grok", note: "Never reviews." },
    { name: "Tusk", model: "agy", note: "Never writes." },
  ],
  scenes,
};

export function ShadowArmyPrototype() {
  return (
    <PrototypeHeader
      current="/shadow-army"
      mark="Scripted session"
      kicker="Prototype"
      title="Shadow Army"
      note="This is the v2 Claude component."
      lead="A mock-up of the session. These turns are a fixed script. Nothing on this page calls a live model."
      script={script}
    />
  );
}
