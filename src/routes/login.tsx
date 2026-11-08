import { createFileRoute } from "@tanstack/react-router";
import { DemoBadge, Logo } from "@/components/site";
import { useDemo, roleLabels, type Role } from "@/lib/demo-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "מצב הדגמה | ES TRAVELS" },
      { name: "description", content: "החלפת תפקיד להדגמה בלבד — אינה התחברות אמיתית." },
      { property: "og:title", content: "מצב הדגמה | ES TRAVELS" },
      { property: "og:description", content: "בחירת תפקיד לתצוגה מקדימה." },
    ],
  }),
  component: Login,
});

function Login() {
  const { role, setRole } = useDemo();
  return (
    <div className="grid min-h-screen place-items-center bg-gradient-navy px-5 pb-16 pt-28">
      <div className="w-full max-w-md rounded-[2rem] border border-gold/40 bg-navy p-8 text-center shadow-lift">
        <Logo className="mx-auto h-20 w-20" />
        <DemoBadge className="mt-4">מצב הדגמה — לא התחברות מאובטחת</DemoBadge>
        <h1 className="mt-4 text-3xl font-bold text-navy-foreground">בחרו תפקיד לתצוגה</h1>
        <div className="mt-6 grid gap-3">
          {(Object.keys(roleLabels) as Role[]).map((r) => (
            <button key={r} onClick={() => setRole(r)}
              className={cn("rounded-2xl border px-4 py-3 font-semibold transition", role === r ? "border-gold bg-gold text-navy" : "border-gold/30 text-navy-foreground hover:bg-gold/10")}>
              {roleLabels[r]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
