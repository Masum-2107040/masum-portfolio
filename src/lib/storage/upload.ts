// Upload validation: MIME + extension allowlist, size caps, magic-byte sniffing, server-generated paths.
// SVG and HTML are deliberately NOT allowed (script execution risk). Filenames from users are never used in paths.
export const BUCKET = "public-assets";
export const FOLDERS = ["projects", "research", "certificates", "achievements", "blog", "profile"] as const;
export type Folder = (typeof FOLDERS)[number];
export type UploadKind = "image" | "document";

const RULES: Record<UploadKind, { types: Record<string, string[]>; maxBytes: number }> = {
  image: { types: { "image/jpeg": ["jpg", "jpeg"], "image/png": ["png"], "image/webp": ["webp"] }, maxBytes: 5 * 1024 * 1024 },
  document: { types: { "application/pdf": ["pdf"] }, maxBytes: 10 * 1024 * 1024 },
};

export type UploadCheck = { ok: true; ext: string; contentType: string } | { ok: false; error: string };

export function validateUploadMeta(f: { name: string; type: string; size: number }, kind: UploadKind): UploadCheck {
  const rule = RULES[kind];
  if (!(f.size > 0)) return { ok: false, error: "File is empty." };
  if (f.size > rule.maxBytes) return { ok: false, error: `File too large (max ${rule.maxBytes / 1024 / 1024} MB).` };
  const exts = rule.types[f.type];
  if (!exts) return { ok: false, error: `File type not allowed: ${f.type || "unknown"}.` };
  const ext = f.name.includes(".") ? f.name.split(".").pop()!.toLowerCase() : "";
  if (!exts.includes(ext)) return { ok: false, error: "File extension does not match its type." };
  return { ok: true, ext: ext === "jpeg" ? "jpg" : ext, contentType: f.type };
}

// Verify the real bytes match the declared type (the browser-supplied MIME type is attacker-controlled).
export function sniffMatches(bytes: Uint8Array, contentType: string): boolean {
  const at = (o: number, s: string) => s.split("").every((c, i) => bytes[o + i] === c.charCodeAt(0));
  switch (contentType) {
    case "image/jpeg": return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    case "image/png": return bytes[0] === 0x89 && at(1, "PNG") && bytes[4] === 0x0d && bytes[5] === 0x0a;
    case "image/webp": return at(0, "RIFF") && at(8, "WEBP");
    case "application/pdf": return at(0, "%PDF-");
    default: return false;
  }
}

// Server-generated, traversal-proof object path: <folder>/<yyyy>/<uuid>.<ext>
export function buildStoragePath(folder: Folder, ext: string): string {
  if (!(FOLDERS as readonly string[]).includes(folder)) throw new Error("Invalid upload folder");
  if (!/^[a-z0-9]{2,5}$/.test(ext)) throw new Error("Invalid extension");
  return `${folder}/${new Date().getUTCFullYear()}/${crypto.randomUUID()}.${ext}`;
}

export function publicAssetUrl(path?: string | null): string | null {
  if (!path || path.includes("..")) return null;
  if (path.startsWith("/") || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return `/${path}`;
  return `${base}/storage/v1/object/public/${BUCKET}/${path.split("/").map(encodeURIComponent).join("/")}`;
}
