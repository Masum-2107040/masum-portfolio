import { z } from "zod";

export const slugSchema = z.string().trim().min(1).max(80).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "lowercase letters, numbers and single hyphens only");
const text = (max: number) => z.string().trim().max(max);
const optText = (max: number) => text(max).optional().or(z.literal("")).transform(v => v || null);
// Empty string -> null; otherwise must be a valid http(s) URL.
const optUrl = z.string().trim().max(2048).optional().or(z.literal("")).transform(v => v || null)
  .refine(v => v === null || /^https?:\/\//i.test(v) && URL.canParse(v), "must be an http(s) URL");
const optDate = z.string().optional().or(z.literal("")).transform(v => v || null)
  .refine(v => v === null || /^\d{4}-\d{2}-\d{2}$/.test(v), "use YYYY-MM-DD");
const tags = z.array(text(40).min(1)).max(30).default([]);
const bool = z.boolean().default(false);
const storagePath = optText(300).refine(v => v === null || /^[a-z0-9][a-z0-9/_.-]*$/.test(v) && !v.includes(".."), "invalid storage path");

export const projectInput = z.object({
  title: text(160).min(1), slug: slugSchema, summary: optText(400), description: optText(20000), category: optText(60),
  technologies: tags, cover_image_path: storagePath, gallery_paths: z.array(z.string().max(300)).max(20).default([]),
  repository_url: optUrl, demo_url: optUrl, documentation_url: optUrl,
  status: z.enum(["planned", "in_progress", "completed", "archived"]).default("in_progress"),
  is_featured: bool, is_published: bool, start_date: optDate, completion_date: optDate,
});
export const certificateInput = z.object({
  title: text(200).min(1), issuer: text(120).min(1), category: optText(60), description: optText(2000), credential_id: optText(120),
  verification_url: optUrl, issue_date: optDate, expiry_date: optDate, file_path: storagePath,
  is_featured: bool, is_published: bool, sort_order: z.coerce.number().int().min(-1000).max(1000).default(0),
});
export const achievementInput = z.object({
  title: text(200).min(1), category: optText(60), organization: optText(120), description: optText(4000), event_date: optDate,
  team_name: optText(120), rank: optText(60), score: optText(60), evidence_url: optUrl, image_path: storagePath,
  is_featured: bool, is_published: bool,
});
export const researchInput = z.object({
  title: text(240).min(1), slug: slugSchema, abstract: optText(5000), authors: tags, research_area: optText(120),
  methodology: optText(10000), evaluation: optText(10000), results: optText(10000), limitations: optText(10000), future_work: optText(10000),
  publication_status: z.enum(["unpublished", "in_preparation", "under_review", "accepted", "published"]).default("unpublished"),
  doi: optText(120), publication_url: optUrl, pdf_path: storagePath, repository_url: optUrl, is_featured: bool, is_published: bool,
});
export const blogInput = z.object({
  title: text(200).min(1), slug: slugSchema, excerpt: optText(400), content: optText(100000), cover_image_path: storagePath, tags,
  status: z.enum(["draft", "published", "private", "archived"]).default("draft"),
});
export const skillInput = z.object({
  name: text(80).min(1), category: optText(60), proficiency_label: optText(40),
  sort_order: z.coerce.number().int().min(-1000).max(1000).default(0), is_published: bool,
});
export const profileInput = z.object({
  display_name: optText(120), headline: optText(200), biography: optText(10000), education: optText(500), location: optText(120),
  avatar_path: storagePath, cv_path: storagePath, public_email: optText(254).refine(v => v === null || z.string().email().safeParse(v).success, "invalid email"),
  social_links: z.record(z.string().max(30), optUrl).default({}),
});
// Contact form (used in step 7). `website` is the honeypot: real users leave it empty.
export const contactInput = z.object({
  name: text(100).min(1), email: z.string().trim().email().max(254), subject: text(150).min(1), message: text(5000).min(10),
  website: z.string().max(0).optional().default(""),
});

export type ProjectInput = z.infer<typeof projectInput>;
export type BlogInput = z.infer<typeof blogInput>;
