import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PackageCard, PageHero, EmptyState } from "@/components/site";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { destinations, packages, destImage, images, ils } from "@/lib/data";
import { cn } from "@/lib/utils";

type S = { dest?: string | undefined; max?: number | undefined; from?: string | undefined; adults?: number | undefined };

export const Route = createFileRoute("/packages/")({
  validateSearch: (q: Record<string, unknown>): S => ({
    dest: typeof q["dest"] === "string" ? q["dest"] : undefined,
    max: q["max"] ? Number(q["max"]) : undefined,
    from: typeof q["from"] === "string" ? q["from"] : undefined,
    adults: q["adults"] ? Number(q["adults"]) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "חבילות נופש | ES TRAVELS" },
      { name: "description", content: "קטלוג חבילות נופש יוקרתיות — סננו לפי יעד, מחיר, תאריכים ודירוג מלון." },
      { property: "og:title", content: "חבילות נופש | ES TRAVELS" },
      { property: "og:description", content: "מצאו את החבילה המושלמת ליעד החלומות שלכם." },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/packages/" });
  const [q, setQ] = useState("");
  const [dests, setDests] = useState<string[]>(s["dest"] ? [s.dest] : []);
  const [max, setMax] = useState(s["max"] ?? 25000);
  const [from, setFrom] = useState(s["from"] ?? "");
  const [travelers, setTravelers] = useState(s["adults"] ?? 2);
  const [stars, setStars] = useState(0);
  const [sort, setSort] = useState<"pop" | "asc" | "desc">("pop");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => { setDests(s["dest"] ? [s.dest] : []); }, [s.dest]);
  useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 350); return () => clearTimeout(t); }, [q, dests, max, from, stars, sort]);

  const list = useMemo(() => {
    let r = packages.filter((p) =>
      (!dests.length || dests.includes(p.dest)) &&
      p.price <= max && p.stars >= stars &&
      (!from || p.depart >= from) &&
      (!q || (p.title + p.hotel).toLowerCase().includes(q.toLowerCase())));
    r = [...r].sort((a, b) => sort === "pop" ? b.popularity - a.popularity : sort === "asc" ? a.price - b.price : b.price - a.price);
    return r;
  }, [q, dests, max, from, stars, sort]);

  const reset = () => { setQ(""); setDests([]); setMax(25000); setFrom(""); setStars(0); navigate({ search: {} }); };

  const filters = (
    <div className="space-y-6">
      <div>
        <h4 className="mb-3 font-bold text-navy">יעד</h4>
        <div className="flex flex-wrap gap-2">
          {destinations.map((d) => {
            const on = dests.includes(d.id);
            return (
              <button key={d.id} onClick={() => setDests(on ? dests.filter((x) => x !== d.id) : [...dests, d.id])}
                className={cn("rounded-full border px-3 py-1.5 text-sm transition", on ? "border-gold bg-gold text-navy" : "border-border bg-card hover:border-gold")}>
                {d.name}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <h4 className="mb-2 font-bold text-navy">מחיר מקסימלי לאדם: <span className="text-gold">{ils(max)}</span></h4>
        <input type="range" min={3000} max={25000} step={500} value={max} onChange={(e) => setMax(+e.target.value)} className="w-full accent-[var(--gold)]" />
      </div>
      <label className="block">
        <h4 className="mb-2 font-bold text-navy">יציאה החל מ־</h4>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="field" />
      </label>
      <label className="block">
        <h4 className="mb-2 font-bold text-navy">מספר נוסעים</h4>
        <input type="number" min={1} max={12} value={travelers} onChange={(e) => setTravelers(+e.target.value)} className="field" />
        <p className="mt-1 text-xs text-muted-foreground">משמש להערכת מחיר כולל</p>
      </label>
      <div>
        <h4 className="mb-2 font-bold text-navy">דירוג מלון</h4>
        <div className="flex gap-2">
          {[0, 4, 5].map((n) => (
            <button key={n} onClick={() => setStars(n)} className={cn("flex-1 rounded-xl border py-2 text-sm", stars === n ? "border-gold bg-gold/15 font-bold" : "border-border bg-card")}>
              {n === 0 ? "הכל" : `${n}★ ומעלה`}
            </button>
          ))}
        </div>
      </div>
      <Button variant="outline-gold" className="w-full" onClick={reset}>איפוס סינון</Button>
    </div>
  );

  return (
    <>
      <PageHero eyebrow="Vacation Packages" title="חבילות נופש" sub="מבחר חבילות יוקרה שנבנו בקפידה — סננו ומצאו את שלכם." image={images.greece} />
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] gap-3 md:flex">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש לפי שם מלון או חבילה..." className="field pr-10" />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="field hidden w-56 md:block">
            <option value="pop">מיון: פופולריות</option>
            <option value="asc">מחיר: מהנמוך לגבוה</option>
            <option value="desc">מחיר: מהגבוה לנמוך</option>
          </select>
          <Button variant="navy" className="h-auto lg:hidden" onClick={() => setShowFilters(true)}><SlidersHorizontal /> סינון</Button>
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="field mb-6 md:hidden">
          <option value="pop">מיון: פופולריות</option>
          <option value="asc">מחיר: מהנמוך לגבוה</option>
          <option value="desc">מחיר: מהגבוה לנמוך</option>
        </select>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden h-fit rounded-3xl bg-card p-6 shadow-soft lg:sticky lg:top-24 lg:block">{filters}</aside>
          <div>
            <p className="mb-4 text-sm text-muted-foreground">{list.length} חבילות נמצאו · {travelers} נוסעים</p>
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-96 rounded-3xl" />)}
              </div>
            ) : list.length ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {list.map((p) => <PackageCard key={p.id} p={p} image={destImage(p.dest)} />)}
              </div>
            ) : (
              <EmptyState title="לא נמצאו חבילות" sub="נסו להרחיב את טווח המחירים או לבחור יעד אחר." action={<Button variant="gold" onClick={reset}>איפוס סינון</Button>} />
            )}
          </div>
        </div>
      </section>

      {showFilters && (
        <div className="fixed inset-0 z-50 bg-navy/60 lg:hidden" onClick={() => setShowFilters(false)}>
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] animate-in slide-in-from-bottom overflow-auto rounded-t-3xl bg-background p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-navy">סינון</h3>
              <button onClick={() => setShowFilters(false)} aria-label="סגור"><X /></button>
            </div>
            {filters}
            <Button variant="gold" size="xl" className="mt-4 w-full" onClick={() => setShowFilters(false)}>הצג {list.length} תוצאות</Button>
          </div>
        </div>
      )}
    </>
  );
}
