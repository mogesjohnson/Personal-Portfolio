"use client";

import { useState, useMemo } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp, Copy, Check, FileCode2, Search, Code, Cpu, BarChart2 } from "lucide-react";
import { projects, personalInfo, type Project } from "@/data/portfolio";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTabMap, setActiveTabMap] = useState<Record<string, "flow" | "code" | "metrics">>({
    "active-directory-lab": "code",
    "data-structures-cpp": "code",
    "developer-portfolio": "code",
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

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

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const copyCloneCommand = (project: Project) => {
    const command = `git clone ${project.githubUrl}.git`;
    navigator.clipboard.writeText(command);
    setCopiedId(project.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const copyCodeSnippet = (projectId: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(projectId);
    setTimeout(() => setCopiedCodeId(null), 1800);
  };

  return (
    <section id="projects" className="pt-12 pb-6 border-t border-slate-200/80 dark:border-slate-800/80">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 font-semibold">
            01 // Selected Systems &amp; Projects
          </h2>
          <p className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">
            Case Studies &amp; Verified Software
          </p>
        </div>

        <a
          href={personalInfo.socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors inline-flex items-center gap-1 self-start sm:self-auto font-medium"
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
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-xs font-mono text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 focus:outline-none shadow-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              clear
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 text-xs font-mono" role="tablist">
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
                className={`rounded-md px-3 py-1.5 transition-all focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
                  isActive
                    ? "bg-amber-400 text-slate-950 font-bold shadow-sm shadow-amber-400/20"
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
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-8 text-center text-xs font-mono text-slate-500">
            No projects matched &ldquo;{searchQuery}&rdquo; in category {activeCategory}.
          </div>
        ) : (
          filteredProjects.map((project: Project) => {
            const isExpanded = expandedId === project.id;
            const isCopied = copiedId === project.id;
            const activeTab = activeTabMap[project.id] || "code";

            return (
              <article
                key={project.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {project.title}
                    </h3>
                    <span className="font-mono text-[11px] font-semibold text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-900/60 px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/40">
                      {project.category}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                      {project.year}
                    </span>
                  </div>

                  {/* Direct Action Links */}
                  <div className="flex items-center gap-3 text-xs font-mono pt-1 sm:pt-0">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors inline-flex items-center gap-0.5 font-semibold"
                    >
                      <span>source code</span>
                      <ArrowUpRight className="h-3 w-3 text-slate-400" />
                    </a>

                    <button
                      type="button"
                      onClick={() => copyCloneCommand(project)}
                      className="text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors inline-flex items-center gap-1 pl-2 border-l border-slate-200 dark:border-slate-800 font-medium"
                      title={`git clone ${project.githubUrl}.git`}
                    >
                      {isCopied ? (
                        <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      <span className="text-[11px]">{isCopied ? "copied" : "clone"}</span>
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <p className="mt-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {project.summary}
                </p>

                {/* Metrics Highlights Bar */}
                <div className="mt-3 grid grid-cols-3 gap-2 py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 font-mono text-[11px]">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="truncate">
                      <span className="text-slate-400 block text-[10px] truncate">{m.label}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 truncate">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Stack tags */}
                <div className="mt-3.5 flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Architecture Deep Dive Drawer */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => toggleExpand(project.id)}
                    aria-expanded={isExpanded}
                    className="w-full flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-1 font-semibold"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <FileCode2 className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                      <span>{isExpanded ? "collapse technical artifacts" : "inspect architecture, code & trade-offs"}</span>
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden text-xs">
                      {/* Sub-tabs header */}
                      <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/80 px-3 font-mono text-[11px]">
                        <button
                          type="button"
                          onClick={() => setActiveTabMap({ ...activeTabMap, [project.id]: "code" })}
                          className={`flex items-center gap-1 px-3 py-2 border-b-2 font-medium transition-colors ${
                            activeTab === "code"
                              ? "border-amber-400 text-slate-900 dark:text-amber-300 font-bold"
                              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                          }`}
                        >
                          <Code className="h-3.5 w-3.5" />
                          <span>Code Snippet</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveTabMap({ ...activeTabMap, [project.id]: "flow" })}
                          className={`flex items-center gap-1 px-3 py-2 border-b-2 font-medium transition-colors ${
                            activeTab === "flow"
                              ? "border-amber-400 text-slate-900 dark:text-amber-300 font-bold"
                              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                          }`}
                        >
                          <Cpu className="h-3.5 w-3.5" />
                          <span>Architecture Pipeline</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveTabMap({ ...activeTabMap, [project.id]: "metrics" })}
                          className={`flex items-center gap-1 px-3 py-2 border-b-2 font-medium transition-colors ${
                            activeTab === "metrics"
                              ? "border-amber-400 text-slate-900 dark:text-amber-300 font-bold"
                              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                          }`}
                        >
                          <BarChart2 className="h-3.5 w-3.5" />
                          <span>Problem &amp; Trade-Off</span>
                        </button>
                      </div>

                      {/* Tab Content */}
                      <div className="p-4">
                        {activeTab === "code" && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between font-mono text-[11px] text-slate-500 dark:text-slate-400 pb-1">
                              <span className="font-semibold text-sky-700 dark:text-sky-400">
                                {project.codeArtifact.filename}
                              </span>
                              <button
                                type="button"
                                onClick={() => copyCodeSnippet(project.id, project.codeArtifact.code)}
                                className="inline-flex items-center gap-1 text-slate-500 hover:text-amber-500 transition-colors"
                              >
                                {copiedCodeId === project.id ? (
                                  <Check className="h-3 w-3 text-emerald-500" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                                <span>{copiedCodeId === project.id ? "Copied" : "Copy Code"}</span>
                              </button>
                            </div>
                            <pre className="rounded-md bg-slate-900 text-slate-200 p-3 overflow-x-auto font-mono text-[11px] leading-relaxed border border-slate-800">
                              <code>{project.codeArtifact.code}</code>
                            </pre>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed pt-1">
                              <strong className="text-slate-800 dark:text-slate-200 font-semibold">Implementation Note: </strong>
                              {project.codeArtifact.explanation}
                            </p>
                          </div>
                        )}

                        {activeTab === "flow" && (
                          <div className="space-y-3">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                              System Data Flow &amp; Protocol Boundary
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {project.architectureFlow.map((node) => (
                                <div
                                  key={node.step}
                                  className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3 space-y-1"
                                >
                                  <div className="flex items-center justify-between font-mono text-[10px]">
                                    <span className="text-amber-600 dark:text-amber-400 font-bold">{node.step}</span>
                                    <span className="text-sky-700 dark:text-sky-400 font-semibold">{node.tech}</span>
                                  </div>
                                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                                    {node.label}
                                  </h4>
                                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                                    {node.detail}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeTab === "metrics" && (
                          <div className="space-y-3 font-sans">
                            <div>
                              <span className="font-mono text-sky-700 dark:text-sky-400 block uppercase tracking-wider text-[10px] mb-1 font-bold">
                                Problem Statement
                              </span>
                              <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">{project.problem}</p>
                            </div>

                            <div>
                              <span className="font-mono text-sky-700 dark:text-sky-400 block uppercase tracking-wider text-[10px] mb-1 font-bold">
                                System Architecture
                              </span>
                              <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">{project.architecture}</p>
                            </div>

                            <div>
                              <span className="font-mono text-amber-700 dark:text-amber-400 block uppercase tracking-wider text-[10px] mb-1 font-bold">
                                Engineering Trade-Off
                              </span>
                              <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">{project.tradeoff}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
