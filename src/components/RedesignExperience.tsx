"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Command, Copy, Check, Menu, X, GitBranch, ExternalLink, Mail, CalendarDays } from "lucide-react";
import { personalInfo, projects } from "@/data/portfolio";
import ResumeModal from "@/components/ResumeModal";
import CommandPalette from "@/components/CommandPalette";

const projectLabels = ["Identity infrastructure", "Algorithmic thinking", "A connected portfolio"];
const projectCodes = ["01 / SYS", "02 / ALG", "03 / WEB"];

function ProjectVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg className="project-visual-svg" viewBox="0 0 640 420" role="img" aria-label="Diagram of a central domain controller connected to departmental units">
        <path className="diagram-line" d="M320 128V194M136 286V238H504V286M320 194V238" />
        <path className="diagram-line faint" d="M136 328V366H504V328" />
        <rect className="diagram-main" x="222" y="56" width="196" height="72" rx="4" />
        <text x="320" y="85" textAnchor="middle" className="diagram-overline">DOMAIN CONTROLLER</text>
        <text x="320" y="109" textAnchor="middle" className="diagram-title">AD DS / DNS</text>
        {[{ x: 62, label: "ENGINEERING" }, { x: 246, label: "OPERATIONS" }, { x: 430, label: "FINANCE" }].map((node, i) => (
          <g key={node.label} className="diagram-node" style={{ animationDelay: `${i * 130}ms` }}>
            <rect x={node.x} y="286" width="148" height="70" rx="4" />
            <circle cx={node.x + 20} cy="308" r="5" />
            <text x={node.x + 20} y="339" className="diagram-label">{node.label}</text>
          </g>
        ))}
        <circle className="diagram-packet" r="5"><animateMotion dur="4s" repeatCount="indefinite" path="M320 128V238H136V286" /></circle>
        <circle className="diagram-packet second" r="5"><animateMotion dur="4.8s" repeatCount="indefinite" path="M320 128V238H504V286" /></circle>
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg className="project-visual-svg" viewBox="0 0 640 420" role="img" aria-label="Self balancing tree with animated nodes and search path">
        <path className="diagram-line" d="M320 98 200 202M320 98 440 202M200 202 125 306M200 202 265 306M440 202 375 306M440 202 515 306" />
        {[{ x: 320, y: 98, n: "42" }, { x: 200, y: 202, n: "21" }, { x: 440, y: 202, n: "67" }, { x: 125, y: 306, n: "12" }, { x: 265, y: 306, n: "29" }, { x: 375, y: 306, n: "53" }, { x: 515, y: 306, n: "80" }].map((node, i) => (
          <g key={node.n} className={`tree-node ${i === 0 || i === 2 || i === 5 ? "is-path" : ""}`} style={{ animationDelay: `${i * 90}ms` }}>
            <circle cx={node.x} cy={node.y} r="30" />
            <text x={node.x} y={node.y + 6} textAnchor="middle">{node.n}</text>
          </g>
        ))}
        <text x="32" y="388" className="diagram-caption">BALANCED HEIGHT / LOGARITHMIC LOOKUP</text>
        <path className="search-path" d="M320 98 440 202 375 306" />
      </svg>
    );
  }
  return (
    <svg className="project-visual-svg" viewBox="0 0 640 420" role="img" aria-label="Portfolio architecture connecting identity, projects, and opportunities">
      <circle className="orbit" cx="320" cy="205" r="148" />
      <circle className="orbit orbit-inner" cx="320" cy="205" r="82" />
      <path className="diagram-line" d="M320 205 320 56M320 205 484 282M320 205 156 282" />
      <circle className="portfolio-core" cx="320" cy="205" r="69" />
      <text x="320" y="201" textAnchor="middle" className="diagram-overline">PORTFOLIO</text>
      <text x="320" y="226" textAnchor="middle" className="diagram-title">MJ / 26</text>
      {[{ x: 320, y: 55, label: "IDENTITY" }, { x: 488, y: 285, label: "PROJECTS" }, { x: 151, y: 285, label: "CONTACT" }].map((node, i) => (
        <g key={node.label} className="diagram-node" style={{ animationDelay: `${i * 120}ms` }}>
          <circle cx={node.x} cy={node.y} r="29" />
          <text x={node.x} y={node.y + 52} textAnchor="middle" className="diagram-label">{node.label}</text>
        </g>
      ))}
      <circle className="orbit-dot" cx="320" cy="57" r="6" />
    </svg>
  );
}

function SignalVisual() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className="signal-visual"
      onPointerMove={(event) => {
        const bounds = ref.current?.getBoundingClientRect();
        if (!bounds || !ref.current) return;
        ref.current.style.setProperty("--px", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 28}px`);
        ref.current.style.setProperty("--py", `${((event.clientY - bounds.top) / bounds.height - 0.5) * 28}px`);
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty("--px", "0px");
        ref.current?.style.setProperty("--py", "0px");
      }}
      aria-label="Animated systems diagram showing three connected areas of engineering"
      role="img"
    >
      <div className="signal-grid" />
      <div className="signal-ring signal-ring-one" />
      <div className="signal-ring signal-ring-two" />
      <div className="signal-cross signal-cross-a">+</div>
      <div className="signal-cross signal-cross-b">+</div>
      <div className="signal-core"><span>MJ</span><small>ENGINEERING<br />IN MOTION</small></div>
      <div className="signal-satellite satellite-one"><b>01</b><span>SYSTEMS</span></div>
      <div className="signal-satellite satellite-two"><b>02</b><span>ALGORITHMS</span></div>
      <div className="signal-satellite satellite-three"><b>03</b><span>APPLIED AI</span></div>
      <span className="signal-coordinate coordinate-one">39°16′ N / 74°35′ W</span>
      <span className="signal-coordinate coordinate-two">STATUS: EXPLORING</span>
    </div>
  );
}

export default function RedesignExperience() {
  const [activeProject, setActiveProject] = useState(0);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const project = projects[activeProject];

  useEffect(() => {
    const openPalette = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", openPalette);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", openPalette);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.socialLinks.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${personalInfo.socialLinks.email}`;
    }
  };

  const selectProject = (index: number) => {
    setActiveProject(index);
    setShowDetails(false);
  };

  return (
    <div className="site-shell" id="top">
      <div className="top-progress" aria-hidden="true" />
      <header className="site-nav">
        <a className="site-mark" href="#top" aria-label="Moges Johnson, back to top"><span className="mark-symbol">M<span>↗</span></span><span className="mark-word">MOGES<br />JOHNSON</span></a>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work <sup>03</sup></a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <button type="button" className="mobile-command-link" onClick={() => { setMenuOpen(false); setCommandPaletteOpen(true); }}>Open command menu</button>
        </nav>
        <div className="nav-actions">
          <button className="nav-command" type="button" onClick={() => setCommandPaletteOpen(true)} aria-label="Open command menu"><Command size={14} /> <span>K</span></button>
          <button className="nav-resume" type="button" onClick={() => setResumeOpen(true)}>Résumé <ArrowUpRight size={15} /></button>
          <button className="nav-menu" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-heading">
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="hero-kicker"><span className="live-pip" /> OPEN TO SOFTWARE ENGINEERING OPPORTUNITIES <span className="kicker-index">/ 2026—27</span></div>
              <h1 id="hero-heading" className="hero-title"><span className="hero-line">Curiosity<span className="title-dot">.</span></span><span className="hero-line hero-line-outline">Engineered.</span></h1>
              <p className="hero-statement">I&apos;m Moges Johnson. I work across software, systems, and applied AI—turning complex ideas into things people can use.</p>
              <div className="hero-cta-row"><a className="primary-link" href="#work">Explore selected work <ArrowDown size={18} /></a><button className="quiet-link" type="button" onClick={() => setResumeOpen(true)}>View résumé <ArrowUpRight size={17} /></button></div>
            </div>
            <SignalVisual />
          </div>
          <div className="hero-baseline"><span>SOFTWARE ENGINEERING STUDENT / HANDSHAKE AI FELLOW</span><span>BASED IN NEW JERSEY · BUILDING EVERYWHERE</span><span className="hero-scroll">SCROLL TO EXPLORE <ArrowDown size={13} /></span></div>
        </section>

        <section className="intro-band" aria-label="Introduction"><div className="wide-wrap intro-grid"><span className="eyebrow reveal">01 / THE THROUGH LINE</span><p className="intro-quote reveal">Good engineering makes the <em>invisible</em> understandable.</p><div className="intro-aside reveal"><span>THE PRACTICE</span><p>From identity systems to balanced trees to human interfaces, I care about the structure beneath the surface—and the experience it creates.</p></div></div></section>

        <section id="work" className="work-section section-pad" aria-labelledby="work-heading">
          <div className="wide-wrap">
            <div className="section-heading reveal"><div><span className="eyebrow">02 / SELECTED WORK</span><h2 id="work-heading">Projects with<br /><em>purpose.</em></h2></div><p>Three directions. One approach: understand the problem, build with intent, and show the thinking.</p></div>
            <div className="project-stage reveal">
              <div className="project-rail" role="tablist" aria-label="Selected projects">
                {projects.map((item, index) => <button key={item.id} id={`project-tab-${index}`} type="button" role="tab" aria-selected={activeProject === index} aria-controls="project-panel" tabIndex={activeProject === index ? 0 : -1} className={activeProject === index ? "project-tab active" : "project-tab"} onClick={() => selectProject(index)} onKeyDown={(event) => {
                  const next = event.key === "ArrowRight" || event.key === "ArrowDown" ? (index + 1) % projects.length : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (index - 1 + projects.length) % projects.length : event.key === "Home" ? 0 : event.key === "End" ? projects.length - 1 : null;
                  if (next !== null) { event.preventDefault(); selectProject(next); document.getElementById(`project-tab-${next}`)?.focus(); }
                }}><span className="project-tab-number">0{index + 1}</span><span className="project-tab-copy"><strong>{projectLabels[index]}</strong><small>{item.category}</small></span><ArrowUpRight size={19} /></button>)}
                <div className="project-rail-foot"><span>EXPLORE THE THINKING</span><span>↓</span></div>
              </div>
              <div id="project-panel" className="project-panel" role="tabpanel" aria-labelledby={`project-tab-${activeProject}`} key={project.id}>
                <div className="project-art"><div className="project-art-top"><span>{projectCodes[activeProject]}</span><span>INTERACTIVE SYSTEM / {project.year}</span></div><ProjectVisual index={activeProject} /><div className="project-art-bottom"><span>FIG. 0{activeProject + 1} — CONCEPTUAL MODEL</span><span className="art-corner">↗</span></div></div>
                <div className="project-body"><div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div><h3>{project.title}</h3><p>{project.summary}</p><div className="project-tags">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-links"><button type="button" onClick={() => setShowDetails(!showDetails)} aria-expanded={showDetails}>{showDetails ? "Close case notes" : "Explore case notes"} <ArrowRight size={17} /></button><a href={project.githubUrl} target="_blank" rel="noopener noreferrer">View repository <ArrowUpRight size={16} /></a></div></div>
                {showDetails && <div className="case-notes"><div><span>01 / THE PROBLEM</span><p>{project.problem}</p></div><div><span>02 / THE APPROACH</span><p>{project.architecture}</p></div><div><span>03 / THE DECISION</span><p>{project.tradeoff}</p></div></div>}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section section-pad" aria-labelledby="experience-heading"><div className="wide-wrap"><div className="section-heading experience-heading reveal"><div><span className="eyebrow">03 / THE PATH SO FAR</span><h2 id="experience-heading">Built in<br /><em>practice.</em></h2></div><p>Technical work, operational responsibility, and a habit of learning by doing.</p></div><div className="experience-list">{personalInfo.experience.map((item, index) => <article className="experience-row reveal" key={item.organization}><span className="experience-index">0{index + 1}</span><div><h3>{item.role}</h3><span className="experience-org">{item.organization}</span></div><p>{item.description[0]}</p><span className="experience-period">{item.period}</span></article>)}</div></div></section>

        <section id="about" className="about-section section-pad" aria-labelledby="about-heading"><div className="wide-wrap about-grid"><div className="about-lead reveal"><span className="eyebrow">04 / BEYOND THE BUILD</span><h2 id="about-heading">A broader<br /><em>point of view.</em></h2><p>Software is never just code. It&apos;s the people using it, the system it lives in, and the decisions that shape both.</p><a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-arrow">More about my path <ArrowUpRight size={18} /></a></div><div className="about-stack reveal"><div className="about-item"><span>01 / RIGHT NOW</span><h3>Learning out loud.</h3><p>{personalInfo.now.building}</p></div><div className="about-item"><span>02 / FOUNDATION</span><h3>Systems first.</h3><p>{personalInfo.education[0].degreeOrHonor} at {personalInfo.education[0].institution}. {personalInfo.education[0].timeline}.</p></div><div className="about-item"><span>03 / OFF SCREEN</span><h3>More than a keyboard.</h3><p>Soccer, music, team sports, and the operational lessons that come from working with people in the real world.</p></div></div></div></section>

        <section id="stack" className="capabilities-section" aria-label="Technical capabilities"><div className="wide-wrap"><span className="eyebrow">THE TOOLKIT / ALWAYS EVOLVING</span><div className="capability-list">{["C++", "TypeScript", "React", "Next.js", "Active Directory", "PowerShell", "Applied AI"].map((skill) => <span key={skill}>{skill}</span>)}</div></div></section>

        <section id="contact" className="contact-section section-pad" aria-labelledby="contact-heading"><div className="wide-wrap contact-grid"><div className="reveal"><span className="eyebrow">05 / LET&apos;S CONNECT</span><h2 id="contact-heading">Have a good<br /><em>problem?</em></h2><p>Tell me what you&apos;re building, where you&apos;re stuck, or what you think we could make better together.</p><a className="contact-email" href={`mailto:${personalInfo.socialLinks.email}`}>{personalInfo.socialLinks.email} <ArrowUpRight size={24} /></a></div><div className="contact-actions reveal"><div className="contact-orbit" aria-hidden="true"><span>LET&apos;S MAKE IT REAL</span><ArrowUpRight size={42} /></div><button type="button" onClick={copyEmail}>{copied ? <Check size={18} /> : <Copy size={18} />}{copied ? "Email copied" : "Copy email address"}</button><a href={personalInfo.socialLinks.calendar} target="_blank" rel="noopener noreferrer"><CalendarDays size={18} /> Schedule a conversation <ArrowUpRight size={16} /></a></div></div></section>
      </main>

      <footer className="site-footer"><div className="wide-wrap footer-grid"><a href="#top" className="footer-brand">MJ<span>↗</span></a><p>Made with care and curiosity.<br />© {new Date().getFullYear()} Moges Johnson.</p><div className="footer-links"><a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer"><GitBranch size={16} /> GitHub</a><a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} /> LinkedIn</a><a href={`mailto:${personalInfo.socialLinks.email}`}><Mail size={16} /> Email</a></div><a href="#top" className="back-top">Back to top ↑</a></div></footer>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} onOpenResume={() => setResumeOpen(true)} />
    </div>
  );
}
