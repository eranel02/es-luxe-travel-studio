import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, Plane, BedDouble, CalendarDays, MessageCircle, MapPin, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FavButton, Stars, DemoBadge } from "@/components/site";
import { packages, destImage, destName, destinations, ils, heDate, WHATSAPP } from "@/lib/data";

export const Route = createFileRoute("/packages/$id")({
  loader: ({ params }) => {
    const p = packages.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | ES TRAVELS` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.description },
        ]
      : [{ title: "חבילה לא נמצאה | ES TRAVELS" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-[70vh] place-items-center pt-24 text-center">
      <div><h1 className="text-3xl font-bold text-navy">החבילה לא נמצאה</h1>
        <Link to="/packages" className="mt-4 inline-block text-gold underline">חזרה לקטלוג</Link></div>
    </div>
  ),
  component: Details,
});

function Details() {
  const p = Route.useLoaderData();
  const gallery = [destImage(p.dest), ...destinations.filter((d) => d.id !== p.dest).slice(0, 3).map((d) => d.image)];
  const [active, setActive] = useState(0);
  const ret = new Date(new Date(p.depart).getTime() + p.nights * 864e5).toISOString().slice(0, 10);

  return (
    <div className="bg-background pb-24 pt-24">
      <div className="mx-auto max-w-7xl px-5">
        <Link to="/packages" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold"><ChevronRight className="h-4 w-4" /> חזרה לחבילות</Link>
        <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2">
          <div className="relative overflow-hidden rounded-3xl md:col-span-3 md:row-span-2">
            <img src={gallery[active]} alt={p.title} className="aspect-[4/3] h-full w-full object-cover md:aspect-auto md:max-h-[560px]" />
            <FavButton id={p.id} className="absolute left-4 top-4" />
            {p.badge && <span className="absolute right-4 top-4 rounded-full bg-gradient-gold px-3 py-1 text-sm font-bold text-navy">{p.badge}</span>}
          </div>
          <div className="grid grid-cols-4 gap-3 md:col-span-1 md:row-span-2 md:grid-cols-1">
            {gallery.map((g, i) => (
              <button key={i} onClick={() => setActive(i)} className={`overflow-hidden rounded-2xl ring-2 transition ${active === i ? "ring-gold" : "ring-transparent opacity-80 hover:opacity-100"}`}>
                <img src={g} alt="" loading="lazy" className="aspect-square h-full w-full object-cover md:aspect-[16/10]" />
              </button>
            ))}
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">תמונות להמחשה</p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-10">
            <div>
              <p className="flex items-center gap-1 text-gold"><MapPin className="h-4 w-4" /> {destName(p.dest)}</p>
              <h1 className="mt-1 text-4xl font-bold text-navy md:text-5xl">{p.title}</h1>
              <div className="mt-3 flex items-center gap-3 text-lg"><span dir="ltr" className="font-semibold">{p.hotel}</span><Stars n={p.stars} /></div>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{p.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Info icon={BedDouble} title="החדר" text={p.room} />
              <Info icon={CalendarDays} title="תאריכים" text={`${heDate(p.depart)} — ${heDate(ret)} · ${p.nights} לילות`} />
              <Info icon={Sparkles} title="בסיס אירוח" text={p.board} />
            </div>

            <div className="rounded-3xl bg-navy p-6 text-navy-foreground">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gold-light"><Plane className="h-5 w-5" /> פרטי טיסה · <span dir="ltr">{p.flight.airline}</span></h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-navy-foreground/5 p-4"><p className="text-sm text-navy-foreground/60">הלוך</p><p dir="ltr" className="text-right font-semibold">{p.flight.out}</p></div>
                <div className="rounded-2xl bg-navy-foreground/5 p-4"><p className="text-sm text-navy-foreground/60">חזור</p><p dir="ltr" className="text-right font-semibold">{p.flight.back}</p></div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl bg-card p-6 shadow-soft">
                <h3 className="mb-3 text-xl font-bold text-navy">כלול בחבילה</h3>
                <ul className="space-y-2">{p.included.map((x) => <li key={x} className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-success" /> {x}</li>)}</ul>
              </div>
              <div className="rounded-3xl bg-card p-6 shadow-soft">
                <h3 className="mb-3 text-xl font-bold text-navy">לא כלול</h3>
                <ul className="space-y-2">{p.excluded.map((x) => <li key={x} className="flex gap-2 text-muted-foreground"><X className="h-5 w-5 shrink-0 text-destructive" /> {x}</li>)}</ul>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-bold text-navy">אטרקציות מומלצות (בתוספת תשלום)</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {p.attractions.map((a) => (
                  <div key={a.name} className="flex items-center justify-between rounded-2xl border border-gold/30 bg-card p-4">
                    <span>{a.name}</span><span className="font-bold text-navy">{ils(a.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-gold/30 bg-card p-6 shadow-lift lg:sticky lg:top-24">
            <DemoBadge>מחיר אינדיקטיבי</DemoBadge>
            <p className="mt-4 text-sm text-muted-foreground">החל מ־</p>
            <p className="font-display text-5xl font-bold text-navy">{ils(p.price)}</p>
            <p className="text-sm text-muted-foreground">לאדם בחדר זוגי · {p.nights} לילות</p>
            <div className="gold-rule my-6" />
            <div className="space-y-3">
              <Button asChild variant="gold" size="xl" className="w-full"><Link to="/quote" search={{ pkg: p.id }}>בקשת הצעת מחיר</Link></Button>
              <Button asChild variant="outline-gold" size="xl" className="w-full"><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle /> שאלה בוואטסאפ</a></Button>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">המחיר הסופי ייקבע בהצעה אישית לפי זמינות.</p>
          </aside>
        </div>
      </div>
      <div className="no-print fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-border bg-card p-3 pl-40 lg:hidden">
        <div><p className="text-xs text-muted-foreground">החל מ־</p><p className="font-display text-xl font-bold">{ils(p.price)}</p></div>
        <Button asChild variant="gold"><Link to="/quote" search={{ pkg: p.id }}>הצעת מחיר</Link></Button>
      </div>
    </div>
  );
}

function Info({ icon: Icon, title, text }: { icon: typeof Plane; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <Icon className="mb-2 h-6 w-6 text-gold" strokeWidth={1.4} />
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="font-semibold text-navy">{text}</p>
    </div>
  );
}
