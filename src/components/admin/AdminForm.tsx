"use client";
import { useActionState } from "react";
import Link from "next/link";
import { saveRecord, type FormState } from "@/app/admin/actions";
import type { Field } from "@/lib/admin/modules";
import { SOCIAL_KEYS } from "@/lib/admin/form";
import MarkdownEditor from "./MarkdownEditor";

const input = "w-full rounded border border-line bg-bg2 px-3 py-2";
const ACCEPT = { image: "image/jpeg,image/png,image/webp", pdf: "application/pdf", file: "image/jpeg,image/png,image/webp,application/pdf" } as const;

export default function AdminForm({ moduleKey, id, fields, values, cancelHref }: { moduleKey: string; id: string | null; fields: Field[]; values: Record<string, any>; cancelHref: string }) {
  const [state, action, pending] = useActionState(saveRecord.bind(null, moduleKey, id) as (s: FormState, f: FormData) => Promise<FormState>, {});
  const err = (n: string) => state.fieldErrors?.[n];
  return (<form action={action} className="space-y-5">
    {state.error && <p role="alert" className="rounded border border-red-500/50 p-3 text-sm text-red-400">{state.error}</p>}
    {fields.map(f => {
      const v = values[f.name], eid = `f-${f.name}`, errs = err(f.name), desc = `${eid}-msg`;
      const common = { id: eid, name: f.name, "aria-describedby": desc, "aria-invalid": errs ? true : undefined } as const;
      let control: React.ReactNode;
      switch (f.type) {
        case "bool": control = <label className="flex items-center gap-2 text-ink2"><input type="checkbox" {...common} defaultChecked={!!v} />{f.label}</label>; break;
        case "textarea": control = <textarea {...common} rows={5} defaultValue={v ?? ""} className={input} />; break;
        case "markdown": control = <MarkdownEditor id={eid} name={f.name} defaultValue={v ?? ""} describedBy={desc} />; break;
        case "select": control = <select {...common} defaultValue={v ?? f.options?.[0]} className={input}>{f.options?.map(o => <option key={o} value={o}>{o.replace(/_/g, " ")}</option>)}</select>; break;
        case "tags": control = <input {...common} type="text" defaultValue={Array.isArray(v) ? v.join(", ") : ""} className={input} />; break;
        case "number": control = <input {...common} type="number" step={1} defaultValue={v ?? 0} className={input} />; break;
        case "date": control = <input {...common} type="date" defaultValue={v ?? ""} className={input} />; break;
        case "url": control = <input {...common} type="url" maxLength={2048} defaultValue={v ?? ""} className={input} placeholder="https://" />; break;
        case "email": control = <input {...common} type="email" maxLength={254} defaultValue={v ?? ""} className={input} />; break;
        case "image": case "pdf": case "file": control = (<div className="space-y-2">
            {v ? <p className="font-mono text-xs text-muted">Current: {v}</p> : null}
            <input {...common} type="file" accept={ACCEPT[f.type]} className="text-sm text-ink2" />
            {v ? <label className="flex items-center gap-2 text-xs text-ink2"><input type="checkbox" name={`${f.name}__clear`} />Remove current file</label> : null}</div>); break;
        case "social": control = (<div className="grid gap-2 sm:grid-cols-2">{SOCIAL_KEYS.map(k => (
            <input key={k} name={`${f.name}.${k}`} type="url" maxLength={2048} aria-label={k} placeholder={`${k} URL`} defaultValue={v?.[k] ?? ""} className={input} />))}</div>); break;
        default: control = <input {...common} type="text" required={f.required} maxLength={500} defaultValue={v ?? ""} className={input} />;
      }
      return (<div key={f.name}>
        {f.type !== "bool" && <label htmlFor={eid} className="mb-1 block text-sm text-ink2">{f.label}{f.required ? " *" : ""}</label>}
        {control}
        <p id={desc} className={`mt-1 text-xs ${errs ? "text-red-400" : "text-muted"}`} role={errs ? "alert" : undefined}>{errs ? errs.join(" ") : f.help}</p>
      </div>);
    })}
    <div className="flex gap-3"><button disabled={pending} className="rounded border border-term px-4 py-2 text-term disabled:opacity-50">{pending ? "Saving…" : "Save"}</button>
      <Link href={cancelHref} className="rounded border border-line px-4 py-2 text-ink2">Cancel</Link></div>
  </form>);
}
