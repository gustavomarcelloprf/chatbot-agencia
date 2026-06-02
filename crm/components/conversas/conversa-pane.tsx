"use client";

import { useMemo, useState } from "react";
import { Phone, Search, Send, Sparkles, Video } from "lucide-react";

import { Input } from "@/components/ui/input";
import { TempBadge } from "@/components/temp-badge";
import { formatPhone, formatRelative, formatTime } from "@/lib/format";
import type { Conversation } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  conversations: Conversation[];
}

export function ConversaPane({ conversations }: Props) {
  const [activePhone, setActivePhone] = useState<string>(
    conversations[0]?.phone ?? "",
  );
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter((c) =>
      [c.clienteName, c.phone, c.lastMessage]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [conversations, query]);

  const active =
    conversations.find((c) => c.phone === activePhone) ?? conversations[0];

  return (
    <div className="flex h-[calc(100vh-60px)] overflow-hidden border-t border-border">
      <div className="hidden md:flex w-[320px] shrink-0 flex-col border-r border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar conversas"
              className="pl-9 h-9"
            />
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto divide-y divide-border">
          {filtered.map((c) => {
            const isActive = c.phone === active?.phone;
            return (
              <li key={c.phone}>
                <button
                  type="button"
                  onClick={() => setActivePhone(c.phone)}
                  className={cn(
                    "w-full text-left px-4 py-3 transition-colors",
                    isActive ? "bg-muted" : "hover:bg-muted/40",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium">
                      {c.clienteName}
                    </span>
                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {formatRelative(c.lastMessageAt)}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <p className="truncate text-xs text-muted-foreground">
                      {c.lastMessage}
                    </p>
                    {c.unread > 0 ? (
                      <span className="shrink-0 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                        {c.unread}
                      </span>
                    ) : null}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex min-w-0 flex-1 flex-col bg-background">
        {active ? (
          <>
            <div className="flex h-[60px] shrink-0 items-center justify-between gap-3 border-b border-border px-6">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
                  {active.clienteName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {active.clienteName}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {formatPhone(active.phone)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TempBadge temp={active.leadTemp} />
                <button
                  type="button"
                  aria-label="Ligar"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Phone className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Chamada de vídeo"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Video className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="mx-auto flex max-w-3xl flex-col gap-3">
                {active.messages.map((m) => {
                  const isUser = m.role === "user";
                  return (
                    <div
                      key={m.id}
                      className={cn(
                        "flex flex-col gap-1",
                        isUser ? "items-start" : "items-end",
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[75%] rounded-2xl px-4 py-2 text-sm leading-relaxed",
                          isUser
                            ? "rounded-tl-md bg-muted text-foreground"
                            : "rounded-tr-md bg-foreground text-background",
                        )}
                      >
                        {m.content}
                      </div>
                      <span className="px-2 text-[11px] text-muted-foreground inline-flex items-center gap-1">
                        {!isUser && m.modelUsed ? (
                          <Sparkles className="h-3 w-3" />
                        ) : null}
                        {formatTime(m.createdAt)}
                        {!isUser && m.modelUsed ? ` · ${m.modelUsed}` : ""}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDraft("");
              }}
              className="shrink-0 border-t border-border px-6 py-3"
            >
              <div className="mx-auto flex max-w-3xl items-center gap-2">
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Escreva uma mensagem…"
                  className="h-10"
                />
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-50"
                  disabled={!draft.trim()}
                >
                  <Send className="h-4 w-4" />
                  Enviar
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
            Selecione uma conversa.
          </div>
        )}
      </div>
    </div>
  );
}
