import Link from "next/link";
import { DispatchBar } from "../projects-page/DispatchBar";
import { NowMotion } from "./NowMotion";

export function NowPage() {
  return (
    <NowMotion>
      <article className="dispatch now-log">
        <DispatchBar current="/now" mark="Current work" />

        <div className="now-sheet">
          <header className="now-head">
            <p className="now-kicker">October 2026</p>
            <h1>Now</h1>
            <p className="now-lead">Two threads. The pieces exist. The join is the work.</p>
            <span className="now-rule" aria-hidden="true" />
          </header>

          <div className="now-cols">
            <section aria-labelledby="now-post">
              <h2 id="now-post">Post-it join</h2>
              <p>Post-it Board is live. How to post it is the spec. Each repo is in good shape on its own.</p>
              <p>
                The open work is the handoff. A Grok chat in the car has to become one note, with no tap and no
                screen. A writer takes that session, files one JSON command on the board’s inbox branch, and GitHub
                Actions runs <code>scripts/post.mjs</code>. That push posts the page.
              </p>
              <p>
                <code>main</code> only changes through a pull request. The post is the inbox command. The watcher that
                reads the quiet chat, summarizes it, and files that command is specified, and still to build. Quiet, in
                the design, is 8 seconds by default, tunable from 5 to 30. “Post it” to Ara is written and untested.
                Whether a car chat comes back as text is still open.
              </p>
              <p className="now-links">
                <a target="_blank" rel="noreferrer" href="https://github.com/mogesjohnson/post-it-board">
                  Board
                </a>
                <a target="_blank" rel="noreferrer" href="https://mogesjohnson.github.io/post-it-board/">
                  Live
                </a>
                <a target="_blank" rel="noreferrer" href="https://github.com/mogesjohnson/how-to-post-it">
                  Spec
                </a>
              </p>
            </section>

            <section aria-labelledby="now-army">
              <h2 id="now-army">Shadow Army v2</h2>
              <p>
                Claude’s session is the monarch. Each soldier is a live CLI session. v1 stays the old line. I’m drawing
                different terminal screens for this one: a docked soldier pane, an army strip, meters, and short tags
                when the names don’t fit. The spec lays them out at 144, 110, and 80 columns, on 24 rows.
              </p>
              <p>
                The spec is still a draft. The latest commits fold in the spike findings, steering, and a clear state,
                and they point the picture at canvas version 14. A demo prototype of those screens is next. The Shadow
                Army page on this site stays a fixed mock until that terminal exists.
              </p>
              <p className="now-links">
                <a target="_blank" rel="noreferrer" href="https://github.com/mogesjohnson/shadow-army">
                  Repo, private
                </a>
                <Link href="/shadow-army">Fixed mock</Link>
              </p>
            </section>
          </div>
        </div>
      </article>
    </NowMotion>
  );
}
