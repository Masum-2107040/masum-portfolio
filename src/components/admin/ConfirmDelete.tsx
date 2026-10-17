"use client";
export default function ConfirmDelete({ action, label }: { action: () => Promise<void>; label: string }) {
  return (<form action={action} onSubmit={e => { if (!confirm(`Delete "${label}"? This cannot be undone.`)) e.preventDefault(); }}>
    <button className="text-red-400 underline">Delete</button></form>);
}
