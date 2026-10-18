import type { Metadata } from "next";
import { listCertificates } from "@/lib/queries";
import { PageHeader, ExtLink } from "@/components/site/ui";
import { publicAssetUrl } from "@/lib/storage/upload";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Certificates — Md Masum Molla",
  description: "Industry and practical cybersecurity certifications held by Md Masum Molla.",
};

export default async function Certificates() {
  const items = await listCertificates();

  return (
    <main id="main" className="mx-auto max-w-4xl px-6 py-12 space-y-10">
      <PageHeader
        title="Professional Certifications"
        intro="Validated credentials in network security, web application penetration testing, red teaming operations, and phishing defense."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((c) => {
          const f = publicAssetUrl(c.file_path);
          return (
            <div
              key={c.id}
              className="flex flex-col justify-between rounded-2xl border border-line bg-card p-7 hover:border-term/60 transition-all space-y-4 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs sm:text-sm text-muted">
                  <span className="rounded-md bg-term/10 px-3 py-1 text-term border border-term/20 font-bold uppercase tracking-wide">
                    {c.issuer}
                  </span>
                  {c.issue_date && <span>{formatDate(c.issue_date)}</span>}
                </div>

                <h2 className="mt-4 text-lg sm:text-xl font-bold text-ink">
                  {c.title}
                </h2>

                <p className="mt-1 text-xs sm:text-sm text-ink2 font-medium">
                  Category: {c.category}
                </p>

                {c.credential_id && (
                  <p className="mt-2 font-mono text-xs sm:text-sm text-term">
                    ID: {c.credential_id}
                  </p>
                )}

                {c.description && (
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink2">
                    {c.description}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-line/40 flex items-center justify-between text-sm sm:text-base font-semibold">
                {c.verification_url ? (
                  <ExtLink href={c.verification_url}>
                    Verify Credential ↗
                  </ExtLink>
                ) : (
                  <span className="text-muted text-xs sm:text-sm font-normal">Verified Offline</span>
                )}
                {f && (
                  <a
                    href={f}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-term underline underline-offset-4 hover:opacity-80 transition-opacity"
                  >
                    Certificate PDF
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

