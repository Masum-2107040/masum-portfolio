import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, listProjects } from "@/lib/queries";
import { publicAssetUrl } from "@/lib/storage/upload";
import { ExtLink, Tags } from "@/components/site/ui";
import Markdown from "@/components/Markdown";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;
export const generateStaticParams = async () => {
  const projects = await listProjects();
  return projects.map((p) => ({ slug: p.slug }));
};

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const p = await getProject((await params).slug);
  return p
    ? { title: `${p.title} — Md Masum Molla`, description: p.summary ?? undefined }
    : { title: "Project Not Found" };
}

export default async function ProjectDetail({ params }: P) {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) notFound();

  const cover = publicAssetUrl(p.cover_image_path);

  return (
    <main id="main" className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-xs font-mono text-muted hover:text-term transition-colors"
        >
          ← Back to Projects
        </Link>
      </div>

      <header className="space-y-3 border-b border-line pb-6">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
          <span className="rounded bg-term/10 px-2 py-0.5 text-term border border-term/20">
            {p.category}
          </span>
          <span>•</span>
          <span className="capitalize">{p.status?.replace(/_/g, " ")}</span>
          {p.start_date && (
            <>
              <span>•</span>
              <span>Started {formatDate(p.start_date)}</span>
            </>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink font-mono">
          {p.title}
        </h1>

        {p.summary && (
          <p className="text-base sm:text-lg leading-relaxed text-ink2">
            {p.summary}
          </p>
        )}

        <Tags items={p.technologies} />
      </header>

      {cover && (
        <div className="overflow-hidden rounded-xl border border-line bg-card">
          <img
            src={cover}
            alt={`${p.title} cover`}
            loading="lazy"
            className="w-full object-cover"
          />
        </div>
      )}

      {/* Description / Markdown Body */}
      {p.description && (
        <section className="rounded-xl border border-line bg-card p-6 sm:p-8">
          <Markdown source={p.description} />
        </section>
      )}

      {/* Links Footer */}
      <footer className="flex flex-wrap items-center gap-4 pt-4 border-t border-line/60">
        {p.repository_url && <ExtLink href={p.repository_url}>GitHub Repository ↗</ExtLink>}
        {p.demo_url && <ExtLink href={p.demo_url}>Live Demo ↗</ExtLink>}
        {p.documentation_url && <ExtLink href={p.documentation_url}>Documentation ↗</ExtLink>}
      </footer>
    </main>
  );
}
