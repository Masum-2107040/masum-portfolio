import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
import { hasSupabase } from "@/lib/env";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  if ((await requireAdmin()).ok) redirect("/admin");
  return (
    <main id="main" className="mx-auto max-w-sm px-6 py-20">
      <h1 className="text-2xl font-semibold font-mono text-ink">Admin Sign In</h1>
      <LoginForm hasCloudAuth={hasSupabase()} />
    </main>
  );
}
