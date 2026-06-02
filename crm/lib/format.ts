import type { LeadTemp, ReservaStatus, TravelType } from "./types";

export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 13 && digits.startsWith("55")) {
    const ddd = digits.slice(2, 4);
    const part1 = digits.slice(4, 9);
    const part2 = digits.slice(9, 13);
    return `+55 (${ddd}) ${part1}-${part2}`;
  }
  return raw;
}

const dtRelative = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });
const dtShort = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
});
const dtFull = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
const dtTime = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});

const NOW = new Date("2026-06-01T12:00:00-03:00");

export function formatRelative(date: Date): string {
  const diffMs = date.getTime() - NOW.getTime();
  const diffMin = Math.round(diffMs / 60000);
  const absMin = Math.abs(diffMin);
  if (absMin < 60) return dtRelative.format(diffMin, "minute");
  const diffHr = Math.round(diffMin / 60);
  if (Math.abs(diffHr) < 24) return dtRelative.format(diffHr, "hour");
  const diffDay = Math.round(diffHr / 24);
  if (Math.abs(diffDay) < 7) return dtRelative.format(diffDay, "day");
  return dtShort.format(date);
}

export function formatDate(date: Date): string {
  return dtFull.format(date);
}

export function formatTime(date: Date): string {
  return dtTime.format(date);
}

export const tempLabel: Record<LeadTemp, string> = {
  frio: "Frio",
  morno: "Morno",
  quente: "Quente",
  urgente: "Urgente",
};

export const travelTypeLabel: Record<TravelType, string> = {
  lazer: "Lazer",
  "lua-de-mel": "Lua de mel",
  familia: "Família",
  trabalho: "Trabalho",
  intercambio: "Intercâmbio",
};

export const reservaStatusLabel: Record<ReservaStatus, string> = {
  ativa: "Ativa",
  encerrada: "Encerrada",
  cancelada: "Cancelada",
};
