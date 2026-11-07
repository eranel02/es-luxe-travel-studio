import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Heart, Menu, MessageCircle, Star, User, X, FlaskConical, MapPin, Moon, Phone, Mail, Instagram, Facebook } from "lucide-react";
import logo from "@/assets/es-travels-logo.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { destName, ils, WHATSAPP, type Pkg } from "@/lib/data";
import { useDemo, roleLabels } from "@/lib/demo-store";
import { toast } from "sonner";

export const logoUrl = logo.url;

export function Logo({ className }: { className?: string }) {
  return <img src={logo.url} alt="ES TRAVELS" className={cn("rounded-full object-cover", className)} />;
}

export function DemoBadge({ children = "מצב הדגמה", className }: { children?: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border border-gold/60 bg-gold/10 px-2.5 py-0.5 text-xs font-semibold text-gold", className)}>
      <FlaskConical className="h-3 w-3" /> {children}
    </span>
  );
}

const nav = [
  { to: "/", label: "דף הבית" },
  { to: "/packages", label: "חבילות נופש" },
  { to: "/destinations", label: "יעדים" },
  { to: "/deals", label: "מבצעים" },
  { to: "/about", label: "אודות" },
  { to: "/contact", label: "צור קשר" },
] as const;

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { role } = useDemo();
  const overHero = path === "/" && !scrolled;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  return (
    <header
      className={cn(
        "no-print fixed inset-x-0 top-0 z-50 transition-all duration-500",
        overHero ? "bg-transparent py-4" : "bg-navy/95 py-2 shadow-lift backdrop-blur",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 lg:flex lg:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <Logo className={cn("shrink-0 ring-1 ring-gold/40 transition-all", overHero ? "h-12 w-12" : "h-10 w-10")} />
          <span className="truncate font-latin text-xl font-semibold tracking-[0.25em] text-gold-light">ES TRAVELS</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="relative text-[15px] text-navy-foreground/85 transition-colors hover:text-gold-light data-[status=active]:text-gold-light data-[status=active]:after:absolute data-[status=active]:after:-bottom-1.5 data-[status=active]:after:inset-x-0 data-[status=active]:after:h-px data-[status=active]:after:bg-gold"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold-light transition hover:bg-gold/15">
            <MessageCircle className="h-5 w-5" />
          </a>
          <Button asChild variant="glass" size="sm" className="hidden h-10 px-4 sm:inline-flex">
            <Link to="/login">
              <User /> {role === "visitor" ? "התחברות" : roleLabels[role]}
            </Link>
          </Button>
          <button onClick={() => setOpen(true)} aria-label="תפריט" className="grid h-10 w-10 place-items-center rounded-full text-navy-foreground lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-navy animate-in fade-in lg:hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <Logo className="h-12 w-12" />
            <button onClick={() => setOpen(false)} aria-label="סגור" className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold-light">
              <X />
            </button>
          </div>
          <div className="gold-rule mx-5" />
          <nav className="flex flex-col gap-1 px-6 py-6">
            {nav.map((n, i) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} style={{ animationDelay: `${i * 50}ms` }}
                className="animate-fade-up border-b border-navy-foreground/10 py-4 font-display text-2xl text-navy-foreground data-[status=active]:text-gold-light">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 px-6">
            <Button asChild variant="gold" size="xl"><Link to="/login">התחברות / מצב הדגמה</Link></Button>
            <Button asChild variant="glass" size="xl"><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle /> דברו איתנו בוואטסאפ</a></Button>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="no-print bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Logo className="h-14 w-14" />
            <span className="font-latin text-2xl tracking-[0.3em] text-gold-light">ES TRAVELS</span>
          </div>
          <p className="mt-4 max-w-sm text-navy-foreground/70">החופשה שלכם, הדאגה שלנו. סוכנות נסיעות בוטיק לחופשות בהתאמה אישית ברחבי העולם.</p>
        </div>
        <div>
          <h4 className="mb-3 text-gold-light">ניווט</h4>
          <ul className="space-y-2 text-navy-foreground/70">
            {nav.slice(1).map((n) => <li key={n.to}><Link to={n.to} className="hover:text-gold-light">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-gold-light">יצירת קשר</h4>
          <ul className="space-y-2 text-navy-foreground/70">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> <span dir="ltr">050-000-0000</span> (דוגמה)</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> <span dir="ltr">info@es-travels.demo</span></li>
            <li className="flex gap-3 pt-2"><Instagram className="h-5 w-5 text-gold" /><Facebook className="h-5 w-5 text-gold" /></li>
          </ul>
        </div>
      </div>
      <div className="gold-rule" />
      <p className="py-5 text-center text-xs text-navy-foreground/50">© 2026 ES TRAVELS · אב־טיפוס חזותי — כל הנתונים, המחירים והפעולות באתר הם להדגמה בלבד</p>
    </footer>
  );
}

export function FavButton({ id, className }: { id: string; className?: string }) {
  const { favorites, toggleFavorite } = useDemo();
  const on = favorites.includes(id);
  return (
    <button
      aria-label={on ? "הסר ממועדפים" : "הוסף למועדפים"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
        toast(on ? "הוסר מהמועדפים" : "נשמר במועדפים (בדפדפן זה)");
      }}
      className={cn("grid h-10 w-10 place-items-center rounded-full bg-card/90 shadow-soft backdrop-blur transition hover:scale-110", className)}
    >
      <Heart className={cn("h-5 w-5 transition", on ? "fill-gold text-gold" : "text-navy")} />
    </button>
  );
}

export function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} כוכבים`}>
      {Array.from({ length: n }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />)}
    </span>
  );
}

export function PackageCard({ p, image }: { p: Pkg; image: string }) {
  return (
    <Link to="/packages/$id" params={{ id: p.id }} className="group block overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={image} alt={p.title} loading="lazy" width={1024} height={1280} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        {p.badge && <span className="absolute right-4 top-4 rounded-full bg-gradient-gold px-3 py-1 text-xs font-bold text-navy">{p.badge}</span>}
        <FavButton id={p.id} className="absolute left-4 top-4" />
        <span className="absolute bottom-4 right-4 flex items-center gap-1 text-sm text-navy-foreground"><MapPin className="h-4 w-4 text-gold-light" /> {destName(p.dest)}</span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-xl font-bold">{p.title}</h3>
        </div>
        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <span dir="ltr" className="truncate">{p.hotel}</span> <Stars n={p.stars} />
        </div>
        <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
          <div>
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Moon className="h-3.5 w-3.5" /> {p.nights} לילות · {p.board}</span>
            <span className="text-xs text-muted-foreground">החל מ־</span>{" "}
            <span className="font-display text-2xl font-bold text-navy">{ils(p.price)}</span>
            <span className="text-xs text-muted-foreground"> לאדם</span>
          </div>
          <span className="rounded-full border border-gold px-4 py-2 text-sm font-semibold text-navy transition group-hover:bg-gold">לפרטים</span>
        </div>
      </div>
    </Link>
  );
}

export function SectionTitle({ eyebrow, title, sub, light, center = true }: { eyebrow?: string; title: string; sub?: string; light?: boolean; center?: boolean }) {
  return (
    <div className={cn("mb-10", center && "text-center")}>
      {eyebrow && <p className="mb-2 font-latin text-sm uppercase tracking-[0.35em] text-gold">{eyebrow}</p>}
      <h2 className={cn("text-3xl font-bold md:text-5xl", light ? "text-navy-foreground" : "text-navy")}>{title}</h2>
      {sub && <p className={cn("mx-auto mt-3 max-w-2xl text-lg", light ? "text-navy-foreground/70" : "text-muted-foreground")}>{sub}</p>}
    </div>
  );
}

export function PageHero({ title, sub, image, eyebrow }: { title: string; sub?: string; image: string; eyebrow?: string }) {
  return (
    <section className="relative flex min-h-[360px] items-end overflow-hidden bg-navy pb-12 pt-32 md:min-h-[440px]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative mx-auto w-full max-w-7xl px-5">
        {eyebrow && <p className="mb-2 animate-fade-up font-latin text-sm uppercase tracking-[0.35em] text-gold-light">{eyebrow}</p>}
        <h1 className="animate-fade-up text-4xl font-bold text-navy-foreground md:text-6xl">{title}</h1>
        {sub && <p className="mt-3 max-w-2xl animate-fade-up text-lg text-navy-foreground/80 delay-1">{sub}</p>}
      </div>
    </section>
  );
}

export function EmptyState({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="rounded-3xl border border-dashed border-gold/50 bg-card p-12 text-center">
      <h3 className="text-2xl font-bold text-navy">{title}</h3>
      {sub && <p className="mt-2 text-muted-foreground">{sub}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
