import type { Field } from "./modules";
export const SOCIAL_KEYS = ["github", "linkedin", "x", "website"] as const;
export type PendingFile = { file: File; field: Field };

// Turns multipart FormData into raw values for Zod. Existing file paths come from the DB row (`current`), never from the client.
export function readForm(fields: Field[], fd: FormData, current: Record<string, unknown> | null) {
  const values: Record<string, unknown> = {};
  const files: PendingFile[] = [];
  for (const f of fields) {
    switch (f.type) {
      case "bool": values[f.name] = fd.get(f.name) === "on"; break;
      case "tags": values[f.name] = String(fd.get(f.name) ?? "").split(/[,\n]/).map(s => s.trim()).filter(Boolean).filter((v, i, a) => a.indexOf(v) === i); break;
      case "social": {
        const o: Record<string, string> = {};
        for (const k of SOCIAL_KEYS) { const v = String(fd.get(`${f.name}.${k}`) ?? "").trim(); if (v) o[k] = v; }
        values[f.name] = o; break;
      }
      case "image": case "pdf": case "file": {
        const upload = fd.get(f.name), clear = fd.get(`${f.name}__clear`) === "on";
        values[f.name] = clear ? "" : String(current?.[f.name] ?? "");
        if (!clear && typeof upload === "object" && upload !== null && "size" in upload && (upload as File).size > 0) files.push({ file: upload as File, field: f });
        break;
      }
      default: values[f.name] = String(fd.get(f.name) ?? "");
    }
  }
  return { values, files };
}
