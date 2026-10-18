import Link from "next/link";
import { safeUrl } from "@/lib/utils";

export const PageHeader = ({ title, intro }: { title: string; intro?: string }) => (
  <div className="mb-10 space-y-3">
    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink">
      {title}
    </h1>
    {intro && (
      <p className="max-w-3xl text-base sm:text-xl leading-relaxed text-ink2">
        {intro}
      </p>
    )}
  </div>
);

export const Empty = ({ what }: { what: string }) => (
  <p className="rounded-xl border border-dashed border-line bg-card/40 p-8 text-center text-base sm:text-lg text-ink2">
    No {what} published yet.
  </p>
);

export const Card = ({ children, href }: { children: React.ReactNode; href?: string }) =>
  href ? (
    <Link
      href={href}
      className="block rounded-xl border border-line bg-card p-6 transition-all duration-200 hover:border-term/70 hover:shadow-lg hover:shadow-term/5"
    >
      {children}
    </Link>
  ) : (
    <div className="rounded-xl border border-line bg-card p-6">{children}</div>
  );

export const Tags = ({ items }: { items?: string[] | null }) =>
  items?.length ? (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-lg border border-line/80 bg-[#0C120E] px-3 py-1 font-mono text-xs sm:text-sm font-medium text-ink2"
        >
          {t}
        </li>
      ))}
    </ul>
  ) : null;

export function ExtLink({ href, children }: { href?: string | null; children: React.ReactNode }) {
  const u = safeUrl(href);
  if (!u) return null;
  return (
    <a
      href={u}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm sm:text-base font-semibold text-term hover:text-term/80 underline underline-offset-4 transition-colors"
    >
      {children}
    </a>
  );
}

export const Section = ({ title, body }: { title: string; body?: string | null }) =>
  body ? (
    <section className="mt-8 space-y-2">
      <h2 className="text-xl sm:text-2xl font-bold text-ink">{title}</h2>
      <p className="whitespace-pre-wrap text-base sm:text-lg leading-relaxed text-ink2">
        {body}
      </p>
    </section>
  ) : null;
