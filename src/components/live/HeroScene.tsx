import { ArrowDown, ArrowUpRight, BadgeCheck, CalendarDays } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { monogramSatellites } from "./formations";
import LiveClock from "./LiveClock";
import { HudFrame } from "./ui";

export default function HeroScene({ onOpenResume }: { onOpenResume: () => void }) {
  const facts = [
    personalInfo.workAuth,
    "B.S. Computer Science — Software Engineering · Liberty ’28",
    "Handshake AI Fellow",
    personalInfo.relocation,
  ];

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker hero-reveal">
            <span className="pip" /> Open to software engineering internships <span className="muted">/ 2026–27</span>
          </p>
          <h1 id="hero-title" className="hero-title">
            <span className="hero-line">
              Curiosity<span className="hero-dot">.</span>
            </span>
            <span className="hero-line hollow">Engineered.</span>
          </h1>
          <p className="hero-lede hero-reveal">
            I&apos;m Moges Johnson, a software engineering student and Handshake AI Fellow working across systems, algorithms, and
            applied AI — turning complex ideas into things people can use.
          </p>
          <div className="hero-ctas hero-reveal">
            <a className="btn btn-amber" href="#work" data-magnetic>
              Explore selected work <ArrowDown size={17} />
            </a>
            <button type="button" className="btn btn-ghost" onClick={onOpenResume} data-magnetic>
              View résumé <ArrowUpRight size={17} />
            </button>
            <a className="text-link" href={personalInfo.socialLinks.calendar} target="_blank" rel="noopener noreferrer">
              <CalendarDays size={15} /> Schedule a chat
            </a>
          </div>
          <ul className="hero-facts hero-reveal" aria-label="Quick facts">
            {facts.map((fact, i) => (
              <li key={fact}>
                {i === 0 && <BadgeCheck size={13} />}
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual hero-reveal">
          <div className="signal-frame" data-signal="mj">
            <HudFrame />
            {monogramSatellites.map((s) => (
              <span
                key={s.label}
                className="satellite"
                style={{ left: `${(s.x / 600) * 100}%`, top: `${(s.y / 600) * 100}%` }}
              >
                <b>{s.index}</b>
                {s.label}
              </span>
            ))}
            <svg className="signal-static" viewBox="0 0 600 600" aria-hidden="true">
              <circle cx="300" cy="300" r="262" className="static-ring dashed" />
              <circle cx="300" cy="300" r="214" className="static-ring" />
              <text x="300" y="300" textAnchor="middle" dominantBaseline="central" className="static-mark">
                MJ
              </text>
            </svg>
          </div>
          <p className="signal-caption">
            <span className="live-only" data-signal-stat>
              Live signal
            </span>
            <span className="live-only">Move · click — it reacts</span>
            <span className="static-only">Static mode · reduced motion</span>
          </p>
        </div>
      </div>

      <div className="shell hero-base">
        <span>Software engineering student / Handshake AI Fellow</span>
        <span>
          {personalInfo.location} · <LiveClock /> ET
        </span>
        <a href="#through-line" className="hero-scroll">
          Scroll <ArrowDown size={13} />
        </a>
      </div>
    </section>
  );
}
