import { personalInfo } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="pt-20 pb-6 border-t border-slate-200/80 dark:border-slate-800/80">
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="text-xs uppercase tracking-wider font-semibold section-eyebrow">
          03 // Engineering Philosophy &amp; Background
        </h2>
        <p className="mt-2 font-bold text-slate-900 dark:text-slate-100 section-title">
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
            className="card card-accent p-5"
          >
            <span className="icon-tile text-xs font-bold mb-3">
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
