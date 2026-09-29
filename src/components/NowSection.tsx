"use client";

import { useState, useEffect } from "react";
import { personalInfo } from "@/data/portfolio";
import { Clock, GraduationCap, Trophy, Music, HeartHandshake, BookOpen, Wrench, CheckCircle2 } from "lucide-react";

export default function NowSection() {
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "America/New_York",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now);
        setLocalTime(formatted);
      } catch {
        setLocalTime("10:55 AM EDT");
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="now" className="pt-12 pb-6 border-t border-slate-200/80 dark:border-slate-800/80 font-sans">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6">
        <div>
          <h2 className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 font-semibold">
            05 // Pulse &amp; Context
          </h2>
          <p className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">
            Now &amp; Beyond Code
          </p>
        </div>

        {/* Live Clock Badge (30% Slate Structure + 10% Amber Pulse) */}
        <div
          aria-hidden="true"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/60 px-3 py-1.5 text-xs font-mono text-slate-700 dark:text-slate-300 self-start sm:self-auto shadow-sm"
        >
          <Clock className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
          <span className="text-slate-500 dark:text-slate-400">New York (EST):</span>
          <span className="text-slate-900 dark:text-slate-100 tabular-nums font-bold">
            {localTime || "10:55 AM EDT"}
          </span>
        </div>
      </div>

      {/* The "Now" Grid */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 space-y-4 text-xs font-mono shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <span className="text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px]">
            Active Status (Fall 2026)
          </span>
          <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            live pulse
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300">
          <div className="space-y-1">
            <span className="text-sky-700 dark:text-sky-400 font-semibold block uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <Wrench className="h-3 w-3 text-sky-600 dark:text-sky-400" /> Currently Building
            </span>
            <p className="font-sans text-sm text-slate-800 dark:text-slate-200 leading-normal">
              {personalInfo.now.building}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-sky-700 dark:text-sky-400 font-semibold block uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <BookOpen className="h-3 w-3 text-sky-600 dark:text-sky-400" /> Currently Reading &amp; Researching
            </span>
            <p className="font-sans text-sm text-slate-800 dark:text-slate-200 leading-normal">
              {personalInfo.now.reading}
            </p>
          </div>
        </div>
      </div>

      {/* Education & Academic Rigor */}
      <div className="mt-8 space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-semibold">
          <GraduationCap className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
          <span>Academic Foundation</span>
        </h3>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 space-y-3 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {personalInfo.education[0]?.institution}
            </h4>
            <span className="font-mono text-xs text-sky-700 dark:text-sky-400 font-semibold">
              {personalInfo.education[0]?.timeline}
            </span>
          </div>

          <p className="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold">
            {personalInfo.education[0]?.degreeOrHonor}
          </p>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {personalInfo.education[0]?.details}
          </p>

          {personalInfo.education[0]?.coursework && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-2 font-semibold">
                KEY COURSEWORK:
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {personalInfo.education[0].coursework.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    <span>{c}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Human Dimension / Beyond Code */}
      <div className="mt-8 space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-semibold">
          <Trophy className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
          <span>Character &amp; Dimensions Outside Code</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {personalInfo.beyondCode.map((item, idx) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4 space-y-1.5 shadow-sm"
            >
              <div className="flex items-center gap-2">
                {idx === 0 && <Trophy className="h-4 w-4 text-amber-500" />}
                {idx === 1 && <HeartHandshake className="h-4 w-4 text-rose-500" />}
                {idx === 2 && <Music className="h-4 w-4 text-sky-500" />}
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {item.label}
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
