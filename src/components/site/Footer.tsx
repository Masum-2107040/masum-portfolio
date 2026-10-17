import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line/70 bg-[#060807] py-12 text-sm text-muted">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-term"></span>
            <span className="font-mono font-semibold text-ink">Md Masum Molla</span>
          </div>
          <p className="mt-1 text-xs text-ink2">
            CSE Student at KUET • Penetration Tester • President at KUET Cyber Security Club
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-mono">
          <a
            href="https://www.linkedin.com/in/masum-molla-6845a72a6/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink2 hover:text-term transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:mollamasum764@gmail.com"
            className="text-ink2 hover:text-term transition-colors"
          >
            mollamasum764@gmail.com
          </a>
          <a
            href="tel:01518403124"
            className="text-ink2 hover:text-term transition-colors"
          >
            +880 1518403124
          </a>
          <a
            href="https://tryhackme.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink2 hover:text-term transition-colors"
          >
            TryHackMe (Top 8%)
          </a>
          <Link href="/privacy" className="text-muted hover:text-term transition-colors">
            Privacy
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6 mt-6 pt-6 border-t border-line/40 flex justify-between text-[11px] text-muted">
        <span>© {new Date().getFullYear()} Md Masum Molla. Built with Next.js & TailwindCSS.</span>
        <span className="font-mono text-term">KUET, Fulbarigate, Khulna</span>
      </div>
    </footer>
  );
}
