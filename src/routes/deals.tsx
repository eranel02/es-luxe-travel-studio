import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PackageCard, DemoBadge } from "@/components/site";
import { CtaBand } from "@/components/cta-band";
import { packages, destImage, images } from "@/lib/data";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "מבצעים | ES TRAVELS" },
      { name: "description", content: "דילים חמים ומבצעים בלעדיים לחופשות יוקרה." },
      { property: "og:title", content: "מבצעים | ES TRAVELS" },
      { property: "og:description", content: "דילים חמים לזמן מוגבל." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Exclusive Deals" title="מבצעים ודילים חמים" sub="הצעות לזמן מוגבל שנבחרו על ידי הצוות שלנו." image={images.paris} />
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8"><DemoBadge>מחירים לדוגמה</DemoBadge></div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.filter((p) => p.badge).map((p) => <PackageCard key={p.id} p={p} image={destImage(p.dest)} />)}
        </div>
      </section>
      <CtaBand />
    </>
  ),
});
