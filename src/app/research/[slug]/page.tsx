import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResearch, listResearch } from "@/lib/queries";
import { publicAssetUrl } from "@/lib/storage/upload";
import { ExtLink } from "@/components/site/ui";

export const revalidate = 60;
export const generateStaticParams = async () => {
  const papers = await listResearch();
  return papers.map((p) => ({ slug: p.slug }));
};

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const r = await getResearch((await params).slug);
  return r
    ? { title: `${r.title} — Md Masum Molla`, description: r.abstract?.slice(0, 160) }
    : { title: "Paper Not Found" };
}

export default async function ResearchDetail({ params }: P) {
  const { slug } = await params;
  const r = await getResearch(slug);
  if (!r) notFound();

  const pdf = publicAssetUrl(r.pdf_path);

  return (
    <main id="main" className="mx-auto max-w-3xl px-6 py-12 space-y-10">
      <div>
        <Link
          href="/research"
          className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-muted hover:text-term transition-colors"
        >
          ← Back to Research
        </Link>
      </div>

      <header className="space-y-4 border-b border-line pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-ink2">
          <span className="rounded-md bg-term/10 px-3 py-1 text-term border border-term/20 uppercase font-semibold">
            {r.publication_status?.replace(/_/g, " ")}
          </span>
          <span>•</span>
          <span className="font-medium">{r.research_area}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink">
          {r.title}
        </h1>

        <p className="text-sm sm:text-base text-ink2">
          Authors: <strong className="text-ink">{r.authors?.join(", ") ?? "Md Masum Molla"}</strong> (Khulna University of Engineering & Technology)
        </p>
      </header>

      {/* Structured Sections */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-line bg-card p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-term">Abstract</h2>
          <p className="text-base sm:text-lg leading-relaxed text-ink2">{r.abstract}</p>
        </div>

        {r.methodology && (
          <div className="rounded-2xl border border-line bg-card p-6 sm:p-8 space-y-3 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-term">Methodology & Framework Architecture</h2>
            <p className="text-base sm:text-lg leading-relaxed text-ink2">{r.methodology}</p>
          </div>
        )}

        {r.evaluation && (
          <div className="rounded-2xl border border-line bg-card p-6 sm:p-8 space-y-3 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-term">Experimental Evaluation</h2>
            <p className="text-base sm:text-lg leading-relaxed text-ink2">{r.evaluation}</p>
          </div>
        )}

        {r.results && (
          <div className="rounded-2xl border border-line bg-card p-6 sm:p-8 space-y-3 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-term">Key Results & Findings</h2>
            <p className="text-base sm:text-lg leading-relaxed text-ink2">{r.results}</p>
          </div>
        )}

        {r.limitations && (
          <div className="rounded-2xl border border-line bg-card p-6 sm:p-8 space-y-3 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-term">Scope & Limitations</h2>
            <p className="text-base sm:text-lg leading-relaxed text-ink2">{r.limitations}</p>
          </div>
        )}

        {r.future_work && (
          <div className="rounded-2xl border border-line bg-card p-6 sm:p-8 space-y-3 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-term">Future Research Directions</h2>
            <p className="text-base sm:text-lg leading-relaxed text-ink2">{r.future_work}</p>
          </div>
        )}
      </div>

      <footer className="flex flex-wrap items-center gap-6 pt-4 border-t border-line">
        {pdf && (
          <a href={pdf} rel="noopener noreferrer" className="text-term font-semibold text-sm sm:text-base underline underline-offset-4">
            Download Paper (PDF) ↗
          </a>
        )}
        {r.publication_url && <ExtLink href={r.publication_url}>Publication Portal ↗</ExtLink>}
        {r.repository_url && <ExtLink href={r.repository_url}>GitHub Code Repository ↗</ExtLink>}
        {r.doi && <span className="font-mono text-xs sm:text-sm text-muted">DOI: {r.doi}</span>}
      </footer>
    </main>
  );
}

