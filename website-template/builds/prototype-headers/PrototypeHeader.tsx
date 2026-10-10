import { DispatchBar } from "../projects-page/DispatchBar";
import { Environment } from "./Environment";
import type { SessionScript } from "./script";

export function PrototypeHeader({
  current,
  mark,
  kicker,
  title,
  note,
  lead,
  script,
}: {
  current: string;
  mark: string;
  kicker: string;
  title: string;
  note?: string;
  lead: string;
  script: SessionScript;
}) {
  return (
    <article className="dispatch">
      <DispatchBar current={current} mark={mark} />
      <header className="dispatch-intro prototype-intro">
        <p className="dispatch-kicker">{kicker}</p>
        <h1>{title}</h1>
        {note ? <p className="dispatch-legacy">{note}</p> : null}
        <p className="dispatch-lead">{lead}</p>
        <Environment script={script} />
      </header>
    </article>
  );
}
