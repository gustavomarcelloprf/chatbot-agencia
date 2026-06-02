import { Bell, CreditCard, MessageCircle, User } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Section {
  icon: typeof User;
  title: string;
  description: string;
  body: React.ReactNode;
}

const sections: Section[] = [
  {
    icon: User,
    title: "Perfil da Lu",
    description: "Informações que aparecem nos briefings e notificações.",
    body: (
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome" defaultValue="Luciana" />
        <Field label="Sobrenome" defaultValue="Milhas" />
        <Field
          label="E-mail"
          type="email"
          defaultValue="lu@lumilhasviagens.com.br"
          className="sm:col-span-2"
        />
        <Field label="WhatsApp" defaultValue="+55 (11) 99999-9999" />
        <Field label="Fuso horário" defaultValue="America/Sao_Paulo" />
      </div>
    ),
  },
  {
    icon: Bell,
    title: "Notificações",
    description:
      "Como a Lu é avisada quando a Malu fecha um briefing ou recebe um lead urgente.",
    body: (
      <div className="space-y-3">
        <Toggle
          label="Avisar no WhatsApp quando o lead for quente ou urgente"
          checked
        />
        <Toggle label="Resumo diário às 9h" checked />
        <Toggle label="E-mail toda vez que um briefing é fechado" />
      </div>
    ),
  },
  {
    icon: MessageCircle,
    title: "Integração WhatsApp",
    description:
      "Conta Meta Cloud API conectada à Malu. Esses dados ficam no .env do backend.",
    body: (
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Phone Number ID"
          defaultValue="123456789012345"
          readOnly
        />
        <Field label="Verify Token" defaultValue="•••••••••" readOnly />
        <div className="sm:col-span-2 flex items-center justify-between rounded-md border border-border bg-muted/30 px-4 py-3">
          <div>
            <p className="text-sm font-medium">Webhook</p>
            <p className="text-xs text-muted-foreground">
              https://malu.lumilhasviagens.com.br/webhook
            </p>
          </div>
          <Badge variant="success">Conectado</Badge>
        </div>
      </div>
    ),
  },
  {
    icon: CreditCard,
    title: "Plano",
    description: "Limites de uso e cobrança da Malu.",
    body: (
      <div className="space-y-4">
        <div className="rounded-md border border-border bg-muted/30 px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Plano Pro</p>
              <p className="text-xs text-muted-foreground">
                Faturamento mensal · próxima cobrança em 15 de junho
              </p>
            </div>
            <span className="text-lg font-semibold tabular-nums">
              R$ 249/mês
            </span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Stat label="Mensagens" value="1.842 / 5.000" />
            <Stat label="Leads ativos" value="32 / 200" />
            <Stat label="Lembretes enviados" value="118 / ∞" />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="default">
            Alterar plano
          </Button>
          <Button variant="ghost" size="default">
            Ver histórico de faturas
          </Button>
        </div>
      </div>
    ),
  },
];

export default function ConfiguracoesPage() {
  return (
    <>
      <PageHeader
        title="Configurações"
        description="Ajuste o perfil, notificações, integração com WhatsApp e o plano."
      />
      <div className="px-8 py-8 space-y-6 max-w-4xl">
        {sections.map(({ icon: Icon, title, description, body }) => (
          <Card key={title}>
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <CardTitle className="text-base font-semibold text-foreground">
                    {title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>{body}</CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

interface FieldProps extends React.ComponentProps<"input"> {
  label: string;
}

function Field({ label, className, ...props }: FieldProps) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <span className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <Input {...props} />
    </label>
  );
}

function Toggle({ label, checked }: { label: string; checked?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border bg-background px-4 py-2.5">
      <span className="text-sm">{label}</span>
      <span
        aria-hidden
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          checked ? "bg-foreground" : "bg-muted"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-background shadow transition-transform ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-medium tabular-nums">{value}</span>
    </div>
  );
}
