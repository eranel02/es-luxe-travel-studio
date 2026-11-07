import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ArrowLeft, ArrowRight, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoBadge, Logo } from "@/components/site";
import { destinations, packages, images } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quote")({
  validateSearch: (s: Record<string, unknown>): { pkg?: string } => ({ pkg: typeof s.pkg === "string" ? s.pkg : undefined }),
  head: () => ({
    meta: [
      { title: "בקשת הצעת מחיר | ES TRAVELS" },
      { name: "description", content: "ספרו לנו על החופשה שאתם חולמים עליה ונבנה לכם הצעה אישית." },
      { property: "og:title", content: "בקשת הצעת מחיר | ES TRAVELS" },
      { property: "og:description", content: "טופס בקשת הצעה אישית לחופשה בהתאמה אישית." },
    ],
  }),
  component: QuotePage,
});

const steps = ["פרטי החופשה", "העדפות", "פרטי קשר"];

function QuotePage() {
  const { pkg } = Route.useSearch();
  const pk = packages.find((p) => p.id === pkg);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [f, setF] = useState({
    dest: pk?.dest ?? "", from: pk?.depart ?? "", to: "", adults: 2, kids: 0, budget: "",
    stars: "5", board: pk?.board ?? "ארוחת בוקר", requests: "", name: "", phone: "", email: "", consent: false,
  });
  const set = (k: keyof typeof f, v: unknown) => setF((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!f.dest) e.dest = "יש לבחור יעד";
      if (!f.from) e.from = "יש לבחור תאריך יציאה";
      if (!f.to) e.to = "יש לבחור תאריך חזרה";
      else if (f.from && f.to <= f.from) e.to = "תאריך החזרה חייב להיות אחרי היציאה";
      if (f.adults < 1) e.adults = "לפחות מבוגר אחד";
    }
    if (step === 2) {
      if (f.name.trim().length < 2) e.name = "יש להזין שם מלא";
      if (!/^0\d{1,2}-?\d{7}$/.test(f.phone.replace(/\s/g, ""))) e.phone = "מספר טלפון לא תקין (לדוגמה 050-1234567)";
      if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "כתובת אימייל לא תקינה";
      if (!f.consent) e.consent = "יש לאשר את מדיניות הפרטיות";
    }
    setErrors(e);
    return !Object.keys(e).length;
  };
  const next = () => { if (!validate()) return; if (step < 2) setStep(step + 1); else setDone(true); };

  if (done) {
    return (
      <div className="grid min-h-screen place-items-center bg-gradient-navy px-5 pt-24 pb-16">
        <div className="max-w-lg animate-fade-up rounded-[2rem] border border-gold/40 bg-navy p-10 text-center shadow-lift">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full border-2 border-dashed border-gold text-gold"><FlaskConical /></div>
          <DemoBadge>אישור הדגמה בלבד</DemoBadge>
          <h1 className="mt-4 text-3xl font-bold text-navy-foreground">תודה, {f.name.split(" ")[0]}!</h1>
          <p className="mt-3 text-navy-foreground/75">זוהי הדגמה חזותית: <strong className="text-gold-light">הבקשה לא נשלחה בפועל</strong> ואף סוכן לא קיבל אותה. במערכת האמיתית, סוכן יחזור אליכם תוך 24 שעות.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild variant="gold"><Link to="/">חזרה לדף הבית</Link></Button>
            <Button asChild variant="glass"><Link to="/proposal">צפו בדוגמת הצעה</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  const Err = ({ k }: { k: string }) => (errors[k] ? <p className="mt-1 text-sm text-destructive">{errors[k]}</p> : null);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative bg-navy pb-24 pt-28">
        <img src={images.italy} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <h1 className="text-4xl font-bold text-navy-foreground md:text-5xl">בקשת הצעה אישית</h1>
          <p className="mt-2 text-navy-foreground/75">שלושה צעדים קצרים לחופשה מושלמת</p>
          {pk && <p className="mt-3 text-gold-light">חבילה נבחרת: {pk.title}</p>}
        </div>
      </div>
      <div className="relative mx-auto -mt-16 max-w-3xl px-5">
        <div className="rounded-[2rem] bg-card p-6 shadow-lift md:p-10">
          <ol className="mb-8 flex items-center gap-2">
            {steps.map((s, i) => (
              <li key={s} className="flex flex-1 items-center gap-2">
                <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 text-sm font-bold transition", i < step ? "border-gold bg-gold text-navy" : i === step ? "border-gold text-navy" : "border-border text-muted-foreground")}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span className={cn("hidden text-sm sm:block", i === step ? "font-bold text-navy" : "text-muted-foreground")}>{s}</span>
                {i < 2 && <span className={cn("h-px flex-1", i < step ? "bg-gold" : "bg-border")} />}
              </li>
            ))}
          </ol>

          <div key={step} className="animate-fade-up">
            {step === 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <L label="יעד" className="sm:col-span-2"><select className="field" value={f.dest} onChange={(e) => set("dest", e.target.value)}><option value="">בחרו יעד</option>{destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}<option value="other">יעד אחר</option></select><Err k="dest" /></L>
                <L label="תאריך יציאה"><input type="date" className="field" value={f.from} onChange={(e) => set("from", e.target.value)} /><Err k="from" /></L>
                <L label="תאריך חזרה"><input type="date" className="field" value={f.to} min={f.from} onChange={(e) => set("to", e.target.value)} /><Err k="to" /></L>
                <L label="מבוגרים"><input type="number" min={1} className="field" value={f.adults} onChange={(e) => set("adults", +e.target.value)} /><Err k="adults" /></L>
                <L label="ילדים"><input type="number" min={0} className="field" value={f.kids} onChange={(e) => set("kids", +e.target.value)} /></L>
                <L label="תקציב כולל משוער (₪)" className="sm:col-span-2"><input inputMode="numeric" className="field" placeholder="לדוגמה 20,000" value={f.budget} onChange={(e) => set("budget", e.target.value)} /></L>
              </div>
            )}
            {step === 1 && (
              <div className="grid gap-5">
                <L label="דירוג מלון מועדף">
                  <div className="flex gap-2">{["3", "4", "5"].map((s) => <button type="button" key={s} onClick={() => set("stars", s)} className={cn("flex-1 rounded-xl border py-3", f.stars === s ? "border-gold bg-gold/15 font-bold" : "border-border")}>{s} ★</button>)}</div>
                </L>
                <L label="בסיס אירוח">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{["לינה בלבד", "ארוחת בוקר", "חצי פנסיון", "הכל כלול"].map((b) => <button type="button" key={b} onClick={() => set("board", b)} className={cn("rounded-xl border py-3 text-sm", f.board === b ? "border-gold bg-gold/15 font-bold" : "border-border")}>{b}</button>)}</div>
                </L>
                <L label="בקשות מיוחדות"><textarea rows={4} className="field" placeholder="ירח דבש, אוכל כשר, נגישות, חדרים סמוכים..." value={f.requests} onChange={(e) => set("requests", e.target.value)} /></L>
              </div>
            )}
            {step === 2 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <L label="שם מלא" className="sm:col-span-2"><input className="field" value={f.name} onChange={(e) => set("name", e.target.value)} /><Err k="name" /></L>
                <L label="טלפון"><input dir="ltr" type="tel" className="field text-right" placeholder="050-1234567" value={f.phone} onChange={(e) => set("phone", e.target.value)} /><Err k="phone" /></L>
                <L label="אימייל"><input dir="ltr" type="email" className="field text-right" value={f.email} onChange={(e) => set("email", e.target.value)} /><Err k="email" /></L>
                <label className="flex items-start gap-2 sm:col-span-2">
                  <input type="checkbox" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 h-4 w-4 accent-[var(--gold)]" />
                  <span className="text-sm">אני מאשר/ת את מדיניות הפרטיות ומסכים/ה לקבל פנייה מנציג ES TRAVELS.</span>
                </label>
                <div className="sm:col-span-2"><Err k="consent" /></div>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
            {step > 0 ? <Button variant="ghost" onClick={() => setStep(step - 1)}><ArrowRight /> חזרה</Button> : <span />}
            <Button variant="gold" size="xl" onClick={next}>{step < 2 ? <>המשך <ArrowLeft /></> : "שליחת בקשה (הדגמה)"}</Button>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"><Logo className="h-6 w-6" /> הטופס הוא הדגמה — שום מידע לא נשלח או נשמר.</div>
      </div>
    </div>
  );
}

function L({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return <label className={cn("block", className)}><span className="mb-1.5 block text-sm font-semibold text-navy">{label}</span>{children}</label>;
}
