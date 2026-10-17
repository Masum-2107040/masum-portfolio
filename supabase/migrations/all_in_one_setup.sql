-- ==============================================================================
-- MD MASUM MOLLA — CYBERSECURITY PORTFOLIO SETUP & SEED SCRIPT
-- RUN THIS IN SUPABASE SQL EDITOR (https://supabase.com/dashboard/project/prrpjrofunkjoegnrlff/sql/new)
-- ==============================================================================

-- 1. ADMIN ALLOWLIST & FUNCTION
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.admins where user_id=auth.uid())
$$;

-- 2. CREATE PORTFOLIO TABLES
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  summary text,
  description text,
  category text,
  technologies text[] default '{}',
  cover_image_path text,
  gallery_paths text[] default '{}',
  repository_url text,
  demo_url text,
  documentation_url text,
  status text default 'in_progress',
  is_featured boolean default false,
  is_published boolean default false,
  start_date date,
  completion_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null,
  category text,
  description text,
  credential_id text,
  verification_url text,
  issue_date date,
  expiry_date date,
  file_path text,
  is_featured boolean default false,
  is_published boolean default false,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  organization text,
  description text,
  event_date date,
  team_name text,
  rank text,
  score text,
  evidence_url text,
  image_path text,
  is_featured boolean default false,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.research_papers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  abstract text,
  authors text[] default '{}',
  research_area text,
  methodology text,
  evaluation text,
  results text,
  limitations text,
  future_work text,
  publication_status text default 'unpublished',
  doi text,
  publication_url text,
  pdf_path text,
  repository_url text,
  is_featured boolean default false,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image_path text,
  tags text[] default '{}',
  status text default 'draft' check (status in ('draft','published','private','archived')),
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  proficiency_label text,
  sort_order int default 0,
  is_published boolean default false
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  display_name text,
  headline text,
  biography text,
  education text,
  location text,
  avatar_path text,
  cv_path text,
  public_email text,
  social_links jsonb default '{}',
  updated_at timestamptz default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  original_filename text,
  storage_path text unique,
  content_type text,
  file_size bigint,
  created_at timestamptz default now()
);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
do $$ declare t text; pub text; begin
 for t,pub in values ('projects','is_published'),('certificates','is_published'),('achievements','is_published'),('research_papers','is_published'),('skills','is_published') loop
  execute format('alter table public.%I enable row level security',t);
  execute format('drop policy if exists "public read" on public.%I',t);
  execute format('create policy "public read" on public.%I for select using (%I = true)',t,pub);
  execute format('drop policy if exists "admin all" on public.%I',t);
  execute format('create policy "admin all" on public.%I for all using (public.is_admin()) with check (public.is_admin())',t);
 end loop; end $$;

alter table public.blog_posts enable row level security;
drop policy if exists "public read" on public.blog_posts;
create policy "public read" on public.blog_posts for select using (status='published');
drop policy if exists "admin all" on public.blog_posts;
create policy "admin all" on public.blog_posts for all using (public.is_admin()) with check (public.is_admin());

alter table public.profiles enable row level security;
drop policy if exists "public read" on public.profiles;
create policy "public read" on public.profiles for select using (true);
drop policy if exists "admin all" on public.profiles;
create policy "admin all" on public.profiles for all using (public.is_admin()) with check (public.is_admin());

alter table public.media enable row level security;
drop policy if exists "admin all" on public.media;
create policy "admin all" on public.media for all using (public.is_admin()) with check (public.is_admin());

alter table public.admins enable row level security;

-- 4. STORAGE BUCKET (public-assets)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('public-assets', 'public-assets', true, 10485760, array['image/jpeg','image/png','image/webp','application/pdf'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "admin select public-assets" on storage.objects;
drop policy if exists "admin insert public-assets" on storage.objects;
drop policy if exists "admin update public-assets" on storage.objects;
drop policy if exists "admin delete public-assets" on storage.objects;
create policy "admin select public-assets" on storage.objects for select to authenticated using (bucket_id = 'public-assets' and public.is_admin());
create policy "admin insert public-assets" on storage.objects for insert to authenticated with check (bucket_id = 'public-assets' and public.is_admin());
create policy "admin update public-assets" on storage.objects for update to authenticated using (bucket_id = 'public-assets' and public.is_admin()) with check (bucket_id = 'public-assets' and public.is_admin());
create policy "admin delete public-assets" on storage.objects for delete to authenticated using (bucket_id = 'public-assets' and public.is_admin());

-- 5. CONTACT FORM INBOX TABLE
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 254),
  subject text not null check (char_length(subject) between 1 and 150),
  message text not null check (char_length(message) between 10 and 5000),
  ip_hash text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists contact_messages_ip_idx on public.contact_messages (ip_hash, created_at desc);
create index if not exists contact_messages_created_idx on public.contact_messages (created_at desc);
alter table public.contact_messages enable row level security;
revoke all on public.contact_messages from anon;
drop policy if exists "admin all" on public.contact_messages;
create policy "admin all" on public.contact_messages for all using (public.is_admin()) with check (public.is_admin());

-- 6. SEED CV DATA

-- Profile
INSERT INTO public.profiles (
  id,
  display_name,
  headline,
  biography,
  education,
  location,
  avatar_path,
  cv_path,
  public_email,
  social_links
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Md Masum Molla',
  'Cybersecurity Researcher & Penetration Tester | CSE @ KUET',
  'Computer Science student at Khulna University of Engineering & Technology (KUET) with hands-on experience in competitive CTF environments and security-oriented project development. Demonstrated ability to analyze vulnerabilities, understand attack surfaces, and build applications with secure design principles. Experienced in web technologies, databases, and system-level fundamentals, with a strong interest in penetration testing, offensive security, and autonomous assessment.',
  'B.Sc. in Computer Science and Engineering — Khulna University of Engineering & Technology (KUET) (Jan 2022 – Present) | HSC — Narail Govt. Victoria College (GPA 5.00/5.00)',
  'KUET, Fulbarigate, Khulna, Bangladesh',
  '/avatar.png',
  '/cv.pdf',
  'mollamasum764@gmail.com',
  '{"LinkedIn": "https://www.linkedin.com/in/masum-molla-6845a72a6/", "Email": "mailto:mollamasum764@gmail.com", "Phone": "tel:01518403124", "TryHackMe": "https://tryhackme.com", "GitHub": "https://github.com"}'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  headline = EXCLUDED.headline,
  biography = EXCLUDED.biography,
  education = EXCLUDED.education,
  location = EXCLUDED.location,
  avatar_path = EXCLUDED.avatar_path,
  cv_path = EXCLUDED.cv_path,
  public_email = EXCLUDED.public_email,
  social_links = EXCLUDED.social_links;

-- Skills
INSERT INTO public.skills (name, category, proficiency_label, sort_order, is_published) VALUES
('Nmap', 'Reconnaissance', 'Advanced', 1, true),
('Rustscan', 'Reconnaissance', 'Advanced', 2, true),
('Subfinder', 'Reconnaissance', 'Advanced', 3, true),
('WhatWeb', 'Reconnaissance', 'Advanced', 4, true),
('OSINT', 'Reconnaissance', 'Advanced', 5, true),
('SMB (EternalBlue)', 'Protocol Exploitation', 'Advanced', 6, true),
('FTP (Anonymous & Backdoor)', 'Protocol Exploitation', 'Advanced', 7, true),
('SSH (Hydra)', 'Protocol Exploitation', 'Advanced', 8, true),
('RDP Exploitation', 'Protocol Exploitation', 'Advanced', 9, true),
('Wireshark', 'Network Analysis', 'Advanced', 10, true),
('Burp Suite', 'Web Security', 'Advanced', 11, true),
('OWASP Top 10', 'Web Security', 'Advanced', 12, true),
('IDOR Exploitation', 'Web Security', 'Advanced', 13, true),
('SQL Injection', 'Web Security', 'Advanced', 14, true),
('XSS (Cross-Site Scripting)', 'Web Security', 'Advanced', 15, true),
('WPScan', 'Web Security', 'Advanced', 16, true),
('Schemathesis API Fuzzing', 'Web Security', 'Advanced', 17, true),
('Gobuster', 'Directory Brute Forcing', 'Advanced', 18, true),
('FFuf', 'Directory Brute Forcing', 'Advanced', 19, true),
('Dirsearch', 'Directory Brute Forcing', 'Advanced', 20, true),
('Dirbuster', 'Directory Brute Forcing', 'Advanced', 21, true),
('Metasploit', 'Exploitation Tools', 'Advanced', 22, true),
('SQLmap', 'Exploitation Tools', 'Advanced', 23, true),
('Hashcat', 'Password Attacks', 'Advanced', 24, true),
('John the Ripper', 'Password Attacks', 'Advanced', 25, true),
('SecLists', 'Password Attacks', 'Advanced', 26, true),
('Windows Server & Domain Controller', 'Active Directory', 'Intermediate', 27, true),
('AD Enumeration', 'Active Directory', 'Intermediate', 28, true),
('Kerberos & LDAP', 'Active Directory', 'Intermediate', 29, true),
('LLMNR/NBT-NS Poisoning', 'Active Directory', 'Intermediate', 30, true),
('NTLM Relay', 'Active Directory', 'Intermediate', 31, true),
('Impacket & Responder', 'Active Directory', 'Intermediate', 32, true),
('Kali Linux / Ubuntu', 'OS & Systems', 'Advanced', 33, true),
('Docker', 'OS & Systems', 'Intermediate', 34, true),
('TryHackMe (Top 8%)', 'Platforms', 'Advanced', 35, true),
('HackerOne / Bugcrowd / YesWeHack', 'Bug Hunting', 'Intermediate', 36, true),
('Python', 'Programming', 'Advanced', 37, true),
('C / C++', 'Programming', 'Advanced', 38, true),
('TypeScript / Node.js', 'Programming', 'Advanced', 39, true),
('PHP (Laravel)', 'Programming', 'Advanced', 40, true),
('SQL (PostgreSQL / MySQL)', 'Programming', 'Advanced', 41, true)
ON CONFLICT DO NOTHING;

-- Projects
INSERT INTO public.projects (
  title, slug, summary, description, category, technologies, status, is_featured, is_published, start_date
) VALUES
(
  'APT — Autonomous AI Pentesting Framework',
  'apt-pentesting-framework',
  'An AI-powered autonomous penetration testing framework integrating multi-agent reconnaissance, vulnerability discovery, and CI/CD security testing with deterministic fallback and audit trail preservation.',
  'Developed an AI-powered autonomous penetration testing framework integrating reconnaissance, vulnerability discovery, multi-agent analysis, and CI/CD security testing using Nmap, WhatWeb, Subfinder, and Schemathesis.',
  'Autonomous Security / AI',
  ARRAY['TypeScript', 'Node.js', 'PostgreSQL', 'WebSockets', 'Nmap', 'WhatWeb', 'Subfinder', 'Docker', 'Schemathesis'],
  'in_progress',
  true,
  true,
  '2025-01-01'
),
(
  'Phishing Incident Tracking System',
  'phishing-incident-tracking-system',
  'A web-based security incident response platform to log, track, and analyze organizational phishing attempts with structured IOC evidence storage and reporting.',
  'Developed a web-based system to log, track, and analyze phishing incidents. Designed database structures for incident classification, evidence storage, and reporting.',
  'Incident Response & Blue Team',
  ARRAY['HTML', 'CSS', 'JavaScript', 'MySQL', 'PHP'],
  'completed',
  true,
  true,
  '2024-06-01'
),
(
  'Job Portal Web Application (Security-Aware Full Stack)',
  'security-aware-job-portal',
  'A full-stack recruitment portal engineered with defense-in-depth principles, RBAC, input sanitization, and SQL injection protections.',
  'Built a full-stack job portal with secure authentication, role-based access control, and input validation. Implemented secure database interactions to reduce risks of SQL Injection and unauthorized access.',
  'Secure Web Application',
  ARRAY['PHP (Laravel)', 'MySQL', 'TailwindCSS', 'JavaScript'],
  'completed',
  true,
  true,
  '2024-02-01'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  technologies = EXCLUDED.technologies,
  is_featured = EXCLUDED.is_featured,
  is_published = EXCLUDED.is_published;

-- Research Papers
INSERT INTO public.research_papers (
  title, slug, abstract, authors, research_area, methodology, evaluation, results, limitations, future_work, publication_status, is_featured, is_published
) VALUES (
  'APT: An Agentic Framework for White-Box, Evidence-Driven Security Assessment with Deterministic Fallback',
  'apt-autonomous-security-assessment',
  'Autonomous agentic systems present significant promise for offensive security assessments, yet existing architectures often suffer from hallucinations, non-deterministic execution paths, and lack of reproducible evidence. We propose APT, a multi-agent framework tailored for white-box and gray-box penetration testing. By pairing LLM-driven planning agents with deterministic tool validation pipelines (Nmap, Subfinder, Schemathesis) and real-time state management, the system enforces safety boundaries and preserves an immutable audit trail of all discovered vulnerabilities.',
  ARRAY['Md Masum Molla'],
  'Autonomous Security & Multi-Agent Pentesting',
  'Decomposes offensive workflows into decoupled agents: Reconnaissance, Enumeration, Threat Modeling, and Safe Verification inside sandboxed Docker environments with schema-validated commands.',
  'Evaluated on standard benchmarks (OWASP Juice Shop, DVWA, custom OpenAPI microservices).',
  'Achieved verified vulnerability reproduction with complete evidence capture and zero out-of-scope probes.',
  'Focuses primarily on web application and network services; binary exploitation is not supported.',
  'Integration of hybrid Active Directory privilege escalation and cloud IAM auditing.',
  'in_review',
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  abstract = EXCLUDED.abstract,
  authors = EXCLUDED.authors,
  research_area = EXCLUDED.research_area,
  is_featured = EXCLUDED.is_featured,
  is_published = EXCLUDED.is_published;

-- Achievements
INSERT INTO public.achievements (
  title, organization, rank, category, event_date, team_name, description, evidence_url, is_featured, is_published
) VALUES
('DIU CyberconCTF 2025', 'Daffodil International University', '20th', 'CTF Competition', '2025-05-15', 'KUET', 'Ranked 20th in national level CTF competition competing against top universities in Bangladesh. Solved challenges across Web Security, Cryptography, OSINT, and Reverse Engineering.', 'https://linkedin.com/in/masum-molla-6845a72a6/', true, true),
('BUP CSE Carnival CTF 2025', 'Bangladesh University of Professionals (BUP)', '21st', 'CTF Competition', '2025-03-20', 'KUET', 'Ranked 21st among nationwide competitive hacking teams. Focused on web application vulnerabilities, privilege escalation, and network traffic analysis.', 'https://linkedin.com/in/masum-molla-6845a72a6/', true, true),
('BH USA CTF 2025', 'Black Hat USA', '149th', 'Global CTF', '2025-08-10', NULL, 'Competed in international cybersecurity challenge hosted alongside Black Hat USA, solving complex real-world offensive security tasks.', 'https://linkedin.com/in/masum-molla-6845a72a6/', true, true),
('Top 8% Global Standing in TryHackMe', 'TryHackMe', 'Top 8%', 'Platform Recognition', '2025-09-01', NULL, 'Ranked in top 8% of global security practitioners on TryHackMe, completing intensive offensive tracks in Active Directory, network penetration, and web app security.', 'https://tryhackme.com', true, true),
('Co-Founder & President — KUET Cyber Security Club (KCSC)', 'Khulna University of Engineering & Technology', 'President', 'Leadership & Community', '2024-01-01', NULL, 'Founded and leading the official cybersecurity club at KUET. Organizing CTF workshops, vulnerability research bootcamps, and mentoring student cohorts.', 'https://linkedin.com/in/masum-molla-6845a72a6/', true, true),
('Mentor — H4K2LIV3 Academy', 'H4K2LIV3 Academy', 'Mentor', 'Professional Experience', '2025-08-01', NULL, 'Mentored students for eJPT certification, covering penetration testing fundamentals. Guided learners through TryHackMe/VulnHub labs and provided 1:1 and group troubleshooting.', 'https://linkedin.com/in/masum-molla-6845a72a6/', true, true)
ON CONFLICT DO NOTHING;

-- Certificates
INSERT INTO public.certificates (
  title, issuer, category, description, credential_id, verification_url, issue_date, sort_order, is_featured, is_published
) VALUES
('CNSP (Certified Network Security Practitioner)', 'The SecOps Group', 'Network Security', 'Validates practical skills in network security assessment, network architecture review, protocol analysis, and perimeter defense validation.', 'CNSP-SecOps-Verified', 'https://secopsgroup.com', '2025-04-10', 1, true, true),
('kWAPTA (Certified Web Application Penetration Testing)', 'The Knight Squad Academy', 'Web Penetration Testing', 'Practical certification covering advanced web application security assessments, OWASP Top 10 exploitation, business logic bypasses, and mitigation strategies.', 'kWAPTA-TKSA-Verified', 'https://linkedin.com/in/masum-molla-6845a72a6/', '2025-06-15', 2, true, true),
('CPPS (Certified Phishing Prevention Specialist)', 'Hack & Fix', 'Social Engineering & Email Defense', 'Covers email authentication mechanisms (SPF, DKIM, DMARC), phishing simulation design, social engineering defense, and incident response.', 'CPPS-HF-Verified', 'https://linkedin.com/in/masum-molla-6845a72a6/', '2025-02-20', 3, true, true),
('CRTOM (Certified Red Team Operations Management)', 'Read Team Leaders', 'Red Team Operations', 'Focuses on adversary emulation, red team engagement planning, stealth reconnaissance, Active Directory exploitation management, and debriefing.', 'CRTOM-RTL-Verified', 'https://linkedin.com/in/masum-molla-6845a72a6/', '2025-07-05', 4, true, true)
ON CONFLICT DO NOTHING;

-- Blog Posts
INSERT INTO public.blog_posts (
  title, slug, excerpt, content, tags, status, published_at
) VALUES
(
  'Deconstructing Active Directory Attacks: From LLMNR Poisoning to Domain Dominance',
  'deconstructing-active-directory-attacks',
  'A deep technical breakdown of the classic internal network penetration testing kill chain: LLMNR/NBT-NS spoofing, NTLM relaying, Kerberoasting, and mitigation strategies.',
  '# Deconstructing Active Directory Attacks: From LLMNR Poisoning to Domain Dominance

During internal network penetration tests, legacy protocols and default configurations in Microsoft Active Directory frequently create pathways for low-privileged visitors to escalate to Enterprise or Domain Admins.

## 1. Initial Foothold: LLMNR / NBT-NS Poisoning
Link-Local Multicast Name Resolution (LLMNR) and NetBIOS Name Service (NBT-NS) are fallback name resolution mechanisms in Windows. When a host requests a non-existent SMB share or misspells a hostname, LLMNR broadcasts across the local subnet.

Using **Responder**:
```bash
sudo responder -I eth0 -dwv
```

When a workstation broadcasts, Responder responds claiming to be the requested resource, prompting the client to attempt authentication and sending its NetNTLMv2 challenge-response hash.

## 2. Relaying vs. Cracking
Depending on whether SMB Signing is required:
- If SMB signing is disabled (default on non-DC machines): We can relay the NetNTLMv2 hash using `ntlmrelayx.py` from Impacket directly to another target, executing code or dumping secrets via SAM.
- If relaying is not viable: We extract the hash into Hashcat (mode `5600`) using wordlists like `rockyou.txt` with rule sets.

## 3. Post-Authentication: Kerberoasting
Once a valid domain account is captured, we query Service Principal Names (SPNs):
```bash
GetUserSPNs.py domain.local/user:password -dc-ip 10.10.10.1 -request
```
Service accounts frequently use weak passwords, allowing offline cracking of TGS tickets with Hashcat mode `13100`.

## 4. Hardening and Defense
1. **Disable LLMNR and NBT-NS** via Group Policy across all domain workstations and member servers.
2. **Enforce SMB Signing** on all endpoints (`Digitally sign communications (always)`).
3. **Kerberoasting Defense**: Ensure all service accounts use complex 25+ character passwords or transition to Group Managed Service Accounts (gMSA).',
  ARRAY['Active Directory', 'Internal Pentesting', 'Kerberos', 'Responder', 'Impacket'],
  'published',
  now()
),
(
  'Building APT: An Autonomous Multi-Agent AI Pentesting Framework',
  'building-autonomous-ai-pentesting-framework',
  'Exploring how to architect agentic AI systems for offensive security without sacrificing determinism, safety boundaries, and cryptographic auditability.',
  '# Building APT: An Autonomous Multi-Agent AI Pentesting Framework

Modern vulnerability assessment tools either rely on static rule sets or generate vast amounts of noisy, uncontextualized alerts. At the same time, using raw LLMs for penetration testing introduces severe hazards: hallucinated vulnerabilities, out-of-scope probes, and unpredictable destructive commands.

## The Core Philosophy
We developed **APT** to combine the strategic reasoning of multi-agent LLM systems with the ironclad determinism of verified offensive security tools.

## Key Engineering Decisions
1. **Scope Allowlist Enforcement**: The tool sandbox intercepts all raw system calls and network sockets. Any IP, domain, or port not explicitly in the authorization manifest triggers an immediate hard drop.
2. **Deterministic Fallbacks**: If an agent generates an ambiguous hypothesis, the pipeline drops back to predefined deterministic scripts rather than guessing.
3. **Audit Trail Preservation**: Every payload sent, status received, and header parsed is serialized into PostgreSQL with an immutable SHA-256 hash.',
  ARRAY['AI Security', 'Automation', 'Autonomous Agents', 'AppSec', 'Nmap'],
  'published',
  now()
),
(
  'Finding and Exploiting IDOR in Modern APIs: A Practical Guide',
  'finding-and-exploiting-idor-modern-apis',
  'Insecure Direct Object Reference vulnerabilities frequently bypass automated web scanners. Here is how to analyze API contracts, detect authorization gaps, and test responsibly.',
  '# Finding and Exploiting IDOR in Modern APIs: A Practical Guide

Insecure Direct Object Reference (IDOR) — categorized under Broken Object Level Authorization (BOLA) in the OWASP API Security Top 10 — remains one of the highest-paying and most impactful vulnerability types in contemporary bug bounty programs.

## Why Automated Scanners Miss IDOR
Traditional DAST scanners lack the contextual knowledge of multiple authenticated user states. To uncover IDOR, a scanner or analyst must maintain at least two distinct user sessions (User A and User B) and observe how access control fails across resources.',
  ARRAY['API Security', 'IDOR', 'Web Pentesting', 'Bug Bounty', 'OWASP'],
  'published',
  now()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status;
