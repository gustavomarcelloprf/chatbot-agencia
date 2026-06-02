export type LeadTemp = "frio" | "morno" | "quente" | "urgente";

export type TravelType =
  | "lazer"
  | "lua-de-mel"
  | "familia"
  | "trabalho"
  | "intercambio";

export interface Lead {
  id: string;
  phone: string;
  name: string | null;
  destination: string | null;
  travelType: TravelType | null;
  leadTemp: LeadTemp;
  briefingMd: string | null;
  notifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cliente {
  phone: string;
  profileName: string | null;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ReservaStatus = "ativa" | "encerrada" | "cancelada";

export interface Reserva {
  id: string;
  phone: string;
  clienteName: string;
  codigoReserva: string | null;
  destino: string | null;
  dataViagem: Date | null;
  status: ReservaStatus;
  observacoes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  phone: string;
  role: MessageRole;
  content: string;
  modelUsed: string | null;
  createdAt: Date;
}

export interface Conversation {
  phone: string;
  clienteName: string;
  lastMessage: string;
  lastMessageAt: Date;
  unread: number;
  leadTemp: LeadTemp;
  messages: Message[];
}

export interface DashboardMetric {
  label: string;
  value: number;
  delta: string;
  trend: "up" | "down" | "flat";
}
