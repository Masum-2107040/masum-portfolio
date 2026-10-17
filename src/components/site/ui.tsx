import Link from "next/link";
import { safeUrl } from "@/lib/utils";
export const PageHeader = ({ title, intro }: { title: string; intro?: string }) => (
  <div className="mb-8"><h1 className="text-3xl font-semibold">{title}</h1>{intro && <p className="mt-2 max-w-prose text-ink2">{intro}</p>}</div>);
export const Empty = ({ what }: { what: string }) => <p className="rounded border border-dashed border-line p-6 text-ink2">No {what} published yet.</p>;
export const Card = ({ children, href }: { children: React.ReactNode; href?: string }) => href
  ? <Link href={href} className="block rounded border border-line bg-card p-5 hover:border-term">{children}</Link>
  : <div className="rounded border border-line bg-card p-5">{children}</div>;
export const Tags = ({ items }: { items?: string[] | null }) => items?.length
  ? <ul className="mt-3 flex flex-wrap gap-2">{items.map(t => <li key={t} className="rounded border border-line px-2 py-0.5 font-mono text-xs text-muted">{t}</li>)}</ul> : null;
export function ExtLink({ href, children }: { href?: string | null; children: React.ReactNode }) {
  const u = safeUrl(href); if (!u) return null;
  return <a href={u} target="_blank" rel="noopener noreferrer" className="text-term underline underline-offset-2">{children}</a>;
}
export const Section = ({ title, body }: { title: string; body?: string | null }) => body
  ? <section className="mt-6"><h2 className="text-lg font-medium">{title}</h2><p className="mt-2 whitespace-pre-wrap text-ink2">{body}</p></section> : null;
