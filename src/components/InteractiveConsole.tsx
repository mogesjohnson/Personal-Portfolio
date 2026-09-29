"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, CornerDownLeft } from "lucide-react";
import { personalInfo, projects, skillGroups } from "@/data/portfolio";

interface InteractiveConsoleProps {
  onOpenResume?: () => void;
}

export default function InteractiveConsole({ onOpenResume }: InteractiveConsoleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<Array<{ command: string; output: string | React.ReactNode }>>([
    {
      command: "whoami",
      output: `${personalInfo.name} — ${personalInfo.title} at ${personalInfo.education[0]?.institution}. Status: ${personalInfo.status}`,
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let res: string | React.ReactNode = "";

    switch (trimmed) {
      case "help":
        res = "Available commands: whoami, projects, experience, github, linkedin, resume, stack, now, soccer, contact, clear";
        break;
      case "whoami":
        res = `${personalInfo.name} — ${personalInfo.title} | ${personalInfo.focus} (${personalInfo.location})\nTarget: ${personalInfo.status}\nWork Auth: ${personalInfo.workAuth}`;
        break;
      case "github":
        res = `GitHub Profile: ${personalInfo.socialLinks.github}\nRepositories: Active Directory Lab, C++ Data Structures Suite, Developer Portfolio & Engineering Systems.`;
        break;
      case "linkedin":
        res = `LinkedIn Profile: ${personalInfo.socialLinks.linkedin}\nExperience: Handshake AI Fellow, NonProfitly SWE Intern, Quincy's Lobster Rolls Assistant Manager, Gold Coast Landscaper.`;
        break;
      case "resume":
        if (onOpenResume) {
          onOpenResume();
          res = "Opening interactive Resume / CV modal...";
        } else {
          res = "Resume view ready. Use the 'Resume' button in the navigation or hero to view.";
        }
        break;
      case "projects":
        res = projects.map((p) => `• ${p.title} (${p.category}) — ${p.githubUrl}\n  ${p.summary}`).join("\n\n");
        break;
      case "experience":
        res = personalInfo.experience.map((e) => `• ${e.role} at ${e.organization} (${e.period})\n  Stack: ${e.technologies.join(", ")}`).join("\n\n");
        break;
      case "now":
        res = `Currently building: ${personalInfo.now.building}\nReading: ${personalInfo.now.reading}`;
        break;
      case "stack":
        res = skillGroups.map((g) => `${g.category}:\n  ${g.items.join(", ")}`).join("\n");
        break;
      case "soccer":
        res = `Varsity Soccer Forward & double-overtime playoff game-winner. High-intensity athletics builds the tactical discipline, stamina, and grit required for complex software engineering.`;
        break;
      case "contact":
        res = `Email: ${personalInfo.socialLinks.email} | GitHub: ${personalInfo.socialLinks.github} | LinkedIn: ${personalInfo.socialLinks.linkedin} | Calendar: ${personalInfo.socialLinks.calendar}`;
        break;
      case "clear":
        setHistory([]);
        return;
      case "":
        return;
      default:
        res = `Command not recognized: "${trimmed}". Type "help" for a list of commands.`;
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output: res }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    runCommand(inputVal);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const commands = ["whoami", "projects", "experience", "github", "linkedin", "resume", "stack", "now", "soccer", "contact", "clear"];
      const match = commands.find((c) => c.startsWith(inputVal.toLowerCase().trim()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div className="rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-950 font-mono text-xs overflow-hidden shadow-sm">
      {/* Console Top Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-300">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-sky-400" />
          <span className="text-slate-300 text-[11px] font-medium">terminal // interactive_session (Tab to autocomplete)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-[11px] text-amber-400 hover:text-amber-300 transition-colors font-semibold"
          >
            {isOpen ? "[minimize -]" : "[open console +]"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-3.5 space-y-3 bg-slate-950 text-slate-200">
          {/* Quick command pills */}
          <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-slate-900 text-[11px] text-slate-400">
            <span>Quick:</span>
            {["projects", "whoami", "github", "linkedin", "resume", "experience", "stack", "clear"].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => runCommand(c)}
                className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-amber-400 hover:text-slate-950 text-slate-300 font-medium transition-colors"
              >
                ${c}
              </button>
            ))}
          </div>

          {/* History */}
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {history.map((h, i) => (
              <div key={i} className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="text-amber-400 font-bold">moges@web:~$</span>
                  <span className="text-slate-100">{h.command}</span>
                </div>
                <div className="text-slate-300 whitespace-pre-line pl-4 text-[11px]">
                  {h.output}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Prompt line */}
          <form onSubmit={handleSubmit} className="flex items-center gap-1.5 pt-1">
            <span className="text-amber-400 font-bold">moges@web:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'resume', 'projects', or 'help' (Tab to autocomplete)..."
              className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-500 focus:outline-none text-xs"
            />
            <button
              type="submit"
              className="text-amber-400 hover:text-amber-300 p-1"
              aria-label="Submit command"
            >
              <CornerDownLeft className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
