import { DispatchBar } from "./DispatchBar";
import { DispatchMotion } from "./DispatchMotion";

export function ProjectsPage() {
  return (
    <DispatchMotion>
      <article className="dispatch">
        <DispatchBar />

        <header className="dispatch-intro">
          <p className="dispatch-kicker">Projects</p>
          <h1>Three repositories, read on their own.</h1>
          <p className="dispatch-lead" data-scrub>
            Two of them are one system, shown apart and then joined. Shadow Army on this page is v1, and v1 is legacy.
            This is not a complete list of every repository.
          </p>
        </header>

        <section className="dispatch-section" id="shadow-army" aria-labelledby="shadow-army-title">
          <p className="dispatch-index">01</p>
          <div>
            <h2 id="shadow-army-title" className="dispatch-title">
              Shadow Army
            </h2>
            <p className="dispatch-legacy" data-reveal>
              This section is v1, and v1 is legacy. A Claude-first design comes next.
            </p>
            <div className="dispatch-copy">
              <p data-reveal>The prototype is a v2 mock-up of the Claude component.</p>
              <p data-reveal>
                Shadow Army is a personal CLI that commands other AI coding CLIs with isolated context. The v1 README’s
                tagline is “One monarch. Many shadows. Zero shared baggage.” That README describes v1 as the <code>sa</code>{" "}
                CLI that starts a new process for every message, and it says this v1 line is frozen at the tag <code>v1.0.0</code>.
              </p>
              <p data-reveal>
                The binaries are <code>sa</code> and <code>shadow</code>. One Monarch plans and delegates. Each Soldier
                receives a Brief with only what the task needs, and returns a Report. Soldiers never see each other’s
                transcripts. Shared notes live in the Shadow Vault (<code>.shadow/</code>). A Formation is a saved preset
                of a monarch and soldiers for a kind of job.
              </p>
              <p data-reveal>
                The v1 README lists the soldiers below. These names are that list, not products this page checked on its
                own.
              </p>
              <ul className="dispatch-soldiers" data-reveal>
                <li>Codex (<code>gpt6-astra</code>) as Monarch</li>
                <li>Codex (<code>gpt6.1-sol</code>) as a work-horse</li>
                <li>Claude (Opus 5.5) as a second orchestrator and reviewer</li>
                <li>Claude (Sonnet 5.5) as a work-horse</li>
                <li>Grok Build (<code>grok</code>) as a work-horse that never reviews</li>
                <li>Antigravity (<code>agy</code>) for research and testing only, with no coding</li>
              </ul>
              <p data-reveal>
                The same README says the hard rules — Grok never reviews, and <code>agy</code> never writes — are enforced
                in code.
              </p>
              <p data-reveal>
                The v1 README names four layers that keep soldiers apart: disjoint path claims in the brief, a git worktree
                per soldier, a vault lock registry with a TTL and a heartbeat, and a claim audit that rejects edits outside
                the claim.
              </p>
              <p data-reveal>
                Soldiers do not edit the working folder while they work. <code>sa run</code> applies the result as
                uncommitted edits. Nothing is committed for the user.
              </p>
              <p data-reveal>
                The v1 README names the stack as TypeScript on Node, with Ink, commander, execa, and vitest, under the MIT
                license. <code>package.json</code> requires Node <code>&gt;=20</code>. The repository is private, so the
                GitHub link does not open for a visitor without access.
              </p>
            </div>
            <p className="dispatch-links" data-reveal>
              <a className="dispatch-link" target="_blank" rel="noreferrer" href="https://github.com/mogesjohnson/shadow-army">
                mogesjohnson/shadow-army
              </a>
              <a className="dispatch-link" href="/shadow-army">
                v2 session mock-up
              </a>
              <a className="dispatch-link" href="/agent-protocol">
                v2 protocol mock-up
              </a>
            </p>
          </div>
        </section>

        <section className="dispatch-section" id="post-it-board" aria-labelledby="post-it-title">
          <p className="dispatch-index">02</p>
          <div>
            <h2 id="post-it-title" className="dispatch-title">
              Post-it Board
            </h2>
            <div className="dispatch-copy">
              <p data-reveal>
                Post-it Board is a small static website that looks like a middle-school classroom corkboard. It is plain
                HTML, CSS, and JavaScript. There is no framework and no build step.
              </p>
              <p data-reveal>
                Each day gets its own board. Each topic is one pin, a sticky note in yellow, pink, blue, or green. Each
                pin holds one or more pages of notes. The newest day is first. Arrows step to an older or a newer day.
                Open a pin to read it, then move between its pages. Esc, or “All pins,” returns to the board.
              </p>
              <p data-reveal>
                A link can open one page. The hash looks like the README’s example: <code>#day=2026-10-05&amp;pin=&lt;id&gt;&amp;page=2</code>.
              </p>
              <p data-reveal>
                Anyone can read the board. A lock icon is where the owner signs in. Everyone else gets a read-only board.
                The owner tools add a day, a pin, or a page, and they rename, select, and delete. Select mode marks a
                whole pin or a single page. Delete asks for confirmation, and it is permanent. Deleting a pin deletes its
                pages. There is no recycle bin.
              </p>
              <p data-reveal>
                The shared board stores notes in Supabase. The README says the free plan is enough: Postgres tables, row
                level security, and Auth, and no Edge Functions. The tables are <code>days</code>, <code>pins</code>,{" "}
                <code>pages</code>, and <code>board_owners</code>. The public site can read. A write is kept only for a
                signed-in board owner. The repository’s setup turns public sign-ups off.
              </p>
              <p data-reveal>
                If <code>config.js</code> is empty, the board runs in demo mode in that browser only. Notes stay in{" "}
                <code>localStorage</code>, and a banner says Supabase is not connected. The live site is not that demo.
                GitHub Pages serves it from the <code>main</code> branch.
              </p>
              <p data-reveal>Changes to <code>main</code> go through a pull request.</p>
            </div>
            <p className="dispatch-links" data-reveal>
              <a className="dispatch-link" target="_blank" rel="noreferrer" href="https://github.com/mogesjohnson/post-it-board">
                mogesjohnson/post-it-board
              </a>
              <a className="dispatch-link" target="_blank" rel="noreferrer" href="https://mogesjohnson.github.io/post-it-board/">
                Live board
              </a>
            </p>
          </div>
        </section>

        <section className="dispatch-section" id="how-to-post-it" aria-labelledby="how-to-title">
          <p className="dispatch-index">03</p>
          <div>
            <h2 id="how-to-title" className="dispatch-title">
              How to post it
            </h2>
            <div className="dispatch-copy">
              <p data-reveal>
                How to post it is a documentation and spec repository. Its subject is a conversation with Grok in a Tesla,
                and the place that conversation is meant to land is the Post-it Board. This repository is not a live car
                workflow.
              </p>
              <p data-reveal>
                The goal is zero friction while driving. One pin per topic. One page per conversation. No screens, no
                typing, no taps.
              </p>
              <p data-reveal>Two ways of posting are written down. Neither is live. The board is the live product. These two paths are not.</p>
              <p data-reveal>
                The recommended way is transcript automation. The design is: when a conversation goes quiet, summarize it
                and pin it, even if nobody said “post it.” Quiet means 8 seconds by default, and that wait can be set from
                5 to 30 seconds. Eight seconds is a minimum quiet time in the design, not a promise that a note appears
                then. The design is written. The method for reading a transcript is unverified, and the automation is not
                built.
              </p>
              <p data-reveal>
                The second way is to say “post it” to Ara, the car’s Grok. Instructions for that are written. They are
                untested. The repository does not establish that Ara can write to GitHub.
              </p>
              <p data-reveal>A custom Android voice app was considered earlier. It is superseded, and it was not built.</p>
              <p data-reveal>The license is MIT.</p>
            </div>
            <div className="dispatch-origin" data-note-origin aria-hidden="true" />
            <p className="dispatch-links" data-reveal>
              <a className="dispatch-link" target="_blank" rel="noreferrer" href="https://github.com/mogesjohnson/how-to-post-it">
                mogesjohnson/how-to-post-it
              </a>
            </p>
          </div>
        </section>

        <section className="dispatch-section" id="connection" aria-labelledby="connection-title">
          <p className="dispatch-index">04</p>
          <div>
            <h2 id="connection-title" className="dispatch-title">
              The connection
            </h2>
            <div className="dispatch-copy">
              <p data-reveal>
                How to post it is the spec for getting a conversation onto a board. Post-it Board is the board that keeps
                the note and shows it.
              </p>
              <p data-reveal>
                They meet in one place: the <code>inbox</code> branch of Post-it Board. How to post it has no inbox. A file
                pushed to that spec repo does not change the board. The How to post it README calls an earlier “inbox on
                how-to-post-it” wording a slip.
              </p>
              <p data-reveal>
                A writer that can push a file sends one JSON command, <code>inbox/&lt;name&gt;.json</code>, on the board’s{" "}
                <code>inbox</code> branch. A GitHub Action on the board runs <code>scripts/post.mjs</code> from{" "}
                <code>main</code>, signed in as the bot, writes a result, and removes the command. The spec decides what
                should be posted. The board is what actually stores it.
              </p>
              <p data-reveal>
                A command can add, edit, or delete. A pin is the topic. A page is the note. An add can land on a pin that
                is already there that day, matched loosely by topic. An edit or a delete needs the exact pin title and
                does not guess.
              </p>
              <p data-reveal>
                The quiet-conversation path is meant to update the same page when the talk continues, so one topic stays
                one note. That path is designed, and it is not built. Saying “post it” in the car is meant to pin
                immediately. That path is untested.
              </p>
              <p data-reveal>The board is live. The join from the car is not.</p>
            </div>

            <div className="dispatch-desk">
              <div className="dispatch-slot">
                <p className="dispatch-note" data-note>
                  One pin per topic
                </p>
              </div>
              <p className="dispatch-caption">The spec sends the note, and the board keeps it.</p>
            </div>

            <p className="dispatch-links" data-reveal>
              <a className="dispatch-link" target="_blank" rel="noreferrer" href="https://github.com/mogesjohnson/post-it-board">
                mogesjohnson/post-it-board
              </a>
              <a className="dispatch-link" target="_blank" rel="noreferrer" href="https://github.com/mogesjohnson/post-it-board/blob/inbox/inbox/README.md">
                Inbox docs
              </a>
              <a className="dispatch-link" target="_blank" rel="noreferrer" href="https://github.com/mogesjohnson/how-to-post-it">
                mogesjohnson/how-to-post-it
              </a>
              <a className="dispatch-link" target="_blank" rel="noreferrer" href="https://mogesjohnson.github.io/post-it-board/">
                Live board
              </a>
            </p>
          </div>
        </section>
      </article>
    </DispatchMotion>
  );
}
