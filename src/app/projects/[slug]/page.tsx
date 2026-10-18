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
    <main id="main" className="mx-auto max-w-3xl px-6 py-12 space-y-10">
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-muted hover:text-term transition-colors"
        >
          ← Back to Projects
        </Link>
      </div>

      <header className="space-y-4 border-b border-line pb-8">
        <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-ink2">
          <span className="rounded-md bg-term/10 px-2.5 py-1 text-term border border-term/20 font-semibold">
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

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink">
          {p.title}
        </h1>

        {p.summary && (
          <p className="text-lg sm:text-xl leading-relaxed text-ink2">
            {p.summary}
          </p>
        )}

        <Tags items={p.technologies} />
      </header>

      {cover && (
        <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-lg">
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
        <section className="rounded-2xl border border-line bg-card p-6 sm:p-10 shadow-sm">
          <Markdown source={p.description} />
        </section>
      )}

      {/* Links Footer */}
      <footer className="flex flex-wrap items-center gap-6 pt-4 border-t border-line/60">
        {p.repository_url && <ExtLink href={p.repository_url}>GitHub Repository ↗</ExtLink>}
        {p.demo_url && <ExtLink href={p.demo_url}>Live Demo ↗</ExtLink>}
        {p.documentation_url && <ExtLink href={p.documentation_url}>Documentation ↗</ExtLink>}
      </footer>
    </main>
  );
}

