import { personalInfo } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="mt-12 pt-8 pb-16 border-t border-slate-200/80 dark:border-slate-800/80 font-mono text-xs text-slate-500 dark:text-slate-400">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="font-medium text-slate-700 dark:text-slate-300">
          &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>

        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Built with Next.js 16, TypeScript, &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
