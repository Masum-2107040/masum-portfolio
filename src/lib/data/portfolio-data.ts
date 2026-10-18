export interface ProfileData {
  id: string;
  display_name: string;
  headline: string;
  biography: string;
  education: string;
  location: string;
  avatar_path: string;
  cv_path: string;
  public_email: string;
  phone: string;
  social_links: Record<string, string>;
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  proficiency_label?: string;
  sort_order: number;
  is_published: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  technologies: string[];
  cover_image_path?: string;
  gallery_paths?: string[];
  repository_url?: string;
  demo_url?: string;
  documentation_url?: string;
  status: string;
  is_featured: boolean;
  is_published: boolean;
  start_date?: string;
  completion_date?: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  slug: string;
  abstract: string;
  authors: string[];
  research_area: string;
  methodology: string;
  evaluation: string;
  results: string;
  limitations: string;
  future_work: string;
  publication_status: string;
  doi?: string;
  publication_url?: string;
  pdf_path?: string;
  repository_url?: string;
  is_featured: boolean;
  is_published: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  category: string;
  organization: string;
  description: string;
  event_date: string;
  team_name?: string;
  rank?: string;
  score?: string;
  evidence_url?: string;
  is_featured: boolean;
  is_published: boolean;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  category: string;
  description: string;
  credential_id?: string;
  verification_url?: string;
  issue_date: string;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
}

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_path?: string;
  tags: string[];
  status: "draft" | "published" | "private" | "archived";
  published_at: string;
}

export const FALLBACK_PROFILE: ProfileData = {
  id: "00000000-0000-0000-0000-000000000001",
  display_name: "Md Masum Molla",
  headline: "Cybersecurity Researcher & Penetration Tester | CSE @ KUET",
  biography:
    "Computer Science and Engineering student at Khulna University of Engineering & Technology (KUET) with hands-on experience in competitive CTF environments and security-oriented project development. Demonstrated ability to analyze vulnerabilities, understand attack surfaces, and build applications with secure design principles. Experienced in web technologies, databases, and system-level fundamentals, with a strong interest in penetration testing, offensive security, and autonomous assessment.",
  education:
    "B.Sc. in Computer Science and Engineering — Khulna University of Engineering & Technology (KUET)\nJan 2022 – Present\nCore Coursework: Data Structures & Algorithms, Computer Architecture, Operating Systems, Database Management Systems (SQL), Artificial Intelligence, Compiler Design\nLanguages: C, C++, Java, Assembly, Python\n\nHigher Secondary Certificate (HSC) — Narail Govt. Victoria College\nGPA: 5.00 / 5.00",
  location: "KUET, Fulbarigate, Khulna, Bangladesh",
  avatar_path: "/avatar.png",
  cv_path: "/cv.pdf",
  public_email: "mollamasum764@gmail.com",
  phone: "01518403124",
  social_links: {
    LinkedIn: "https://www.linkedin.com/in/masum-molla-6845a72a6/",
    Medium: "https://medium.com/@mollamasum764",
    Email: "mailto:mollamasum764@gmail.com",
    Phone: "tel:01518403124",
    TryHackMe: "https://tryhackme.com",
    GitHub: "https://github.com/Masum-2107040",
  },
};


export const FALLBACK_SKILLS: SkillItem[] = [
  // Reconnaissance & OSINT
  { id: "s1", name: "Nmap", category: "Reconnaissance", sort_order: 1, is_published: true },
  { id: "s2", name: "Rustscan", category: "Reconnaissance", sort_order: 2, is_published: true },
  { id: "s3", name: "Subfinder", category: "Reconnaissance", sort_order: 3, is_published: true },
  { id: "s4", name: "WhatWeb", category: "Reconnaissance", sort_order: 4, is_published: true },
  { id: "s5", name: "OSINT", category: "Reconnaissance", sort_order: 5, is_published: true },

  // Protocol Exploitation & Network
  { id: "s6", name: "SMB (EternalBlue)", category: "Protocol Exploitation", sort_order: 6, is_published: true },
  { id: "s7", name: "FTP (Anonymous & Backdoors)", category: "Protocol Exploitation", sort_order: 7, is_published: true },
  { id: "s8", name: "SSH (Hydra)", category: "Protocol Exploitation", sort_order: 8, is_published: true },
  { id: "s9", name: "RDP Exploitation", category: "Protocol Exploitation", sort_order: 9, is_published: true },
  { id: "s10", name: "Wireshark", category: "Protocol Exploitation", sort_order: 10, is_published: true },

  // Vulnerability Scanning & Web AppSec
  { id: "s11", name: "Burp Suite", category: "Web Security", sort_order: 11, is_published: true },
  { id: "s12", name: "OWASP Top 10", category: "Web Security", sort_order: 12, is_published: true },
  { id: "s13", name: "IDOR Exploitation", category: "Web Security", sort_order: 13, is_published: true },
  { id: "s14", name: "SQL Injection", category: "Web Security", sort_order: 14, is_published: true },
  { id: "s15", name: "XSS (Cross-Site Scripting)", category: "Web Security", sort_order: 15, is_published: true },
  { id: "s16", name: "WPScan", category: "Web Security", sort_order: 16, is_published: true },
  { id: "s17", name: "Schemathesis API Fuzzing", category: "Web Security", sort_order: 17, is_published: true },

  // Directory Brute Forcing
  { id: "s18", name: "Gobuster", category: "Directory Brute Forcing", sort_order: 18, is_published: true },
  { id: "s19", name: "FFuf", category: "Directory Brute Forcing", sort_order: 19, is_published: true },
  { id: "s20", name: "Dirsearch", category: "Directory Brute Forcing", sort_order: 20, is_published: true },
  { id: "s21", name: "Dirbuster", category: "Directory Brute Forcing", sort_order: 21, is_published: true },

  // Security Tools & Password Attacks
  { id: "s22", name: "Metasploit Framework", category: "Security Tools", sort_order: 22, is_published: true },
  { id: "s23", name: "SQLmap", category: "Security Tools", sort_order: 23, is_published: true },
  { id: "s24", name: "Hashcat", category: "Password Attacks", sort_order: 24, is_published: true },
  { id: "s25", name: "John the Ripper", category: "Password Attacks", sort_order: 25, is_published: true },
  { id: "s26", name: "SecLists", category: "Password Attacks", sort_order: 26, is_published: true },

  // Active Directory
  { id: "s27", name: "Windows Server & Domain Controller", category: "Active Directory", sort_order: 27, is_published: true },
  { id: "s28", name: "AD Enumeration", category: "Active Directory", sort_order: 28, is_published: true },
  { id: "s29", name: "Kerberos & LDAP", category: "Active Directory", sort_order: 29, is_published: true },
  { id: "s30", name: "LLMNR/NBT-NS Poisoning", category: "Active Directory", sort_order: 30, is_published: true },
  { id: "s31", name: "NTLM Relay", category: "Active Directory", sort_order: 31, is_published: true },
  { id: "s32", name: "Impacket", category: "Active Directory", sort_order: 32, is_published: true },
  { id: "s33", name: "Responder", category: "Active Directory", sort_order: 33, is_published: true },

  // Platforms & Bug Hunting
  { id: "s34", name: "Kali Linux / Ubuntu", category: "OS & Systems", sort_order: 34, is_published: true },
  { id: "s35", name: "Docker", category: "OS & Systems", sort_order: 35, is_published: true },
  { id: "s36", name: "TryHackMe (Top 8%)", category: "Platforms", sort_order: 36, is_published: true },
  { id: "s37", name: "HackerOne / Bugcrowd / YesWeHack", category: "Bug Hunting", sort_order: 37, is_published: true },

  // Programming & Dev
  { id: "s38", name: "Python", category: "Programming", sort_order: 38, is_published: true },
  { id: "s39", name: "C / C++", category: "Programming", sort_order: 39, is_published: true },
  { id: "s40", name: "TypeScript / Node.js", category: "Programming", sort_order: 40, is_published: true },
  { id: "s41", name: "PHP (Laravel)", category: "Programming", sort_order: 41, is_published: true },
  { id: "s42", name: "SQL (PostgreSQL / MySQL)", category: "Programming", sort_order: 42, is_published: true },
];

export const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    title: "APT — Autonomous AI Pentesting Framework",
    slug: "apt-pentesting-framework",
    summary:
      "An AI-powered autonomous penetration testing framework integrating multi-agent reconnaissance, vulnerability discovery, and CI/CD security testing with deterministic fallback and audit trail preservation.",
    description: `APT is an agentic offensive security framework created to automate the time-consuming phases of penetration testing while maintaining strict verifiable boundaries and safety guarantees.

### Architecture Highlights
- **Multi-Agent Orchestration**: Specialized autonomous agents coordinate across the lifecycle: reconnaissance, active port & service mapping, API parameter fuzzing, and proof-of-concept verification.
- **Deterministic Toolchain**: Integrates directly with standard security CLI utilities (Nmap, WhatWeb, Subfinder, Schemathesis) via containerized sandbox runners.
- **Fail-Safe & Audit Trail**: Implements deterministic fallback logic ensuring agents do not hallucinate actions or drift outside defined network scopes. Every probe is logged cryptographically.
- **Real-Time Telemetry**: Node.js and TypeScript core leveraging WebSockets to stream live execution graphs, scan results, and vulnerability triage directly to the security operator.`,
    category: "Autonomous Security / AI",
    technologies: ["TypeScript", "Node.js", "PostgreSQL", "WebSockets", "Nmap", "WhatWeb", "Subfinder", "Docker", "Schemathesis"],
    status: "in_progress",
    is_featured: true,
    is_published: true,
    repository_url: "https://github.com",
    demo_url: "https://github.com",
    documentation_url: "https://github.com",
    start_date: "2025-01-01",
  },
  {
    id: "p2",
    title: "Phishing Incident Tracking System",
    slug: "phishing-incident-tracking-system",
    summary:
      "A web-based security incident response platform designed to log, categorize, and investigate phishing attempts with evidence storage, email header analysis, and threat telemetry.",
    description: `A security incident tracking system designed to help enterprise SOC teams and security analysts triage, classify, and track phishing reports submitted by users.

### Key Capabilities
- **Incident Categorization**: Structured classification of attack vectors (credential harvest, spear-phishing, business email compromise, malware delivery).
- **Evidence Management**: Secure handling of headers, domain IOCs, malicious URLs, and attachments in an isolated environment to prevent unintended detonation.
- **Relational Storage & Threat Correlation**: Custom MySQL schema tracking recurring sender infrastructure, spoofed domains, and campaigns targeting specific organizational units.
- **Reporting & Metrics**: Automated executive reporting highlighting trending attack methods and threat mitigation metrics.`,
    category: "Incident Response & Blue Team",
    technologies: ["HTML", "CSS", "JavaScript", "MySQL", "PHP"],
    status: "completed",
    is_featured: true,
    is_published: true,
    repository_url: "https://github.com",
    start_date: "2024-06-01",
    completion_date: "2024-11-01",
  },
  {
    id: "p3",
    title: "Job Portal Web Application (Security-Aware Full Stack)",
    slug: "security-aware-job-portal",
    summary:
      "A full-stack recruitment portal engineered with defense-in-depth security principles, robust role-based access control (RBAC), and strict input sanitization.",
    description: `A production-grade recruitment and job search web platform built with a security-first design philosophy.

### Security Implementations
- **Role-Based Access Control (RBAC)**: Fine-grained permissions separating job seekers, corporate recruiters, and system administrators.
- **Zero-Trust Input Handling**: Strict server-side validation and sanitization using Laravel validator and parameterized queries to mitigate SQL Injection and Cross-Site Scripting (XSS).
- **Session & Identity Hardening**: Protected against CSRF, session fixation, and brute-force authentication attempts using rate-limiting middleware and secure cookie flags.
- **File Upload Security**: Verification of magic-bytes, randomized storage keys, and MIME-type restrictions for resume and document uploads.`,
    category: "Secure Web Application",
    technologies: ["PHP (Laravel)", "MySQL", "TailwindCSS", "JavaScript"],
    status: "completed",
    is_featured: true,
    is_published: true,
    repository_url: "https://github.com",
    start_date: "2024-02-01",
    completion_date: "2024-05-30",
  },
];

export const FALLBACK_RESEARCH: ResearchItem[] = [
  {
    id: "r1",
    title: "APT: An Agentic Framework for White-Box, Evidence-Driven Security Assessment with Deterministic Fallback",
    slug: "apt-autonomous-security-assessment",
    abstract:
      "Autonomous agentic systems present significant promise for offensive security assessments, yet existing architectures often suffer from hallucinations, non-deterministic execution paths, and lack of reproducible evidence. We propose APT, a multi-agent framework tailored for white-box and gray-box penetration testing. By pairing LLM-driven planning agents with deterministic tool validation pipelines (Nmap, Subfinder, Schemathesis) and real-time state management, the system enforces safety boundaries and preserves an immutable audit trail of all discovered vulnerabilities.",
    authors: ["Md Masum Molla"],
    research_area: "Autonomous Security & Multi-Agent Pentesting",
    methodology:
      "The architecture decomposes offensive workflows into distinct decoupled agents: Reconnaissance, Service Enumeration, Threat Modeling, and Safe Proof-of-Concept Verification. Every generated action must pass through an allowlist validator before executing inside sandboxed Docker environments. If confidence thresholds or schema checks fail, execution reverts to deterministic heuristics.",
    evaluation:
      "Tested across established benchmark environments (OWASP Juice Shop, DVWA, and microservice OpenAPI targets). Evaluated on false-positive rates, execution stability, containment adherence, and quality of generated remediation advisories.",
    results:
      "APT achieved verified exploitation of injection and broken object-level authorization vulnerabilities with zero out-of-scope probes and reduced manual verification time by over 70%.",
    limitations:
      "Currently optimized for HTTP/REST and network service discovery. Complex client-side DOM-based XSS and multi-stage Active Directory kerberos chaining are in active development.",
    future_work:
      "Extending autonomous decision trees into hybrid Active Directory domain privilege escalation and cloud IAM misconfiguration auditing.",
    publication_status: "in_review",
    repository_url: "https://github.com",
    is_featured: true,
    is_published: true,
  },
];

export const FALLBACK_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "a1",
    title: "DIU CyberconCTF 2025",
    organization: "Daffodil International University",
    rank: "20th",
    category: "CTF Competition",
    event_date: "2025-05-15",
    team_name: "KUET",
    description:
      "Ranked 20th nationally in DIU CyberconCTF 2025. Solved competitive challenges spanning web security (IDOR, SQLi, authentication bypass), network packet forensics, and cryptography.",
    evidence_url: "https://linkedin.com/in/masum-molla-6845a72a6/",
    is_featured: true,
    is_published: true,
  },
  {
    id: "a2",
    title: "BUP CSE Carnival CTF 2025",
    organization: "Bangladesh University of Professionals (BUP)",
    rank: "21st",
    category: "CTF Competition",
    event_date: "2025-03-20",
    team_name: "KUET",
    description:
      "Ranked 21st among top university teams nationwide in BUP CSE Carnival CTF 2025, solving practical challenges in Linux privilege escalation, reverse engineering, and web vulnerability analysis.",
    evidence_url: "https://linkedin.com/in/masum-molla-6845a72a6/",
    is_featured: true,
    is_published: true,
  },
  {
    id: "a3",
    title: "BH USA CTF 2025",
    organization: "Black Hat USA",
    rank: "149th",
    category: "Global CTF Competition",
    event_date: "2025-08-10",
    description:
      "Competed in the internationally acclaimed Black Hat USA 2025 CTF against cybersecurity researchers and red teams worldwide, securing 149th position.",
    evidence_url: "https://linkedin.com/in/masum-molla-6845a72a6/",
    is_featured: true,
    is_published: true,
  },
  {
    id: "a4",
    title: "Top 8% Global Standing in TryHackMe",
    organization: "TryHackMe",
    rank: "Top 8%",
    category: "Platform Recognition",
    event_date: "2025-09-01",
    description:
      "Ranked in the top 8% of global security practitioners on TryHackMe, completing intensive offensive tracks in Active Directory, network penetration, web app security, and system privilege escalation.",
    evidence_url: "https://tryhackme.com",
    is_featured: true,
    is_published: true,
  },
  {
    id: "a5",
    title: "Co-Founder & President — KUET Cyber Security Club (KCSC)",
    organization: "Khulna University of Engineering & Technology",
    rank: "President",
    category: "Leadership & Community",
    event_date: "2024-01-01",
    description:
      "Co-founded and currently lead KUET Cyber Security Club (KCSC). Organize technical seminars, hands-on CTF training sessions, and workshops on offensive security, vulnerability assessment, and secure engineering.",
    evidence_url: "https://linkedin.com/in/masum-molla-6845a72a6/",
    is_featured: true,
    is_published: true,
  },
  {
    id: "a6",
    title: "Mentor — H4K2LIV3 Academy",
    organization: "H4K2LIV3 Academy",
    rank: "Mentor",
    category: "Professional Experience",
    event_date: "2025-08-01",
    description:
      "Mentoring aspiring cybersecurity students for the eJPT (eLearnSecurity Junior Penetration Tester) certification. Guiding hands-on labs in TryHackMe and VulnHub covering reconnaissance, vulnerability analysis, and network exploitation.",
    evidence_url: "https://linkedin.com/in/masum-molla-6845a72a6/",
    is_featured: true,
    is_published: true,
  },
];

export const FALLBACK_CERTIFICATES: CertificateItem[] = [
  {
    id: "c1",
    title: "CNSP — Certified Network Security Practitioner",
    issuer: "The SecOps Group",
    category: "Network Security",
    description:
      "Hands-on certification demonstrating proficiency in network architecture review, network vulnerability assessment, protocol exploitation, and perimeter security testing.",
    issue_date: "2025-04-10",
    credential_id: "CNSP-SecOps-Verified",
    verification_url: "https://secopsgroup.com",
    is_featured: true,
    is_published: true,
    sort_order: 1,
  },
  {
    id: "c2",
    title: "kWAPTA — Certified Web Application Penetration Testing",
    issuer: "The Knight Squad Academy",
    category: "Web Application Security",
    description:
      "Rigorous practical certification validating advanced web application penetration testing, covering OWASP Top 10 vulnerabilities, authentication bypasses, API security flaws, and remediation.",
    issue_date: "2025-06-15",
    credential_id: "kWAPTA-TKSA-Verified",
    verification_url: "https://linkedin.com/in/masum-molla-6845a72a6/",
    is_featured: true,
    is_published: true,
    sort_order: 2,
  },
  {
    id: "c3",
    title: "CPPS — Certified Phishing Prevention Specialist",
    issuer: "Hack & Fix",
    category: "Social Engineering & Defensive Security",
    description:
      "Specialized training in analyzing spear-phishing campaigns, evaluating email authentication headers (SPF, DKIM, DMARC), and designing anti-phishing defense architectures.",
    issue_date: "2025-02-20",
    credential_id: "CPPS-HF-Verified",
    verification_url: "https://linkedin.com/in/masum-molla-6845a72a6/",
    is_featured: true,
    is_published: true,
    sort_order: 3,
  },
  {
    id: "c4",
    title: "CRTOM — Certified Red Team Operations Management",
    issuer: "Red Team Leaders",
    category: "Red Team Operations",
    description:
      "Comprehensive accreditation in adversary simulation, Active Directory offensive tactics, operational security (OPSEC), stealth lateral movement, and red team engagement reporting.",
    issue_date: "2025-07-05",
    credential_id: "CRTOM-RTL-Verified",
    verification_url: "https://linkedin.com/in/masum-molla-6845a72a6/",
    is_featured: true,
    is_published: true,
    sort_order: 4,
  },
];

export const FALLBACK_POSTS: BlogPostItem[] = [
  {
    id: "b1",
    title: "Deconstructing Active Directory Attacks: From LLMNR Poisoning to Domain Dominance",
    slug: "deconstructing-active-directory-attacks",
    excerpt:
      "A deep technical breakdown of the classic internal network penetration testing kill chain: LLMNR/NBT-NS spoofing, NTLM relaying, Kerberoasting, and mitigation strategies.",
    cover_image_path: undefined,
    tags: ["Active Directory", "Internal Pentesting", "Kerberos", "Responder", "Impacket"],
    status: "published",
    published_at: "2025-09-15T00:00:00Z",
    content: `# Deconstructing Active Directory Attacks: From LLMNR Poisoning to Domain Dominance

During internal network penetration tests, legacy protocols and default configurations in Microsoft Active Directory frequently create pathways for low-privileged visitors to escalate to Enterprise or Domain Admins.

## 1. Initial Foothold: LLMNR / NBT-NS Poisoning
Link-Local Multicast Name Resolution (LLMNR) and NetBIOS Name Service (NBT-NS) are fallback name resolution mechanisms in Windows. When a host requests a non-existent SMB share or misspells a hostname, LLMNR broadcasts across the local subnet.

Using **Responder**:
\`\`\`bash
sudo responder -I eth0 -dwv
\`\`\`

When a workstation broadcasts, Responder responds claiming to be the requested resource, prompting the client to attempt authentication and sending its NetNTLMv2 challenge-response hash.

## 2. Relaying vs. Cracking
Depending on whether SMB Signing is required:
- If SMB signing is disabled (default on non-DC machines): We can relay the NetNTLMv2 hash using \`ntlmrelayx.py\` from Impacket directly to another target, executing code or dumping secrets via SAM.
- If relaying is not viable: We extract the hash into Hashcat (mode \`5600\`) using wordlists like \`rockyou.txt\` with rule sets.

## 3. Post-Authentication: Kerberoasting
Once a valid domain account is captured, we query Service Principal Names (SPNs):
\`\`\`bash
GetUserSPNs.py domain.local/user:password -dc-ip 10.10.10.1 -request
\`\`\`
Service accounts frequently use weak passwords, allowing offline cracking of TGS tickets with Hashcat mode \`13100\`.

## 4. Hardening and Defense
1. **Disable LLMNR and NBT-NS** via Group Policy across all domain workstations and member servers.
2. **Enforce SMB Signing** on all endpoints (\`Digitally sign communications (always)\`).
3. **Kerberoasting Defense**: Ensure all service accounts use complex 25+ character passwords or transition to Group Managed Service Accounts (gMSA).`,
  },
  {
    id: "b2",
    title: "Building APT: An Autonomous Multi-Agent AI Pentesting Framework",
    slug: "building-autonomous-ai-pentesting-framework",
    excerpt:
      "Exploring how to architect agentic AI systems for offensive security without sacrificing determinism, safety boundaries, and cryptographic auditability.",
    cover_image_path: undefined,
    tags: ["AI Security", "Automation", "Autonomous Agents", "AppSec", "Nmap"],
    status: "published",
    published_at: "2025-08-20T00:00:00Z",
    content: `# Building APT: An Autonomous Multi-Agent AI Pentesting Framework

Modern vulnerability assessment tools either rely on static rule sets or generate vast amounts of noisy, uncontextualized alerts. At the same time, using raw LLMs for penetration testing introduces severe hazards: hallucinated vulnerabilities, out-of-scope probes, and unpredictable destructive commands.

## The Core Philosophy
We developed **APT** to combine the strategic reasoning of multi-agent LLM systems with the ironclad determinism of verified offensive security tools.

\`\`\`
       +------------------------------------------+
       |             Planning Agent               |
       +--------------------+---------------------+
                            |
           +----------------+----------------+
           |                                 |
           v                                 v
+-----------------------+       +-------------------------+
| Reconnaissance Worker |       | Vulnerability Validator |
| (Nmap, Subfinder)     |       | (Schemathesis, Fuzzing) |
+-----------+-----------+       +------------+------------+
            |                                |
            +----------------+---------------+
                             |
                             v
                +-------------------------+
                | Deterministic Container |
                |    (Isolated Docker)    |
                +-------------------------+
\`\`\`

## Key Engineering Decisions
1. **Scope Allowlist Enforcement**: The tool sandbox intercepts all raw system calls and network sockets. Any IP, domain, or port not explicitly in the authorization manifest triggers an immediate hard drop.
2. **Deterministic Fallbacks**: If an agent generates an ambiguous hypothesis, the pipeline drops back to predefined deterministic scripts rather than guessing.
3. **Audit Trail Preservation**: Every payload sent, status received, and header parsed is serialized into PostgreSQL with an immutable SHA-256 hash.`,
  },
  {
    id: "b3",
    title: "Finding and Exploiting IDOR in Modern APIs: A Practical Guide",
    slug: "finding-and-exploiting-idor-modern-apis",
    excerpt:
      "Insecure Direct Object Reference vulnerabilities frequently bypass automated web scanners. Here is how to analyze API contracts, detect authorization gaps, and test responsibly.",
    cover_image_path: undefined,
    tags: ["API Security", "IDOR", "Web Pentesting", "Bug Bounty", "OWASP"],
    status: "published",
    published_at: "2025-07-10T00:00:00Z",
    content: `# Finding and Exploiting IDOR in Modern APIs: A Practical Guide

Insecure Direct Object Reference (IDOR) — categorized under Broken Object Level Authorization (BOLA) in the OWASP API Security Top 10 — remains one of the highest-paying and most impactful vulnerability types in contemporary bug bounty programs.

## Why Automated Scanners Miss IDOR
Traditional DAST scanners lack the contextual knowledge of multiple authenticated user states. To uncover IDOR, a scanner or analyst must maintain at least two distinct user sessions (User A and User B) and observe how access control fails across resources.

## Methodology
1. **Identify Object Identifiers in API Requests**: Look for numeric IDs, UUIDs, usernames, or account tokens in request paths, query parameters, or JSON payloads:
   \`\`\`http
   GET /api/v2/orders/10842 HTTP/1.1
   Authorization: Bearer <User_A_Token>
   \`\`\`
2. **Swap Tokens in Burp Repeater**: Replace User A's token with User B's token. If the response returns User A's confidential invoice or order details with a 200 OK, authorization enforcement at the data tier is absent.
3. **Mass Assignment & Parameter Tampering**: In \`PUT\` or \`PATCH\` calls, test adding hidden parameters like \`"role": "admin"\` or \`"account_id": "target"\`.

## Remediation Best Practice
Never rely solely on client-supplied IDs. Verify ownership within the database query itself:
\`\`\`sql
-- Insecure:
SELECT * FROM documents WHERE id = $1;

-- Secure:
SELECT * FROM documents WHERE id = $1 AND user_id = $auth_user_id;
\`\`\``,
  },
];
