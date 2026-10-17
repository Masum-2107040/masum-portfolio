import type { Metadata } from "next";
import Link from "next/link";
import { listProjects } from "@/lib/queries";
import { PageHeader, Tags } from "@/components/site/ui";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Projects — Md Masum Molla",
  description: "Cybersecurity, autonomous pentesting, and secure software engineering projects by Md Masum Molla.",
};

export default async function Projects() {
  const items = await listProjects();

  return (
    <main id="main" className="mx-auto max-w-4xl px-6 py-12 space-y-8">
      <PageHeader
        title="Security & Engineering Projects"
        intro="Autonomous offensive frameworks, incident response platforms, and security-aware web applications built with rigorous threat modeling."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((p) => (
          <div
            key={p.id}
            className="flex flex-col justify-between rounded-xl border border-line bg-card p-6 hover:border-term/70 transition-all duration-200 group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-muted">
                <span className="rounded bg-term/10 px-2 py-0.5 text-term border border-term/20">
                  {p.category}
                </span>
                <span className="capitalize">{p.status?.replace(/_/g, " ")}</span>
              </div>

              <h2 className="mt-4 text-lg font-semibold text-ink group-hover:text-term transition-colors">
                <Link href={`/projects/${p.slug}`}>{p.title}</Link>
              </h2>

              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink2">
                {p.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-line/40">
              <Tags items={p.technologies} />
              <div className="mt-4 flex items-center justify-between text-xs font-mono">
                <Link
                  href={`/projects/${p.slug}`}
                  className="text-term hover:underline flex items-center gap-1 font-semibold"
                >
                  Project Details →
                </Link>
                {p.repository_url && (
                  <a
                    href={p.repository_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-ink transition-colors"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
