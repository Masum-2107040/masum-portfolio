import Link from "next/link";
export default function NotFound() {
  return <main id="main" className="mx-auto max-w-4xl px-6 py-24"><h1 className="font-mono text-3xl text-term">404</h1>
    <p className="mt-3 text-ink2">That page does not exist or is not published.</p><Link href="/" className="mt-4 inline-block text-term underline">Back home</Link></main>;
}
