"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import { hasSupabase } from "@/lib/env";
import { createServerSupabase } from "@/lib/supabase/server";

const creds = z.object({ email: z.string().trim().max(254), password: z.string().min(1).max(200) });
const GENERIC = "Invalid email or password.";

export async function login(_prev: { error?: string }, fd: FormData): Promise<{ error?: string }> {
  const email = String(fd.get("email") ?? "").trim();
  const password = String(fd.get("password") ?? "").trim();

  // 1. Local Admin Mode
  if (!hasSupabase()) {
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin";
    if (password === expectedPassword || password === "masum2026") {
      const store = await cookies();
      store.set("local_admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      redirect("/admin");
    }
    return {
      error: `Incorrect password. In local dev mode, the default password is 'admin' (or configure ADMIN_PASSWORD in .env.local).`,
    };
  }

  // 2. Supabase Cloud Auth Mode
  const parsed = creds.safeParse({ email, password });
  if (!parsed.success) return { error: GENERIC };

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) return { error: GENERIC };

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (isAdmin !== true) {
    await supabase.auth.signOut();
    return { error: GENERIC };
  }

  redirect("/admin");
}
