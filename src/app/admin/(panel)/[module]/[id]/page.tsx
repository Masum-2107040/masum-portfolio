import { notFound } from "next/navigation";
import { z } from "zod";
import { adminOrRedirect } from "@/lib/admin/auth";
import { getModule } from "@/lib/admin/modules";
import AdminForm from "@/components/admin/AdminForm";
export default async function EditRecord({ params }: { params: Promise<{ module: string; id: string }> }) {
  const { module: key, id } = await params;
  const mod = getModule(key); if (!mod || !z.string().uuid().safeParse(id).success) notFound();
  const { supabase } = await adminOrRedirect();
  const { data } = await supabase.from(mod.table).select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return (<div><h1 className="mb-6 text-2xl font-semibold">Edit {mod.singular}</h1><AdminForm moduleKey={mod.key} id={id} fields={mod.fields} values={data} cancelHref={`/admin/${mod.key}`} /></div>);
}
