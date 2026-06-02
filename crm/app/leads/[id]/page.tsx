import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  MessageSquare,
  Phone,
  UserPlus,
} from "lucide-react";

import { BriefingView } from "@/components/leads/briefing-view";
import { PageHeader } from "@/components/page-header";
import { TempBadge } from "@/components/temp-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { conversations, leads } from "@/lib/mock-data";
import {
  formatDate,
  formatPhone,
  formatRelative,
  formatTime,
  travelTypeLabel,
} from "@/lib/format";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LeadDetailPage({ params }: Props) {
  const { id } = await params;
  const lead = leads.find((l) => l.id === id);
  if (!lead) notFound();

  const conversation = conversations.find((c) => c.phone === lead.phone);
  const timeline = [
    {
      icon: UserPlus,
      label: "Lead criado pela Malu",
      at: lead.createdAt,
    },
    conversation
      ? {
          icon: MessageSquare,
          label: `Última mensagem do cliente`,
          at: conversation.lastMessageAt,
        }
      : null,
    lead.notifiedAt
      ? {
          icon: CheckCircle2,
          label: "Lu notificada via WhatsApp",
          at: lead.notifiedAt,
        }
      : null,
  ].filter((x): x is { icon: typeof UserPlus; label: string; at: Date } => x !== null);

  return (
    <>
      <PageHeader
        title={lead.name ?? "Lead sem nome"}
        description={`${formatPhone(lead.phone)} · ${
          lead.destination ?? "Destino não informado"
        }`}
        actions={
          <>
            <Link
              href="/leads"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Voltar
            </Link>
            <Button variant="outline" size="sm">
              <MessageSquare />
              Abrir conversa
            </Button>
            <Button size="sm">
              <Phone />
              Ligar
            </Button>
          </>
        }
      />

      <div className="px-8 py-8">
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardContent className="px-6 py-6">
                {lead.briefingMd ? (
                  <BriefingView markdown={lead.briefingMd} />
                ) : (
                  <div className="py-6 text-sm text-muted-foreground">
                    A Malu ainda está coletando informações com o cliente. O
                    briefing aparece aqui quando ela fechar o resumo da
                    solicitação.
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="px-6 py-6 space-y-4">
                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  Dados estruturados
                </h3>
                <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      Nome
                    </dt>
                    <dd className="text-sm">{lead.name ?? "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      Telefone
                    </dt>
                    <dd className="font-mono text-sm">
                      {formatPhone(lead.phone)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      Destino
                    </dt>
                    <dd className="text-sm">{lead.destination ?? "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      Tipo
                    </dt>
                    <dd className="text-sm">
                      {lead.travelType
                        ? travelTypeLabel[lead.travelType]
                        : "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      Temperatura
                    </dt>
                    <dd>
                      <TempBadge temp={lead.leadTemp} />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      Criado
                    </dt>
                    <dd className="text-sm">
                      {formatDate(lead.createdAt)} · {formatTime(lead.createdAt)}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="px-6 py-6">
                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
                  Timeline
                </h3>
                <ol className="space-y-4">
                  {timeline.map((event, i) => {
                    const Icon = event.icon;
                    const isLast = i === timeline.length - 1;
                    return (
                      <li key={i} className="flex gap-3">
                        <div className="relative flex flex-col items-center">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          {!isLast ? (
                            <span className="mt-1 w-px flex-1 bg-border" />
                          ) : null}
                        </div>
                        <div className="pb-2">
                          <p className="text-sm text-foreground">
                            {event.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatRelative(event.at)} · {formatDate(event.at)}{" "}
                            {formatTime(event.at)}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="px-6 py-6 space-y-3">
                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  Ações rápidas
                </h3>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="default" className="justify-start">
                    <MessageSquare />
                    Continuar conversa no WhatsApp
                  </Button>
                  <Button variant="outline" size="default" className="justify-start">
                    <Mail />
                    Enviar cotação por e-mail
                  </Button>
                  <Button variant="outline" size="default" className="justify-start">
                    <CheckCircle2 />
                    Marcar como atendido
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
