"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TempBadge } from "@/components/temp-badge";
import { formatPhone, formatRelative, tempLabel } from "@/lib/format";
import type { Lead, LeadTemp } from "@/lib/types";
import { cn } from "@/lib/utils";

const TEMP_OPTIONS: ("all" | LeadTemp)[] = [
  "all",
  "urgente",
  "quente",
  "morno",
  "frio",
];

const RANGE_OPTIONS = [
  { value: "all", label: "Qualquer data" },
  { value: "today", label: "Hoje" },
  { value: "7d", label: "Últimos 7 dias" },
  { value: "30d", label: "Últimos 30 dias" },
] as const;

type Range = (typeof RANGE_OPTIONS)[number]["value"];

const NOW = new Date("2026-06-01T12:00:00-03:00");

function inRange(date: Date, range: Range): boolean {
  if (range === "all") return true;
  const diffDays = (NOW.getTime() - date.getTime()) / 86_400_000;
  if (range === "today") return diffDays < 1;
  if (range === "7d") return diffDays <= 7;
  if (range === "30d") return diffDays <= 30;
  return true;
}

interface Props {
  leads: Lead[];
}

export function LeadsTable({ leads }: Props) {
  const [query, setQuery] = useState("");
  const [temp, setTemp] = useState<"all" | LeadTemp>("all");
  const [range, setRange] = useState<Range>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((lead) => {
      if (temp !== "all" && lead.leadTemp !== temp) return false;
      if (!inRange(lead.createdAt, range)) return false;
      if (!q) return true;
      const haystack = [
        lead.name ?? "",
        lead.destination ?? "",
        lead.phone,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [leads, query, temp, range]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[260px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome, destino ou telefone…"
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5">
          {TEMP_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setTemp(opt)}
              className={cn(
                "px-2.5 py-1 text-xs rounded-[6px] transition-colors",
                temp === opt
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {opt === "all" ? "Todas" : tempLabel[opt]}
            </button>
          ))}
        </div>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value as Range)}
          className="h-9 rounded-md border border-input bg-background px-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
        >
          {RANGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6">Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>Temperatura</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="pr-6 text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  Nenhum lead encontrado com esses filtros.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="pl-6 font-medium">
                    {lead.name ?? "—"}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {formatPhone(lead.phone)}
                  </TableCell>
                  <TableCell>{lead.destination ?? "—"}</TableCell>
                  <TableCell>
                    <TempBadge temp={lead.leadTemp} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatRelative(lead.createdAt)}
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <Link
                      href={`/leads/${lead.id}`}
                      className="inline-flex items-center gap-1 text-sm text-foreground hover:underline"
                    >
                      Abrir
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-muted-foreground">
        {filtered.length} de {leads.length} {leads.length === 1 ? "lead" : "leads"}
      </p>
    </div>
  );
}
