import { createPublicClient } from "@/lib/supabase/public";
import {
  FALLBACK_PROFILE,
  FALLBACK_SKILLS,
  FALLBACK_PROJECTS,
  FALLBACK_RESEARCH,
  FALLBACK_ACHIEVEMENTS,
  FALLBACK_CERTIFICATES,
  FALLBACK_POSTS,
} from "@/lib/data/portfolio-data";

// Public data access. Uses the anon client, so RLS guarantees only published rows are returned.
// When Supabase is unconfigured, empty, or a query fails, returns curated fallback CV data.
async function run<T>(
  fn: (c: NonNullable<ReturnType<typeof createPublicClient>>) => PromiseLike<{ data: T | null; error: unknown }>,
  fallback: T
): Promise<T> {
  const c = createPublicClient();
  if (!c) return fallback;
  try {
    const { data, error } = await fn(c);
    if (error || data == null) return fallback;
    if (Array.isArray(data) && data.length === 0 && Array.isArray(fallback) && fallback.length > 0) {
      return fallback;
    }
    return data;
  } catch {
    return fallback;
  }
}

type Row = Record<string, any>;

export const getProfile = () =>
  run<Row | null>(c => c.from("profiles").select("*").limit(1).maybeSingle(), FALLBACK_PROFILE);

export const listSkills = () =>
  run<Row[]>(c => c.from("skills").select("*").order("sort_order"), FALLBACK_SKILLS);

export const listProjects = () =>
  run<Row[]>(
    c => c.from("projects").select("*").order("is_featured", { ascending: false }).order("created_at", { ascending: false }),
    FALLBACK_PROJECTS
  );

export const getProject = async (slug: string) => {
  const fallback = FALLBACK_PROJECTS.find(p => p.slug === slug) ?? null;
  return run<Row | null>(c => c.from("projects").select("*").eq("slug", slug).maybeSingle(), fallback);
};

export const listResearch = () =>
  run<Row[]>(
    c => c.from("research_papers").select("*").order("is_featured", { ascending: false }).order("created_at", { ascending: false }),
    FALLBACK_RESEARCH
  );

export const getResearch = async (slug: string) => {
  const fallback = FALLBACK_RESEARCH.find(r => r.slug === slug) ?? null;
  return run<Row | null>(c => c.from("research_papers").select("*").eq("slug", slug).maybeSingle(), fallback);
};

export const listAchievements = () =>
  run<Row[]>(
    c => c.from("achievements").select("*").order("event_date", { ascending: false, nullsFirst: false }),
    FALLBACK_ACHIEVEMENTS
  );

export const listCertificates = () =>
  run<Row[]>(
    c => c.from("certificates").select("*").order("sort_order").order("issue_date", { ascending: false, nullsFirst: false }),
    FALLBACK_CERTIFICATES
  );

export const listPosts = () =>
  run<Row[]>(
    c =>
      c
        .from("blog_posts")
        .select("id,title,slug,excerpt,tags,published_at,cover_image_path")
        .order("published_at", { ascending: false, nullsFirst: false }),
    FALLBACK_POSTS
  );

export const getPost = async (slug: string) => {
  const fallback = FALLBACK_POSTS.find(p => p.slug === slug) ?? null;
  return run<Row | null>(c => c.from("blog_posts").select("*").eq("slug", slug).maybeSingle(), fallback);
};
