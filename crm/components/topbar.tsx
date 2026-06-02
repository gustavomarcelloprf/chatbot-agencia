import { Bell, Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export function Topbar() {
  return (
    <header className="flex h-[60px] items-center justify-between gap-4 border-b border-border bg-background px-6">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar leads, conversas, reservas…"
          className="pl-9 h-9 bg-muted/40 border-transparent focus-visible:bg-background"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notificações"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500" />
        </button>

        <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background text-xs font-semibold">
            L
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-medium">Lu</span>
            <span className="text-xs text-muted-foreground">Administradora</span>
          </div>
        </div>
      </div>
    </header>
  );
}
