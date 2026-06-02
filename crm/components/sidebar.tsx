"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const nav: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Leads", href: "/leads", icon: Users },
  { label: "Conversas", href: "/conversas", icon: MessageSquare },
  { label: "Reservas", href: "/reservas", icon: CalendarCheck },
  { label: "Configurações", href: "/configuracoes", icon: Settings },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-[220px] shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="flex h-[60px] items-center gap-2 border-b border-border px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background text-xs font-semibold">
          LM
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">Lu Milhas</span>
          <span className="text-xs text-muted-foreground">Viagens · CRM</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-0.5">
          {nav.map(({ label, href, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                    active
                      ? "bg-muted text-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      active ? "text-foreground" : "text-muted-foreground",
                    )}
                  />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border px-5 py-3">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
          Malu Bot
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Online · respondendo em segundos
        </p>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs text-foreground">Operacional</span>
        </div>
      </div>
    </aside>
  );
}
