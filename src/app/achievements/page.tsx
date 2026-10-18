import type { Metadata } from "next";
import { listAchievements } from "@/lib/queries";
import { PageHeader, ExtLink } from "@/components/site/ui";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Achievements & CTF Record — Md Masum Molla",
  description: "Capture The Flag competitions, national rankings, and cybersecurity recognitions.",
};

export default async function Achievements() {
  const items = await listAchievements();

  return (
    <main id="main" className="mx-auto max-w-4xl px-6 py-12 space-y-10">
      <PageHeader
        title="Achievements & CTF Competitions"
        intro="Track record across national and international competitive cybersecurity events, platform rankings, and community leadership."
      />

      <div className="space-y-6">
        {items.map((a) => (
          <div
            key={a.id}
            className="rounded-2xl border border-line bg-card p-6 sm:p-7 hover:border-term/60 transition-all space-y-3.5 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                {a.rank && (
                  <span className="rounded-lg bg-term/10 px-3 py-1 text-xs sm:text-sm font-bold text-term border border-term/30">
                    {a.rank}
                  </span>
                )}
                <span className="rounded-md bg-black/40 px-2.5 py-1 text-xs sm:text-sm text-ink2 border border-line">
                  {a.category}
                </span>
              </div>
              <span className="text-xs sm:text-sm text-muted">
                {a.event_date ? formatDate(a.event_date) : ""}
              </span>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-ink">{a.title}</h2>
              <p className="mt-1 text-xs sm:text-sm text-ink2 font-medium">
                {[a.organization, a.team_name ? `Team: ${a.team_name}` : null]
                  .filter(Boolean)
                  .join(" • ")}
              </p>
            </div>

            {a.description && (
              <p className="text-sm sm:text-base leading-relaxed text-ink2">
                {a.description}
              </p>
            )}

            {a.evidence_url && (
              <div className="pt-2">
                <ExtLink href={a.evidence_url}>
                  View Proof / Reference ↗
                </ExtLink>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

