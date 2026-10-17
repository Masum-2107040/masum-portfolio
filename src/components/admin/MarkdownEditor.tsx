"use client";
import { useState } from "react";
import Markdown from "@/components/Markdown";
// The textarea stays mounted (just hidden) while previewing so its value is still submitted with the form.
export default function MarkdownEditor({ name, id, defaultValue, describedBy }: { name: string; id: string; defaultValue: string; describedBy?: string }) {
  const [text, setText] = useState(defaultValue);
  const [preview, setPreview] = useState(false);
  const tab = (on: boolean) => `rounded border px-2 py-1 text-xs ${on ? "border-term text-term" : "border-line text-muted"}`;
  return (<div>
    <div className="mb-2 flex gap-2" role="group" aria-label="Editor mode">
      <button type="button" aria-pressed={!preview} onClick={() => setPreview(false)} className={tab(!preview)}>Write</button>
      <button type="button" aria-pressed={preview} onClick={() => setPreview(true)} className={tab(preview)}>Preview</button>
    </div>
    <textarea id={id} name={name} value={text} onChange={e => setText(e.target.value)} hidden={preview} rows={18} maxLength={100000} aria-describedby={describedBy}
      className="w-full rounded border border-line bg-bg2 px-3 py-2 font-mono text-sm" />
    {preview && <div className="min-h-[12rem] rounded border border-line bg-bg2 p-4"><Markdown source={text} /></div>}
  </div>);
}
