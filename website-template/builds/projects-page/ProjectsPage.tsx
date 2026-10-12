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
                A Topics view lists every topic across all days, most recently updated first, each with one living
                summary. It opens at <code>#view=topics</code>. The layout works on a phone.
              </p>
              <p data-reveal>
                Anyone can read the board. A lock icon is where the owner signs in. Everyone else gets a read-only board.
                The owner tools add a day, a pin, or a page, and they rename, select, and delete. Select mode marks a
                whole pin or a single page. Delete asks for confirmation, and it is permanent. Deleting a pin deletes its
                pages. There is no recycle bin.
              </p>
              <p data-reveal>
                The shared board stores notes in Supabase on the free plan, with row level security on the tables{" "}
                <code>days</code>, <code>pins</code>, <code>pages</code>, and <code>board_owners</code>. The public key
                can only read. Writes are kept only for signed-in owner accounts. Public sign-ups are off, and no
                service-role key is used.
              </p>
              <p data-reveal>
                If <code>config.js</code> is empty, the board runs in demo mode in that browser only. Notes stay in{" "}
                <code>localStorage</code>, and a banner says Supabase is not connected. The live site is not that demo.
                GitHub Pages serves it from the <code>main</code> branch.
              </p>
              <p data-reveal>
                Changes to <code>main</code> go through a pull request. A test suite covers the board, the inbox
                workflow, and the Topics view.
              </p>
            </div>
            <p className="dispatch-links" data-reveal>
              <a className="dispatch-link" target="_blank" rel="noreferrer" href="https://github.com/mogesjohnson/post-it-board">
                mogesjohnson/post-it-board
              </a>
              <a className="dispatch-link" target="_blank" rel="noreferrer" href="https://mogesjohnson.github.io/post-it-board/">
                Live board
              </a>
              <a className="dispatch-link" target="_blank" rel="noreferrer" href="https://mogesjohnson.github.io/post-it-board/#view=topics">
                Topics view
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
                How to post it holds the docs and the code for getting a conversation with Grok in a Tesla onto the
                Post-it Board. The docs start at <code>docs/main-workflow-goal.md</code>. The code is the transcript
                poller in <code>poller/</code>: Node, no dependencies, and 41 unit tests.
              </p>
              <p data-reveal>
                The goal is zero friction while driving. No screens, no typing, no taps. One pin per topic, and one
                living summary for each topic.
              </p>
              <p data-reveal>
                Transcript automation is the primary path, and it has been live since October 11, 2026. The Grok phone
                app mirrors voice conversations with Ara, the car’s Grok, into grok.com history, with timestamps. A
                poller on an always-on Linux machine reads that history, picks out the voice chats, and waits until a
                chat has been quiet for 10 minutes. Then it summarizes the chat and sends the result to the board.
              </p>
              <p data-reveal>
                The summary comes from a free open-weights model that runs locally: Qwen3.5-2B, CPU only, through
                llama.cpp. It uses about 1.5–2 GB of RAM and takes roughly 5–20 seconds per summary. It was chosen after
                testing Gemma 4 E2B and Qwen3.5 0.8B and 4B. An earlier plan to use GitHub Models was retired.
              </p>
              <p data-reveal>
                Each topic is one running summary, capped at 1,500 characters. A new chat is merged into the topic it
                matches, or it starts a new topic. Matching is conservative: a miss makes a separate topic rather than a
                wrong merge. Every Sunday, a compaction pass trims any summary over 1,500 characters to about 1,000. A
                health check and twice-daily monitoring watch the poller.
              </p>
              <p data-reveal>
                On October 11, 2026, a script outside the browser read full voice-chat text with millisecond timestamps
                (issue #2). The history requests it relies on are private and undocumented, so the design accepts the
                terms-of-service risk and the risk that they break.
              </p>
              <p data-reveal>
                The second way is to say “post it” to Ara, who can post directly by pushing a file to the board’s inbox.
                That path has not been tested in the car yet.
              </p>
              <p data-reveal>
                Superseded: the earlier plan for a custom Android voice app, running its own Ara session through xAI’s
                voice API and built from a Google AI Studio prompt, was never built. Its 8-second silence timer is gone
                too. Quiet now means 10 minutes.
              </p>
              <p data-reveal>The license is MIT.</p>
            </div>
            <div className="dispatch-origin" data-note-origin aria-hidden="true" />
            <p className="dispatch-links" data-reveal>
              <a className="dispatch-link" target="_blank" rel="noreferrer" href="https://github.com/mogesjohnson/how-to-post-it">
                mogesjohnson/how-to-post-it
              </a>
              <a className="dispatch-link" target="_blank" rel="noreferrer" href="https://github.com/mogesjohnson/how-to-post-it/blob/main/docs/main-workflow-goal.md">
                Start here
              </a>
              <a className="dispatch-link" target="_blank" rel="noreferrer" href="https://github.com/mogesjohnson/how-to-post-it/tree/main/poller">
                Poller
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
                How to post it is the docs and the poller that turn a conversation into a note. Post-it Board is the
                board that keeps the note and shows it.
              </p>
              <p data-reveal>
                They meet in one place: the <code>inbox</code> branch of Post-it Board. How to post it has no inbox. A
                file pushed to that repo does not change the board.
              </p>
              <p data-reveal>
                Anything that can push a small JSON command file, <code>inbox/&lt;name&gt;.json</code>, to the board’s{" "}
                <code>inbox</code> branch starts a GitHub Actions workflow. It runs <code>scripts/post.mjs</code> from{" "}
                <code>main</code>, signs in as a bot with encrypted repository secrets, adds, edits, or deletes notes,
                and writes the result back to <code>inbox/results</code>. The secrets never touch a chat or the
                repository. <code>main</code> is protected by a ruleset. The <code>inbox</code> branch stays open by
                design.
              </p>
              <p data-reveal>
                A command can add, edit, or delete. A pin is the topic. A page is the note. An add can land on a pin that
                is already there that day, matched loosely by topic. An edit or a delete needs the exact pin title and
                does not guess.
              </p>
              <p data-reveal>
                Today the poller is the writer: once a voice chat has been quiet for 10 minutes, it pushes that topic’s
                summary to the inbox. Ara saying “post it” is the second writer, and it is not yet tested in the car.
              </p>
              <p data-reveal>
                The whole system runs at $0: GitHub Pages, the Supabase free plan, GitHub Actions, and a local model.
              </p>
              <p data-reveal>The board is live, and so is the transcript path from the car.</p>
            </div>

            <div className="dispatch-desk">
              <div className="dispatch-slot">
                <p className="dispatch-note" data-note>
                  One pin per topic
                </p>
              </div>
              <p className="dispatch-caption">The poller sends the note, and the board keeps it.</p>
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
