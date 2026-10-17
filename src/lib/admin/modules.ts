import type { z } from "zod";
import { projectInput, certificateInput, achievementInput, researchInput, blogInput, skillInput, profileInput } from "@/lib/validation";
import type { Folder } from "@/lib/storage/upload";

// "image" = JPEG/PNG/WebP, "pdf" = PDF, "file" = either. "social" = fixed set of profile links.
export type FieldType = "text" | "textarea" | "markdown" | "url" | "email" | "date" | "number" | "bool" | "tags" | "select" | "image" | "pdf" | "file" | "social";
export type Field = { name: string; label: string; type: FieldType; required?: boolean; options?: string[]; folder?: Folder; help?: string };
export type ModuleKey = "projects" | "research" | "certificates" | "achievements" | "blog" | "skills" | "profile";
export type AdminModule = {
  key: ModuleKey; label: string; singular: string; table: string; schema: z.ZodTypeAny; fields: Field[];
  slugFrom?: string; orderBy: { col: string; asc: boolean }; listCols: { key: string; label: string }[];
  published: { col: string; value: boolean | string }; hasUpdatedAt: boolean; singleton?: boolean;
};
const T = (name: string, label: string, extra: Partial<Field> = {}): Field => ({ name, label, type: "text", ...extra });
const pub: Field[] = [{ name: "is_featured", label: "Featured", type: "bool" }, { name: "is_published", label: "Published (visible on the public site)", type: "bool" }];

export const MODULES: Record<ModuleKey, AdminModule> = {
  projects: { key: "projects", label: "Projects", singular: "project", table: "projects", schema: projectInput, slugFrom: "title", hasUpdatedAt: true,
    orderBy: { col: "created_at", asc: false }, listCols: [{ key: "title", label: "Title" }, { key: "category", label: "Category" }], published: { col: "is_published", value: true },
    fields: [T("title", "Title", { required: true }), T("slug", "Slug", { help: "Leave blank to generate from the title." }), { name: "summary", label: "Summary", type: "textarea" },
      { name: "description", label: "Description", type: "textarea" }, T("category", "Category"), { name: "technologies", label: "Technologies", type: "tags", help: "Comma-separated." },
      { name: "cover_image_path", label: "Cover image", type: "image", folder: "projects" }, { name: "repository_url", label: "Repository URL", type: "url" },
      { name: "demo_url", label: "Demo URL", type: "url" }, { name: "documentation_url", label: "Documentation URL", type: "url" },
      { name: "status", label: "Status", type: "select", options: ["planned", "in_progress", "completed", "archived"] },
      { name: "start_date", label: "Start date", type: "date" }, { name: "completion_date", label: "Completion date", type: "date" }, ...pub] },
  research: { key: "research", label: "Research", singular: "paper", table: "research_papers", schema: researchInput, slugFrom: "title", hasUpdatedAt: true,
    orderBy: { col: "created_at", asc: false }, listCols: [{ key: "title", label: "Title" }, { key: "publication_status", label: "Status" }], published: { col: "is_published", value: true },
    fields: [T("title", "Title", { required: true }), T("slug", "Slug", { help: "Leave blank to generate from the title." }), { name: "abstract", label: "Abstract", type: "textarea" },
      { name: "authors", label: "Authors", type: "tags", help: "Comma-separated." }, T("research_area", "Research area"),
      { name: "methodology", label: "Methodology", type: "textarea" }, { name: "evaluation", label: "Evaluation", type: "textarea" }, { name: "results", label: "Results", type: "textarea" },
      { name: "limitations", label: "Limitations", type: "textarea" }, { name: "future_work", label: "Future work", type: "textarea" },
      { name: "publication_status", label: "Publication status", type: "select", options: ["unpublished", "in_preparation", "under_review", "accepted", "published"] },
      T("doi", "DOI"), { name: "publication_url", label: "Publication URL", type: "url" }, { name: "pdf_path", label: "PDF", type: "pdf", folder: "research" },
      { name: "repository_url", label: "Repository URL", type: "url" }, ...pub] },
  certificates: { key: "certificates", label: "Certificates", singular: "certificate", table: "certificates", schema: certificateInput, hasUpdatedAt: true,
    orderBy: { col: "sort_order", asc: true }, listCols: [{ key: "title", label: "Title" }, { key: "issuer", label: "Issuer" }], published: { col: "is_published", value: true },
    fields: [T("title", "Title", { required: true }), T("issuer", "Issuer", { required: true }), T("category", "Category"), { name: "description", label: "Description", type: "textarea" },
      T("credential_id", "Credential ID"), { name: "verification_url", label: "Verification URL", type: "url" }, { name: "issue_date", label: "Issue date", type: "date" },
      { name: "expiry_date", label: "Expiry date", type: "date" }, { name: "file_path", label: "Certificate file (image or PDF)", type: "file", folder: "certificates" },
      { name: "sort_order", label: "Sort order", type: "number" }, ...pub] },
  achievements: { key: "achievements", label: "Achievements", singular: "achievement", table: "achievements", schema: achievementInput, hasUpdatedAt: true,
    orderBy: { col: "event_date", asc: false }, listCols: [{ key: "title", label: "Title" }, { key: "organization", label: "Organization" }], published: { col: "is_published", value: true },
    fields: [T("title", "Title", { required: true }), T("category", "Category"), T("organization", "Organization"), { name: "description", label: "Description", type: "textarea" },
      { name: "event_date", label: "Event date", type: "date" }, T("team_name", "Team name"), T("rank", "Rank"), T("score", "Score"),
      { name: "evidence_url", label: "Evidence URL", type: "url" }, { name: "image_path", label: "Image", type: "image", folder: "achievements" }, ...pub] },
  blog: { key: "blog", label: "Blog", singular: "post", table: "blog_posts", schema: blogInput, slugFrom: "title", hasUpdatedAt: true,
    orderBy: { col: "created_at", asc: false }, listCols: [{ key: "title", label: "Title" }, { key: "slug", label: "Slug" }], published: { col: "status", value: "published" },
    fields: [T("title", "Title", { required: true }), T("slug", "Slug", { help: "Leave blank to generate from the title." }), { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "content", label: "Content (Markdown)", type: "markdown" }, { name: "cover_image_path", label: "Cover image", type: "image", folder: "blog" },
      { name: "tags", label: "Tags", type: "tags", help: "Comma-separated." }, { name: "status", label: "Status", type: "select", options: ["draft", "published", "private", "archived"] }] },
  skills: { key: "skills", label: "Skills", singular: "skill", table: "skills", schema: skillInput, hasUpdatedAt: false,
    orderBy: { col: "sort_order", asc: true }, listCols: [{ key: "name", label: "Name" }, { key: "category", label: "Category" }], published: { col: "is_published", value: true },
    fields: [T("name", "Name", { required: true }), T("category", "Category"), T("proficiency_label", "Proficiency label"), { name: "sort_order", label: "Sort order", type: "number" },
      { name: "is_published", label: "Published (visible on the public site)", type: "bool" }] },
  profile: { key: "profile", label: "Profile", singular: "profile", table: "profiles", schema: profileInput, hasUpdatedAt: true, singleton: true,
    orderBy: { col: "updated_at", asc: false }, listCols: [{ key: "display_name", label: "Name" }], published: { col: "id", value: true },
    fields: [T("display_name", "Display name"), T("headline", "Headline"), { name: "biography", label: "Biography", type: "textarea" }, T("education", "Education"), T("location", "Location"),
      { name: "avatar_path", label: "Avatar", type: "image", folder: "profile" }, { name: "cv_path", label: "CV (PDF)", type: "pdf", folder: "profile" },
      { name: "public_email", label: "Public email (shown on the public site)", type: "email" }, { name: "social_links", label: "Social links", type: "social" }] },
};
export const MODULE_LIST = Object.values(MODULES);
export const getModule = (k: string): AdminModule | null => (Object.prototype.hasOwnProperty.call(MODULES, k) ? MODULES[k as ModuleKey] : null);
