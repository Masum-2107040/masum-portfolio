"use server";
import { headers } from "next/headers";
import { submitContact, type ContactState, type ContactStore } from "@/lib/contact/submit";
import { clientIp, hashIp } from "@/lib/contact/ip";
import { createServiceClient, serviceKey } from "@/lib/supabase/service";

export async function sendMessage(_prev: ContactState, fd: FormData): Promise<ContactState> {
  const db = createServiceClient();
  if (!db) return { error: "The contact form is not available right now. Please use the email address on this page." };
  const store: ContactStore = {
    async count({ ipHash, sinceIso }) {
      let q = db.from("contact_messages").select("id", { count: "exact", head: true }).gte("created_at", sinceIso);
      if (ipHash) q = q.eq("ip_hash", ipHash);
      const { count, error } = await q; if (error) throw error; return count ?? 0;
    },
    async insert(row) { const { error } = await db.from("contact_messages").insert(row); if (error) throw error; },
  };
  const raw: Record<string, unknown> = {};
  for (const k of ["name", "email", "subject", "message", "website"]) raw[k] = fd.get(k) ?? "";
  return submitContact(raw, { ipHash: hashIp(clientIp(await headers()), serviceKey()) }, store);
}
