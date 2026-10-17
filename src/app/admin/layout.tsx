import type { Metadata } from "next";
// Auth state must never be baked in at build time: render every admin route per request.
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export default function AdminRoot({ children }: { children: React.ReactNode }) { return children; }
