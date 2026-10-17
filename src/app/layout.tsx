import "./globals.css";
import type { Metadata } from "next";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { SITE_URL } from "@/lib/env";
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Md Masum Molla — Cybersecurity Research", template: "%s | Md Masum Molla" },
  description: "Portfolio and research lab of Md Masum Molla, CSE student at KUET.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><Nav />{children}<Footer /></body></html>;
}
