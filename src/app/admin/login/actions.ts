"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { hasSupabase } from "@/lib/env";
import { createServerSupabase } from "@/lib/supabase/server";

const creds = z.object({ email: z.string().trim().email().max(254), password: z.string().min(1).max(200) });
const GENERIC = "Invalid email or password.";

// Sign-in only. There is no signup route; also disable public signups in Supabase Auth settings.
// Brute-force protection comes from Supabase Auth rate limits. Failure messages are generic so accounts cannot be enumerated.
export async function login(_prev: { error?: string }, fd: FormData): Promise<{ error?: string }> {
  if (!hasSupabase()) return { error: "Supabase is not configured on this deployment." };
  const parsed = creds.safeParse({ email: fd.get("email"), password: fd.get("password") });
  if (!parsed.success) return { error: GENERIC };
  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: GENERIC };
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (isAdmin !== true) { await supabase.auth.signOut(); return { error: GENERIC }; } // valid Supabase user but not on the allowlist
  redirect("/admin"); // fixed destination: no ?next= parameter, so no open redirect
}
