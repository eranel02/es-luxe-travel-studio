import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { FlaskConical } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { DemoProvider, useDemo, roleLabels } from "@/lib/demo-store";
import { SiteHeader, SiteFooter } from "@/components/site";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="max-w-md text-center">
        <h1 className="text-gradient-gold text-8xl font-bold">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-navy-foreground">הדף לא נמצא</h2>
        <p className="mt-2 text-navy-foreground/70">נראה שהיעד הזה עוד לא על המפה שלנו.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-gradient-gold px-6 py-3 font-semibold text-navy">חזרה לדף הבית</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold text-foreground">הדף לא נטען</h1>
        <p className="mt-2 text-muted-foreground">משהו השתבש. נסו לרענן או לחזור לדף הבית.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-primary px-5 py-2 text-primary-foreground">נסו שוב</button>
          <a href="/" className="rounded-full border border-input px-5 py-2">דף הבית</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ES TRAVELS — החופשה שלכם, הדאגה שלנו" },
      { name: "description", content: "חופשות בהתאמה אישית, טיסות, מלונות וחבילות נופש ליעדים המובילים בעולם." },
      { property: "og:title", content: "ES TRAVELS" },
      { property: "og:description", content: "חופשות יוקרה בהתאמה אישית ליעדים המובילים בעולם." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700&family=Frank+Ruhl+Libre:wght@400;500;700;900&family=Cormorant+Garamond:wght@500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function DemoPill() {
  const { role } = useDemo();
  return (
    <Link to="/login" className="no-print fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full border border-gold/60 bg-navy px-4 py-2 text-xs font-semibold text-gold-light shadow-lift">
      <FlaskConical className="h-4 w-4" /> מצב הדגמה · {roleLabels[role]}
    </Link>
  );
}

function Shell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const bare = path.startsWith("/admin") || path.startsWith("/proposal-pdf");
  return (
    <>
      {!bare && <SiteHeader />}
      <main className="min-h-screen">
        <Outlet />
      </main>
      {!bare && <SiteFooter />}
      <DemoPill />
      <Toaster position="top-center" dir="rtl" />
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <DemoProvider>
        <Shell />
      </DemoProvider>
    </QueryClientProvider>
  );
}
