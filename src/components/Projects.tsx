"use client";

import { useState, useMemo } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { projects, personalInfo, type Project } from "@/data/portfolio";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...cats];
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === "All" || project.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesQuery =
        project.title.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.problem.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="projects" className="pt-20 pb-6 border-t border-slate-200/80 dark:border-slate-800/80">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 mb-10">
        <div>
          <h2 className="text-xs uppercase tracking-wider font-semibold section-eyebrow">
            01 // Selected Systems &amp; Projects
          </h2>
          <p className="mt-2 font-bold text-slate-900 dark:text-slate-100 section-title">
            Case Studies &amp; Verified Software
          </p>
        </div>

        <a
          href={personalInfo.socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors inline-flex items-center gap-1 self-start sm:self-auto font-medium"
        >
          <span>all repositories on github</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
        </a>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-3 mb-6">
        {/* Real-time search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, technologies (e.g. C++, Windows Server, Active Directory, GPO, Next.js)..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 focus:outline-none shadow-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              clear
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 text-xs " role="tablist">
          {categories.map((cat) => {
            const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 transition-all focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
                  isActive
                    ? "btn-primary text-slate-950 font-bold shadow-sm shadow-amber-400/20"
                    : "bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 border border-slate-300 dark:border-slate-800 shadow-sm"
                }`}
              >
                {cat} <span className={isActive ? "opacity-75" : "text-slate-400"}>[{count}]</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-5">
        {filteredProjects.length === 0 ? (
          <div className="card p-8 text-center text-xs text-slate-500">
            No projects matched &ldquo;{searchQuery}&rdquo; in category {activeCategory}.
          </div>
        ) : (
          filteredProjects.map((project: Project) => {
            return (
              <article
                key={project.id}
                className="card card-accent p-5 sm:p-6"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                      {project.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-900/60 px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/40">
                      {project.category}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                      {project.year}
                    </span>
                  </div>

                  {/* Direct Action Links */}
                  <div className="flex shrink-0 items-center gap-3 text-xs pt-1 sm:pt-0 whitespace-nowrap">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors inline-flex items-center gap-0.5 font-semibold"
                    >
                      <span>source code</span>
                      <ArrowUpRight className="h-3 w-3 text-slate-400" />
                    </a>

                  </div>
                </div>

                {/* Summary */}
                <p className="mt-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {project.summary}
                </p>

                {/* Metrics Highlights Bar */}
                <div className="mt-4 grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-800 rounded-lg bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-[11px]">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="truncate px-3 py-2.5">
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider truncate">{m.label}</span>
                      <span className="block mt-0.5 font-bold text-[12px] text-slate-900 dark:text-slate-100 truncate">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Stack tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="chip"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
