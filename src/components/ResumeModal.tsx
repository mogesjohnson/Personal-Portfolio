"use client";

import { useEffect, useState } from "react";
import { X, Printer, Copy, Check, GraduationCap, Briefcase, Code, Award, Phone, Mail, MapPin } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textResume = `
MOGES JOHNSON
Ocean City, NJ | 609-600-7383 | mgjohnson9@liberty.edu | github.com/mogesjohnson | linkedin.com/in/mogesjohnson

EDUCATION
Liberty University | Lynchburg, VA
Bachelor of Science in Computer Science: Software Engineering | Minor in Business
Expected Graduation: Spring 2028
Notable Coursework: Data Structures & Algorithms, Software Engineering, Business Data Communication Systems, Computer Architecture, Discrete Mathematics, Organizational Behavior & Management, Technical Communication.

TECHNICAL SKILLS
Programming Languages: C++, TypeScript, JavaScript, SQL, HTML5/CSS3
Operating Systems: Windows 11, Linux (Ubuntu), Windows Server 2022
Developer Tools & Systems: VS Code, Git & GitHub, Active Directory, Group Policy Management, Windows Server 2022, React, Next.js

WORK EXPERIENCE
Handshake | Handshake AI Fellow (Remote)
Aug 2026 – Present
• Selected for applied AI fellowship exploring emerging developer tooling, LLM workflows, and modern software engineering practices.
• Collaborated on technical problem solving, evaluation metrics, and integrating AI capabilities into student-employer workflows.

NonProfitly, Inc. | Software Engineer Intern (Harrisonburg, VA)
May 2026 – Aug 2026
• Engineered software features supporting non-profit operational workflows and community outreach tools.
• Utilized Git for feature branching, code reviews, and version control across team repositories.
• Applied structured problem solving to resolve application bugs, refine user-facing workflows, and enhance system stability.

Quincy's Original Lobster Rolls | Assistant Manager (Ocean County, NJ)
May 2024 – Aug 2024 & Jun 2023 – Aug 2023
• Coordination & Scheduling: Assisted the General Manager in developing weekly shift schedules for employees to ensure optimal coverage during peak hours.
• Personnel Training: Mentored and trained new hires on standard operating procedures, POS systems, and the TapMango rewards platform.
• Inventory Management: Monitored stock levels and managed inventory tracking to procure essential supplies and prevent shortages.
• Systems Integration: Leveraged online ordering and loyalty data to assist the management team in improving customer engagement and workflow efficiency.
• Customer Service: Managed register operations and food preparation in a high-volume boardwalk environment.

Gold Coast Landscape & Irrigation | Landscaper (Ocean County, NJ)
Jun 2022 – Sep 2022
• Maintained commercial and residential outdoor spaces through heavy manual labor, equipment operation, and landscaping care during the summer season.

TECHNICAL PROJECTS
Active Directory & Systems Administration Lab (Team Project)
Tools: Windows Server 2022, Active Directory, Group Policy Management
• Collaborated with a team of two to configure a Windows 2022 Server environment, managing centralized network resources and security.
• Designed and implemented an Organizational Unit (OU) structure for efficient user and group management.
• Coordinated with team members to ensure consistent policy application via Group Policy Management.

Data Structures and Algorithms Coursework
Tools: C++, AVL Trees, Splay Trees, Graphs, Big-O Analysis
• Developed solutions focusing on efficient data storage and retrieval using complex tree structures and graph theory.
• Applied Big-O Analysis to optimize code performance and algorithmic efficiency.

AI Development: Developer Portfolio & Engineering Systems
Tools: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Turbopack, GitHub, LinkedIn
• Designed and engineered a centralized developer platform connecting verified technical projects, authentic personal background ('who I am'), GitHub repositories, and LinkedIn experience into a unified, high-performance web system.
• Built an interactive command palette (Cmd+K), project case notes, and a printable resume view with no third-party UI framework.

ACTIVITIES & ATHLETICS
Liberty University Intramural Sports
• Maintained a full-time academic course load while consistently participating in team-based intramural sports, demonstrating time management and collaborative skills.
    `.trim();

    navigator.clipboard.writeText(textResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Resume of Moges Johnson"
      data-lenis-prevent
      className="resume-dialog fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
    >
      <div
        className="resume-panel relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar */}
        <div className="resume-toolbar flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="font-bold text-slate-800 dark:text-slate-200">Moges Johnson / Résumé</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
              title="Copy raw text resume"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Copy Text"}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md btn-primary text-slate-950 font-bold transition-colors shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md transition-colors"
              aria-label="Close resume modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content (Formatted matching Moges' uploaded document) */}
        <div className="resume-content flex-1 overflow-y-auto p-6 sm:p-10 font-sans text-slate-800 dark:text-slate-200 print:p-0 print:text-black">
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5 mb-6 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50 uppercase">
              {personalInfo.name}
            </h1>

            <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {personalInfo.location}
              </span>
              <span>|</span>
              <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1 hover:underline text-slate-900 dark:text-slate-200 font-medium">
                <Phone className="h-3 w-3" />
                {personalInfo.phone}
              </a>
              <span>|</span>
              <a href={`mailto:${personalInfo.socialLinks.email}`} className="flex items-center gap-1 hover:underline text-slate-900 dark:text-slate-200 font-medium">
                <Mail className="h-3 w-3" />
                {personalInfo.socialLinks.email}
              </a>
              <span>|</span>
              <a href={personalInfo.socialLinks.github} target="_blank" rel="noreferrer" className="hover:underline text-slate-900 dark:text-slate-200 font-medium">
                github.com/mogesjohnson
              </a>
              <span>|</span>
              <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:underline text-slate-900 dark:text-slate-200 font-medium">
                linkedin.com/in/mogesjohnson
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 font-bold border-b border-slate-200 dark:border-slate-800 pb-1 mb-2.5 flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Education</span>
            </h2>

            <div className="space-y-1 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-sm">
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {personalInfo.education[0]?.institution} &bull; {personalInfo.education[0]?.location}
                </span>
                <span className="font-mono text-xs text-slate-500 font-medium">
                  {personalInfo.education[0]?.timeline}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {personalInfo.education[0]?.degreeOrHonor}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                <strong className="text-slate-800 dark:text-slate-200">Notable Coursework: </strong>
                {personalInfo.education[0]?.coursework.join(", ")}.
              </p>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="mb-6">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 font-bold border-b border-slate-200 dark:border-slate-800 pb-1 mb-2.5 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5" />
              <span>Technical Skills</span>
            </h2>

            <div className="space-y-1 text-xs leading-relaxed">
              <p>
                <strong className="text-slate-800 dark:text-slate-200">Programming Languages: </strong>
                <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300">C++, TypeScript, JavaScript, SQL, HTML5 &amp; CSS3</span>
              </p>
              <p>
                <strong className="text-slate-800 dark:text-slate-200">Operating Systems: </strong>
                <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300">Windows 11, Linux (Ubuntu), Windows Server 2022</span>
              </p>
              <p>
                <strong className="text-slate-800 dark:text-slate-200">Developer Tools &amp; Administration: </strong>
                <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300">VS Code, Git &amp; GitHub, Active Directory, Group Policy Management, Windows Server 2022, Next.js, React</span>
              </p>
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-6">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 font-bold border-b border-slate-200 dark:border-slate-800 pb-1 mb-2.5 flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5" />
              <span>Work Experience</span>
            </h2>

            <div className="space-y-4 text-xs">
              {/* Handshake AI Fellowship */}
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-sm">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100">Handshake</span>
                    <span className="text-slate-600 dark:text-slate-400 font-medium"> &bull; Handshake AI Fellow</span>
                  </div>
                  <span className="font-mono text-xs text-slate-500">Aug 2026 – Present &bull; Remote</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-slate-600 dark:text-slate-300 leading-relaxed pt-0.5">
                  <li>Selected for applied AI fellowship exploring emerging developer tooling, LLM workflows, and modern software engineering practices.</li>
                  <li>Collaborated on technical problem solving, evaluation metrics, and integrating AI capabilities into student-employer workflows.</li>
                </ul>
              </div>

              {/* NonProfitly, Inc. */}
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-sm">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100">NonProfitly, Inc.</span>
                    <span className="text-slate-600 dark:text-slate-400 font-medium"> &bull; Software Engineer Intern</span>
                  </div>
                  <span className="font-mono text-xs text-slate-500">May 2026 – Aug 2026 &bull; Harrisonburg, VA</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-slate-600 dark:text-slate-300 leading-relaxed pt-0.5">
                  <li>Engineered software features supporting non-profit operational workflows and community outreach tools.</li>
                  <li>Utilized Git for feature branching, code reviews, and version control across team repositories.</li>
                  <li>Applied structured problem solving to resolve application bugs, refine user-facing workflows, and enhance system stability.</li>
                </ul>
              </div>

              {/* Quincy's Lobster Rolls */}
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-sm">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100">Quincy&apos;s Original Lobster Rolls</span>
                    <span className="text-slate-600 dark:text-slate-400 font-medium"> &bull; Assistant Manager</span>
                  </div>
                  <span className="font-mono text-xs text-slate-500">May 2024 – Aug 2024 &amp; Jun 2023 – Aug 2023 &bull; Ocean County, NJ</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-slate-600 dark:text-slate-300 leading-relaxed pt-0.5">
                  <li><strong>Coordination &amp; Scheduling:</strong> Assisted the General Manager in developing weekly shift schedules for employees to ensure optimal coverage during peak hours.</li>
                  <li><strong>Personnel Training:</strong> Mentored and trained new hires on standard operating procedures, POS systems, and the TapMango rewards platform.</li>
                  <li><strong>Inventory Management:</strong> Monitored stock levels and managed inventory tracking to procure essential supplies and prevent shortages.</li>
                  <li><strong>Systems Integration:</strong> Leveraged online ordering and loyalty data to assist the management team in improving customer engagement and workflow efficiency.</li>
                  <li><strong>Customer Service:</strong> Managed register operations and food preparation in a high-volume environment.</li>
                </ul>
              </div>

              {/* Landscaping Services */}
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-sm">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100">Gold Coast Landscape &amp; Irrigation</span>
                    <span className="text-slate-600 dark:text-slate-400 font-medium"> &bull; Landscaper</span>
                  </div>
                  <span className="font-mono text-xs text-slate-500">Jun 2022 – Sep 2022 &bull; Ocean County, NJ</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-slate-600 dark:text-slate-300 leading-relaxed pt-0.5">
                  <li>Maintained commercial and residential outdoor spaces through manual labor and equipment operation during the summer season.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Projects */}
          <div className="mb-6">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 font-bold border-b border-slate-200 dark:border-slate-800 pb-1 mb-2.5 flex items-center gap-1.5">
              <Code className="h-3.5 w-3.5" />
              <span>Technical Projects</span>
            </h2>

            <div className="space-y-4 text-xs">
              {/* Project 1: Active Directory */}
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-sm">
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Active Directory &amp; Systems Administration Lab (Team Project)
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">2024</span>
                </div>
                <p className="font-mono text-[11px] text-sky-700 dark:text-sky-400 font-medium">
                  Tools: Windows Server 2022, Active Directory, Group Policy Management
                </p>
                <ul className="list-disc list-outside pl-4 space-y-1 text-slate-600 dark:text-slate-300 leading-relaxed pt-0.5">
                  <li>Collaborated with a team of two to configure a Windows 2022 Server environment, managing centralized network resources and security.</li>
                  <li>Designed and implemented an Organizational Unit (OU) structure for efficient user and group management.</li>
                  <li>Coordinated with team members to ensure consistent policy application via Group Policy Management.</li>
                </ul>
              </div>

              {/* Project 2: Data Structures C++ */}
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-sm">
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Data Structures and Algorithms Coursework
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">2024</span>
                </div>
                <p className="font-mono text-[11px] text-sky-700 dark:text-sky-400 font-medium">
                  Tools: C++, AVL Trees, Splay Trees, Graphs, Big-O Analysis
                </p>
                <ul className="list-disc list-outside pl-4 space-y-1 text-slate-600 dark:text-slate-300 leading-relaxed pt-0.5">
                  <li>Developed solutions focusing on efficient data storage and retrieval using complex tree structures and graph theory.</li>
                  <li>Applied Big-O Analysis to optimize code performance and algorithmic efficiency.</li>
                </ul>
              </div>

              {/* Project 3: AI Development: Developer Portfolio & Systems */}
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-sm">
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    AI Development: Developer Portfolio &amp; Engineering Systems
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">2026</span>
                </div>
                <p className="font-mono text-[11px] text-sky-700 dark:text-sky-400 font-medium">
                  Tools: Next.js 16, React 19, TypeScript, Tailwind CSS v4, GitHub, LinkedIn
                </p>
                <ul className="list-disc list-outside pl-4 space-y-1 text-slate-600 dark:text-slate-300 leading-relaxed pt-0.5">
                  <li>Designed and engineered a centralized developer platform connecting verified technical projects, authentic personal background (&apos;who I am&apos;), GitHub repositories, and LinkedIn experience.</li>
                  <li>Built an interactive command palette (Cmd+K), project case notes, and a printable resume view with no third-party UI framework.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Activities */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 font-bold border-b border-slate-200 dark:border-slate-800 pb-1 mb-2.5 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5" />
              <span>Activities &amp; Leadership</span>
            </h2>

            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                <strong className="text-slate-800 dark:text-slate-200">Liberty University Intramural Sports: </strong>
                Maintained a full-time academic course load while consistently participating in team-based intramural sports, demonstrating time management and collaborative skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
