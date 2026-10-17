"use client";
import { useActionState } from "react";
import { login } from "./actions";
export default function LoginForm() {
  const [state, action, pending] = useActionState(login, {});
  const input = "mt-1 w-full rounded border border-line bg-bg2 px-3 py-2";
  return (<form action={action} className="mt-6 space-y-4">
    <div><label htmlFor="email" className="text-sm text-ink2">Email</label><input id="email" name="email" type="email" required autoComplete="username" maxLength={254} className={input} /></div>
    <div><label htmlFor="password" className="text-sm text-ink2">Password</label><input id="password" name="password" type="password" required autoComplete="current-password" maxLength={200} className={input} /></div>
    {state.error && <p role="alert" className="text-sm text-red-400">{state.error}</p>}
    <button disabled={pending} className="rounded border border-term px-4 py-2 text-term disabled:opacity-50">{pending ? "Signing in…" : "Sign in"}</button>
  </form>);
}
