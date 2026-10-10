export type SoldierCard = {
  name: string;
  model: string;
  note: string;
};

export type Step =
  | { kind: "claude" | "office" | "audit"; text: string }
  | { kind: "summon"; soldier: string }
  | { kind: "work"; soldier: string; words: string[]; ms: number; meterTo: number; doneLabel?: string }
  | { kind: "meter"; soldier: string; cells: number }
  | { kind: "report"; soldier: string; lines: string[] };

export type Scene = {
  key: "1" | "2" | "3";
  label: string;
  detail: string;
  steps: Step[];
};

export type SessionScript = {
  soldiers: SoldierCard[];
  initialSoldier: string;
  opening: string;
  scenes: Scene[];
  hint: string;
};
