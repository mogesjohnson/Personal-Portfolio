import Link from "next/link";
import { DispatchBar } from "../projects-page/DispatchBar";
import { NowMotion } from "./NowMotion";

/*
 * Every sentence here is sourced in BRIEF.md (checked 2026-10-20). Classes use the
 * nw- prefix: the homepage already owns .now-head and .now-grid in globals.css.
 */
export function NowPage() {
  return (
    <NowMotion>
      <article className="dispatch nw">
        <DispatchBar current="/now" mark="Current work" />

        <div className="nw-sheet">
          <header className="nw-head">
            <h1>Now</h1>
            <div className="nw-head-note">
              <p className="nw-kicker">
                Checked <time dateTime="2026-10-20">20 Oct 2026</time>
              </p>
              <p className="nw-lead">Two threads. One runs on its own now. The other is still a spec.</p>
            </div>
            <span className="nw-rule" aria-hidden="true" />
          </header>

          <section className="nw-entry" aria-labelledby="nw-post">
            <div className="nw-meta">
              <h2 id="nw-post">Car to board</h2>
              <p className="nw-state">Running</p>
              <p className="nw-when">
                since <time dateTime="2026-10-11">11 Oct 2026</time>
              </p>
            </div>
            <div className="nw-body">
              <p className="nw-first">
                Talk to Grok in the car, and the conversation lands on the Post-it Board. No screen, no typing, no
                tap.
              </p>
              <p>
                A poller on an always-on machine reads the voice chats. When one has been quiet for 10 minutes, a small
                local model summarizes it and pushes one JSON command to the board’s <code>inbox</code> branch. GitHub
                Actions runs <code>scripts/post.mjs</code>, and the note lands. Each topic keeps one running summary.
              </p>
              <p>
                Latest, on October 18: the poller skips throwaway chats, like directions, weather, timers, and music,
                before it summarizes. The board’s Topics view became a folder tree you can search by name.
              </p>
              <p>
                Still open: saying “post it” to Ara. The instructions are written. That path has not been tested in
                the car.
              </p>
              <p className="nw-links">
                <a target="_blank" rel="noreferrer" href="https://mogesjohnson.github.io/post-it-board/">
                  Live board
                </a>
                <a target="_blank" rel="noreferrer" href="https://github.com/mogesjohnson/post-it-board">
                  Board repo
                </a>
                <a target="_blank" rel="noreferrer" href="https://github.com/mogesjohnson/how-to-post-it">
                  How to post it
                </a>
              </p>
            </div>
          </section>

          <section className="nw-entry" aria-labelledby="nw-army">
            <div className="nw-meta">
              <h2 id="nw-army">Shadow Army v2</h2>
              <p className="nw-state">Draft</p>
              <p className="nw-when">
                spec revised <time dateTime="2026-10-14">14 Oct 2026</time>
              </p>
            </div>
            <div className="nw-body">
              <p className="nw-first">
                v1 is legacy, frozen at its <code>v1.0.0</code> tag. v2 is Claude-first: the Claude Code session is the
                Monarch, and every soldier is a live session of its own CLI.
              </p>
              <p>
                The v2 spec is a draft for review. The two prototype pages on this site are a mock-up of the Claude
                side: the session and the protocol. The repository is private.
              </p>
              <p className="nw-links">
                <Link href="/shadow-army">Session mock-up</Link>
                <Link href="/agent-protocol">Protocol mock-up</Link>
              </p>
            </div>
          </section>
        </div>
      </article>
    </NowMotion>
  );
}
