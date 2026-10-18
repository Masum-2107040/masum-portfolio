"use client";
import { useActionState } from "react";
import { sendMessage } from "./actions";

const input =
  "mt-2 w-full rounded-xl border border-line bg-[#0D1310] px-4 py-3 text-sm sm:text-base text-ink placeholder:text-muted focus:border-term focus:outline-none focus:ring-1 focus:ring-term transition-colors";

export default function ContactForm() {
  const [s, action, pending] = useActionState(sendMessage, {});

  if (s.ok)
    return (
      <div role="status" className="rounded-xl border border-term bg-term/10 p-5 text-sm sm:text-base font-semibold text-term">
        ✓ Thank you, your message has been sent successfully.
      </div>
    );

  const f = (n: string) => s.fieldErrors?.[n]?.join(" ");

  const field = (n: "name" | "email" | "subject", label: string, type = "text", max = 150) => (
    <div>
      <label htmlFor={n} className="text-sm sm:text-base font-medium text-ink2">
        {label}
      </label>
      <input
        id={n}
        name={n}
        type={type}
        required
        maxLength={max}
        defaultValue={s.values?.[n] ?? ""}
        aria-invalid={f(n) ? true : undefined}
        aria-describedby={`${n}-e`}
        className={input}
      />
      <p id={`${n}-e`} role={f(n) ? "alert" : undefined} className="mt-1.5 text-xs sm:text-sm text-red-400">
        {f(n)}
      </p>
    </div>
  );

  return (
    <form action={action} className="space-y-5">
      {s.error && (
        <p role="alert" className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400">
          {s.error}
        </p>
      )}
      {field("name", "Your Name", "text", 100)}
      {field("email", "Your Email Address", "email", 254)}
      {field("subject", "Subject / Engagement Type")}
      <div>
        <label htmlFor="message" className="text-sm sm:text-base font-medium text-ink2">
          Message Details
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          defaultValue={s.values?.message ?? ""}
          aria-invalid={f("message") ? true : undefined}
          aria-describedby="message-e"
          className={input}
        />
        <p id="message-e" role={f("message") ? "alert" : undefined} className="mt-1.5 text-xs sm:text-sm text-red-400">
          {f("message")}
        </p>
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill every field. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Leave this field empty
          <input name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <button
        disabled={pending}
        className="rounded-xl bg-term px-6 py-3.5 text-sm sm:text-base font-semibold text-bg hover:bg-term/90 disabled:opacity-50 transition-all shadow-md"
      >
        {pending ? "Sending Encrypted Message…" : "Send Message"}
      </button>
    </form>
  );
}

