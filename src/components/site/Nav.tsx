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
    <header className="sticky top-0 z-50 border-b border-line/80 bg-bg/90 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:border focus:border-term focus:bg-card focus:px-4 focus:py-2 focus:text-term font-medium"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-term animate-pulse shadow-sm shadow-term"></span>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-ink group-hover:text-term transition-colors">
              Md Masum Molla
            </span>
          </Link>
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-6">
            {LINKS.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-ink2 hover:text-term transition-colors"
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
            className="flex items-center gap-1.5 rounded-lg border border-term/40 bg-term/10 px-3.5 py-2 text-xs sm:text-sm font-semibold text-term hover:bg-term hover:text-bg transition-all shadow-sm"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Resume
          </a>
          <Link
            href="/contact"
            className="hidden sm:inline-flex rounded-lg border border-line bg-card px-3.5 py-2 text-xs sm:text-sm font-medium text-ink hover:border-term hover:text-term transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Secondary Nav bar for small / tablet screens */}
      <div className="lg:hidden border-t border-line/50 px-6 py-2.5 overflow-x-auto flex gap-5 text-sm font-medium no-scrollbar">
        {LINKS.map(([label, href]) => (
          <Link key={href} href={href} className="text-ink2 whitespace-nowrap hover:text-term transition-colors">
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
}

