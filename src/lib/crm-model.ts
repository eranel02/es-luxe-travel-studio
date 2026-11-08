import { agents, bookings, leads, packages, quotations } from './data';

export const leadStatuses = ['חדש', 'בטיפול', 'הצעה נשלחה', 'נסגר', 'לא רלוונטי'] as const;
export function quotationTotal(price: number, travelers: number, extra: number) {
  return Math.round(price * travelers + extra);
}
export function outstanding(total: number, paid: number) { return Math.max(0, total - paid); }
export function initialCrmState() {
  return {
    leads: leads.map(x => ({ ...x })),
    customers: leads.map((x, i) => ({ id: `C-${1001 + i}`, name: x.name, phone: x.phone, email: x.email, preference: x.notes, tier: i === 2 ? 'VIP' : 'רגיל' })),
    quotations: quotations.map(x => ({ ...x, travelers: 2, hotel: '', nights: 5, notes: 'טיסות, לינה והעברות. המחיר להדגמה בלבד.' })),
    bookings: bookings.map(x => ({ ...x })),
    packages: packages.map(x => ({ ...x, active: true })),
    agents: agents.map(x => ({ ...x, permission: x.role === 'מנהלת' ? 'מנהל דמו' : 'סוכן דמו', active: true })),
    settings: { agency: 'ES TRAVELS', email: 'info@es-travels.demo', phone: '050-000-0000', notifications: true, compact: false },
  };
}
export type CrmState = ReturnType<typeof initialCrmState>;
