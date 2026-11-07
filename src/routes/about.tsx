import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Logo, SectionTitle } from "@/components/site";
import { CtaBand } from "@/components/cta-band";
import { images, agents } from "@/lib/data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "אודות | ES TRAVELS" },
      { name: "description", content: "ES TRAVELS — סוכנות נסיעות בוטיק לחופשות בהתאמה אישית." },
      { property: "og:title", content: "אודות ES TRAVELS" },
      { property: "og:description", content: "הסיפור, הצוות והגישה שלנו לחופשה מושלמת." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="About Us" title="אודות ES TRAVELS" image={images.italy} />
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
        <Logo className="mx-auto h-72 w-72 shadow-lift md:h-96 md:w-96" />
        <div>
          <h2 className="text-4xl font-bold text-navy">החופשה שלכם, הדאגה שלנו.</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">ES TRAVELS נולדה מתוך אהבה לעולם ולאנשים. אנחנו בונים חופשות שמרגישות כאילו נתפרו במיוחד עבורכם — מהטיסה הראשונה ועד הקוקטייל האחרון מול השקיעה.</p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">אנחנו עובדים עם מלונות ושותפים נבחרים ברחבי העולם, ומלווים כל לקוח באופן אישי לאורך כל הדרך.</p>
          <p className="mt-4 text-sm text-gold">* טקסט לדוגמה — יוחלף בסיפור האמיתי של העסק</p>
        </div>
      </section>
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle title="הצוות (דוגמה)" />
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {agents.map((a) => (
              <div key={a.id} className="rounded-3xl bg-card p-6 text-center shadow-soft">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-navy font-display text-3xl text-gold-light">{a.avatar}</div>
                <h3 className="mt-3 text-lg font-bold text-navy">{a.name}</h3>
                <p className="text-sm text-muted-foreground">{a.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  ),
});
