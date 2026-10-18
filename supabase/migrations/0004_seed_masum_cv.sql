-- Seed data for Md Masum Molla's Cybersecurity Portfolio

-- 1. Profile
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
  '{"LinkedIn": "https://www.linkedin.com/in/masum-molla-6845a72a6/", "Medium": "https://medium.com/@mollamasum764", "Email": "mailto:mollamasum764@gmail.com", "Phone": "tel:01518403124", "TryHackMe": "https://tryhackme.com", "GitHub": "https://github.com/Masum-2107040"}'::jsonb
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

-- 2. Skills
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

-- 3. Projects
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

-- 4. Research Papers
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

-- 5. Achievements
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

-- 6. Certificates
INSERT INTO public.certificates (
  title, issuer, category, description, credential_id, verification_url, issue_date, sort_order, is_featured, is_published
) VALUES
('CNSP (Certified Network Security Practitioner)', 'The SecOps Group', 'Network Security', 'Validates practical skills in network security assessment, network architecture review, protocol analysis, and perimeter defense validation.', 'CNSP-SecOps-Verified', 'https://secopsgroup.com', '2025-04-10', 1, true, true),
('kWAPTA (Certified Web Application Penetration Testing)', 'The Knight Squad Academy', 'Web Penetration Testing', 'Practical certification covering advanced web application security assessments, OWASP Top 10 exploitation, business logic bypasses, and mitigation strategies.', 'kWAPTA-TKSA-Verified', 'https://linkedin.com/in/masum-molla-6845a72a6/', '2025-06-15', 2, true, true),
('CPPS (Certified Phishing Prevention Specialist)', 'Hack & Fix', 'Social Engineering & Email Defense', 'Covers email authentication mechanisms (SPF, DKIM, DMARC), phishing simulation design, social engineering defense, and incident response.', 'CPPS-HF-Verified', 'https://linkedin.com/in/masum-molla-6845a72a6/', '2025-02-20', 3, true, true),
('CRTOM (Certified Red Team Operations Management)', 'Read Team Leaders', 'Red Team Operations', 'Focuses on adversary emulation, red team engagement planning, stealth reconnaissance, Active Directory exploitation management, and debriefing.', 'CRTOM-RTL-Verified', 'https://linkedin.com/in/masum-molla-6845a72a6/', '2025-07-05', 4, true, true)
ON CONFLICT DO NOTHING;
