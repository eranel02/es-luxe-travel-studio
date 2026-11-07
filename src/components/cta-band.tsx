import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP } from "@/lib/data";

export function CtaBand() {
  return (
    <section className="px-5 py-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-navy p-10 text-center shadow-lift md:p-16">
        <div className="gold-rule absolute inset-x-10 top-0" />
        <p className="font-latin tracking-[0.4em] text-gold">YOUR JOURNEY BEGINS</p>
        <h2 className="mt-3 text-3xl font-bold text-navy-foreground md:text-5xl">מוכנים לחופשה הבאה?</h2>
        <p className="mx-auto mt-4 max-w-xl text-navy-foreground/75">ספרו לנו על החלום — סוכן אישי יבנה עבורכם הצעה מותאמת.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="gold" size="xl"><Link to="/quote">קבלו הצעה אישית</Link></Button>
          <Button asChild variant="glass" size="xl"><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle /> שיחה בוואטסאפ</a></Button>
        </div>
      </div>
    </section>
  );
}
