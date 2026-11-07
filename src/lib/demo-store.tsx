import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "visitor" | "customer" | "agent" | "admin";
export const roleLabels: Record<Role, string> = {
  visitor: "מבקר",
  customer: "לקוח",
  agent: "סוכן נסיעות",
  admin: "מנהל מערכת",
};

type Store = {
  role: Role;
  setRole: (r: Role) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
};

const Ctx = createContext<Store | null>(null);

// Frontend-only demo state (localStorage). Not authentication.
export function DemoProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("visitor");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const r = localStorage.getItem("es-demo-role") as Role | null;
      if (r) setRoleState(r);
      const f = localStorage.getItem("es-demo-favs");
      if (f) setFavorites(JSON.parse(f));
    } catch {
      /* ignore */
    }
  }, []);

  const setRole = (r: Role) => {
    setRoleState(r);
    localStorage.setItem("es-demo-role", r);
  };
  const toggleFavorite = (id: string) =>
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("es-demo-favs", JSON.stringify(next));
      return next;
    });

  return <Ctx.Provider value={{ role, setRole, favorites, toggleFavorite }}>{children}</Ctx.Provider>;
}

export function useDemo() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useDemo outside provider");
  return c;
}
