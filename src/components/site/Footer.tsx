import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-line/70 bg-[#060807] py-14 text-sm sm:text-base text-ink2">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-term"></span>
            <span className="text-lg font-bold text-ink">Md Masum Molla</span>
          </div>
          <p className="text-sm text-ink2/90 max-w-md">
            CSE Student at KUET • Penetration Tester • President at KUET Cyber Security Club
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
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
            Email
          </a>
          <a
            href="tel:01518403124"
            className="text-ink2 hover:text-term transition-colors"
          >
            Phone
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
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}


