"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, GitBranch } from "lucide-react";
import { personalInfo, projects, type Project } from "@/data/portfolio";
import ProjectDiagram from "./ProjectDiagram";
import { SectionHead, cls } from "./ui";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_=+#";

/** A title that decodes itself from noise when a new project is selected. */
function DecodeTitle({ text, animate }: { text: string; animate: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !animate || document.documentElement.dataset.motion === "reduce") return;
    const start = performance.now();
    const duration = 650;
    let frame = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const settled = Math.floor(p * text.length);
      let out = text.slice(0, settled);
      for (let i = settled; i < text.length; i++) {
        out += text[i] === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      el.textContent = out;
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      el.textContent = text;
    };
  }, [animate, text]);

  return (
    <h3 className="stage-title">
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </h3>
  );
}

type View = "notes" | "architecture" | "code";
const VIEWS: { id: View; label: string }[] = [
  { id: "notes", label: "Case notes" },
  { id: "architecture", label: "Architecture" },
  { id: "code", label: "Code" },
];

function CaseFile({ project, open, view, onView }: { project: Project; open: boolean; view: View; onView: (v: View) => void }) {
  return (
    <div id="case-file" className={cls("casefile", open && "is-open")} inert={!open}>
      <div className="casefile-inner">
        <div className="casefile-tabs" role="tablist" aria-label="Case file views">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={view === v.id}
              className={cls("casefile-tab", view === v.id && "is-active")}
              onClick={() => onView(v.id)}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="casefile-view" key={`${project.id}-${view}`}>
          {view === "notes" && (
            <div className="notes">
              <div>
                <span>01 / The problem</span>
                <p>{project.problem}</p>
              </div>
              <div>
                <span>02 / The approach</span>
                <p>{project.architecture}</p>
              </div>
              <div>
                <span>03 / The decision</span>
                <p>{project.tradeoff}</p>
              </div>
            </div>
          )}

          {view === "architecture" && (
            <ol className="flow">
              {project.architectureFlow.map((node) => (
                <li key={node.step}>
                  <span className="flow-step">{node.step}</span>
                  <strong>{node.label}</strong>
                  <em>{node.tech}</em>
                  <p>{node.detail}</p>
                </li>
              ))}
            </ol>
          )}

          {view === "code" && (
            <figure className="code">
              <figcaption>
                <span>{project.codeArtifact.filename}</span>
                <span>{project.codeArtifact.language}</span>
              </figcaption>
              <pre data-lenis-prevent tabIndex={0}>
                <code>{project.codeArtifact.code}</code>
              </pre>
              <p>{project.codeArtifact.explanation}</p>
            </figure>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WorkScene() {
  const [active, setActive] = useState(0);
  const [switched, setSwitched] = useState(false);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("notes");
  const project = projects[active];

  const select = (index: number) => {
    if (index === active) return;
    setActive(index);
    setSwitched(true);
  };

  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="shell">
        <SectionHead
          index="02"
          eyebrow="Selected work"
          titleId="work-title"
          title={
            <>
              Projects with <span className="hollow">purpose.</span>
            </>
          }
          aside="Three directions, one approach: understand the problem, build with intent, and show the thinking. Pick a system and watch it assemble."
        />

        <div className="stage" data-reveal>
          <div className="stage-rail" role="tablist" aria-label="Selected projects">
            {projects.map((item, index) => (
              <button
                key={item.id}
                id={`project-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls="project-panel"
                tabIndex={active === index ? 0 : -1}
                className={cls("stage-tab", active === index && "is-active")}
                onClick={() => select(index)}
                onKeyDown={(event) => {
                  const last = projects.length - 1;
                  const next =
                    event.key === "ArrowRight" || event.key === "ArrowDown"
                      ? (index + 1) % projects.length
                      : event.key === "ArrowLeft" || event.key === "ArrowUp"
                        ? (index - 1 + projects.length) % projects.length
                        : event.key === "Home"
                          ? 0
                          : event.key === "End"
                            ? last
                            : null;
                  if (next === null) return;
                  event.preventDefault();
                  select(next);
                  document.getElementById(`project-tab-${next}`)?.focus();
                }}
              >
                <span className="stage-tab-num">0{index + 1}</span>
                <span className="stage-tab-copy">
                  <strong>{item.shortTitle}</strong>
                  <small>{item.category}</small>
                </span>
                <ArrowUpRight size={18} />
              </button>
            ))}
            <a className="stage-rail-foot" href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer">
              <GitBranch size={14} /> All repositories <ArrowUpRight size={14} />
            </a>
          </div>

          <div id="project-panel" className="stage-panel" role="tabpanel" aria-labelledby={`project-tab-${active}`}>
            <div className="stage-art">
              <div className="art-meta">
                <span>{project.code}</span>
                <span>Live system / {project.year}</span>
              </div>
              <div className="project-figure" data-signal={project.signal}>
                <ProjectDiagram signal={project.signal} key={project.id} />
              </div>
              <div className="art-meta art-meta-bottom">
                <span>Fig. 0{active + 1} — conceptual model</span>
                <span className="live-only">Rendered live · particles</span>
              </div>
            </div>

            <div className="stage-body" key={project.id}>
              <div className="stage-meta">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>
              <DecodeTitle text={project.title} animate={switched} />
              <p className="stage-summary">{project.summary}</p>
              <dl className="metrics">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <dt>{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>
              <ul className="chips" aria-label="Technologies">
                {project.tags.map((tag) => (
                  <li className="chip" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="stage-actions">
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="case-file">
                  {open ? "Close case file" : "Open case file"} <ArrowRight size={15} className={cls("turn", open && "is-turned")} />
                </button>
                <a className="text-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  View repository <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

            <CaseFile project={project} open={open} view={view} onView={setView} />
          </div>
        </div>
      </div>
    </section>
  );
}
