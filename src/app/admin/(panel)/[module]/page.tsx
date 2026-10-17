import Link from "next/link";
import { notFound } from "next/navigation";
import { adminOrRedirect } from "@/lib/admin/auth";
import { getModule } from "@/lib/admin/modules";
import { deleteRecord } from "../../actions";
import AdminForm from "@/components/admin/AdminForm";
import ConfirmDelete from "@/components/admin/ConfirmDelete";

type P = { params: Promise<{ module: string }> };
export default async function ModulePage({ params }: P) {
  const mod = getModule((await params).module); if (!mod) notFound();
  const { supabase } = await adminOrRedirect();
  if (mod.singleton) {
    const { data } = await supabase.from(mod.table).select("*").limit(1).maybeSingle();
    return (<div><h1 className="mb-6 text-2xl font-semibold">{mod.label}</h1><AdminForm moduleKey={mod.key} id={data?.id ?? null} fields={mod.fields} values={data ?? {}} cancelHref="/admin" /></div>);
  }
  const { data } = await supabase.from(mod.table).select("*").order(mod.orderBy.col, { ascending: mod.orderBy.asc }).limit(200);
  const rows = data ?? [];
  const state = (r: Record<string, any>) => mod.key === "blog" ? r.status : r.is_published ? "published" : "draft";
  return (<div>
    <div className="mb-6 flex items-center justify-between"><h1 className="text-2xl font-semibold">{mod.label}</h1>
      <Link href={`/admin/${mod.key}/new`} className="rounded border border-term px-3 py-1 text-term">New {mod.singular}</Link></div>
    {rows.length === 0 ? <p className="text-ink2">Nothing here yet.</p> : (
      <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-muted"><tr>
        {mod.listCols.map(c => <th key={c.key} className="py-2 pr-4 font-normal">{c.label}</th>)}<th className="py-2 pr-4 font-normal">State</th><th /></tr></thead>
        <tbody>{rows.map(r => (<tr key={r.id} className="border-t border-line">
          {mod.listCols.map(c => <td key={c.key} className="py-2 pr-4 text-ink2">{String(r[c.key] ?? "")}</td>)}
          <td className="py-2 pr-4 font-mono text-xs text-muted">{state(r)}</td>
          <td className="flex gap-4 py-2"><Link href={`/admin/${mod.key}/${r.id}`} className="text-term underline">Edit</Link>
            <ConfirmDelete action={deleteRecord.bind(null, mod.key, r.id)} label={String(r[mod.listCols[0].key] ?? "record")} /></td></tr>))}</tbody></table></div>)}
  </div>);
}
