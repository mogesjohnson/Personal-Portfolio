import { skillGroups } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="stack" className="pt-12 pb-6 border-t border-slate-200/80 dark:border-slate-800/80">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 font-semibold">
          04 // Core Competencies &amp; Technical Stack
        </h2>
        <p className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">
          Production Weapons
        </p>
      </div>

      {/* Grid of Domains */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 shadow-sm"
          >
            <h3 className="font-mono text-xs text-sky-800 dark:text-sky-300 mb-3.5 uppercase tracking-wider font-bold">
              {group.category}
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1 font-mono text-[11px] text-slate-700 dark:text-slate-200 transition-colors hover:border-amber-400 dark:hover:border-amber-400 hover:text-slate-950 dark:hover:text-white font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
