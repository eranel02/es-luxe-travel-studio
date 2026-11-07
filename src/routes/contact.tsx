import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Phone, Mail, Clock } from "lucide-react";
import { PageHero, DemoBadge } from "@/components/site";
import { Button } from "@/components/ui/button";
import { images, WHATSAPP } from "@/lib/data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "צור קשר | ES TRAVELS" },
      { name: "description", content: "דברו עם סוכן נסיעות אישי — טלפון, וואטסאפ או טופס פנייה." },
      { property: "og:title", content: "צור קשר | ES TRAVELS" },
      { property: "og:description", content: "נשמח לתכנן אתכם את החופשה הבאה." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Contact" title="צור קשר" sub="סוכן אישי ישמח לעזור לכם לתכנן." image={images.thailand} />
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {[{ i: Phone, t: "טלפון", v: "050-000-0000" }, { i: Mail, t: "אימייל", v: "info@es-travels.demo" }, { i: Clock, t: "שעות פעילות", v: "א׳–ה׳ 09:00–19:00" }].map((x) => (
            <div key={x.t} className="flex items-center gap-4 rounded-2xl bg-card p-5 shadow-soft">
              <x.i className="h-6 w-6 text-gold" /><div><p className="text-sm text-muted-foreground">{x.t}</p><p dir="ltr" className="text-right font-semibold text-navy">{x.v}</p></div>
            </div>
          ))}
          <p className="text-xs text-gold">* פרטי קשר לדוגמה</p>
          <Button asChild variant="gold" size="xl" className="w-full"><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle /> וואטסאפ</a></Button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-3xl bg-card p-7 shadow-lift">
          {sent ? (
            <div className="py-12 text-center"><DemoBadge>הדגמה</DemoBadge><h3 className="mt-3 text-2xl font-bold text-navy">ההודעה לא נשלחה בפועל</h3><p className="mt-2 text-muted-foreground">זהו אב־טיפוס חזותי. בגרסה האמיתית נחזור אליכם תוך יום עסקים.</p><Button variant="outline-gold" className="mt-5" onClick={() => setSent(false)}>טופס חדש</Button></div>
          ) : (
            <div className="grid gap-4">
              <h3 className="text-2xl font-bold text-navy">השאירו פרטים</h3>
              <input required placeholder="שם מלא" className="field" />
              <input required type="tel" placeholder="טלפון" className="field" />
              <input type="email" placeholder="אימייל" className="field" />
              <textarea rows={4} placeholder="ספרו לנו על החופשה..." className="field" />
              <Button type="submit" variant="navy" size="xl">שליחה (הדגמה)</Button>
            </div>
          )}
        </form>
      </section>
    </>
  );
}
