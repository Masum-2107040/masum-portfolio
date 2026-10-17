import "server-only";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_URL, SUPABASE_ANON_KEY, hasSupabase } from "@/lib/env";
import { getLocalDbClient } from "@/lib/db/local-db";

// Session-aware server client (Server Components, Server Actions, Route Handlers).
export async function createServerSupabase() {
  if (!hasSupabase()) {
    return getLocalDbClient() as any;
  }

  const store = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => store.getAll(),
      setAll(list: { name: string; value: string; options: CookieOptions }[]) {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          /* called from a Server Component; middleware refreshes the session instead */
        }
      },
    },
  });
}

// Server-side admin gate. Use in every admin page and mutation.
export type AdminAuth =
  | { ok: false }
  | { ok: true; supabase: any; user: { id: string; email?: string } };

export async function requireAdmin(): Promise<AdminAuth> {
  const store = await cookies();

  // Local Admin Mode
  if (!hasSupabase()) {
    const isAuthed = store.get("local_admin_session")?.value === "authenticated";
    if (!isAuthed) return { ok: false };
    return {
      ok: true,
      supabase: getLocalDbClient() as any,
      user: { id: "00000000-0000-0000-0000-000000000001", email: "mollamasum764@gmail.com" },
    };
  }

  // Cloud Supabase Mode
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { ok: false };
  const { data, error } = await supabase.rpc("is_admin");
  if (error || data !== true) return { ok: false };

  return { ok: true, supabase, user: { id: user.id, email: user.email } };
}
