import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { detailPages } from "../../../src/data/externalPages";

/** A project's source repository. `private` repos open only for collaborators (GitHub shows others a 404). */
export type ProjectRepo = { href: string; name: string; private?: boolean };

/**
 * One slim row at the bottom of every project and prototype page: "All projects"
 * back to /projects, and "Next project" to the following entry in `detailPages`
 * (src/data/externalPages.ts), wrapping from the last to the first. A page may
 * pass its `repo`: the link names the repository, and a private one carries a lock
 * and "Private · collaborators only" so a visitor knows before the click that it
 * may not open. `note` remains for a page that has no link to give.
 * Styles: ./project-footer.css, imported by each page route.
 */
export function ProjectFooter({ current, repo, note }: { current: string; repo?: ProjectRepo; note?: { label: string; title: string } }) {
  const index = detailPages.findIndex((page) => page.href === current);
  const next = detailPages[(index + 1) % detailPages.length];

  return (
    <footer className="project-footer" aria-label="Project navigation">
      <Link className="pf-link pf-all" href="/projects">
        <ArrowLeft size={15} aria-hidden="true" />
        All projects
      </Link>
      {repo ? (
        <a
          className="pf-repo"
          href={repo.href}
          target="_blank"
          rel="noopener noreferrer"
          title={repo.private ? "Private repository: GitHub opens it only for collaborators and shows everyone else a 404." : undefined}
        >
          <span>
            Source <b>{repo.name}</b>
          </span>{" "}
          {repo.private ? (
            <span className="pf-private">
              <Lock size={12} aria-hidden="true" />
              Private · collaborators only
            </span>
          ) : null}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      ) : note ? (
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
