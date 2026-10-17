import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, listPosts } from "@/lib/queries";
import { Tags } from "@/components/site/ui";
import Markdown from "@/components/Markdown";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;
export const generateStaticParams = async () => {
  const posts = await listPosts();
  return posts.map((p) => ({ slug: p.slug }));
};

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const p = await getPost((await params).slug);
  return p
    ? { title: `${p.title} — Md Masum Molla`, description: p.excerpt ?? undefined }
    : { title: "Post Not Found" };
}

export default async function Post({ params }: P) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) notFound();

  return (
    <main id="main" className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-xs font-mono text-muted hover:text-term transition-colors"
        >
          ← Back to Blog & Write-ups
        </Link>
      </div>

      <article className="space-y-6">
        <header className="space-y-3 border-b border-line pb-6">
          <div className="flex items-center gap-2 font-mono text-xs text-muted">
            <span className="text-term font-semibold">Security Write-up</span>
            <span>•</span>
            <span>{formatDate(p.published_at)}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink font-mono">
            {p.title}
          </h1>

          {p.excerpt && (
            <p className="text-base leading-relaxed text-ink2 italic">
              {p.excerpt}
            </p>
          )}

          <Tags items={p.tags} />
        </header>

        <div className="rounded-xl border border-line bg-card/60 p-6 sm:p-8">
          <Markdown source={p.content ?? ""} />
        </div>
      </article>
    </main>
  );
}
