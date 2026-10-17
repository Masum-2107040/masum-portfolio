"use client";
import { useActionState } from "react";
import { sendMessage } from "./actions";
const input = "mt-1 w-full rounded border border-line bg-bg2 px-3 py-2";
export default function ContactForm() {
  const [s, action, pending] = useActionState(sendMessage, {});
  if (s.ok) return <p role="status" className="rounded border border-term p-4 text-term">Thanks, your message has been sent.</p>;
  const f = (n: string) => s.fieldErrors?.[n]?.join(" ");
  const field = (n: "name" | "email" | "subject", label: string, type = "text", max = 150) => (
    <div><label htmlFor={n} className="text-sm text-ink2">{label}</label>
      <input id={n} name={n} type={type} required maxLength={max} defaultValue={s.values?.[n] ?? ""} aria-invalid={f(n) ? true : undefined} aria-describedby={`${n}-e`} className={input} />
      <p id={`${n}-e`} role={f(n) ? "alert" : undefined} className="mt-1 text-xs text-red-400">{f(n)}</p></div>);
  return (<form action={action} className="space-y-4">
    {s.error && <p role="alert" className="rounded border border-red-500/50 p-3 text-sm text-red-400">{s.error}</p>}
    {field("name", "Name", "text", 100)}{field("email", "Email", "email", 254)}{field("subject", "Subject")}
    <div><label htmlFor="message" className="text-sm text-ink2">Message</label>
      <textarea id="message" name="message" required minLength={10} maxLength={5000} rows={7} defaultValue={s.values?.message ?? ""} aria-invalid={f("message") ? true : undefined} aria-describedby="message-e" className={input} />
      <p id="message-e" role={f("message") ? "alert" : undefined} className="mt-1 text-xs text-red-400">{f("message")}</p></div>
    {/* Honeypot: hidden from people and assistive tech; bots tend to fill every field. */}
    <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
      <label>Leave this field empty<input name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" /></label></div>
    <button disabled={pending} className="rounded border border-term px-4 py-2 text-term disabled:opacity-50">{pending ? "Sending…" : "Send message"}</button>
  </form>);
}
