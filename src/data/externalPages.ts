/**
 * Pages that leave the homepage. `kind: "project"` marks a single project's
 * detail page: it is listed in the mobile menu, the /projects menu and the
 * command palette, and reached from its card in the work section, but it stays
 * out of the desktop header so that bar does not overflow. `menuLabel`, when set,
 * is the shorter name the big mobile menus show so it fits on one line at 390px.
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
    id: "now",
    label: "Now",
    href: "/now",
    command: "Open Now",
    keywords: "now status current work",
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
  {
    id: "trace-workbench",
    label: "TRACE Workbench",
    menuLabel: "TRACE",
    href: "/trace-workbench",
    command: "Open TRACE Workbench",
    keywords: "trace workbench ai agents computer use reverse engineer windows codex claude code grok build gemini cli mcp",
    kind: "project",
  },
] as const;

/**
 * Single project and prototype pages, in the order the "Next project" link in
 * their footer cycles through (the last one wraps to the first). /projects,
 * the listing, is the "All projects" link instead.
 */
export const detailPages = externalPages.filter((page) => page.kind !== "page");

/** The name a page shows in the large mobile menus. */
export function menuLabel(page: (typeof externalPages)[number]): string {
  return "menuLabel" in page ? page.menuLabel : page.label;
}
