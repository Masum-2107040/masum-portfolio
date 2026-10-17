"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return <main id="main" className="mx-auto max-w-4xl px-6 py-24"><h1 className="text-2xl font-semibold">Something went wrong</h1>
    <p className="mt-3 text-ink2">An unexpected error occurred. Details are not shown for security reasons.</p>
    <button onClick={reset} className="mt-4 rounded border border-line px-3 py-1 text-term">Try again</button></main>;
}
