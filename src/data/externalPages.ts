export const externalPages = [
  {
    id: "projects-page",
    label: "Projects",
    href: "/projects",
    command: "Open Projects",
    keywords: "projects repositories",
    prototype: false,
  },
  {
    id: "now",
    label: "Now",
    href: "/now",
    command: "Open Now",
    keywords: "now status current work",
    prototype: false,
  },
  {
    id: "shadow-army",
    label: "Shadow Army",
    href: "/shadow-army",
    command: "Open Shadow Army",
    keywords: "shadow army claude session script",
    prototype: true,
  },
  {
    id: "agent-protocol",
    label: "Protocol",
    href: "/agent-protocol",
    command: "Open the agent protocol",
    keywords: "protocol agent spec monarch claude",
    prototype: true,
  },
] as const;
