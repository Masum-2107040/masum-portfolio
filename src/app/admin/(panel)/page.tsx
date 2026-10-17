import Link from "next/link";
import { adminOrRedirect } from "@/lib/admin/auth";
import { MODULE_LIST } from "@/lib/admin/modules";
export default async function Dashboard() {
  const { supabase } = await adminOrRedirect();
  const rows = await Promise.all(MODULE_LIST.filter(m => !m.singleton).map(async m => {
    const total = await supabase.from(m.table).select("id", { count: "exact", head: true });
    const live = await supabase.from(m.table).select("id", { count: "exact", head: true }).eq(m.published.col, m.published.value);
    return { m, total: total.count ?? 0, live: live.count ?? 0 };
  }));
  const unread = await supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("is_read", false);
  return (<div><h1 className="text-2xl font-semibold">Dashboard</h1>
    <div className="mt-6 grid gap-4 sm:grid-cols-3">{rows.map(({ m, total, live }) => (
      <Link key={m.key} href={`/admin/${m.key}`} className="rounded border border-line bg-card p-4 hover:border-term">
        <p className="text-ink2">{m.label}</p><p className="mt-1 text-3xl font-semibold">{total}</p>
        <p className="font-mono text-xs text-muted">{live} published · {total - live} not published</p></Link>))}
      <Link href="/admin/messages" className="rounded border border-line bg-card p-4 hover:border-term"><p className="text-ink2">Messages</p><p className="mt-1 text-3xl font-semibold">{unread.count ?? 0}</p><p className="font-mono text-xs text-muted">unread</p></Link>
      <Link href="/admin/profile" className="rounded border border-line bg-card p-4 hover:border-term"><p className="text-ink2">Profile</p><p className="mt-1 text-sm text-muted">Edit bio, links and CV</p></Link>
    </div></div>);
}
