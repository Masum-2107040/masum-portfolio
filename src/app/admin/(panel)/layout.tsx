import Link from "next/link";
import { adminOrRedirect } from "@/lib/admin/auth";
import { MODULE_LIST } from "@/lib/admin/modules";
import { logout } from "../actions";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const a = await adminOrRedirect();

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      {/* Admin Top Navigation */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line pb-4 text-xs font-mono">
        <Link
          href="/"
          target="_blank"
          className="rounded bg-term/10 px-2.5 py-1 text-term border border-term/30 hover:bg-term hover:text-bg transition-colors"
        >
          ← View Public Site
        </Link>

        <Link href="/admin" className="font-bold text-term hover:underline">
          [Dashboard]
        </Link>

        {MODULE_LIST.map((m) => (
          <Link
            key={m.key}
            href={`/admin/${m.key}`}
            className="text-ink2 hover:text-term transition-colors"
          >
            {m.label}
          </Link>
        ))}

        <Link href="/admin/messages" className="text-ink2 hover:text-term transition-colors">
          Messages
        </Link>

        <div className="ml-auto flex items-center gap-3">
          <span className="text-muted hidden sm:inline">{a.user.email}</span>
          <form action={logout}>
            <button
              type="submit"
              className="rounded border border-line bg-card px-2.5 py-1 text-xs text-muted hover:border-red-400 hover:text-red-400 transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      <div className="pt-8">{children}</div>
    </div>
  );
}
