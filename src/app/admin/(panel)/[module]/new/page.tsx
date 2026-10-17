import { notFound, redirect } from "next/navigation";
import { adminOrRedirect } from "@/lib/admin/auth";
import { getModule } from "@/lib/admin/modules";
import AdminForm from "@/components/admin/AdminForm";
export default async function NewRecord({ params }: { params: Promise<{ module: string }> }) {
  const mod = getModule((await params).module); if (!mod) notFound();
  await adminOrRedirect();
  if (mod.singleton) redirect(`/admin/${mod.key}`);
  return (<div><h1 className="mb-6 text-2xl font-semibold">New {mod.singular}</h1><AdminForm moduleKey={mod.key} id={null} fields={mod.fields} values={{}} cancelHref={`/admin/${mod.key}`} /></div>);
}
