import type { Metadata } from "next";
import { PageHeader } from "@/components/site/ui";
export const metadata: Metadata = { title: "Privacy" };
export default function Privacy() {
  return (<main id="main" className="mx-auto max-w-3xl px-6 py-14"><PageHeader title="Privacy" />
    <div className="space-y-4 text-ink2">
      <p>This site does not use advertising, analytics or third-party tracking cookies.</p>
      <h2 className="pt-2 text-lg font-medium text-ink">Contact form</h2>
      <p>If you send a message, the site stores your name, email address, subject and message so the site owner can read and reply to it. It also stores a keyed hash of your IP address, used only to limit how many messages one connection can send per hour; the IP address itself is not stored by this site.</p>
      <p>Messages are visible only to the site owner through a password-protected area and are not shared with third parties by this site. The site is hosted on infrastructure that processes requests as any web host does (for example Vercel and Supabase), and their own policies apply to that processing.</p>
      <p>[Set before launch: how long messages are kept, for example "deleted after 12 months", and a contact address for deletion requests.]</p>
      <h2 className="pt-2 text-lg font-medium text-ink">Admin area</h2>
      <p>The admin area uses an authentication cookie, set only for the site owner when signing in.</p>
    </div></main>);
}
