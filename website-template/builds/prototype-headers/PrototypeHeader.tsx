import { DispatchBar } from "../projects-page/DispatchBar";
import { Environment, type EnvironmentProps, type ScriptLine } from "./Environment";

type HeaderEnvironment = Omit<EnvironmentProps, "lines">;

export type { ScriptLine };

export function PrototypeHeader({
  current,
  mark,
  kicker,
  title,
  note,
  lead,
  lines,
  environment,
}: {
  current: string;
  mark: string;
  kicker: string;
  title: string;
  note?: string;
  lead: string;
  lines: ScriptLine[];
  environment: HeaderEnvironment;
}) {
  return (
    <article className="dispatch">
      <DispatchBar current={current} mark={mark} />
      <header className="dispatch-intro prototype-intro">
        <p className="dispatch-kicker">{kicker}</p>
        <h1>{title}</h1>
        {note ? <p className="dispatch-legacy">{note}</p> : null}
        <p className="dispatch-lead">{lead}</p>
        <Environment {...environment} lines={lines} />
      </header>
    </article>
  );
}
