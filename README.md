# Md Masum Molla — Cybersecurity Portfolio (in progress)
See PROGRESS.md for exact status.

## Local setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in Supabase values.
3. In the Supabase SQL editor, run `supabase/migrations/0001_init.sql`, then `0002_storage.sql`, then `0003_contact.sql`.
4. Create your admin user in Supabase Auth (disable public signups in Auth settings), then run:
   `insert into public.admins(user_id) values ('<your-auth-user-uuid>');`
5. `npm run dev`

## Admin
- Sign in at `/admin/login` (not linked from the public site). There is no signup page: in Supabase Auth settings, turn off "Allow new users to sign up", create your user manually, then add its uuid to `public.admins` (step 4 above). A valid Supabase user who is not in `admins` cannot get in.
- Blog content is Markdown, sanitized on render (raw HTML is ignored; scripts, event handlers and `javascript:` links are removed).

## Contact form
- Messages are stored in `contact_messages` (admin-only via RLS) and read at `/admin/messages`. The form needs `SUPABASE_SERVICE_ROLE_KEY` set on the server; without it the form shows an "unavailable" message and the page still lists your public email.
- Protections: hidden honeypot field, Zod validation and length caps, rate limit (3 messages/hour per connection, 60/hour overall), and visitors have no direct database access to the table.
- Before launch, fill in the retention period on `/privacy` and decide how often you will clear old messages.

## Security notes
- The service-role key is server-only (used only to insert contact messages). Never commit `.env.local`.
- Admin authorization is checked in three places: middleware (session only), every admin page, and every server action (`requireAdmin()`); RLS repeats the check in the database.
- Admin authorization is the `admins` table checked by `is_admin()` in RLS; the UI must also verify server-side.
