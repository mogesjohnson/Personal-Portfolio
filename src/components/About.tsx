import { personalInfo } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="pt-12 pb-6 border-t border-slate-200/80 dark:border-slate-800/80">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 font-semibold">
          03 // Engineering Philosophy &amp; Background
        </h2>
        <p className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">
          How I Build Software
        </p>
      </div>

      {/* Narrative (30% Secondary Typography) */}
      <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
        {personalInfo.bio.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* Core Principles */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {personalInfo.principles.map((item, index) => (
          <div
            key={item.title}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4 shadow-sm"
          >
            <span className="font-mono text-amber-600 dark:text-amber-400 text-xs font-bold block mb-1.5">
              0{index + 1}
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {item.title}
            </h3>
            <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
