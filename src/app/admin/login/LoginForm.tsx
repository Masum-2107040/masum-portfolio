"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, {});
  const inputClass =
    "mt-1.5 w-full rounded-lg border border-line bg-card/80 px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-term focus:outline-none transition-colors font-mono";

  return (
    <form action={action} className="mt-6 space-y-4">
      <div className="rounded-lg border border-term/30 bg-term/10 p-3 text-xs text-term font-mono">
        <p className="font-semibold">⚡ Local Admin Mode Active</p>
        <p className="mt-0.5 text-muted">
          Default Password: <code className="text-ink font-bold">admin</code>
        </p>
      </div>

      <div>
        <label htmlFor="email" className="text-xs font-mono text-ink2">
          Admin Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue="mollamasum764@gmail.com"
          required
          autoComplete="username"
          maxLength={254}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="password" className="text-xs font-mono text-ink2">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          defaultValue="admin"
          required
          autoComplete="current-password"
          maxLength={200}
          className={inputClass}
        />
      </div>

      {state.error && (
        <p role="alert" className="text-xs font-mono text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-term px-4 py-2.5 font-mono text-xs font-bold text-bg hover:bg-term/90 disabled:opacity-50 transition-all shadow-md"
      >
        {pending ? "Authenticating…" : "Sign In to Admin Panel"}
      </button>
    </form>
  );
}
