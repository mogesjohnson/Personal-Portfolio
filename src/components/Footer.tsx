import { personalInfo } from "@/data/portfolio";
import { ArrowUpRight, Mail } from "lucide-react";

export default function Footer() {
  const links = [
    { label: "github", href: personalInfo.socialLinks.github },
    { label: "linkedin", href: personalInfo.socialLinks.linkedin },
  ];

  return (
    <footer className="relative mt-16 pt-10 pb-16 text-xs text-slate-500 dark:text-slate-400">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div className="space-y-1.5">
          <p className="font-medium text-slate-700 dark:text-slate-300">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Built with Next.js 16, TypeScript, &amp; Tailwind CSS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="chip">
              <span>{link.label}</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          ))}
          <a href={`mailto:${personalInfo.socialLinks.email}`} className="chip">
            <Mail className="h-3 w-3" />
            <span>{personalInfo.socialLinks.email}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
