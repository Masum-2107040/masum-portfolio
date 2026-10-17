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
    <main id="main" className="mx-auto max-w-4xl px-6 py-12 space-y-8">
      <PageHeader
        title="Professional Certifications"
        intro="Validated credentials in network security, web application penetration testing, red teaming operations, and phishing defense."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {items.map((c) => {
          const f = publicAssetUrl(c.file_path);
          return (
            <div
              key={c.id}
              className="flex flex-col justify-between rounded-xl border border-line bg-card p-6 hover:border-term/60 transition-all space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-muted">
                  <span className="rounded bg-term/10 px-2 py-0.5 text-term border border-term/20 font-semibold">
                    {c.issuer}
                  </span>
                  {c.issue_date && <span>{formatDate(c.issue_date)}</span>}
                </div>

                <h2 className="mt-3 text-base font-semibold text-ink font-mono">
                  {c.title}
                </h2>

                <p className="mt-1 text-xs font-mono text-muted">
                  Category: {c.category}
                </p>

                {c.credential_id && (
                  <p className="mt-1.5 font-mono text-xs text-term/80">
                    Credential ID: {c.credential_id}
                  </p>
                )}

                {c.description && (
                  <p className="mt-3 text-xs leading-relaxed text-ink2">
                    {c.description}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-line/40 flex items-center justify-between text-xs font-mono">
                {c.verification_url ? (
                  <ExtLink href={c.verification_url}>
                    Verify Credential ↗
                  </ExtLink>
                ) : (
                  <span className="text-muted">Verified Offline</span>
                )}
                {f && (
                  <a
                    href={f}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-term underline"
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
