import "server-only";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
// Every admin page and layout calls this. Layout checks alone are not enough in the App Router
// (layouts are not re-rendered on every client navigation), so each page re-checks.
export async function adminOrRedirect() {
  const a = await requireAdmin();
  if (!a.ok) redirect("/admin/login");
  return a;
}
