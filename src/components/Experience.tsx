import { personalInfo } from "@/data/portfolio";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="pt-12 pb-6 border-t border-slate-200/80 dark:border-slate-800/80">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 font-semibold">
            02 // Work Experience &amp; Leadership
          </h2>
          <p className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">
            Professional Experience
          </p>
        </div>

        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          operations &bull; systems integration &bull; leadership
        </span>
      </div>

      {/* Experience Cards */}
      <div className="space-y-4">
        {personalInfo.experience.map((item) => (
          <article
            key={item.organization + item.period}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {item.role}
                  </h3>
                  <span className="font-mono text-[11px] font-semibold text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-900/60 px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/40">
                    {item.type}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                  {item.organization}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-slate-400" />
                  <span>{item.period}</span>
                </span>
                <span>&bull;</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-slate-400" />
                  <span>{item.location}</span>
                </span>
              </div>
            </div>

            {/* Bullet Points */}
            <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.description.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Skill / Technology Tags */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5 font-mono text-[11px]">
              {item.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
