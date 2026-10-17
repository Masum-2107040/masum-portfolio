import "server-only";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import { hasSupabase } from "@/lib/env";
import { BUCKET, buildStoragePath, sniffMatches, validateUploadMeta, type Folder, type UploadKind } from "./upload";

// Call only after requireAdmin() succeeded.
export async function uploadAsset(supabase: SupabaseClient | any, file: File, kind: UploadKind, folder: Folder) {
  const meta = validateUploadMeta({ name: file.name, type: file.type, size: file.size }, kind);
  if (!meta.ok) return { ok: false as const, error: meta.error };

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!sniffMatches(bytes, meta.contentType)) {
    return { ok: false as const, error: "File contents do not match the declared type." };
  }

  // Local mode (when Supabase is unconfigured)
  if (!hasSupabase()) {
    try {
      const fileName = `${crypto.randomUUID()}.${meta.ext}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const fullPath = path.join(uploadDir, fileName);
      fs.writeFileSync(fullPath, bytes);

      const publicPath = `/uploads/${folder}/${fileName}`;
      return { ok: true as const, path: publicPath };
    } catch (err) {
      console.error("Local file upload error:", err);
      return { ok: false as const, error: "Failed to save file locally." };
    }
  }

  // Cloud Supabase mode
  const storagePath = buildStoragePath(folder, meta.ext);
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, bytes, { contentType: meta.contentType, upsert: false, cacheControl: "31536000" });

  if (error) return { ok: false as const, error: "Upload failed." };

  await supabase.from("media").insert({
    original_filename: file.name.slice(0, 200),
    storage_path: storagePath,
    content_type: meta.contentType,
    file_size: file.size,
  });

  return { ok: true as const, path: storagePath };
}
