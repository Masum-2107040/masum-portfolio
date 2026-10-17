import Link from "next/link";
import Terminal from "@/components/terminal/Terminal";
import {
  getProfile,
  listProjects,
  listResearch,
  listAchievements,
  listCertificates,
} from "@/lib/queries";
import { Tags } from "@/components/site/ui";

export const revalidate = 60;

export default async function Home() {
  const [profile, projects, research, achievements, certs] = await Promise.all([
    getProfile(),
    listProjects(),
    listResearch(),
    listAchievements(),
    listCertificates(),
  ]);

  const featuredProjects = projects.filter((p) => p.is_featured).slice(0, 3);
  const featuredResearch = research[0];

  return (
    <main id="main" className="mx-auto max-w-5xl px-6 py-12 space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-[#0F1712]/70 via-[#0A0F0C] to-bg p-8 sm:p-10 shadow-2xl backdrop-blur-sm">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-term/5 blur-3xl pointer-events-none"></div>

        <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-8">
          <div className="flex-1 space-y-5 text-center md:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-term/30 bg-term/10 px-3 py-1 font-mono text-xs text-term">
              <span className="h-2 w-2 rounded-full bg-term animate-pulse"></span>
              <span>Available for Pentesting & Security Roles</span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink font-mono">
                {profile?.display_name ?? "Md Masum Molla"}
              </h1>
              <p className="mt-2 text-lg sm:text-xl font-medium text-term font-mono">
                Cybersecurity Researcher & Penetration Tester
              </p>
              <p className="mt-1 text-sm text-muted font-mono">
                Computer Science & Engineering @ Khulna University of Engineering & Technology (KUET)
              </p>
            </div>

            <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-ink2">
              {profile?.biography ??
                "Computer Science student with hands-on experience in competitive CTF environments and security-oriented project development. Demonstrated ability to analyze vulnerabilities, understand attack surfaces, and build applications with secure design principles."}
            </p>

            {/* Quick Contact & CV Actions */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <a
                href="/cv.pdf"
                download="Md_Masum_Molla_CV.pdf"
                className="inline-flex items-center gap-2 rounded-lg bg-term px-4 py-2.5 font-mono text-xs font-semibold text-bg hover:bg-term/90 transition-all shadow-lg shadow-term/20"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume (PDF)
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 font-mono text-xs font-medium text-ink hover:border-term hover:text-term transition-all"
              >
                Get in Touch
              </Link>

              <a
                href="https://www.linkedin.com/in/masum-molla-6845a72a6/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 font-mono text-xs font-medium text-ink2 hover:border-term hover:text-term transition-all"
              >
                LinkedIn Profile
              </a>
            </div>

            {/* Micro Details Row */}
            <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-muted border-t border-line/50">
              <span className="flex items-center gap-1.5">
                <span className="text-term">📍</span> KUET, Fulbarigate, Khulna
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-term">✉️</span> mollamasum764@gmail.com
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-term">📞</span> 01518403124
              </span>
            </div>
          </div>

          {/* Profile Photo with Radar / Cyber Framing */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-term to-muted opacity-30 blur group-hover:opacity-60 transition duration-500"></div>
            <div className="relative overflow-hidden rounded-2xl border-2 border-term/40 bg-card p-1 shadow-2xl">
              <img
                src={profile?.avatar_path ?? "/avatar.png"}
                alt="Md Masum Molla"
                className="h-44 w-44 sm:h-52 sm:w-52 rounded-xl object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute bottom-2 left-2 right-2 rounded-md bg-bg/90 backdrop-blur-md px-2 py-1 text-center font-mono text-[10px] text-term border border-line">
                KUET CSE &apos;26 • Researcher
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics / Key Highlights Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-line bg-card/70 p-4 text-center hover:border-term/60 transition-colors">
          <p className="font-mono text-2xl font-bold text-term">Top 8%</p>
          <p className="mt-1 text-xs text-ink2">TryHackMe Global Rank</p>
        </div>
        <div className="rounded-xl border border-line bg-card/70 p-4 text-center hover:border-term/60 transition-colors">
          <p className="font-mono text-2xl font-bold text-term">20th Rank</p>
          <p className="mt-1 text-xs text-ink2">DIU CyberconCTF 2025</p>
        </div>
        <div className="rounded-xl border border-line bg-card/70 p-4 text-center hover:border-term/60 transition-colors">
          <p className="font-mono text-2xl font-bold text-term">President</p>
          <p className="mt-1 text-xs text-ink2">KUET Cyber Security Club</p>
        </div>
        <div className="rounded-xl border border-line bg-card/70 p-4 text-center hover:border-term/60 transition-colors">
          <p className="font-mono text-2xl font-bold text-term">4+ Certs</p>
          <p className="mt-1 text-xs text-ink2">CNSP, kWAPTA, CPPS, CRTOM</p>
        </div>
      </section>

      {/* Interactive Cyber Terminal */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-term font-mono text-sm">#</span>
            <h2 className="text-lg font-semibold text-ink font-mono">Live Interactive Terminal</h2>
          </div>
          <span className="text-xs text-muted font-mono hidden sm:inline">Type &apos;help&apos; to explore</span>
        </div>
        <Terminal />
      </section>

      {/* Featured Research Spotlight */}
      {featuredResearch && (
        <section className="rounded-xl border border-term/30 bg-gradient-to-br from-card via-card to-[#09130D] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
            <div className="flex items-center gap-2">
              <span className="rounded bg-term/20 px-2 py-0.5 font-mono text-xs font-semibold text-term">
                PRIMARY RESEARCH
              </span>
              <span className="font-mono text-xs text-muted">
                Status: {featuredResearch.publication_status?.replace(/_/g, " ")}
              </span>
            </div>
            <Link
              href={`/research/${featuredResearch.slug}`}
              className="text-xs font-mono text-term hover:underline"
            >
              Read Full Paper →
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            <h3 className="text-xl sm:text-2xl font-semibold text-ink">
              <Link href={`/research/${featuredResearch.slug}`} className="hover:text-term transition-colors">
                {featuredResearch.title}
              </Link>
            </h3>
            <p className="text-sm leading-relaxed text-ink2">
              {featuredResearch.abstract}
            </p>

            <div className="grid sm:grid-cols-3 gap-3 pt-4">
              <div className="rounded-lg border border-line/60 bg-black/30 p-3">
                <p className="text-xs font-mono text-term">01. Multi-Agent Analysis</p>
                <p className="mt-1 text-xs text-muted">Autonomous orchestration across reconnaissance and vulnerability discovery.</p>
              </div>
              <div className="rounded-lg border border-line/60 bg-black/30 p-3">
                <p className="text-xs font-mono text-term">02. Deterministic Fallback</p>
                <p className="mt-1 text-xs text-muted">Zero hallucinations with verified sandbox CLI toolchain execution.</p>
              </div>
              <div className="rounded-lg border border-line/60 bg-black/30 p-3">
                <p className="text-xs font-mono text-term">03. Audit Trail</p>
                <p className="mt-1 text-xs text-muted">Immutable cryptographic logging preserving forensic assessment evidence.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Experience & Leadership Spotlight */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-term font-mono text-sm">#</span>
            <h2 className="text-xl font-semibold text-ink font-mono">Experience & Leadership</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-line bg-card p-5 space-y-2 hover:border-term/60 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-muted">
              <span className="text-term font-semibold">H4K2LIV3 Academy</span>
              <span>Aug 2025 – Present</span>
            </div>
            <h3 className="text-base font-medium text-ink">Cybersecurity Mentor</h3>
            <ul className="text-xs text-ink2 space-y-1.5 list-disc list-inside">
              <li>Mentoring students for eJPT certification, covering penetration testing fundamentals.</li>
              <li>Guiding learners through TryHackMe/VulnHub labs (vulnerability analysis, exploitation).</li>
              <li>Provided 1:1 and group support to troubleshoot complex offensive challenges.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-line bg-card p-5 space-y-2 hover:border-term/60 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-muted">
              <span className="text-term font-semibold">KUET Cyber Security Club (KCSC)</span>
              <span>Co-Founder & President</span>
            </div>
            <h3 className="text-base font-medium text-ink">Club President & Founder</h3>
            <ul className="text-xs text-ink2 space-y-1.5 list-disc list-inside">
              <li>Founded and leading the primary cybersecurity student organization at KUET.</li>
              <li>Conducting workshops on web application security, CTF strategies, and red teaming.</li>
              <li>Organizing university CTF representations and practical lab training bootcamps.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-term font-mono text-sm">#</span>
            <h2 className="text-xl font-semibold text-ink font-mono">Featured Projects</h2>
          </div>
          <Link href="/projects" className="text-xs font-mono text-term hover:underline">
            View All ({projects.length}) →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p) => (
            <div
              key={p.id}
              className="flex flex-col justify-between rounded-xl border border-line bg-card p-5 hover:border-term transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-muted">
                  <span className="text-term/90">{p.category}</span>
                  <span className="capitalize">{p.status?.replace(/_/g, " ")}</span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-ink group-hover:text-term transition-colors">
                  <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink2 line-clamp-3">
                  {p.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-line/40">
                <Tags items={p.technologies?.slice(0, 4)} />
                <div className="mt-3 flex items-center justify-between text-xs font-mono">
                  <Link href={`/projects/${p.slug}`} className="text-term hover:underline">
                    View Details →
                  </Link>
                  {p.repository_url && (
                    <a
                      href={p.repository_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-ink"
                    >
                      Repo ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTF & Competitive Achievements */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-term font-mono text-sm">#</span>
            <h2 className="text-xl font-semibold text-ink font-mono">CTF & Competitive Record</h2>
          </div>
          <Link href="/achievements" className="text-xs font-mono text-term hover:underline">
            All Achievements →
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {achievements.slice(0, 3).map((a) => (
            <div key={a.id} className="rounded-xl border border-line bg-card p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="rounded bg-term/10 px-2 py-0.5 font-mono text-xs font-bold text-term border border-term/20">
                  {a.rank ?? "Ranked"}
                </span>
                <span className="text-[11px] font-mono text-muted">{a.organization}</span>
              </div>
              <h3 className="text-sm font-medium text-ink">{a.title}</h3>
              <p className="text-xs text-ink2 line-clamp-2">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Row */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-term font-mono text-sm">#</span>
            <h2 className="text-xl font-semibold text-ink font-mono">Verified Certifications</h2>
          </div>
          <Link href="/certificates" className="text-xs font-mono text-term hover:underline">
            Verify Certs →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {certs.map((c) => (
            <div key={c.id} className="rounded-lg border border-line bg-card/60 p-3.5 hover:border-term/60 transition-colors">
              <span className="text-[10px] font-mono text-term uppercase tracking-wide">{c.issuer}</span>
              <h3 className="mt-1 text-xs font-semibold text-ink">{c.title}</h3>
              <p className="mt-1 text-[11px] text-muted line-clamp-2">{c.category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="rounded-2xl border border-line bg-gradient-to-r from-card via-[#0c130f] to-card p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold font-mono text-ink">Ready to collaborate or need a security assessment?</h2>
        <p className="max-w-xl mx-auto text-sm text-ink2">
          Feel free to reach out directly via email, phone, or the secure contact form for vulnerability assessments, pentesting engagements, or research discussions.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/contact"
            className="rounded-lg bg-term px-5 py-2.5 font-mono text-xs font-semibold text-bg hover:bg-term/90 transition-all shadow-md"
          >
            Open Contact Form
          </Link>
          <a
            href="mailto:mollamasum764@gmail.com"
            className="rounded-lg border border-line bg-card px-5 py-2.5 font-mono text-xs text-ink hover:border-term hover:text-term transition-all"
          >
            Email: mollamasum764@gmail.com
          </a>
        </div>
      </section>
    </main>
  );
}
