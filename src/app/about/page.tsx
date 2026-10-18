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
    <main id="main" className="mx-auto max-w-4xl px-6 py-12 space-y-16">
      {/* Header */}
      <div className="flex flex-col-reverse sm:flex-row items-start justify-between gap-8 pb-8 border-b border-line">
        <div className="space-y-4">
          <PageHeader
            title={p?.display_name ?? "Md Masum Molla"}
            intro={p?.headline ?? "Cybersecurity Researcher & Penetration Tester | CSE @ KUET"}
          />
          <div className="flex flex-wrap items-center gap-6 text-sm sm:text-base text-ink2">
            <span>📍 KUET, Fulbarigate, Khulna</span>
            <span>✉️ mollamasum764@gmail.com</span>
            <span>📞 01518403124</span>
          </div>
        </div>

        <div className="shrink-0">
          <img
            src={p?.avatar_path ?? "/avatar.png"}
            alt="Md Masum Molla"
            className="h-32 w-32 sm:h-40 sm:w-40 rounded-2xl object-cover border-2 border-term/40 bg-card shadow-xl"
          />
        </div>
      </div>

      {/* Summary / Biography */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-ink flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-term"></span> Biography
        </h2>
        <div className="rounded-2xl border border-line bg-card p-6 sm:p-8 leading-relaxed text-ink2 space-y-4 text-base sm:text-lg">
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
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-ink flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-term"></span> Education
        </h2>
        <div className="space-y-4">
          <div className="rounded-2xl border border-line bg-card p-6 sm:p-7 space-y-3 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-muted">
              <span className="text-base font-bold text-term">Khulna University of Engineering & Technology (KUET)</span>
              <span>Jan 2022 – Present</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Bachelor of Science in Computer Science and Engineering (B.Sc. CSE)
            </h3>
            <p className="text-sm sm:text-base text-ink2 leading-relaxed">
              <strong className="text-ink">Core Coursework:</strong> Data Structures and Algorithms, Computer Architecture, Operating Systems, Database Management Systems (SQL), Artificial Intelligence, Compiler Design.
            </p>
            <p className="text-sm sm:text-base text-ink2 leading-relaxed">
              <strong className="text-ink">Academic Languages:</strong> C, C++, Java, Assembly, Python.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-card p-6 sm:p-7 space-y-3 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-muted">
              <span className="text-base font-bold text-term">Narail Govt. Victoria College</span>
              <span>Graduated</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Higher Secondary Certificate (HSC) — Science
            </h3>
            <p className="text-sm sm:text-base text-ink2">
              <strong className="text-term font-semibold">GPA: 5.00 / 5.00</strong> (Perfect Academic Standing)
            </p>
          </div>
        </div>
      </section>

      {/* Professional Experience & Leadership */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-ink flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-term"></span> Experience & Community Leadership
        </h2>
        <div className="space-y-4">
          <div className="rounded-2xl border border-line bg-card p-6 sm:p-7 space-y-3 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-muted">
              <span className="text-base font-bold text-term">H4K2LIV3 Academy</span>
              <span>Aug 2025 – Present</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-ink">Mentor — Penetration Testing</h3>
            <ul className="text-sm sm:text-base text-ink2 space-y-2 list-disc list-inside leading-relaxed">
              <li>Mentored students preparing for the eJPT (eLearnSecurity Junior Penetration Tester) certification.</li>
              <li>Guided hands-on laboratory sessions in TryHackMe and VulnHub focusing on vulnerability analysis and exploitation.</li>
              <li>Provided 1:1 and group mentorship sessions to troubleshoot offensive security challenges and lab environments.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-card p-6 sm:p-7 space-y-3 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-muted">
              <span className="text-base font-bold text-term">KUET Cyber Security Club (KCSC)</span>
              <span>2024 – Present</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-ink">Co-Founder & President</h3>
            <ul className="text-sm sm:text-base text-ink2 space-y-2 list-disc list-inside leading-relaxed">
              <li>Established the official cybersecurity community and student research chapter at KUET.</li>
              <li>Orchestrate university CTF teams, vulnerability research bootcamps, and technical defense workshops.</li>
              <li>Drive educational initiatives on secure coding, reverse engineering, and offensive tradecraft.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Technical Skills Matrix */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-ink flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-term"></span> Technical Skills Matrix
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {Object.entries(skillsByCategory).map(([cat, list]) => (
            <div key={cat} className="rounded-2xl border border-line bg-card p-6 space-y-3 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-term">
                {cat}
              </h3>
              <div className="flex flex-wrap gap-2">
                {list.map((name) => (
                  <span
                    key={name}
                    className="rounded-lg border border-line/80 bg-black/40 px-3 py-1.5 text-xs sm:text-sm font-medium text-ink2 hover:border-term hover:text-ink transition-colors"
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
      <section className="rounded-2xl border border-line bg-card p-8 space-y-5">
        <h2 className="text-xl font-bold text-ink">Resume & Direct Links</h2>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="/cv.pdf"
            download="Md_Masum_Molla_CV.pdf"
            className="rounded-xl bg-term px-5 py-3 text-sm sm:text-base font-semibold text-bg hover:bg-term/90 transition-all shadow-md"
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

