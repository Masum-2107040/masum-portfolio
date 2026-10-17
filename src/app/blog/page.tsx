import type { Metadata } from "next";
import Link from "next/link";
import { listPosts } from "@/lib/queries";
import { PageHeader, Tags } from "@/components/site/ui";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Security Blog & Write-ups — Md Masum Molla",
  description: "Technical articles on Active Directory penetration testing, AI security frameworks, and API vulnerability research.",
};

export default async function Blog() {
  const items = await listPosts();

  return (
    <main id="main" className="mx-auto max-w-4xl px-6 py-12 space-y-8">
      <PageHeader
        title="Security Blog & Technical Write-ups"
        intro="In-depth walkthroughs on offensive tradecraft, Active Directory exploitation chains, API security audits, and agentic AI security research."
      />

      <div className="space-y-6">
        {items.map((p) => (
          <article
            key={p.id}
            className="rounded-xl border border-line bg-card p-6 sm:p-7 hover:border-term/70 transition-all group space-y-3"
          >
            <div className="flex items-center justify-between text-xs font-mono text-muted">
              <span>{p.published_at ? formatDate(p.published_at) : "Recent"}</span>
              <span className="text-term/80 font-mono">Technical Analysis</span>
            </div>

            <h2 className="text-xl font-semibold text-ink group-hover:text-term transition-colors font-mono">
              <Link href={`/blog/${p.slug}`}>{p.title}</Link>
            </h2>

            {p.excerpt && (
              <p className="text-xs sm:text-sm leading-relaxed text-ink2">
                {p.excerpt}
              </p>
            )}

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-line/40">
              <Tags items={p.tags} />
              <Link
                href={`/blog/${p.slug}`}
                className="text-xs font-mono text-term hover:underline font-semibold"
              >
                Read Article →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
