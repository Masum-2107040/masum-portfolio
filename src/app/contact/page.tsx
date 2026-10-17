import type { Metadata } from "next";
import { getProfile } from "@/lib/queries";
import { PageHeader } from "@/components/site/ui";
import ContactForm from "./ContactForm";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Contact — Md Masum Molla",
  description: "Get in touch with Md Masum Molla for cybersecurity engagements, vulnerability assessments, and research collaboration.",
};

export default async function Contact() {
  const p = await getProfile();

  return (
    <main id="main" className="mx-auto max-w-3xl px-6 py-12 space-y-10">
      <PageHeader
        title="Get in Touch"
        intro="Feel free to reach out for penetration testing opportunities, vulnerability assessments, security research collaborations, or speaking engagements."
      />

      {/* Direct Contact Info Card */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-line bg-card p-5 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-term font-semibold">Direct Email</span>
          <p className="text-sm font-mono text-ink">
            <a href="mailto:mollamasum764@gmail.com" className="hover:text-term underline transition-colors">
              mollamasum764@gmail.com
            </a>
          </p>
          <p className="text-xs text-muted">PGP/Secure communications welcome</p>
        </div>

        <div className="rounded-xl border border-line bg-card p-5 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-term font-semibold">Phone & WhatsApp</span>
          <p className="text-sm font-mono text-ink">
            <a href="tel:01518403124" className="hover:text-term underline transition-colors">
              +880 1518403124
            </a>
          </p>
          <p className="text-xs text-muted">Available during business hours (UTC+6)</p>
        </div>

        <div className="rounded-xl border border-line bg-card p-5 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-term font-semibold">LinkedIn Profile</span>
          <p className="text-sm font-mono text-ink">
            <a
              href="https://www.linkedin.com/in/masum-molla-6845a72a6/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-term underline transition-colors"
            >
              in/masum-molla-6845a72a6
            </a>
          </p>
          <p className="text-xs text-muted">Connect for professional updates</p>
        </div>

        <div className="rounded-xl border border-line bg-card p-5 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-term font-semibold">Campus & Location</span>
          <p className="text-sm font-mono text-ink">
            KUET, Fulbarigate, Khulna
          </p>
          <p className="text-xs text-muted">Khulna University of Engineering & Technology</p>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="rounded-xl border border-line bg-card/70 p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-mono font-semibold text-ink">Send a Secure Message</h2>
        <p className="text-xs text-ink2">
          Messages sent via this form are encrypted in transit and routed directly to my secure database inbox.
        </p>
        <ContactForm />
      </section>

      <div className="text-xs text-muted text-center">
        See the <a href="/privacy" className="underline hover:text-term">privacy page</a> for details on data protection and message retention.
      </div>
    </main>
  );
}
