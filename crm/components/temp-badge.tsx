import { Badge } from "@/components/ui/badge";
import { tempLabel } from "@/lib/format";
import type { LeadTemp } from "@/lib/types";

const dotColor: Record<LeadTemp, string> = {
  frio: "bg-zinc-400",
  morno: "bg-blue-500",
  quente: "bg-emerald-500",
  urgente: "bg-rose-500",
};

const variant: Record<LeadTemp, "neutral" | "info" | "success" | "danger"> = {
  frio: "neutral",
  morno: "info",
  quente: "success",
  urgente: "danger",
};

export function TempBadge({ temp }: { temp: LeadTemp }) {
  return (
    <Badge variant={variant[temp]}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor[temp]}`} />
      {tempLabel[temp]}
    </Badge>
  );
}
