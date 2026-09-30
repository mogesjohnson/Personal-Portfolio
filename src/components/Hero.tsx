import { personalInfo } from "@/data/portfolio";
import { Server, Binary, Sparkles, ArrowDownRight, MapPin, GraduationCap, FileText, Calendar, CheckCircle2, Phone, Mail } from "lucide-react";


interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  return (
    <section className="relative pt-12 pb-4">
      <div className="hero-orb -top-10 -left-24 h-72 w-72 bg-[radial-gradient(closest-side,rgba(245,158,11,0.22),transparent)] dark:bg-[radial-gradient(closest-side,rgba(251,191,36,0.10),transparent)]" aria-hidden="true" />
      <div className="hero-orb top-10 right-0 h-64 w-64 bg-[radial-gradient(closest-side,rgba(14,165,233,0.18),transparent)] dark:bg-[radial-gradient(closest-side,rgba(14,165,233,0.10),transparent)]" aria-hidden="true" />

      {/* Availability Status & University Badge */}
      <div className="rise flex flex-wrap items-center justify-between gap-3 mb-8 text-xs " style={{ "--i": 0 } as React.CSSProperties}>
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 text-amber-900 dark:text-amber-300 font-medium">
          <span className="h-2 w-2 rounded-full bg-amber-500 inline-block animate-pulse" />
          <span>{personalInfo.status}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-[11px]">
          <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
            <GraduationCap className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
            <span>Liberty University &bull; Class of 2028</span>
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <span>{personalInfo.location}</span>
          </span>
        </div>
      </div>

      {/* Main Identity with Avatar Frame */}
      <div className="rise flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-6" style={{ "--i": 1 } as React.CSSProperties}>
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-gradient leading-[1.05] pb-1">
            {personalInfo.name}
          </h1>
          <p className="text-base sm:text-xl font-semibold text-slate-700 dark:text-slate-300">
            {personalInfo.title} <span className="text-slate-400 dark:text-slate-600 font-normal">/</span>{" "}
            <span className="text-sky-700 dark:text-sky-300 font-medium">{personalInfo.focus}</span>
          </p>
        </div>

        {/* Tactile Monogram Avatar with 10% Sunny Amber Accent Ring */}
        <div className="relative flex h-20 w-20 sm:h-28 sm:w-28 shrink-0 items-center justify-center rounded-2xl border border-amber-300/60 dark:border-amber-400/30 bg-gradient-to-br from-white to-amber-50 dark:from-slate-900 dark:to-slate-800 shadow-xl shadow-amber-500/10 ring-4 ring-amber-400/10">
          <span className="text-2xl sm:text-4xl font-black tracking-tighter text-slate-900 dark:text-slate-100">
            MJ
          </span>
          <span
            className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white dark:border-slate-950 bg-amber-400 shadow-sm"
            title="Active"
          />
        </div>
      </div>

      {/* Recruiter Quick-Facts Bar */}
      <div className="rise mt-5 flex flex-wrap gap-2 text-[11px] " style={{ "--i": 2 } as React.CSSProperties}>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-semibold">
          <CheckCircle2 className="h-3 w-3" />
          <span>{personalInfo.workAuth}</span>
        </span>
        <span className="px-2.5 py-1 rounded-md bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-900/60 font-medium">
          BS in CS: Software Engineering (Minor in Business)
        </span>
        <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium">
          Expected Spring 2028
        </span>
        <a
          href={`tel:${personalInfo.phone}`}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium hover:text-amber-500 transition-colors"
        >
          <Phone className="h-3 w-3" />
          <span>{personalInfo.phone}</span>
        </a>
      </div>

      {/* Direct Mission Narrative */}
      <div className="rise mt-6 space-y-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl" style={{ "--i": 3 } as React.CSSProperties}>
        <p>
          I am a Computer Science student at <strong className="text-slate-900 dark:text-slate-100 font-semibold">Liberty University</strong> pursuing a B.S. in Computer Science with a Software Engineering concentration and a Minor in Business (Expected Spring 2028). Currently, I am a <strong className="text-slate-900 dark:text-slate-100 font-semibold">Handshake AI Fellow</strong>.
        </p>
        <p>
          My technical focus spans <span className="text-sky-700 dark:text-sky-300 font-medium">applied AI engineering &amp; LLM workflows</span>, practical software development from my internship at <span className="text-sky-700 dark:text-sky-300 font-medium">NonProfitly, Inc.</span>, enterprise systems administration on <span className="text-sky-700 dark:text-sky-300 font-medium">Windows Server 2022 (Active Directory &amp; GPO)</span>, and low-level data structures in <span className="text-sky-700 dark:text-sky-300 font-medium">C++</span>.
        </p>
      </div>

      {/* Primary Action Points: Dual CTAs (Resume + Work) */}
      <div className="rise mt-8 flex flex-wrap items-center gap-3 text-xs " style={{ "--i": 4 } as React.CSSProperties}>
        {/* P0 Action: View / Download Resume (10% Sunny Amber Accent) */}
        <button
          type="button"
          onClick={onOpenResume}
          className="inline-flex items-center gap-1.5 rounded-lg btn-primary text-slate-950 font-bold px-4 py-2.5 shadow-sm hover:shadow-amber-400/25 transition-all active:scale-[0.98]"
        >
          <FileText className="h-4 w-4" />
          <span>View Resume / CV</span>
        </button>

        {/* Secondary Action: Jump to Projects */}
        <a
          href="#projects"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 px-4 py-2.5 text-slate-800 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 font-semibold transition-colors"
        >
          <span>Inspect Systems &amp; Labs</span>
          <ArrowDownRight className="h-3.5 w-3.5 text-slate-400" />
        </a>

        {/* Schedule Chat */}
        <a
          href={personalInfo.socialLinks.calendar}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 px-3.5 py-2.5 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors"
        >
          <Calendar className="h-3.5 w-3.5 text-amber-500" />
          <span>Schedule Chat ↗</span>
        </a>

        {/* Email link */}
        <a
          href={`mailto:${personalInfo.socialLinks.email}`}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 px-3.5 py-2.5 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-medium transition-colors"
        >
          <Mail className="h-3.5 w-3.5 text-slate-400" />
          <span>{personalInfo.socialLinks.email}</span>
        </a>
      </div>



      {/* Architectural Pillars / Focus */}
      <div className="rise mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 text-xs" style={{ "--i": 5 } as React.CSSProperties}>
        <div className="p-4 card card-sm card-accent">
          <Server className="h-4 w-4 text-amber-600 dark:text-amber-400 mb-2.5" />
          <span className="text-sky-600 dark:text-sky-400 block text-[11px] mb-1 font-semibold">01 // SYSTEMS &amp; INFRA</span>
          <p className="text-slate-900 dark:text-slate-100 font-semibold">Windows Server 2022</p>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1">Active Directory &amp; Group Policy (GPO)</p>
        </div>

        <div className="p-4 card card-sm card-accent">
          <Binary className="h-4 w-4 text-amber-600 dark:text-amber-400 mb-2.5" />
          <span className="text-sky-600 dark:text-sky-400 block text-[11px] mb-1 font-semibold">02 // ALGORITHMS &amp; C++</span>
          <p className="text-slate-900 dark:text-slate-100 font-semibold">Modern C++ (AVL &amp; Splay)</p>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1">Graph theory &amp; Big-O optimization</p>
        </div>

        <div className="p-4 card card-sm card-accent">
          <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400 mb-2.5" />
          <span className="text-sky-600 dark:text-sky-400 block text-[11px] mb-1 font-semibold">03 // APPLIED AI &amp; WEB</span>
          <p className="text-slate-900 dark:text-slate-100 font-semibold">Handshake AI &amp; Web Systems</p>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1">LLM workflows, React 19 &amp; Next.js</p>
        </div>
      </div>
    </section>
  );
}
