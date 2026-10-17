import Link from "next/link";
import { adminOrRedirect } from "@/lib/admin/auth";
export default async function Messages() {
  const { supabase } = await adminOrRedirect();
  const { data } = await supabase.from("contact_messages").select("id,name,email,subject,is_read,created_at").order("created_at", { ascending: false }).limit(200);
  const rows = data ?? [];
  return (<div><h1 className="mb-6 text-2xl font-semibold">Messages</h1>
    {rows.length === 0 ? <p className="text-ink2">No messages yet.</p> : (
      <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-muted"><tr><th className="py-2 pr-4 font-normal">From</th><th className="py-2 pr-4 font-normal">Subject</th><th className="py-2 pr-4 font-normal">Received</th></tr></thead>
        <tbody>{rows.map(r => (<tr key={r.id} className="border-t border-line">
          <td className={`py-2 pr-4 ${r.is_read ? "text-ink2" : "font-semibold text-ink"}`}>{r.name}</td>
          <td className="py-2 pr-4"><Link href={`/admin/messages/${r.id}`} className={`underline ${r.is_read ? "text-ink2" : "font-semibold text-term"}`}>{r.subject}</Link>{!r.is_read && <span className="ml-2 font-mono text-xs text-term">new</span>}</td>
          <td className="py-2 pr-4 font-mono text-xs text-muted">{new Date(r.created_at).toISOString().slice(0, 16).replace("T", " ")} UTC</td></tr>))}</tbody></table></div>)}</div>);
}
