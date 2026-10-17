import Link from "next/link";

const LINKS = [
  ["About", "/about"],
  ["Research", "/research"],
  ["Projects", "/projects"],
  ["Achievements", "/achievements"],
  ["Certificates", "/certificates"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
] as const;

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:border focus:border-term focus:bg-card focus:px-3 focus:py-2 focus:text-term"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-term animate-pulse"></span>
            <span className="font-mono text-base font-bold text-term tracking-tight group-hover:text-ink transition-colors">
              ~/masum-molla
            </span>
          </Link>
          <nav aria-label="Primary" className="hidden md:flex items-center gap-4 text-sm font-medium">
            {LINKS.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-ink2 hover:text-term transition-colors text-xs uppercase tracking-wider font-mono"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/cv.pdf"
            download="Md_Masum_Molla_CV.pdf"
            className="flex items-center gap-1.5 rounded-lg border border-term/40 bg-term/10 px-3 py-1.5 font-mono text-xs font-semibold text-term hover:bg-term hover:text-bg transition-all shadow-sm"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Resume.pdf
          </a>
          <Link
            href="/contact"
            className="hidden sm:inline-flex rounded-lg border border-line bg-card px-3 py-1.5 font-mono text-xs text-ink hover:border-term hover:text-term transition-all"
          >
            Hire / Contact
          </Link>
        </div>
      </div>

      {/* Mobile Nav strip */}
      <div className="md:hidden border-t border-line/50 px-6 py-2 overflow-x-auto flex gap-3 text-xs font-mono">
        {LINKS.map(([label, href]) => (
          <Link key={href} href={href} className="text-ink2 whitespace-nowrap hover:text-term">
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
}
