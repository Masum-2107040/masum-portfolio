"use server";

import { headers } from "next/headers";
import { submitContact, type ContactState, type ContactStore } from "@/lib/contact/submit";
import { clientIp, hashIp } from "@/lib/contact/ip";
import { createServiceClient, serviceKey } from "@/lib/supabase/service";
import { getLocalDbClient } from "@/lib/db/local-db";
import { hasSupabase } from "@/lib/env";

export async function sendMessage(_prev: ContactState, fd: FormData): Promise<ContactState> {
  const db = hasSupabase() ? createServiceClient() : (getLocalDbClient() as any);
  if (!db) {
    return { error: "The contact form is not available right now. Please use the email address on this page." };
  }

  const store: ContactStore = {
    async count({ ipHash, sinceIso }) {
      if (!hasSupabase()) return 0;
      let q = db.from("contact_messages").select("id", { count: "exact", head: true }).gte("created_at", sinceIso);
      if (ipHash) q = q.eq("ip_hash", ipHash);
      const { count, error } = await q;
      if (error) throw error;
      return count ?? 0;
    },
    async insert(row) {
      const { error } = await db.from("contact_messages").insert({
        ...row,
        is_read: false,
      });
      if (error) throw error;
    },
  };

  const raw: Record<string, unknown> = {};
  for (const k of ["name", "email", "subject", "message", "website"]) raw[k] = fd.get(k) ?? "";

  const ip = clientIp(await headers());
  const key = serviceKey() || "dev-local-secret-key";

  return submitContact(raw, { ipHash: hashIp(ip, key) }, store);
}
