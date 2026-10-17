import type { Metadata } from "next";
import { getProfile, listSkills } from "@/lib/queries";
import { PageHeader, ExtLink } from "@/components/site/ui";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "About — Md Masum Molla",
  description: "Computer Science and Engineering student at KUET, penetration tester, and cybersecurity researcher.",
};

export default async function About() {
  const [p, skills] = await Promise.all([getProfile(), listSkills()]);

  // Group skills by category
  const skillsByCategory = skills.reduce<Record<string, string[]>>((acc, s) => {
    const cat = s.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s.name);
    return acc;
  }, {});

  const social = Object.entries((p?.social_links ?? {}) as Record<string, string>);

  return (
    <main id="main" className="mx-auto max-w-4xl px-6 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col-reverse sm:flex-row items-start justify-between gap-6 pb-6 border-b border-line">
        <div className="space-y-2">
          <PageHeader
            title={p?.display_name ?? "Md Masum Molla"}
            intro={p?.headline ?? "Cybersecurity Researcher & Penetration Tester | CSE @ KUET"}
          />
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted">
            <span>📍 KUET, Fulbarigate, Khulna</span>
            <span>✉️ mollamasum764@gmail.com</span>
            <span>📞 01518403124</span>
          </div>
        </div>

        <div className="shrink-0">
          <img
            src={p?.avatar_path ?? "/avatar.png"}
            alt="Md Masum Molla"
            className="h-28 w-28 sm:h-32 sm:w-32 rounded-xl object-cover border border-term/40 bg-card shadow-lg"
          />
        </div>
      </div>

      {/* Summary / Biography */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold font-mono text-ink flex items-center gap-2">
          <span className="text-term">#</span> Biography
        </h2>
        <div className="rounded-xl border border-line bg-card p-6 leading-relaxed text-ink2 space-y-3 text-sm sm:text-base">
          <p>
            I am a Computer Science and Engineering undergraduate at{" "}
            <strong className="text-ink">Khulna University of Engineering & Technology (KUET)</strong>,
            specializing in offensive security, vulnerability assessment, web/API penetration testing, and autonomous security frameworks.
          </p>
          <p>
            With extensive experience competing in national and global Capture The Flag (CTF) competitions, I have developed a strong aptitude for analyzing attack surfaces, deconstructing complex protocol vulnerabilities, and applying defense-in-depth principles to real-world applications.
          </p>
          <p>
            I serve as the <strong className="text-ink">Co-Founder & President of KUET Cyber Security Club (KCSC)</strong>, fostering a thriving security culture through technical workshops and CTF training, and mentor students at <strong className="text-ink">H4K2LIV3 Academy</strong> preparing for industry certifications such as eJPT.
          </p>
        </div>
      </section>

      {/* Education */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold font-mono text-ink flex items-center gap-2">
          <span className="text-term">#</span> Education
        </h2>
        <div className="space-y-3">
          <div className="rounded-xl border border-line bg-card p-5 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-mono text-muted">
              <span className="text-term font-semibold">Khulna University of Engineering & Technology (KUET)</span>
              <span>Jan 2022 – Present</span>
            </div>
            <h3 className="text-base font-semibold text-ink">
              Bachelor of Science in Computer Science and Engineering (B.Sc. CSE)
            </h3>
            <p className="text-xs text-ink2">
              <strong className="text-muted">Core Coursework:</strong> Data Structures and Algorithms, Computer Architecture, Operating Systems, Database Management Systems (SQL), Artificial Intelligence, Compiler Design.
            </p>
            <p className="text-xs text-ink2">
              <strong className="text-muted">Academic Languages:</strong> C, C++, Java, Assembly, Python.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-card p-5 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-mono text-muted">
              <span className="text-term font-semibold">Narail Govt. Victoria College</span>
              <span>Graduated</span>
            </div>
            <h3 className="text-base font-semibold text-ink">
              Higher Secondary Certificate (HSC) — Science
            </h3>
            <p className="text-xs text-ink2">
              <strong className="text-term font-mono">GPA: 5.00 / 5.00</strong> (Perfect Academic Standing)
            </p>
          </div>
        </div>
      </section>

      {/* Professional Experience & Leadership */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold font-mono text-ink flex items-center gap-2">
          <span className="text-term">#</span> Experience & Community Leadership
        </h2>
        <div className="space-y-3">
          <div className="rounded-xl border border-line bg-card p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-mono text-muted">
              <span className="text-term font-semibold">H4K2LIV3 Academy</span>
              <span>Aug 2025 – Present</span>
            </div>
            <h3 className="text-base font-semibold text-ink">Mentor — Penetration Testing</h3>
            <ul className="text-xs text-ink2 space-y-1.5 list-disc list-inside">
              <li>Mentored students preparing for the eJPT (eLearnSecurity Junior Penetration Tester) certification.</li>
              <li>Guided hands-on laboratory sessions in TryHackMe and VulnHub focusing on vulnerability analysis and exploitation.</li>
              <li>Provided 1:1 and group mentorship sessions to troubleshoot offensive security challenges and lab environments.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-line bg-card p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-mono text-muted">
              <span className="text-term font-semibold">KUET Cyber Security Club (KCSC)</span>
              <span>2024 – Present</span>
            </div>
            <h3 className="text-base font-semibold text-ink">Co-Founder & President</h3>
            <ul className="text-xs text-ink2 space-y-1.5 list-disc list-inside">
              <li>Established the official cybersecurity community and student research chapter at KUET.</li>
              <li>Orchestrate university CTF teams, vulnerability research bootcamps, and technical defense workshops.</li>
              <li>Drive educational initiatives on secure coding, reverse engineering, and offensive tradecraft.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Technical Skills Matrix */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold font-mono text-ink flex items-center gap-2">
          <span className="text-term">#</span> Technical Skills Matrix
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(skillsByCategory).map(([cat, list]) => (
            <div key={cat} className="rounded-xl border border-line bg-card p-4 space-y-2.5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-term font-semibold">
                {cat}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {list.map((name) => (
                  <span
                    key={name}
                    className="rounded-md border border-line/80 bg-black/40 px-2.5 py-1 text-xs font-mono text-ink2 hover:border-term hover:text-ink transition-colors"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resume Download & Social Links */}
      <section className="rounded-xl border border-line bg-card p-6 space-y-4">
        <h2 className="text-base font-mono font-semibold text-ink">Resume & Direct Links</h2>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/cv.pdf"
            download="Md_Masum_Molla_CV.pdf"
            className="rounded-lg bg-term px-4 py-2 font-mono text-xs font-semibold text-bg hover:bg-term/90 transition-all shadow-md"
          >
            Download CV (PDF)
          </a>
          {social.map(([k, v]) => (
            <ExtLink key={k} href={v}>
              {k}
            </ExtLink>
          ))}
        </div>
      </section>
    </main>
  );
}
