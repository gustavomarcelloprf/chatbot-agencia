import { Plus } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { reservas } from "@/lib/mock-data";
import { formatDate, formatPhone, reservaStatusLabel } from "@/lib/format";
import type { ReservaStatus } from "@/lib/types";

const statusVariant: Record<
  ReservaStatus,
  "success" | "neutral" | "danger"
> = {
  ativa: "success",
  encerrada: "neutral",
  cancelada: "danger",
};

export default function ReservasPage() {
  return (
    <>
      <PageHeader
        title="Reservas"
        description="Viagens fechadas pela Lu — clientes confirmados."
        actions={
          <Button size="default">
            <Plus />
            Nova reserva
          </Button>
        }
      />

      <div className="px-8 py-8">
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">Código</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Data da viagem</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-6">Observações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservas.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="pl-6 font-mono text-xs text-muted-foreground">
                    {r.codigoReserva ?? "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium">
                        {r.clienteName}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {formatPhone(r.phone)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{r.destino ?? "—"}</TableCell>
                  <TableCell>
                    {r.dataViagem ? formatDate(r.dataViagem) : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[r.status]}>
                      {reservaStatusLabel[r.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-6 text-sm text-muted-foreground">
                    {r.observacoes ?? "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          {reservas.length} {reservas.length === 1 ? "reserva" : "reservas"} no
          total.
        </p>
      </div>
    </>
  );
}
