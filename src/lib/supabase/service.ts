import "server-only";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "@/lib/env";

// Service-role client: bypasses RLS. Server-only (the import above fails the build if a client component pulls it in).
// Use ONLY for narrow, validated operations such as inserting contact messages; never for user-driven reads or writes.
export function serviceKey() { return process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""; }
export function createServiceClient() {
  const key = serviceKey();
  if (!SUPABASE_URL || !key) return null;
  return createClient(SUPABASE_URL, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
