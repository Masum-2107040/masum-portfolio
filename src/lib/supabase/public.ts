import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY, hasSupabase } from "@/lib/env";

// Cookie-less anon client for public pages. RLS limits it to published rows, so it is safe to use
// in statically generated / ISR pages. Returns null when env is not configured (build without Supabase).
export function createPublicClient(): SupabaseClient | null {
  if (!hasSupabase()) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
}
