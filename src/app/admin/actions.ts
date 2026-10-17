"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import { requireAdmin, createServerSupabase } from "@/lib/supabase/server";
import { hasSupabase } from "@/lib/env";
import { getModule } from "@/lib/admin/modules";
import { readForm } from "@/lib/admin/form";
import { slugify, uniqueSlug } from "@/lib/utils";
import { uploadAsset } from "@/lib/storage/upload-server";
import { revalidatePublic } from "@/lib/admin/revalidate";

export type FormState = { error?: string; fieldErrors?: Record<string, string[]> };
const uuid = z.string().uuid();

// Every mutation starts with requireAdmin(): session validated with Supabase + is_admin(). Writes then go through
// the user-scoped client, so RLS ("admin all") enforces the same rule a second time in the database.
export async function saveRecord(moduleKey: string, id: string | null, _prev: FormState, fd: FormData): Promise<FormState> {
  const auth = await requireAdmin();
  if (!auth.ok) return { error: "Not authorized." };
  const mod = getModule(moduleKey);
  if (!mod) return { error: "Unknown module." };
  if (id !== null && !uuid.safeParse(id).success) return { error: "Invalid record id." };
  const { supabase } = auth;

  let current: Record<string, any> | null = null;
  if (id) {
    const { data } = await supabase.from(mod.table).select("*").eq("id", id).maybeSingle();
    if (!data) return { error: "Record not found." };
    current = data;
  } else if (mod.singleton) {
    const { data } = await supabase.from(mod.table).select("*").limit(1).maybeSingle();
    if (data) { current = data; id = data.id; }
  }

  const { values, files } = readForm(mod.fields, fd, current);

  if (mod.slugFrom) {
    const typed = String(values.slug ?? "").trim();
    const base = slugify(typed || (current?.slug as string | undefined) || String(values[mod.slugFrom] ?? ""));
    const { data: rows } = await supabase.from(mod.table).select("id,slug").like("slug", `${base}%`);
    const taken = (rows ?? []).filter((r: any) => r.id !== id).map((r: any) => r.slug as string);
    if (typed && taken.includes(base)) return { fieldErrors: { slug: ["This slug is already in use."] } };
    values.slug = typed || current?.slug ? base : uniqueSlug(base, taken); // auto slugs get -2, -3 ... on collision
  }

  const parsed = mod.schema.safeParse(values);
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  const data = parsed.data as Record<string, unknown>;

  // Upload only after everything else validated, so bad forms do not leave orphan files.
  for (const { file, field } of files) {
    const kind = field.type === "image" ? "image" : field.type === "pdf" ? "document" : file.type === "application/pdf" ? "document" : "image";
    const up = await uploadAsset(supabase, file, kind, field.folder!);
    if (!up.ok) return { fieldErrors: { [field.name]: [up.error] } };
    data[field.name] = up.path;
  }

  const payload: Record<string, unknown> = {};
  for (const f of mod.fields) payload[f.name] = data[f.name]; // only fields from the form; untouched columns (e.g. gallery_paths) stay as is
  if (mod.hasUpdatedAt) payload.updated_at = new Date().toISOString();
  if (mod.key === "blog" && payload.status === "published" && !current?.published_at) payload.published_at = new Date().toISOString();

  const res = id ? await supabase.from(mod.table).update(payload).eq("id", id) : await supabase.from(mod.table).insert(payload);
  if (res.error) return { error: res.error.code === "23505" ? "That slug is already in use." : "Could not save. Check your input and try again." };
  revalidatePublic(mod.key);
  redirect(mod.singleton ? "/admin" : `/admin/${mod.key}`);
}

export async function deleteRecord(moduleKey: string, id: string): Promise<void> {
  const auth = await requireAdmin();
  if (!auth.ok) redirect("/admin/login");
  const mod = getModule(moduleKey);
  if (!mod || mod.singleton || !uuid.safeParse(id).success) redirect("/admin");
  const { error } = await auth.supabase.from(mod.table).delete().eq("id", id);
  if (!error) revalidatePublic(mod.key); // only claim a change happened if the delete succeeded
  redirect(`/admin/${mod.key}`);
}

export async function setMessageRead(id: string, read: boolean): Promise<void> {
  const auth = await requireAdmin();
  if (!auth.ok) redirect("/admin/login");
  if (!uuid.safeParse(id).success) redirect("/admin/messages");
  await auth.supabase.from("contact_messages").update({ is_read: read }).eq("id", id);
  redirect(`/admin/messages/${id}`);
}

export async function deleteMessage(id: string): Promise<void> {
  const auth = await requireAdmin();
  if (!auth.ok) redirect("/admin/login");
  if (uuid.safeParse(id).success) await auth.supabase.from("contact_messages").delete().eq("id", id);
  redirect("/admin/messages");
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete("local_admin_session");
  if (hasSupabase()) {
    const supabase = await createServerSupabase();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}
