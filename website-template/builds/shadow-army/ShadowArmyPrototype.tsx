import { PrototypeHeader } from "../prototype-headers/PrototypeHeader";
import type { EnvironmentCommand, SoldierCard } from "../prototype-headers/Environment";

const lines = [
  {
    who: "Claude",
    text: "/send Iron Read the claim and name the files you will edit.",
  },
  {
    who: "Iron",
    text: "I will edit only the claimed paths. The full report stays on disk.",
  },
  {
    who: "Post office",
    text: "One more turn in Iron's open session. No new process starts.",
  },
];

const soldiers: SoldierCard[] = [
  {
    name: "Iron",
    model: "claude-sonnet",
    note: "The pane is empty. The report stays on disk.",
  },
  { name: "Igris", model: "codex", note: "The pane is empty." },
  { name: "Beru", model: "grok", note: "The pane is empty. Beru never reviews." },
  { name: "Tusk", model: "agy", note: "The pane is empty. Tusk never writes." },
];

const commands: EnvironmentCommand[] = [
  {
    command: "/army",
    lines: soldiers.map((soldier) => ({
      who: soldier.name,
      text: `${soldier.model}. ${soldier.note}`,
    })),
  },
  ...soldiers.flatMap((soldier) => {
    const key = soldier.name.toLowerCase();
    return [
      { command: `/pane ${key}`, lines: [{ who: soldier.name, text: soldier.note }] },
      { command: `/stop ${key}`, lines: [{ who: soldier.name, text: "The turn ends. The session stays open." }] },
      {
        command: `/fresh ${key}`,
        lines: [{ who: soldier.name, text: "A new session starts. The standing instructions are appended." }],
      },
    ];
  }),
  {
    command: "/send iron read the claim and name the files you will edit",
    lines: [lines[1], lines[2]],
  },
  { command: "clear", lines: [], effect: "clear" },
  { command: "/clear", lines: [], effect: "clear" },
  { command: "theme", lines: [{ who: "Theme", text: "The site theme switches." }], effect: "theme" },
  { command: "/theme", lines: [{ who: "Theme", text: "The site theme switches." }], effect: "theme" },
  { command: "exit", lines: [{ who: "Exit", text: "The main website." }], effect: "exit", exitHref: "/" },
  { command: "/exit", lines: [{ who: "Exit", text: "The main website." }], effect: "exit", exitHref: "/" },
];

export function ShadowArmyPrototype() {
  return (
    <PrototypeHeader
      current="/shadow-army"
      mark="Scripted session"
      kicker="Prototype"
      title="Shadow Army"
      note="This is the v2 Claude component."
      lead="A mock-up of the session. These turns are a fixed script. Nothing on this page calls a live model."
      lines={lines}
      environment={{
        soldiers,
        hint: "Known commands: /army, /pane, /stop, and /fresh for Iron, Igris, Beru, and Tusk, the send line above, clear, theme, and exit.",
        refuse: "That command is not in this script.",
        commands,
        blocked: [
          { includes: ["/send beru", "review"], text: "Beru does not review. Nothing was sent." },
          { includes: ["/send tusk", "write"], text: "Tusk does not write. Nothing was sent." },
        ],
      }}
    />
  );
}
