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
  category: "Systems & Infrastructure" | "Data Structures & C++" | "AI & Web Systems";
  year: string;
  summary: string;
  problem: string;
  architecture: string;
  tradeoff: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
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
    category: "AI & Web Systems",
    year: "2026",
    summary: "High-performance developer platform connecting verified technical projects, personal identity ('who I am'), GitHub repositories, and LinkedIn professional history into a unified engineering hub.",
    problem: "Recruiters and engineering leads often encounter fragmented footprints across scattered git repositories, resume PDFs, and social profiles, creating friction when evaluating a developer's authentic capabilities.",
    architecture: "Built with Next.js 16 App Router, React 19, and TypeScript. A focused command palette connects the portfolio sections, résumé, GitHub, and LinkedIn while a project switcher reveals the thinking behind each system.",
    tradeoff: "Kept the interface self-contained with CSS and SVG motion instead of adding an animation framework, so the visual layer remains lightweight and can respect reduced-motion preferences.",
    tags: ["AI Development", "Next.js 16", "React 19", "TypeScript", "GitHub Integration", "LinkedIn Sync", "Tailwind CSS v4"],
    githubUrl: "https://github.com/mogesjohnson/Personal-Portfolio",
    metrics: [
      { label: "Identity Sync", value: "GitHub + LinkedIn" },
      { label: "Interaction", value: "Keyboard navigation" },
      { label: "Motion", value: "Reduced-motion aware" },
    ],
    codeArtifact: {
      title: "Interactive Navigation Linking Projects, Bio, GitHub & LinkedIn",
      language: "typescript",
      filename: "src/components/CommandPalette.tsx",
      code: `// Unified Command Palette connecting projects, who I am, GitHub, and LinkedIn
export default function CommandPalette({ isOpen, onClose, onOpenResume }: CommandPaletteProps) {
  const actions = [
    { id: "projects", title: "Explore Verified Technical Projects", category: "Code", run: () => navigateTo("projects") },
    { id: "about", title: "Who I Am — Background & Philosophy", category: "Identity", run: () => navigateTo("about") },
    { id: "github", title: "GitHub Profile & Repositories", category: "External", run: () => window.open(personalInfo.socialLinks.github, "_blank") },
    { id: "linkedin", title: "LinkedIn Experience & Milestones", category: "External", run: () => window.open(personalInfo.socialLinks.linkedin, "_blank") },
    { id: "resume", title: "View & Download Resume / CV", category: "Documents", run: () => onOpenResume() },
  ];
  // Instant keyboard search and execution...
}`,
      explanation: "Centralizes navigation connecting verified projects, personal identity ('who I am'), active GitHub repositories, and LinkedIn milestones into a single keyboard-driven interface.",
    },
    architectureFlow: [
      { step: "01", label: "Identity Core", tech: "Who I Am / Bio Engine", detail: "Bridges Liberty CS coursework, athletics grit, and operational leadership." },
      { step: "02", label: "Code Traceability", tech: "GitHub Integration", detail: "Deep-links live repositories, code snippets, and architectural breakdowns." },
      { step: "03", label: "Milestone Sync", tech: "LinkedIn Experience", detail: "Highlights verified roles at Handshake, NonProfitly, Quincy's, and Gold Coast." },
      { step: "04", label: "Interactive Flow", tech: "Project switcher & Cmd+K", detail: "Provides keyboard-driven navigation, project case notes, résumé viewing, and calendar access." },
    ],
  },
];
