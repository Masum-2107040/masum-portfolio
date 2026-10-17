"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
}

const QUICK_COMMANDS = [
  "help",
  "whoami",
  "skills",
  "projects",
  "research",
  "ctf",
  "certs",
  "education",
  "contact",
  "clear",
];

export default function Terminal() {
  const router = useRouter();
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "init",
      output: (
        <div>
          <p className="text-term font-semibold">Md Masum Molla — Cybersecurity Research Lab [v2.4.0-sec]</p>
          <p className="text-ink2 mt-1">
            Type <span className="text-term font-semibold">&apos;help&apos;</span> or click the command badges below to explore credentials, CTF rankings, and projects.
          </p>
        </div>
      ),
    },
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    let out: React.ReactNode;

    switch (cmd) {
      case "help":
        out = (
          <div className="space-y-1 text-ink2">
            <p className="text-term font-medium">Available Commands:</p>
            <p><span className="text-term font-mono w-24 inline-block">whoami</span> : Identity, summary, and current focus</p>
            <p><span className="text-term font-mono w-24 inline-block">skills</span> : Offensive security tools, AD, and programming</p>
            <p><span className="text-term font-mono w-24 inline-block">projects</span> : Security-focused engineering projects</p>
            <p><span className="text-term font-mono w-24 inline-block">research</span> : Autonomous AI pentesting framework (APT)</p>
            <p><span className="text-term font-mono w-24 inline-block">ctf</span> : Capture The Flag ranks & competitions</p>
            <p><span className="text-term font-mono w-24 inline-block">certs</span> : CNSP, kWAPTA, CPPS, CRTOM credentials</p>
            <p><span className="text-term font-mono w-24 inline-block">education</span> : KUET CSE & academic background</p>
            <p><span className="text-term font-mono w-24 inline-block">contact</span> : Email, phone, LinkedIn, and social links</p>
            <p><span className="text-term font-mono w-24 inline-block">cv</span> : Open download link for PDF resume</p>
            <p><span className="text-term font-mono w-24 inline-block">clear</span> : Clear terminal output</p>
          </div>
        );
        break;

      case "whoami":
        out = (
          <div className="space-y-1 text-ink2">
            <p className="text-term font-bold">Md Masum Molla</p>
            <p>Computer Science and Engineering undergraduate at Khulna University of Engineering & Technology (KUET).</p>
            <p>Specialization: Web & API Security, Autonomous Pentesting, Active Directory Exploitation, and Competitive CTFs.</p>
            <p className="text-muted text-xs mt-1">Leadership: Co-Founder & President of KUET Cyber Security Club (KCSC) | Mentor at H4K2LIV3 Academy.</p>
          </div>
        );
        break;

      case "skills":
        out = (
          <div className="space-y-2 text-ink2">
            <p><span className="text-term font-medium">[Reconnaissance]</span> Nmap, Rustscan, Subfinder, WhatWeb, OSINT</p>
            <p><span className="text-term font-medium">[Web Security]</span> Burp Suite, OWASP Top 10, IDOR, SQLi, XSS, Schemathesis, WPScan</p>
            <p><span className="text-term font-medium">[Active Directory]</span> Windows Server, Domain Controller, Kerberos, LDAP, Responder, LLMNR/NBT-NS Poisoning, NTLM Relay, Impacket</p>
            <p><span className="text-term font-medium">[Exploitation & Passwords]</span> Metasploit, SQLmap, Hashcat, John the Ripper, Hydra, SecLists</p>
            <p><span className="text-term font-medium">[Programming]</span> Python, C/C++, TypeScript, Node.js, PHP (Laravel), SQL, Assembly</p>
          </div>
        );
        break;

      case "projects":
        out = (
          <div className="space-y-2 text-ink2">
            <p>1. <span className="text-term font-medium">APT — Autonomous AI Pentesting Framework</span> (TypeScript, Node.js, Docker, Nmap, Schemathesis)</p>
            <p>2. <span className="text-term font-medium">Phishing Incident Tracking System</span> (HTML, CSS, JS, MySQL, PHP)</p>
            <p>3. <span className="text-term font-medium">Job Portal Web Application (Security-Aware Full Stack)</span> (Laravel, MySQL, RBAC)</p>
            <p className="text-muted text-xs">Run &apos;projects&apos; page navigation or click Projects in header.</p>
          </div>
        );
        break;

      case "research":
        out = (
          <div className="space-y-1 text-ink2">
            <p className="text-term font-medium">APT: An Agentic Framework for White-Box Security Assessment</p>
            <p>Focus: Evidence-driven multi-agent pentesting with deterministic fallback and immutable audit trails.</p>
            <p className="text-xs text-muted">Status: In Review. Lead Author: Md Masum Molla.</p>
          </div>
        );
        break;

      case "ctf":
        out = (
          <div className="space-y-1 text-ink2">
            <p>• <span className="text-term font-medium">DIU CyberconCTF 2025</span>: Ranked 20th Nationally</p>
            <p>• <span className="text-term font-medium">BUP CSE Carnival CTF 2025</span>: Ranked 21st Nationally</p>
            <p>• <span className="text-term font-medium">BH USA CTF 2025</span>: Ranked 149th Globally (Black Hat)</p>
            <p>• <span className="text-term font-medium">TryHackMe</span>: Top 8% Global Standing</p>
          </div>
        );
        break;

      case "certs":
      case "certificates":
        out = (
          <div className="space-y-1 text-ink2">
            <p>• <span className="text-term font-medium">CNSP</span> — Certified Network Security Practitioner (The SecOps Group)</p>
            <p>• <span className="text-term font-medium">kWAPTA</span> — Certified Web Application Penetration Testing (The Knight Squad Academy)</p>
            <p>• <span className="text-term font-medium">CPPS</span> — Certified Phishing Prevention Specialist (Hack & Fix)</p>
            <p>• <span className="text-term font-medium">CRTOM</span> — Certified Red Team Operations Management (Red Team Leaders)</p>
          </div>
        );
        break;

      case "education":
      case "edu":
        out = (
          <div className="space-y-1 text-ink2">
            <p className="text-term font-medium">Khulna University of Engineering & Technology (KUET)</p>
            <p>B.Sc. in Computer Science and Engineering (2022 - Present)</p>
            <p className="text-muted">Coursework: DSA, OS, DBMS, Computer Architecture, AI, Compiler Design.</p>
            <p className="mt-1 text-term font-medium">Narail Govt. Victoria College</p>
            <p>Higher Secondary Certificate (HSC) — GPA: 5.00 / 5.00</p>
          </div>
        );
        break;

      case "contact":
        out = (
          <div className="space-y-1 text-ink2">
            <p>Email: <a href="mailto:mollamasum764@gmail.com" className="text-term underline">mollamasum764@gmail.com</a></p>
            <p>Phone: <span className="text-term font-mono">01518403124</span></p>
            <p>LinkedIn: <a href="https://linkedin.com/in/masum-molla-6845a72a6/" target="_blank" rel="noopener noreferrer" className="text-term underline">linkedin.com/in/masum-molla-6845a72a6</a></p>
            <p>Location: <span className="text-ink">KUET, Fulbarigate, Khulna, Bangladesh</span></p>
          </div>
        );
        break;

      case "cv":
        out = (
          <div>
            <p className="text-ink2">Downloading CV...</p>
            <a href="/cv.pdf" download="Md_Masum_Molla_CV.pdf" className="text-term underline font-mono">Click here if download does not start automatically (/cv.pdf)</a>
          </div>
        );
        window.open("/cv.pdf", "_blank");
        break;

      case "about":
      case "projects_page":
      case "blog":
        router.push(`/${cmd.replace("_page", "")}`);
        out = <span className="text-muted">Navigating to /{cmd}...</span>;
        break;

      default:
        out = (
          <span className="text-ink2">
            Command not found: <code className="text-red-400 font-mono">{cmd.slice(0, 30)}</code>. Type <button onClick={() => handleCommand("help")} className="text-term underline">&apos;help&apos;</button> for available commands.
          </span>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output: out }]);
  };

  return (
    <div
      className="rounded-xl border border-line bg-[#0A0F0C] p-5 shadow-2xl font-mono text-sm backdrop-blur-md"
      role="region"
      aria-label="Interactive Cybersecurity Terminal"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-line pb-3 text-xs text-muted">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block"></span>
          <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block"></span>
          <span className="h-3 w-3 rounded-full bg-term/80 inline-block"></span>
          <span className="ml-2 font-mono text-ink2">masum@sec-ops:~$</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-term animate-pulse"></span>
          <span className="text-[11px] text-muted uppercase tracking-wider font-mono">BASH INTERACTIVE</span>
        </div>
      </div>

      {/* Terminal Output Stream */}
      <div className="mt-4 max-h-72 overflow-y-auto space-y-3 pr-2 scrollbar-thin" aria-live="polite">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-muted">
              <span className="text-term font-semibold">$</span>
              <span className="text-ink font-mono">{item.command}</span>
            </div>
            <div className="pl-4 text-xs leading-relaxed">{item.output}</div>
          </div>
        ))}
      </div>

      {/* Prompt Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(inputVal);
          setInputVal("");
        }}
        className="mt-4 flex items-center gap-2 rounded-md border border-line/60 bg-black/40 px-3 py-2 focus-within:border-term/80 transition-colors"
      >
        <label htmlFor="cmd-input" className="text-term font-semibold font-mono text-sm select-none">
          masum@lab:~$
        </label>
        <input
          id="cmd-input"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          maxLength={50}
          autoComplete="off"
          placeholder="Try 'whoami', 'skills', 'ctf', 'projects', 'certs'..."
          className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted/60 font-mono"
        />
        <button
          type="submit"
          className="rounded border border-line/80 px-2 py-0.5 text-xs text-muted hover:border-term hover:text-term transition-colors"
        >
          EXEC
        </button>
      </form>

      {/* Quick Launch Pills */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-2 border-t border-line/50">
        <span className="text-[11px] text-muted mr-1">Quick:</span>
        {QUICK_COMMANDS.map((c) => (
          <button
            key={c}
            onClick={() => handleCommand(c)}
            className="rounded border border-line/70 bg-card/60 px-2 py-0.5 text-[11px] text-muted hover:border-term hover:text-term hover:bg-term/10 transition-all font-mono"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
