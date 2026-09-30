"use client";

import { useState } from "react";
import { ArrowUpRight, CalendarDays, Check, Copy, ExternalLink, GitBranch, Mail } from "lucide-react";
import { personalInfo, skillGroups } from "@/data/portfolio";
import { Eyebrow, HudFrame, Marquee, SectionHead } from "./ui";

export function ThroughLine() {
  return (
    <section id="through-line" className="through" aria-label="Philosophy">
      <div className="shell through-grid">
        <Eyebrow index="01">The through line</Eyebrow>
        <p className="through-quote">
          Good engineering makes the <em>invisible</em> understandable — from identity systems to balanced trees to the interfaces
          people actually touch.
        </p>
      </div>
      <Marquee items={["Systems", "Algorithms", "Applied AI", "Web platforms", "Operations", "Curiosity"]} duration={34} />
    </section>
  );
}

export function ExperienceScene() {
  return (
    <section id="experience" className="section xp" aria-labelledby="xp-title">
      <div className="xp-pin">
        <div className="shell xp-head">
          <SectionHead
            index="03"
            eyebrow="The path so far"
            titleId="xp-title"
            title={
              <>
                Built in <span className="hollow">practice.</span>
              </>
            }
            aside="Technical work, operational responsibility, and a habit of learning by doing."
          />
          <div className="xp-progress" aria-hidden="true">
            <span className="xp-progress-fill" />
          </div>
        </div>
        <div className="xp-viewport">
          <ol className="xp-track">
            {personalInfo.experience.map((item, i) => (
              <li className="xp-card glass" key={item.organization + item.period}>
                <div className="xp-card-top">
                  <span className="xp-index">0{i + 1}</span>
                  <span className="xp-period">{item.period}</span>
                </div>
                <h3>{item.role}</h3>
                <p className="xp-org">
                  {item.organization} <span>· {item.location}</span>
                </p>
                <span className="chip chip-accent">{item.type}</span>
                <ul className="xp-points">
                  {item.description.slice(0, 2).map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <ul className="chips" aria-label="Skills">
                  {item.technologies.map((tech) => (
                    <li className="chip" key={tech}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li className="xp-card xp-next">
              <span className="xp-index">Next</span>
              <h3>The next chapter.</h3>
              <p>Looking for software engineering internships for 2026–27 — remote or ready to relocate.</p>
              <a className="btn btn-amber btn-sm" href="#contact">
                Start a conversation <ArrowUpRight size={15} />
              </a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export function AboutScene() {
  const edu = personalInfo.education[0];
  const now = [
    { label: "Building", value: personalInfo.now.building },
    { label: "Reading", value: personalInfo.now.reading },
    { label: "Tinkering", value: personalInfo.now.tinkering },
    { label: "Active in", value: personalInfo.now.activeIn },
  ];

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="shell about-grid">
        <div className="about-lead">
          <SectionHead
            index="04"
            eyebrow="Beyond the build"
            titleId="about-title"
            title={
              <>
                More than <span className="hollow">the code.</span>
              </>
            }
          />
          <p className="about-text" data-reveal>
            {personalInfo.bio[2]}
          </p>
          <a className="text-link" href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" data-reveal>
            More about my path <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="stories">
          {personalInfo.beyondCode.map((story, i) => (
            <article className="story glass" key={story.label} data-reveal>
              <span className="story-index">0{i + 1}</span>
              <h3>{story.label}</h3>
              <p>{story.detail}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="shell now" data-reveal>
        <p className="now-head">
          <span className="pip" /> Now — Fall 2026
        </p>
        <dl className="now-grid">
          {now.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="shell">
        <article className="edu glass" data-reveal>
          <div className="edu-head">
            <div>
              <span className="edu-label">Foundation</span>
              <h3>{edu.institution}</h3>
              <p>{edu.degreeOrHonor}</p>
            </div>
            <span className="edu-time">{edu.timeline}</span>
          </div>
          <p className="edu-details">{edu.details}</p>
          <ul className="chips" aria-label="Key coursework">
            {edu.coursework.map((course) => (
              <li className="chip" key={course}>
                {course}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export function ToolkitScene() {
  const all = skillGroups.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);
  return (
    <section id="stack" className="section toolkit" aria-labelledby="stack-title">
      <div className="shell">
        <SectionHead
          index="05"
          eyebrow="The toolkit"
          titleId="stack-title"
          title={
            <>
              Always <span className="hollow">evolving.</span>
            </>
          }
          aside="Languages, systems, and tools I reach for — scroll faster and watch them run."
        />
      </div>
      <div className="toolkit-marquees">
        <Marquee items={all.slice(0, half)} size="lg" duration={46} />
        <Marquee items={all.slice(half)} size="lg" direction={-1} duration={52} />
      </div>
      <div className="shell skill-grid">
        {skillGroups.map((group, i) => (
          <div className="skill-group" key={group.category} data-reveal>
            <span className="skill-index">0{i + 1}</span>
            <h3>{group.category}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContactScene() {
  const [copied, setCopied] = useState(false);
  const email = personalInfo.socialLinks.email;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="shell contact-grid">
        <div>
          <SectionHead
            index="06"
            eyebrow="Let's connect"
            titleId="contact-title"
            title={
              <>
                Have a good <span className="hollow">problem?</span>
              </>
            }
          />
          <p className="contact-text" data-reveal>
            Tell me what you&apos;re building, where you&apos;re stuck, or what you think we could make better together.
          </p>
          <div data-reveal>
            <a className="contact-email" href={`mailto:${email}`} data-magnetic>
              {email} <ArrowUpRight size={26} />
            </a>
          </div>
          <div className="contact-actions" data-reveal>
            <button type="button" className="btn btn-ghost" onClick={copyEmail} aria-live="polite">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Email copied" : "Copy email"}
            </button>
            <a className="btn btn-ghost" href={personalInfo.socialLinks.calendar} target="_blank" rel="noopener noreferrer">
              <CalendarDays size={16} /> Schedule a conversation
            </a>
            <a className="btn btn-ghost" href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} /> LinkedIn
            </a>
            <a className="btn btn-ghost" href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer">
              <GitBranch size={16} /> GitHub
            </a>
          </div>
        </div>
        <div className="contact-visual" data-reveal>
          <div className="signal-frame signal-frame-sm" data-signal="contact">
            <HudFrame />
            <span className="contact-callout">Let&apos;s make it real</span>
            <svg className="signal-static" viewBox="0 0 600 600" aria-hidden="true">
              <circle cx="300" cy="300" r="250" className="static-ring dashed" />
              <circle cx="300" cy="300" r="196" className="static-ring" />
              <path d="M210 390 382 218M236 218H382V364" className="static-arrow" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const word = "MOGES JOHNSON";
  return (
    <footer className="footer">
      <div className="shell footer-top">
        <p>
          Made with care, curiosity, and a lot of particles.
          <br />© {new Date().getFullYear()} {personalInfo.name}.
        </p>
        <nav className="footer-links" aria-label="Elsewhere">
          <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer">
            <GitBranch size={15} /> GitHub
          </a>
          <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={15} /> LinkedIn
          </a>
          <a href={`mailto:${personalInfo.socialLinks.email}`}>
            <Mail size={15} /> Email
          </a>
          <a href="#top">Back to top ↑</a>
        </nav>
      </div>
      <p className="footer-word">
        <span className="sr-only">{personalInfo.name}</span>
        {[...word].map((ch, i) => (
          <span className="fw-char" aria-hidden="true" key={i}>
            {ch === " " ? " " : ch}
          </span>
        ))}
      </p>
      <div className="shell footer-base">
        <span>Live Motion v3</span>
        <span>Next.js 16 · Canvas 2D · GSAP · drawn entirely in code</span>
      </div>
    </footer>
  );
}
