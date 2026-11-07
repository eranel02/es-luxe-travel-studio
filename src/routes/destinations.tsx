import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site";
import { CtaBand } from "@/components/cta-band";
import { destinations, packages, images, ils } from "@/lib/data";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "יעדים | ES TRAVELS" },
      { name: "description", content: "דובאי, תאילנד, יוון, איטליה, פריז והמלדיביים — היעדים המובילים של ES TRAVELS." },
      { property: "og:title", content: "יעדים | ES TRAVELS" },
      { property: "og:description", content: "גלו את היעדים המובילים שלנו." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Destinations" title="היעדים שלנו" sub="שישה עולמות, אינסוף דרכים לחוות אותם." image={images.dubai} />
      <section className="mx-auto max-w-7xl space-y-6 px-5 py-16">
        {destinations.map((d, i) => (
          <Link key={d.id} to="/packages" search={{ dest: d.id }} className={`group grid overflow-hidden rounded-[2rem] bg-card shadow-soft transition hover:shadow-lift md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
            <div className="overflow-hidden"><img src={d.image} alt={d.name} loading="lazy" className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-96" /></div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="font-latin tracking-[0.35em] text-gold">{d.en.toUpperCase()}</p>
              <h2 className="mt-1 text-4xl font-bold text-navy">{d.name}</h2>
              <p className="mt-3 text-lg text-muted-foreground">{d.tagline}</p>
              <p className="mt-6 text-sm text-muted-foreground">{packages.filter((p) => p.dest === d.id).length} חבילות · החל מ־<span className="font-bold text-navy">{ils(d.from)}</span></p>
              <span className="mt-6 w-fit rounded-full border border-gold px-6 py-2.5 font-semibold transition group-hover:bg-gold">לחבילות ב{d.name}</span>
            </div>
          </Link>
        ))}
      </section>
      <CtaBand />
    </>
  ),
});
