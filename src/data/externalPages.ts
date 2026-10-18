/**
 * Pages that leave the homepage. `kind: "project"` marks a single project's
 * detail page: it is listed in the mobile menu, the /projects menu and the
 * command palette, and reached from its card in the work section, but it stays
 * out of the desktop header so that bar does not overflow.
 */
export const externalPages = [
  {
    id: "projects-page",
    label: "Projects",
    href: "/projects",
    command: "Open Projects",
    keywords: "projects repositories",
    kind: "page",
  },
  {
    id: "shadow-army",
    label: "Shadow Army",
    href: "/shadow-army",
    command: "Open Shadow Army",
    keywords: "shadow army claude session script",
    kind: "prototype",
  },
  {
    id: "agent-protocol",
    label: "Protocol",
    href: "/agent-protocol",
    command: "Open the agent protocol",
    keywords: "protocol agent spec monarch claude",
    kind: "prototype",
  },
  {
    id: "replay-studio",
    label: "REPLAY Studio",
    href: "/replay-studio",
    command: "Open REPLAY Studio",
    keywords: "replay studio windows screen recording demo video editor mp4 callouts privacy mcp",
    kind: "project",
  },
  {
    id: "switchyard",
    label: "Switchyard",
    href: "/switchyard",
    command: "Open Switchyard",
    keywords: "switchyard windows project desk return tickets obsidian tauri rust",
    kind: "project",
  },
] as const;
