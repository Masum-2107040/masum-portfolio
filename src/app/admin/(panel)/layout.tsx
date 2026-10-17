import Link from "next/link";
import { adminOrRedirect } from "@/lib/admin/auth";
import { MODULE_LIST } from "@/lib/admin/modules";
import { logout } from "../actions";
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const a = await adminOrRedirect();
  return (<div className="mx-auto max-w-5xl px-6 py-8">
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line pb-4 text-sm">
      <Link href="/admin" className="font-mono text-term">admin</Link>
      {MODULE_LIST.map(m => <Link key={m.key} href={`/admin/${m.key}`} className="text-ink2 hover:text-term">{m.label}</Link>)}
      <Link href="/admin/messages" className="text-ink2 hover:text-term">Messages</Link>
      <span className="ml-auto text-muted">{a.user.email}</span>
      <form action={logout}><button className="rounded border border-line px-2 py-1 text-muted hover:text-term">Sign out</button></form>
    </div>
    <div className="pt-8">{children}</div></div>);
}
