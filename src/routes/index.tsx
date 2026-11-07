import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Plane, BadgePercent, HeartHandshake, Quote, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo, PackageCard, SectionTitle, DemoBadge } from "@/components/site";
import { SearchPanel } from "@/components/search-panel";
import { CtaBand } from "@/components/cta-band";
import { destinations, packages, testimonials, images, destImage, ils } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ES TRAVELS — החופשה שלכם, הדאגה שלנו" },
      { name: "description", content: "חופשות בהתאמה אישית, טיסות, מלונות וחבילות נופש לדובאי, תאילנד, יוון, איטליה, פריז והמלדיביים." },
      { property: "og:title", content: "ES TRAVELS — חופשות יוקרה בהתאמה אישית" },
      { property: "og:description", content: "החופשה שלכם, הדאגה שלנו. גלו את החופשה הבאה שלכם." },
    ],
  }),
  component: Home,
});

const features = [
  { icon: Compass, title: "חופשות בהתאמה אישית", text: "כל מסלול נבנה סביבכם — הקצב, הטעם והחלומות שלכם." },
  { icon: Plane, title: "טיסות, מלונות וחבילות נופש", text: "הכל במקום אחד, מתואם עד הפרט האחרון." },
  { icon: BadgePercent, title: "דילים במחירים משתלמים", text: "גישה למחירי ספקים ומבצעים בלעדיים." },
  { icon: HeartHandshake, title: "יחס אישי וליווי לאורך הדרך", text: "סוכן אישי זמין לכם לפני, במהלך ואחרי החופשה." },
];

function Home() {
  const hot = packages.filter((p) => p.hot).slice(0, 6);
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-navy">
        <img src={images.hero} alt="וילות מעל המים בשקיעה" width={1920} height={1088} className="absolute inset-0 h-full w-full scale-105 object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-10 pt-28">
          <div className="mb-10 max-w-3xl">
            <Logo className="mb-6 h-24 w-24 animate-fade-up shadow-gold ring-1 ring-gold/50 md:h-28 md:w-28" />
            <h1 className="animate-fade-up text-5xl font-black leading-[1.1] text-navy-foreground delay-1 md:text-7xl">
              החופשה שלכם,<br /><span className="text-gradient-gold">הדאגה שלנו.</span>
            </h1>
            <p className="mt-5 max-w-xl animate-fade-up text-lg text-navy-foreground/85 delay-2 md:text-xl">
              חופשות בהתאמה אישית, טיסות, מלונות וחבילות נופש ליעדים המובילים בעולם.
            </p>
            <div className="mt-8 flex animate-fade-up flex-wrap gap-3 delay-3">
              <Button asChild variant="gold" size="xl"><Link to="/packages">גלו את החופשה הבאה שלכם</Link></Button>
              <Button asChild variant="glass" size="xl"><Link to="/quote">קבלו הצעה אישית</Link></Button>
            </div>
          </div>
          <div className="animate-fade-up delay-3"><SearchPanel /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionTitle eyebrow="Hot Deals" title="דילים חמים" sub="מבחר חבילות שנבחרו בקפידה על ידי הצוות שלנו" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hot.map((p) => <PackageCard key={p.id} p={p} image={destImage(p.dest)} />)}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline-gold" size="xl"><Link to="/packages">לכל החבילות <ArrowLeft /></Link></Button>
        </div>
      </section>

      <section className="bg-navy py-20">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle light eyebrow="Destinations" title="יעדים פופולריים" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {destinations.map((d, i) => (
              <Link key={d.id} to="/packages" search={{ dest: d.id }}
                className={`group relative overflow-hidden rounded-3xl ${i === 0 || i === 5 ? "md:row-span-2" : ""}`}>
                <img src={d.image} alt={d.name} loading="lazy" width={1024} height={1280} className="h-full min-h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-latin text-sm tracking-[0.3em] text-gold-light">{d.en.toUpperCase()}</p>
                  <h3 className="text-2xl font-bold text-navy-foreground md:text-3xl">{d.name}</h3>
                  <p className="hidden text-sm text-navy-foreground/75 sm:block">{d.tagline} · החל מ־{ils(d.from)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionTitle eyebrow="Why ES Travels" title="למה ES TRAVELS" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="group rounded-3xl border border-border bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:border-gold/60">
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-gold/50 text-gold transition group-hover:bg-gold group-hover:text-navy">
                <f.icon className="h-7 w-7" strokeWidth={1.3} />
              </div>
              <h3 className="text-xl font-bold text-navy">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle eyebrow="Testimonials" title="מה אומרים עלינו" />
          <div className="-mt-6 mb-8 text-center"><DemoBadge>המלצות לדוגמה — אינן ביקורות אמיתיות</DemoBadge></div>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-3xl bg-card p-7 shadow-soft">
                <Quote className="h-8 w-8 text-gold" />
                <blockquote className="mt-4 text-lg leading-relaxed">{t.text}</blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="font-bold text-navy">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.trip}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
