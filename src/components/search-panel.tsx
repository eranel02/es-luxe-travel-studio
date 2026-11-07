import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { destinations } from "@/lib/data";

export function SearchPanel() {
  const navigate = useNavigate();
  const [dest, setDest] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [budget, setBudget] = useState(0);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate({ to: "/packages", search: { dest: dest || undefined, max: budget || undefined, from: from || undefined, adults } });
      }}
      className="grid grid-cols-2 gap-3 rounded-3xl border border-gold/30 bg-navy/80 p-4 shadow-lift backdrop-blur-md md:grid-cols-7 md:p-5"
    >
      <label className="col-span-2 md:col-span-2">
        <span className="mb-1 block text-xs text-gold-light">יעד</span>
        <select value={dest} onChange={(e) => setDest(e.target.value)} className="field-dark">
          <option value="">כל היעדים</option>
          {destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </label>
      <label>
        <span className="mb-1 block text-xs text-gold-light">יציאה</span>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="field-dark" />
      </label>
      <label>
        <span className="mb-1 block text-xs text-gold-light">חזרה</span>
        <input type="date" value={to} min={from} onChange={(e) => setTo(e.target.value)} className="field-dark" />
      </label>
      <label>
        <span className="mb-1 block text-xs text-gold-light">מבוגרים</span>
        <input type="number" min={1} max={9} value={adults} onChange={(e) => setAdults(+e.target.value)} className="field-dark" />
      </label>
      <label>
        <span className="mb-1 block text-xs text-gold-light">ילדים</span>
        <input type="number" min={0} max={9} value={kids} onChange={(e) => setKids(+e.target.value)} className="field-dark" />
      </label>
      <label className="col-span-2 md:col-span-1">
        <span className="mb-1 block text-xs text-gold-light">תקציב לאדם</span>
        <select value={budget} onChange={(e) => setBudget(+e.target.value)} className="field-dark">
          <option value={0}>ללא הגבלה</option>
          <option value={5000}>עד ₪5,000</option>
          <option value={8000}>עד ₪8,000</option>
          <option value={12000}>עד ₪12,000</option>
          <option value={20000}>עד ₪20,000</option>
        </select>
      </label>
      <Button type="submit" variant="gold" size="xl" className="col-span-2 md:col-span-7">
        <Search /> חיפוש חופשה
      </Button>
    </form>
  );
}
