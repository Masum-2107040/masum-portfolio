-- Storage: one public-read bucket, admin-only write. Run after 0001_init.sql.
-- Objects use unguessable server-generated paths (see src/lib/storage/upload.ts). Public buckets serve by URL;
-- anyone who knows a path can read it, so do not upload anything confidential. Listing is NOT public (no anon select policy).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('public-assets', 'public-assets', true, 10485760, array['image/jpeg','image/png','image/webp','application/pdf'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "admin select public-assets" on storage.objects;
drop policy if exists "admin insert public-assets" on storage.objects;
drop policy if exists "admin update public-assets" on storage.objects;
drop policy if exists "admin delete public-assets" on storage.objects;
create policy "admin select public-assets" on storage.objects for select to authenticated using (bucket_id = 'public-assets' and public.is_admin());
create policy "admin insert public-assets" on storage.objects for insert to authenticated with check (bucket_id = 'public-assets' and public.is_admin());
create policy "admin update public-assets" on storage.objects for update to authenticated using (bucket_id = 'public-assets' and public.is_admin()) with check (bucket_id = 'public-assets' and public.is_admin());
create policy "admin delete public-assets" on storage.objects for delete to authenticated using (bucket_id = 'public-assets' and public.is_admin());
