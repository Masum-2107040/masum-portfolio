import { contactInput } from "@/lib/validation";

export type ContactState = { ok?: boolean; error?: string; fieldErrors?: Record<string, string[]>; values?: Record<string, string> };
export const LIMITS = { perIpPerHour: 3, globalPerHour: 60 } as const;

// Storage is injected so the logic can be tested without a database.
export interface ContactStore {
  count(opts: { ipHash?: string; sinceIso: string }): Promise<number>;
  insert(row: { name: string; email: string; subject: string; message: string; ip_hash: string }): Promise<void>;
}

export async function submitContact(raw: Record<string, unknown>, ctx: { ipHash: string; now?: Date }, store: ContactStore): Promise<ContactState> {
  // Honeypot: real users never fill the hidden field. Bots get a fake success so they learn nothing, and nothing is stored.
  if (typeof raw.website === "string" && raw.website.trim() !== "") return { ok: true };

  // The honeypot was fully handled above; blank it so whitespace in it cannot produce a validation error on an invisible field.
  const parsed = contactInput.safeParse({ ...raw, website: "" });
  if (!parsed.success) {
    const values: Record<string, string> = {};
    for (const k of ["name", "email", "subject", "message"]) values[k] = typeof raw[k] === "string" ? (raw[k] as string).slice(0, 5000) : "";
    return { fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>, values };
  }
  const { name, email, subject, message } = parsed.data;

  try {
    const sinceIso = new Date((ctx.now ?? new Date()).getTime() - 3600_000).toISOString();
    const [mine, all] = await Promise.all([store.count({ ipHash: ctx.ipHash, sinceIso }), store.count({ sinceIso })]);
    if (mine >= LIMITS.perIpPerHour || all >= LIMITS.globalPerHour) return { error: "Too many messages right now. Please try again later.", values: { name, email, subject, message } };
    await store.insert({ name, email, subject, message, ip_hash: ctx.ipHash });
  } catch {
    return { error: "Your message could not be sent. Please try again later.", values: { name, email, subject, message } };
  }
  return { ok: true };
}
