export interface CodeArtifact {
  title: string;
  language: string;
  filename: string;
  code: string;
  explanation: string;
}

export interface ArchitectureNode {
  step: string;
  label: string;
  tech: string;
  detail: string;
}

export interface Project {
  id: string;
  title: string;
  /** Short label used by the project switcher. */
  shortTitle: string;
  /** Figure code shown on the project diagram. */
  code: string;
  /** Particle formation the live signal field draws for this project. */
  signal: "sys" | "tree" | "orbit" | "reel" | "yard" | "trace";
  category: "Systems & Infrastructure" | "Data Structures & C++" | "AI & Web Systems" | "Windows Desktop Apps" | "AI Agent Tooling";
  year: string;
  summary: string;
  problem: string;
  architecture: string;
  tradeoff: string;
  tags: string[];
  /** Omitted for private repositories, whose GitHub link would not open for a visitor. */
  githubUrl?: string;
  liveUrl?: string;
  /** The project's own page on this site, when it has one. */
  pageUrl?: string;
  codeArtifact: CodeArtifact;
  architectureFlow: ArchitectureNode[];
  metrics: { label: string; value: string }[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  location: string;
  period: string;
  type: "AI & Engineering" | "Software Engineering" | "Operations & Management" | "Labor & Fieldwork";
  description: string[];
  technologies: string[];
}

export interface EducationItem {
  institution: string;
  degreeOrHonor: string;
  location: string;
  timeline: string;
  details: string;
  coursework: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export const personalInfo = {
  name: "Moges Johnson",
  title: "Software Engineering Student & AI Fellow",
  focus: "Systems Administration, C++, & Applied AI Engineering",
  location: "Ocean City, NJ",
  campusLocation: "Lynchburg, VA",
  phone: "609-600-7383",
  status: "Active: Handshake AI Fellow | Seeking SWE Internships (2026/2027)",
  workAuth: "US Citizen / No Sponsorship Required",
  relocation: "Open to Relocation & Remote Roles",

  recruiterQuickFacts: [
    { label: "Current Fellowship", value: "Handshake AI Fellow (Aug 2026 – Present)" },
    { label: "Prior SWE Intern", value: "NonProfitly, Inc. (Summer 2026)" },
    { label: "Education", value: "Liberty University (BS in CS, Minor in Business)" },
    { label: "Graduation", value: "Expected Spring 2028" },
  ],

  education: [
    {
      institution: "Liberty University",
      location: "Lynchburg, VA",
      degreeOrHonor: "Bachelor of Science in Computer Science: Software Engineering (Minor in Business)",
      timeline: "Expected Spring 2028",
      details: "Rigorous academic curriculum bridging computer systems, data structures, and algorithms with business data communication and organizational management.",
      coursework: [
        "Data Structures & Algorithms",
        "Software Engineering",
        "Business Data Communication Systems",
        "Computer Architecture",
        "Discrete Mathematics",
        "Organizational Behavior & Management",
        "Technical Communication",
      ],
    },
  ] as EducationItem[],

  // Verified real LinkedIn experience
  experience: [
    {
      role: "Handshake AI Fellow",
      organization: "Handshake",
      location: "Remote",
      period: "Aug 2026 – Present",
      type: "AI & Engineering",
      description: [
        "Participating in a selective applied AI fellowship focusing on emerging AI developer tools, LLM workflows, and modern software engineering practices.",
        "Collaborating with peers on technical problem solving, evaluation metrics, and integrating AI capabilities into real-world student and employer tooling.",
      ],
      technologies: ["AI Engineering", "LLM Workflows", "Problem Solving", "Git & GitHub", "Technical Collaboration"],
    },
    {
      role: "Software Engineer Intern",
      organization: "NonProfitly, Inc.",
      location: "Harrisonburg, Virginia, United States",
      period: "May 2026 – Aug 2026",
      type: "Software Engineering",
      description: [
        "Engineered software solutions and contributed to feature development supporting non-profit operational workflows and community outreach.",
        "Utilized Git for feature branching, code reviews, and version control across team repositories.",
        "Applied structured problem solving to resolve application bugs, refine user-facing workflows, and enhance system stability.",
      ],
      technologies: ["Software Engineering", "Git & GitHub", "Problem Solving", "Feature Development", "Web Systems"],
    },
    {
      role: "Assistant Manager",
      organization: "Quincy's Original Lobster Rolls",
      location: "Ocean County, New Jersey, United States",
      period: "May 2024 – Aug 2024 & Jun 2023 – Aug 2023",
      type: "Operations & Management",
      description: [
        "Coordination & Scheduling: Assisted the General Manager in developing weekly shift schedules for employees to ensure optimal coverage during peak seasonal hours.",
        "Personnel Training: Mentored and trained new hires on standard operating procedures, point-of-sale (POS) systems, and the TapMango rewards platform.",
        "Inventory Management: Monitored stock levels and managed inventory tracking to procure essential supplies, reconcile orders, and prevent operational shortages.",
        "Order Expediting & Customer Service: Managed register operations, order expediting, and food preparation in a high-volume boardwalk environment under strict quality standards.",
        "Systems Integration: Leveraged online ordering and loyalty data to assist the management team in improving customer engagement and workflow efficiency.",
      ],
      technologies: ["Operations Management", "Inventory Control", "Personnel Training", "Order Expediting", "POS & TapMango"],
    },
    {
      role: "Landscaper",
      organization: "Gold Coast Landscape & Irrigation",
      location: "Ocean County, New Jersey, United States",
      period: "Jun 2022 – Sep 2022",
      type: "Labor & Fieldwork",
      description: [
        "Maintained commercial and residential outdoor spaces through heavy manual labor, equipment operation, and landscaping care during the summer season.",
        "Exercised high physical stamina, punctuality, and team safety on daily landscaping crews.",
      ],
      technologies: ["Equipment Operation", "Physical Work Ethic", "Team Safety", "Reliability"],
    },
  ] as ExperienceItem[],

  beyondCode: [
    {
      label: "Liberty Intramural Sports",
      detail: "Maintains a full-time academic course load while consistently participating in team-based intramural sports, demonstrating endurance, time management, and collaborative camaraderie.",
    },
    {
      label: "High-Pressure Focus & Grit",
      detail: "Scored the double-overtime game-winning goal to advance his varsity soccer team to the conference championship, proving focus and tenacity under high pressure.",
    },
    {
      label: "Humanitarian Outreach & Music",
      detail: "Led service efforts delivering medical supplies and clothing to an orphanage in South Africa, leading chapel music on acoustic guitar and organizing youth activities.",
    },
  ],

  now: {
    building: "Applied AI workflows with Handshake and C++ data structures at Liberty University.",
    reading: "Data Structures & Algorithms in C++, computer architecture, and business data systems.",
    tinkering: "Windows Server 2022 Active Directory lab automation and Group Policy configuration.",
    activeIn: "Handshake AI Fellowship (Remote), Liberty University CS labs, and intramural athletics.",
  },

  bio: [
    "I am a Computer Science student at Liberty University pursuing a Bachelor of Science in Computer Science with a Software Engineering concentration and a Minor in Business (Expected Spring 2028). Currently, I am a Handshake AI Fellow.",
    "My technical foundation spans practical software engineering from my internship at NonProfitly, Inc. (May–Aug 2026), applied AI engineering through the Handshake AI Fellowship, systems administration on Windows Server 2022 (Active Directory & GPO), and low-level data structures in C++.",
    "Beyond coding, my work ethic was forged across multiple seasons of high-responsibility operational management at Quincy's Original Lobster Rolls, physical landscaping labor with Gold Coast Landscape & Irrigation, varsity soccer, and Liberty intramural sports. I bring that same discipline, accountability, and team-first mindset into every engineering project."
  ],

  socialLinks: {
    github: "https://github.com/mogesjohnson",
    linkedin: "https://linkedin.com/in/mogesjohnson",
    email: "mgjohnson9@liberty.edu",
    phone: "609-600-7383",
    calendar: "https://cal.com/mogesjohnson",
  },

  principles: [
    {
      title: "Algorithmic Efficiency",
      detail: "Applying Big-O analysis and choosing optimal tree/graph data structures to maximize computational throughput and minimize memory overhead.",
    },
    {
      title: "Systems & Security Discipline",
      detail: "Configuring robust organizational units (OUs), least-privilege security policies, and reliable centralized network administration.",
    },
    {
      title: "Operations & Teamwork",
      detail: "Grounding software engineering in operational realities: scheduling, inventory coordination, clear technical documentation, and cross-functional communication.",
    },
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Programming Languages",
    items: ["C++", "TypeScript", "JavaScript", "SQL", "HTML5 & CSS3"],
  },
  {
    category: "Systems & Administration",
    items: ["Windows Server 2022", "Active Directory (AD DS)", "Group Policy Management (GPO)", "Linux (Ubuntu)", "Windows 11"],
  },
  {
    category: "Developer Tools & Platforms",
    items: ["VS Code", "Git & GitHub", "AI Workflows (Handshake)", "POS Systems", "TapMango Rewards", "PowerShell"],
  },
  {
    category: "Web & Modern Frameworks",
    items: ["React 19", "Next.js (App Router)", "Tailwind CSS", "Node.js", "REST APIs"],
  },
];

// Verified real technical projects
export const projects: Project[] = [
  {
    id: "active-directory-lab",
    title: "Active Directory & Systems Administration Lab",
    shortTitle: "Identity infrastructure",
    code: "01 / SYS",
    signal: "sys",
    category: "Systems & Infrastructure",
    year: "2024",
    summary: "Configured an enterprise Windows Server 2022 environment in a two-person team, establishing centralized network resources, hierarchical Organizational Units, and Group Policy Management.",
    problem: "Enterprise environments require centralized identity verification, least-privilege security access, and automated policy propagation without vulnerable manual user configurations.",
    architecture: "Configured Windows Server 2022 as a Primary Domain Controller (PDC) hosting Active Directory Domain Services (AD DS), DNS, and hierarchical Organizational Units (OUs) mapped to corporate departments.",
    tradeoff: "Employed standardized Group Policy Objects (GPOs) applied at OU boundaries rather than individual user permissions to ensure consistent auditability and prevent configuration drift.",
    tags: ["Windows Server 2022", "Active Directory", "Group Policy Management", "DNS", "Security"],
    githubUrl: "https://github.com/mogesjohnson/active-directory-lab",
    metrics: [
      { label: "Environment", value: "Windows Server 2022" },
      { label: "Architecture", value: "Hierarchical OU Model" },
      { label: "Policy Scope", value: "Domain-wide GPOs" },
    ],
    codeArtifact: {
      title: "PowerShell Active Directory Automation Script",
      language: "powershell",
      filename: "scripts/New-DepartmentOUStructure.ps1",
      code: `# Automated Organizational Unit Provisioning Script
Import-Module ActiveDirectory

$DomainDN = (Get-ADDomain).DistinguishedName
$Departments = @("Engineering", "Finance", "HumanResources", "Operations", "Executive")

# Provision Root Corporate Container
$RootOU = "OU=CorporateUsers,$DomainDN"
if (-not (Get-ADOrganizationalUnit -Filter "DistinguishedName -eq '$RootOU'")) {
    New-ADOrganizationalUnit -Name "CorporateUsers" -Path $DomainDN -ProtectedFromAccidentalDeletion $true
}

# Provision Departmental Sub-OUs with Group Policies
foreach ($dept in $Departments) {
    $DeptOUPath = "OU=$dept,$RootOU"
    if (-not (Get-ADOrganizationalUnit -Filter "DistinguishedName -eq '$DeptOUPath'")) {
        New-ADOrganizationalUnit -Name $dept -Path $RootOU -ProtectedFromAccidentalDeletion $true
        New-ADGroup -Name "GRP_$dept\`_Members" -GroupScope Global -GroupCategory Security -Path $DeptOUPath
        Write-Host "[OK] Provisioned $dept OU and Security Group."
    }
}`,
      explanation: "Automates the creation of departmental OUs, security groups, and accidental-deletion protection across the Windows Server 2022 domain.",
    },
    architectureFlow: [
      { step: "01", label: "Server 2022 Provisioning", tech: "Hyper-V / Bare Metal", detail: "Primary Domain Controller installed with Active Directory Domain Services (AD DS)." },
      { step: "02", label: "DNS & Forest Config", tech: "Windows DNS Server", detail: "Configured forward/reverse lookup zones and Kerberos SRV records." },
      { step: "03", label: "Hierarchical OU Tree", tech: "AD DS Schema", detail: "Structured departmental containers separating staff, workstations, and service accounts." },
      { step: "04", label: "GPO Propagation", tech: "Group Policy Engine", detail: "Enforced password complexity, account lockout thresholds, and mapped network drives." },
    ],
  },
  {
    id: "data-structures-cpp",
    title: "Data Structures & Algorithmic Optimization Suite",
    shortTitle: "Algorithmic thinking",
    code: "02 / ALG",
    signal: "tree",
    category: "Data Structures & C++",
    year: "2024",
    summary: "Engineered high-performance data storage and retrieval systems in modern C++ utilizing AVL Trees, Splay Trees, Graph traversal algorithms, and Big-O efficiency profiling.",
    problem: "Unbalanced search trees degrade to O(N) linear time under sequential insertions, causing severe performance bottlenecks in high-frequency lookup workloads.",
    architecture: "Built self-balancing AVL trees with automatic single and double rotations maintaining strict height balance factors, paired with Splay Trees for amortized O(log N) temporal locality.",
    tradeoff: "Selected AVL trees over Red-Black trees for read-heavy operations where strictly smaller tree heights minimize pointer-chasing latency during searches.",
    tags: ["C++", "AVL Trees", "Splay Trees", "Graph Theory", "Big-O Analysis", "Memory Management"],
    githubUrl: "https://github.com/mogesjohnson/data-structures-cpp",
    metrics: [
      { label: "Search Complexity", value: "O(log N) Guaranteed" },
      { label: "Memory Overhead", value: "Zero Memory Leaks (Valgrind)" },
      { label: "Language", value: "ISO C++17" },
    ],
    codeArtifact: {
      title: "AVL Tree Self-Balancing Left-Right Rotation in C++",
      language: "cpp",
      filename: "include/AVLTree.hpp",
      code: `template <typename T>
class AVLTree {
    struct Node {
        T key;
        int height;
        Node* left;
        Node* right;
        Node(T val) : key(val), height(1), left(nullptr), right(nullptr) {}
    };

    int getHeight(Node* n) { return n ? n->height : 0; }
    int getBalanceFactor(Node* n) { return n ? getHeight(n->left) - getHeight(n->right) : 0; }

    Node* rotateRight(Node* y) {
        Node* x = y->left;
        Node* T2 = x->right;
        x->right = y;
        y->left = T2;
        y->height = std::max(getHeight(y->left), getHeight(y->right)) + 1;
        x->height = std::max(getHeight(x->left), getHeight(x->right)) + 1;
        return x; // New subtree root
    }

    Node* rotateLeft(Node* x) {
        Node* y = x->right;
        Node* T2 = y->left;
        y->left = x;
        x->right = T2;
        y->height = std::max(getHeight(y->left), getHeight(y->right)) + 1;
        x->height = std::max(getHeight(x->left), getHeight(x->right)) + 1;
        return y; // New subtree root
    }
};`,
      explanation: "Performs left and right rotations with pointer updates to restore the AVL tree invariant (balance factor between -1 and +1) in constant O(1) time.",
    },
    architectureFlow: [
      { step: "01", label: "Key Insertion", tech: "Recursive BST Insert", detail: "Traverses tree recursively to locate appropriate leaf position." },
      { step: "02", label: "Height Recalculation", tech: "Ancestor Unwinding", detail: "Updates node heights as recursion unwinds back to root." },
      { step: "03", label: "Balance Factor Check", tech: "Invariant Guard", detail: "Evaluates left vs. right subtree height delta (-2, -1, 0, 1, 2)." },
      { step: "04", label: "O(1) Rotations", tech: "Pointer Re-linking", detail: "Executes LL, RR, LR, or RL rotations to guarantee O(log N) search bounds." },
    ],
  },
  {
    id: "developer-portfolio",
    title: "AI Development: Developer Portfolio & Engineering Systems",
    shortTitle: "A connected portfolio",
    code: "03 / WEB",
    signal: "orbit",
    category: "AI & Web Systems",
    year: "2026",
    summary: "High-performance developer platform connecting verified technical projects, personal identity ('who I am'), GitHub repositories, and LinkedIn professional history into a unified engineering hub.",
    problem: "Recruiters and engineering leads often encounter fragmented footprints across scattered git repositories, resume PDFs, and social profiles, creating friction when evaluating a developer's authentic capabilities.",
    architecture: "Built with Next.js 16 App Router, React 19, and TypeScript. One Canvas 2D particle field follows the reader down the page, assembling into the MJ monogram, each project's diagram, and the contact mark, while GSAP ScrollTrigger and Lenis choreograph the scroll scenes and a Cmd+K palette handles keyboard navigation.",
    tradeoff: "Drew every visual in code (particles on a single canvas, diagrams in SVG) instead of shipping video or WebGL. The field lowers its particle count if frames drop, and reduced-motion visitors get static SVG diagrams with no animation at all.",
    tags: ["AI Development", "Next.js 16", "React 19", "TypeScript", "Canvas 2D", "GSAP", "GitHub Integration", "LinkedIn Sync", "Tailwind CSS v4"],
    githubUrl: "https://github.com/mogesjohnson/Personal-Portfolio",
    metrics: [
      { label: "Identity Sync", value: "GitHub + LinkedIn" },
      { label: "Rendering", value: "Canvas 2D particle field" },
      { label: "Motion", value: "Reduced-motion aware" },
    ],
    codeArtifact: {
      title: "Live Motion: Morphing a Particle Swarm Between Formations",
      language: "typescript",
      filename: "src/components/live/SignalField.tsx",
      code: `// Called whenever a new anchor (monogram, project diagram, contact mark) takes the screen.
const morph = (f: Formation | null, now: number) => {
  formation = f;
  assign.fill(-1);
  if (!f) {
    /* nothing anchored on screen: kick every particle into the drift field */
    return;
  }
  const n = Math.min(f.targets.length, pool);
  // Pair particles and targets left-to-right so the swarm sweeps instead of tangling.
  const participants = Array.from(order)
    .filter((i) => i < pool)
    .slice(0, n);
  participants.sort((a, b) => px[a] - px[b]);
  const tx = new Float32Array(n);
  const targetOrder = Array.from({ length: n }, (_, j) => {
    evalTarget(f.targets[j], now, pos);
    tx[j] = pos[0];
    return j;
  }).sort((a, b) => tx[a] - tx[b]);
  for (let m = 0; m < n; m++) {
    const i = participants[m];
    const j = targetOrder[m];
    assign[i] = j;
    // Stagger wake-up by target x, so the formation assembles like a wave.
    wake[i] = now + 0.05 + (tx[j] / f.width) * 0.45 + Math.random() * 0.25;
  }
};`,
      explanation: "Each particle is a spring pulled toward its assigned target. Sorting both sides by x keeps the flight paths from crossing, and the staggered wake times turn a jump cut into a sweep.",
    },
    architectureFlow: [
      { step: "01", label: "Identity Core", tech: "Who I Am / Bio Engine", detail: "Bridges Liberty CS coursework, athletics grit, and operational leadership." },
      { step: "02", label: "Code Traceability", tech: "GitHub Integration", detail: "Deep-links live repositories, code snippets, and architectural breakdowns." },
      { step: "03", label: "Milestone Sync", tech: "LinkedIn Experience", detail: "Highlights verified roles at Handshake, NonProfitly, Quincy's, and Gold Coast." },
      { step: "04", label: "Live Motion Layer", tech: "Canvas 2D + GSAP ScrollTrigger", detail: "One particle field morphs from monogram to project diagrams as you scroll; Cmd+K handles keyboard navigation." },
    ],
  },
  {
    id: "replay-studio",
    title: "REPLAY Studio: Local Windows Demo Recorder & Editor",
    shortTitle: "Demo recording studio",
    code: "04 / REC",
    signal: "reel",
    category: "Windows Desktop Apps",
    year: "2026",
    summary: "A local Windows app for polished demos. Record a window, trim the take, add timed callouts and privacy blur, and export an H.264 MP4, while an authorized agent can drive the same editing, playback, and review controls.",
    problem: "A raw screen recording rarely ships as it is: it needs a trim, a few words of explanation, and private details hidden. An agent helping with the demo also needs a way to edit the video and check what it actually shows.",
    architecture: "An Electron app with a React 19 and TypeScript editor. One app-owned command service handles typed edits, revision checks, shared undo/redo and playback; the editor, a bundled MCP adapter (28 tools) and a JSON CLI all go through it, the latter two over an authenticated local Windows named pipe.",
    tradeoff: "Kept everything on the machine: no account, no upload service, original video preserved, and agent access scoped to approved import and export folders. The cost is a Windows-only, unsigned alpha that still lacks interior cuts, audio capture and narration.",
    tags: ["Electron", "React 19", "TypeScript", "Vite", "FFmpeg", "MCP", "Windows"],
    pageUrl: "/replay-studio",
    metrics: [
      { label: "Release", value: "v0.2.0-alpha.4" },
      { label: "Automated tests", value: "167 passing" },
      { label: "Agent surface", value: "28 MCP tools" },
    ],
    codeArtifact: {
      title: "The v0.1 project and overlay model",
      language: "typescript",
      filename: "src/types.ts",
      code: `export type Look = 'tide' | 'dusk' | 'ember' | 'studio';

export interface Overlay {
  id: string;
  type: 'text' | 'blur';
  x: number; y: number; width: number; height: number;
  start: number; end: number;
  text?: string;
}

export interface Project {
  id: string; name: string;
  sourcePath: string; mediaUrl: string;
  duration: number; width: number; height: number;
  trimStart: number; trimEnd: number;
  overlays: Overlay[];
  look: Look; padding: number; radius: number;
  createdAt: string; updatedAt: string;
}

export interface ExportOptions {
  resolution: '1080p' | '720p' | 'original';
  quality: 'high' | 'compact';
}`,
      explanation: "From the repository's default branch. Callouts and privacy blur are one overlay type with their own start and end, so trimming, framing and export all read the same small model while the original video stays untouched.",
    },
    architectureFlow: [
      { step: "01", label: "Capture a window", tech: "Electron capture → WebM", detail: "Records one selected window with pause, resume and an immediate stop." },
      { step: "02", label: "Edit the take", tech: "React editor", detail: "End trims, timed callouts, fixed privacy regions, canvas look, padding and radius." },
      { step: "03", label: "Shared commands", tech: "Command service · MCP · CLI", detail: "People and agents share typed edits, revision checks, undo/redo and playback." },
      { step: "04", label: "Export & review", tech: "FFmpeg → H.264 MP4", detail: "Exports to new files; Review builds frames, contact sheets and audio excerpts." },
    ],
  },
  {
    id: "switchyard",
    title: "Switchyard: Personal Windows Project Desk",
    shortTitle: "A project desk",
    code: "05 / YRD",
    signal: "yard",
    category: "Windows Desktop Apps",
    year: "2026",
    summary: "A personal Windows project desk: choose the exact checkout, leave a Return Ticket with your next step, and come back with read-only context from an Obsidian vault. Built with Tauri 2, Rust, React and SQLite.",
    problem: "Coming back to one of many projects means finding the right checkout, remembering where you stopped, and reopening the right folder, terminal and notes, without a tool quietly guessing priorities or running code on your behalf.",
    architecture: "A Tauri 2 app with a React and TypeScript desk over a Rust core and SQLite state. Opening a target is a two-step intent: the native side prepares an exact, validated target that expires in 30 seconds, and only an explicit confirmation dispatches it.",
    tradeoff: "Chose explicit human steps over automation. It never runs git status, hooks, project commands, dev servers or agent CLIs, so Git cleanliness, tests and runtime health stay Unknown rather than guessed.",
    tags: ["Tauri 2", "Rust", "React 19", "TypeScript", "SQLite", "Obsidian", "Windows"],
    pageUrl: "/switchyard",
    metrics: [
      { label: "Release", value: "v0.1.0 personal" },
      { label: "Tests", value: "56 frontend + 53 Rust" },
      { label: "Library cap", value: "500 projects" },
    ],
    codeArtifact: {
      title: "Dispatching a prepared open intent",
      language: "rust",
      filename: "src-tauri/src/broker.rs",
      code: `pub fn commit_with(
    &mut self,
    r: CommitRequest,
    dispatch: impl FnOnce(&windows::ValidatedPath, &str) -> Result<(), String>,
) -> Result<Receipt, String> {
    validate_uuid(&r.intent_id)?;
    if let Some(receipt) = self.completed.get(&r.intent_id) {
        return Ok(receipt.clone());
    }
    let pending = self
        .pending
        .remove(&r.intent_id)
        .ok_or("This open intent is missing, used or expired; prepare again")?;
    if pending.created.elapsed() > Duration::from_secs(30) {
        return Err("Open intent expired; no native action occurred".into());
    }
    if pending.view.acknowledgment != "none" && !r.acknowledged {
        return Err("Confirm the exact target/inspection preview before dispatch".into());
    }
    // ...re-resolve the target and compare its fingerprint before dispatch
}`,
      explanation: "An intent can be used once, expires after 30 seconds, and needs an explicit acknowledgment for new, changed or held targets. The target is resolved again before dispatch, so a moved or swapped folder never opens silently.",
    },
    architectureFlow: [
      { step: "01", label: "Choose deliberately", tech: "Import · exact checkout", detail: "Only projects you select; a similar folder name never establishes identity." },
      { step: "02", label: "Prepare & confirm", tech: "Rust broker · 30 s intent", detail: "Folder, Terminal or Notes targets are validated, previewed, then dispatched." },
      { step: "03", label: "Return Ticket", tech: "SQLite · versioned", detail: "One next-action sentence, with optional note, blocker, time and energy." },
      { step: "04", label: "Read-only context", tech: "Obsidian vault reader", detail: "A bounded brief with citations from an isolated, read-only Python worker." },
    ],
  },
  {
    id: "trace-workbench",
    title: "TRACE Workbench: Shared Windows Computer Control for AI Agents",
    shortTitle: "Computer control for agents",
    code: "06 / TRC",
    signal: "trace",
    category: "AI Agent Tooling",
    year: "2026",
    summary: "Shared tools that give agents abilities beyond written instructions. The goal is one interface for Codex, Claude Code, Grok Build, and Gemini CLI to observe and operate Windows. The first two skills are Reverse Engineer Anything and Computer Use.",
    problem: "Four agent CLIs (Codex, Claude Code, Grok Build, and Gemini CLI) each need a way to observe and operate Windows. TRACE's goal is one interface for all of them, with each skill checked against every host before it claims universal availability.",
    architecture: "Version 0.1.0-alpha.1 is the development foundation: engineering setup and recorded workflow evidence. bin/trace.cjs plans, applies and checks the development analysis tools, and scripts/link-grok-skill.cjs links the skill. The shared desktop executor is not implemented yet.",
    tradeoff: "Selected scope does not mean both skills are finished. The next implementation priority is Computer Use, while preserving the verified analysis setup; native decompilation engines and live Claude/Grok/Gemini model sessions were not tested.",
    tags: ["Node.js", "MCP", "Windows", "Codex", "Claude Code", "Grok Build", "Gemini CLI"],
    pageUrl: "/trace-workbench",
    metrics: [
      { label: "Version", value: "0.1.0-alpha.1" },
      { label: "Unit tests", value: "38 passed" },
      { label: "Analysis tools", value: "207 via MCP" },
    ],
    codeArtifact: {
      title: "Developer setup",
      language: "powershell",
      filename: "README.md",
      code: `npm ci
node bin/trace.cjs plan
node bin/trace.cjs apply
node scripts/link-grok-skill.cjs --plan
node scripts/link-grok-skill.cjs --apply
node bin/trace.cjs doctor`,
      explanation: "From the README on docs/advanced-capabilities. These commands configure development analysis tools. Review the plan before applying it; setup preserves unrelated settings and backs up existing configuration. Verified on Windows x64 with Node.js 26.",
    },
    architectureFlow: [
      { step: "01", label: "Install", tech: "npm ci", detail: "Install dependencies." },
      { step: "02", label: "Plan & apply", tech: "bin/trace.cjs plan · apply", detail: "Review the plan before applying it; setup backs up existing configuration." },
      { step: "03", label: "Link the skill", tech: "scripts/link-grok-skill.cjs", detail: "The same plan-then-apply step for the skill link." },
      { step: "04", label: "Verify", tech: "bin/trace.cjs doctor", detail: "Verify the setup." },
    ],
  },
];
