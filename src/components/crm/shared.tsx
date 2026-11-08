import { useState, type ReactNode } from 'react';
import { Search, Plus, Pencil, Trash2, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';

export function DemoTag() { return <span className="inline-flex items-center gap-1 rounded border border-gold/40 bg-gold/10 px-2 py-1 text-xs font-bold text-foreground">DEMO · הדגמה בלבד</span>; }
export function PageTitle({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-sm text-muted-foreground">ES TRAVELS / מערכת ניהול</p><h1 className="text-3xl font-bold md:text-4xl">{title}</h1><p className="mt-2 text-muted-foreground">{subtitle}</p></div>{action}</div>;
}
export function Status({ value }: { value: string }) {
  const tone = ['נסגר', 'שולם', 'אושרה', 'אושר', 'פעיל'].includes(value) ? 'bg-success/10 text-success' : ['חדש', 'נשלחה', 'הצעה נשלחה', 'VIP'].includes(value) ? 'bg-gold/15 text-foreground' : 'bg-muted text-muted-foreground';
  return <span className={`inline-block whitespace-nowrap rounded px-2.5 py-1 text-xs font-semibold ${tone}`}>{value}</span>;
}
export type Field = { key: string; label: string; type?: 'text' | 'number' | 'date' | 'email' | 'textarea'; options?: string[]; required?: boolean; min?: number };
export type Row = { id: string; [key: string]: unknown };
export type Column<T> = { key: keyof T | string; label: string; render?: (row: T) => ReactNode };
export function Editor({ title, fields, initial, onSave, onClose }: { title: string; fields: Field[]; initial: Row; onSave: (row: Row) => void; onClose: () => void }) {
  const [draft, setDraft] = useState(initial);
  return <Dialog open onOpenChange={open => { if (!open) onClose(); }}><DialogContent dir="rtl" className="max-h-[90dvh] max-w-xl overflow-y-auto rounded-lg"><DialogTitle className="mt-4 text-right">{title}</DialogTitle><DialogDescription className="text-right">DEMO · השינויים זמניים, אינם נשלחים ונמחקים ברענון.</DialogDescription><form onSubmit={e => { e.preventDefault(); onSave(draft); onClose(); toast.success('DEMO · השינויים עודכנו בהדגמה בלבד'); }} className="grid gap-4 sm:grid-cols-2">{fields.map(f => <label key={f.key} className={`grid gap-1.5 text-sm font-semibold ${f.type === 'textarea' ? 'sm:col-span-2' : ''}`}>{f.label}{f.options ? <select className="field" value={String(draft[f.key] ?? '')} onChange={e => setDraft({ ...draft, [f.key]: e.target.value })}>{f.options.map(o => <option key={o}>{o}</option>)}</select> : f.type === 'textarea' ? <textarea className="field min-h-24" value={String(draft[f.key] ?? '')} onChange={e => setDraft({ ...draft, [f.key]: e.target.value })} /> : <input className="field" type={f.type ?? 'text'} min={f.min ?? (f.type === 'number' ? 0 : undefined)} required={f.required} value={String(draft[f.key] ?? '')} onChange={e => setDraft({ ...draft, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value })} />}</label>)}<div className="flex gap-2 sm:col-span-2"><Button type="submit"><Pencil />שמירה — DEMO</Button><Button type="button" variant="outline" onClick={onClose}><X />ביטול</Button></div></form></DialogContent></Dialog>;
}
export function DataTable<T extends { id: string }>({ title, rows, columns, searchKeys, onEdit, onDelete, onView, onAdd, filters, rowAction }: { title: string; rows: T[]; columns: Column<T>[]; searchKeys: (keyof T)[]; onEdit?: (row: T) => void; onDelete?: (row: T) => void; onView?: (row: T) => void; onAdd?: () => void; filters?: ReactNode; rowAction?: (row: T) => ReactNode }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const filtered = rows.filter(r => searchKeys.some(k => String(r[k]).toLowerCase().includes(query.toLowerCase())));
  const pages = Math.max(1, Math.ceil(filtered.length / 8));
  const current = Math.min(page, pages);
  const exportCsv = () => {
    const keys = columns.map(c => c.key);
    const csv = '\uFEFF' + [columns.map(c => c.label), ...filtered.map(r => keys.map(k => String((r as Record<string, unknown>)[String(k)] ?? '')))].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = 'es-travels-demo.csv'; a.click(); URL.revokeObjectURL(url);
    toast('DEMO · קובץ נתוני הדגמה הורד');
  };
  return <section aria-label={title} className="min-w-0"><div className="mb-4 flex flex-wrap items-center gap-3"><div className="relative min-w-48 flex-1"><Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" /><input aria-label={`חיפוש ${title}`} placeholder="חיפוש לפי שם, יעד או מספר..." className="field pr-9" value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} /></div>{filters}<Button variant="outline" size="icon" title="הורדת נתוני DEMO" aria-label="הורדת נתוני DEMO" onClick={exportCsv}><Download /></Button>{onAdd && <Button onClick={onAdd}><Plus />הוספה — DEMO</Button>}</div><div className="overflow-x-auto rounded-lg border bg-card"><table className="w-full whitespace-nowrap text-right text-sm"><thead className="border-b bg-muted/60"><tr>{columns.map(c => <th key={String(c.key)} className="px-4 py-3 font-semibold text-muted-foreground">{c.label}</th>)}<th className="px-4 py-3">פעולות · DEMO</th></tr></thead><tbody>{filtered.slice((current - 1) * 8, current * 8).map(r => <tr key={r.id} className="border-b last:border-0 hover:bg-muted/30">{columns.map(c => <td key={String(c.key)} className="px-4 py-4">{c.render ? c.render(r) : String((r as Record<string, unknown>)[String(c.key)] ?? '')}</td>)}<td className="px-4 py-3"><div className="flex items-center gap-1">{onView && <Button size="sm" variant="ghost" onClick={() => onView(r)}>צפייה</Button>}{onEdit && <Button size="icon" variant="ghost" title="עריכה — DEMO" aria-label={`עריכת ${r.id}`} onClick={() => onEdit(r)}><Pencil /></Button>}{rowAction?.(r)}{onDelete && <Button size="icon" variant="ghost" title="מחיקה — DEMO" aria-label={`מחיקת ${r.id}`} onClick={() => { if (window.confirm('DEMO · למחוק את הרשומה בהדגמה בלבד?')) { onDelete(r); toast('DEMO · הרשומה נמחקה מההדגמה'); } }}><Trash2 /></Button>}</div></td></tr>)}</tbody></table>{!filtered.length && <p className="p-12 text-center text-muted-foreground">לא נמצאו תוצאות</p>}</div><div className="mt-4 flex items-center justify-between text-sm text-muted-foreground"><span>{filtered.length} רשומות · DEMO</span><div className="flex items-center gap-2"><Button size="sm" variant="outline" disabled={current === 1} onClick={() => setPage(current - 1)}>הקודם</Button><span>{current} / {pages}</span><Button size="sm" variant="outline" disabled={current === pages} onClick={() => setPage(current + 1)}>הבא</Button></div></div></section>;
}
