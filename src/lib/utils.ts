export function slugify(input: string): string {
  return input.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "untitled";
}
// Slug collision handling: foo, foo-2, foo-3 ...
export function uniqueSlug(base: string, taken: Iterable<string>): string {
  const set = new Set(taken); if (!set.has(base)) return base;
  for (let i = 2; i < 10_000; i++) { const c = `${base.slice(0, 74)}-${i}`; if (!set.has(c)) return c; }
  return `${base.slice(0, 60)}-${Date.now()}`;
}
// Only http(s) links are ever rendered as hrefs (blocks javascript:, data:, etc.).
export function safeUrl(u?: string | null): string | null {
  if (!u) return null;
  try { const p = new URL(u); return p.protocol === "https:" || p.protocol === "http:" ? p.toString() : null; } catch { return null; }
}
export function formatDate(d?: string | null): string {
  if (!d) return "";
  const t = new Date(d); if (Number.isNaN(t.getTime())) return "";
  return t.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}
