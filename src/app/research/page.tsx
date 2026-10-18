import type { Metadata } from "next";
import Link from "next/link";
import { listResearch } from "@/lib/queries";
import { PageHeader } from "@/components/site/ui";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Research — Md Masum Molla",
  description: "Academic and applied cybersecurity research papers, agentic pentesting architectures, and vulnerability discovery.",
};

export default async function Research() {
  const items = await listResearch();

  return (
    <main id="main" className="mx-auto max-w-4xl px-6 py-12 space-y-10">
      <PageHeader
        title="Cybersecurity Research & Papers"
        intro="Applied research in multi-agent autonomous penetration testing, LLM execution determinism, and automated vulnerability triage."
      />

      <div className="space-y-6">
        {items.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border border-line bg-card p-7 sm:p-9 hover:border-term/70 transition-all group space-y-4 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-muted">
              <span className="rounded-md bg-term/10 px-3 py-1 text-term border border-term/20 font-semibold uppercase">
                {r.publication_status?.replace(/_/g, " ")}
              </span>
              <span className="text-ink2 font-medium">{r.research_area}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-ink group-hover:text-term transition-colors">
              <Link href={`/research/${r.slug}`}>{r.title}</Link>
            </h2>

            <p className="text-sm sm:text-base text-ink2">
              Authors: <span className="font-semibold text-ink">{r.authors?.join(", ") ?? "Md Masum Molla"}</span> (KUET)
            </p>

            {r.abstract && (
              <p className="text-base sm:text-lg leading-relaxed text-ink2">
                {r.abstract}
              </p>
            )}

            <div className="pt-3 flex items-center justify-between text-sm sm:text-base">
              <Link
                href={`/research/${r.slug}`}
                className="text-term hover:underline font-semibold"
              >
                Read Paper & Methodology →
              </Link>
              {r.repository_url && (
                <a
                  href={r.repository_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink transition-colors font-medium"
                >
                  Code Repository ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

