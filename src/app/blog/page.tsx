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
    <main id="main" className="mx-auto max-w-4xl px-6 py-12 space-y-10">
      <PageHeader
        title="Security Blog & Technical Write-ups"
        intro="In-depth walkthroughs on offensive tradecraft, Active Directory exploitation chains, API security audits, and agentic AI security research."
      />

      <div className="space-y-6">
        {items.map((p) => (
          <article
            key={p.id}
            className="rounded-2xl border border-line bg-card p-7 sm:p-9 hover:border-term/70 transition-all group space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between text-xs sm:text-sm text-muted">
              <span>{p.published_at ? formatDate(p.published_at) : "Recent"}</span>
              <span className="text-term font-semibold">Technical Analysis</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-ink group-hover:text-term transition-colors">
              <Link href={`/blog/${p.slug}`}>{p.title}</Link>
            </h2>

            {p.excerpt && (
              <p className="text-base sm:text-lg leading-relaxed text-ink2">
                {p.excerpt}
              </p>
            )}

            <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-line/40">
              <Tags items={p.tags} />
              <Link
                href={`/blog/${p.slug}`}
                className="text-sm sm:text-base font-semibold text-term hover:underline"
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

