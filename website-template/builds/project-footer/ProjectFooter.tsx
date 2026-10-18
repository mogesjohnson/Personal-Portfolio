import Link from "next/link";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { detailPages } from "../../../src/data/externalPages";

/**
 * One slim row at the bottom of every project and prototype page: "All projects"
 * back to /projects, and "Next project" to the following entry in `detailPages`
 * (src/data/externalPages.ts), wrapping from the last to the first. A page whose
 * source is private passes a short `note`, shown between the links on wide screens.
 * Styles: ./project-footer.css, imported by each page route.
 */
export function ProjectFooter({ current, note }: { current: string; note?: { label: string; title: string } }) {
  const index = detailPages.findIndex((page) => page.href === current);
  const next = detailPages[(index + 1) % detailPages.length];

  return (
    <footer className="project-footer" aria-label="Project navigation">
      <Link className="pf-link pf-all" href="/projects">
        <ArrowLeft size={15} aria-hidden="true" />
        All projects
      </Link>
      {note ? (
        <p className="pf-note" title={note.title}>
          <Lock size={12} aria-hidden="true" />
          {note.label}
        </p>
      ) : null}
      {next && next.href !== current ? (
        <Link className="pf-link pf-next" href={next.href}>
          Next project: <b>{next.label}</b>
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      ) : null}
    </footer>
  );
}
