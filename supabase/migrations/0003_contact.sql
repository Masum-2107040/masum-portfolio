-- Contact form inbox. Run after 0002_storage.sql.
-- Visitors cannot touch this table directly: there is deliberately NO anon/public policy. Messages are inserted only by the
-- server action (src/app/contact/actions.ts) using the service-role key, after honeypot, validation and rate-limit checks.
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 254),
  subject text not null check (char_length(subject) between 1 and 150),
  message text not null check (char_length(message) between 10 and 5000),
  ip_hash text,                                  -- HMAC-SHA256 of the client IP (not the IP itself); used only for rate limiting
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
create index contact_messages_ip_idx on public.contact_messages (ip_hash, created_at desc);
create index contact_messages_created_idx on public.contact_messages (created_at desc);
alter table public.contact_messages enable row level security;
revoke all on public.contact_messages from anon;
create policy "admin all" on public.contact_messages for all using (public.is_admin()) with check (public.is_admin());
