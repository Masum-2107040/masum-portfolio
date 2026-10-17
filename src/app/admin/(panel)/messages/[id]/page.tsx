import { notFound } from "next/navigation";
import { z } from "zod";
import { adminOrRedirect } from "@/lib/admin/auth";
import { setMessageRead, deleteMessage } from "../../../actions";
import ConfirmDelete from "@/components/admin/ConfirmDelete";
export default async function MessageDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!z.string().uuid().safeParse(id).success) notFound();
  const { supabase } = await adminOrRedirect();
  const { data: m } = await supabase.from("contact_messages").select("*").eq("id", id).maybeSingle();
  if (!m) notFound();
  // Everything below is rendered by React as text (escaped); the message body is never treated as HTML or Markdown.
  return (<div className="max-w-2xl"><h1 className="text-2xl font-semibold">{m.subject}</h1>
    <p className="mt-2 text-sm text-ink2">From {m.name} &lt;<a className="text-term underline" href={`mailto:${m.email}`}>{m.email}</a>&gt;</p>
    <p className="font-mono text-xs text-muted">{new Date(m.created_at).toISOString().slice(0, 16).replace("T", " ")} UTC · {m.is_read ? "read" : "unread"}</p>
    <div className="mt-6 whitespace-pre-wrap rounded border border-line bg-card p-4 text-ink2">{m.message}</div>
    <div className="mt-6 flex items-center gap-4">
      <form action={setMessageRead.bind(null, id, !m.is_read)}><button className="rounded border border-line px-3 py-1 text-ink2">Mark as {m.is_read ? "unread" : "read"}</button></form>
      <ConfirmDelete action={deleteMessage.bind(null, id)} label={m.subject} /></div></div>);
}
