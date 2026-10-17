import "server-only";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_URL, SUPABASE_ANON_KEY, hasSupabase } from "@/lib/env";

// Session-aware server client (Server Components, Server Actions, Route Handlers). Acts as the signed-in user, so RLS applies.
export async function createServerSupabase() {
  const store = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => store.getAll(),
      setAll(list: { name: string; value: string; options: CookieOptions }[]) {
        try { list.forEach(({ name, value, options }) => store.set(name, value, options)); }
        catch { /* called from a Server Component; middleware refreshes the session instead */ }
      },
    },
  });
}

// Server-side admin gate. Use in every admin page and mutation; never trust the UI or middleware alone.
export type AdminAuth = { ok: false } | { ok: true; supabase: Awaited<ReturnType<typeof createServerSupabase>>; user: { id: string; email?: string } };
export async function requireAdmin(): Promise<AdminAuth> {
  if (!hasSupabase()) return { ok: false };
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser(); // getUser() validates the JWT with Supabase, unlike getSession()
  if (!user) return { ok: false };
  const { data, error } = await supabase.rpc("is_admin");
  if (error || data !== true) return { ok: false };
  return { ok: true, supabase, user: { id: user.id, email: user.email } };
}
