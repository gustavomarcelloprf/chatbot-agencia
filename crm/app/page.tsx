import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Minus } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { TempBadge } from "@/components/temp-badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { conversations, dashboardMetrics, leads } from "@/lib/mock-data";
import { formatPhone, formatRelative } from "@/lib/format";
import { cn } from "@/lib/utils";

const trendIcon = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: Minus,
} as const;

const trendClass = {
  up: "text-emerald-600 dark:text-emerald-400",
  down: "text-rose-600 dark:text-rose-400",
  flat: "text-muted-foreground",
} as const;

export default function DashboardPage() {
  const recentLeads = [...leads]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  const pendingConversations = conversations.filter((c) => c.unread > 0);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Visão geral da operação do dia."
      />

      <div className="px-8 py-8 space-y-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardMetrics.map((metric) => {
            const Icon = trendIcon[metric.trend];
            return (
              <Card key={metric.label}>
                <CardHeader>
                  <CardTitle>{metric.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-semibold tracking-tight tabular-nums">
                      {metric.value}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 text-xs",
                        trendClass[metric.trend],
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {metric.delta}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground text-base font-semibold">
                  Leads recentes
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Últimos 5 leads capturados pela Malu.
                </p>
              </div>
              <Link
                href="/leads"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                Ver todos
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <ul className="divide-y divide-border">
                {recentLeads.map((lead) => (
                  <li key={lead.id}>
                    <Link
                      href={`/leads/${lead.id}`}
                      className="flex items-center justify-between gap-4 px-6 py-3 transition-colors hover:bg-muted/40"
                    >
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span className="truncate text-sm font-medium">
                          {lead.name ?? "Sem nome"}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {lead.destination ?? "Destino não informado"} ·{" "}
                          {formatPhone(lead.phone)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <TempBadge temp={lead.leadTemp} />
                        <span className="hidden sm:inline w-24 text-right text-xs text-muted-foreground">
                          {formatRelative(lead.createdAt)}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground text-base font-semibold">
                  Pendentes da Lu
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Conversas que aguardam resposta.
                </p>
              </div>
              <Link
                href="/conversas"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                Abrir
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              {pendingConversations.length === 0 ? (
                <p className="px-6 py-4 text-sm text-muted-foreground">
                  Nada pendente. Bom trabalho.
                </p>
              ) : (
                <ul className="divide-y divide-border">
                  {pendingConversations.slice(0, 5).map((c) => (
                    <li key={c.phone}>
                      <Link
                        href="/conversas"
                        className="flex items-center justify-between gap-3 px-6 py-3 transition-colors hover:bg-muted/40"
                      >
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <span className="truncate text-sm font-medium">
                            {c.clienteName}
                          </span>
                          <span className="truncate text-xs text-muted-foreground">
                            {c.lastMessage}
                          </span>
                        </div>
                        <span className="shrink-0 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1.5 text-[11px] font-medium text-background">
                          {c.unread}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
