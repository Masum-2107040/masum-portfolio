import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { BUCKET, buildStoragePath, sniffMatches, validateUploadMeta, type Folder, type UploadKind } from "./upload";

// Call only after requireAdmin() succeeded. The Supabase client must be the user-scoped one so storage RLS (is_admin) also applies.
export async function uploadAsset(supabase: SupabaseClient, file: File, kind: UploadKind, folder: Folder) {
  const meta = validateUploadMeta({ name: file.name, type: file.type, size: file.size }, kind);
  if (!meta.ok) return { ok: false as const, error: meta.error };
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!sniffMatches(bytes, meta.contentType)) return { ok: false as const, error: "File contents do not match the declared type." };
  const path = buildStoragePath(folder, meta.ext);
  const { error } = await supabase.storage.from(BUCKET).upload(path, bytes, { contentType: meta.contentType, upsert: false, cacheControl: "31536000" });
  if (error) return { ok: false as const, error: "Upload failed." };
  await supabase.from("media").insert({ original_filename: file.name.slice(0, 200), storage_path: path, content_type: meta.contentType, file_size: file.size });
  return { ok: true as const, path };
}
