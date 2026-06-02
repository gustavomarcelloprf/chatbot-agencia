import { ConversaPane } from "@/components/conversas/conversa-pane";
import { conversations } from "@/lib/mock-data";

export default function ConversasPage() {
  return <ConversaPane conversations={conversations} />;
}
