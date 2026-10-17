import { createHmac } from "node:crypto";
import { isIP } from "node:net";

// First hop of x-forwarded-for (set by the platform proxy, e.g. Vercel). Anything that is not a valid IP becomes "unknown".
// Outside a trusted proxy this header can be spoofed, which only weakens the per-IP limit; the global limit still applies.
export function clientIp(h: { get(name: string): string | null }): string {
  const cands = [h.get("x-forwarded-for")?.split(",")[0]?.trim(), h.get("x-real-ip")?.trim()];
  for (const c of cands) if (c && isIP(c)) return c;
  return "unknown";
}
// Keyed hash so the stored value cannot be reversed to an IP by brute force without the server secret.
export const hashIp = (ip: string, secret: string) => createHmac("sha256", secret).update(ip).digest("hex");
