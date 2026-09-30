import { personalInfo } from "@/data/portfolio";
import { Calendar, MapPin } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="pt-20 pb-8 border-t border-slate-200/80 dark:border-slate-800/80">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
        <div>
          <h2 className="text-xs font-mono uppercase tracking-wider font-semibold section-eyebrow">
            02 // Work Experience &amp; Leadership
          </h2>
          <p className="mt-2 font-bold text-slate-900 dark:text-slate-100 section-title">
            Professional Experience
          </p>
        </div>

        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          operations &bull; systems integration &bull; leadership
        </span>
      </div>

      {/* Timeline */}
      <ol className="relative space-y-6 sm:pl-8">
        <span
          aria-hidden="true"
          className="hidden sm:block absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-amber-400 via-slate-300 to-transparent dark:via-slate-700"
        />

        {personalInfo.experience.map((item, idx) => (
          <li key={item.organization + item.period} className="relative">
            {/* Timeline node */}
            <span
              aria-hidden="true"
              className={`hidden sm:flex absolute -left-8 top-6 h-[15px] w-[15px] items-center justify-center rounded-full border-2 bg-[var(--background)] ${
                idx === 0 ? "border-amber-400" : "border-slate-300 dark:border-slate-600"
              }`}
            >
              {idx === 0 && <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />}
            </span>

            <article className="card p-5 sm:p-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    {item.role}
                  </h3>
                  <p className="mt-0.5 text-sm font-semibold text-amber-700 dark:text-amber-400">
                    {item.organization}
                  </p>
                </div>

                <div className="flex flex-wrap md:flex-col md:items-end gap-x-3 gap-y-1.5 shrink-0 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-2.5 py-0.5 font-semibold text-slate-700 dark:text-slate-300">
                    <Calendar className="h-3 w-3 text-slate-400" />
                    <span>{item.period}</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-slate-400" />
                    <span>{item.location}</span>
                  </span>
                </div>
              </div>

              <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-wider font-semibold text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-900/60 px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/40">
                {item.type}
              </span>

              {/* Bullet Points */}
              <ul className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.description.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[9px] h-1 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Skill / Technology Tags */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5">
                {item.technologies.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
