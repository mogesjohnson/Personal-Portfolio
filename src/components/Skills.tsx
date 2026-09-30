import { skillGroups } from "@/data/portfolio";
import { Code2, Server, Wrench, Globe } from "lucide-react";

const icons = [Code2, Server, Wrench, Globe];

export default function Skills() {
  return (
    <section id="stack" className="pt-20 pb-6 border-t border-slate-200/80 dark:border-slate-800/80">
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="text-xs font-mono uppercase tracking-wider font-semibold section-eyebrow">
          04 // Core Competencies &amp; Technical Stack
        </h2>
        <p className="mt-2 font-bold text-slate-900 dark:text-slate-100 section-title">
          Production Weapons
        </p>
      </div>

      {/* Grid of Domains */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skillGroups.map((group, idx) => {
          const Icon = icons[idx % icons.length];
          return (
          <div
            key={group.category}
            className="card card-accent p-5 sm:p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="icon-tile">
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="font-mono text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider font-bold">
                {group.category}
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="chip"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          );
        })}
      </div>
    </section>
  );
}
