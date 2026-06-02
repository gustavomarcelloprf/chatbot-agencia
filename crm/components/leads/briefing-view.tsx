import * as React from "react";

interface Props {
  markdown: string;
}

type Block =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "li"; items: { label: string | null; value: string }[] };

function parseInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function parse(markdown: string): Block[] {
  const lines = markdown.split("\n");
  const blocks: Block[] = [];
  let listBuf: { label: string | null; value: string }[] | null = null;

  const flushList = () => {
    if (listBuf && listBuf.length > 0) {
      blocks.push({ kind: "li", items: listBuf });
    }
    listBuf = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      blocks.push({ kind: "h2", text: line.slice(3) });
    } else if (line.startsWith("### ")) {
      flushList();
      blocks.push({ kind: "h3", text: line.slice(4) });
    } else if (line.startsWith("- ")) {
      const item = line.slice(2);
      const match = item.match(/^\*\*([^*]+)\*\*:\s*(.*)$/);
      const entry = match
        ? { label: match[1], value: match[2] }
        : { label: null, value: item };
      listBuf = listBuf ?? [];
      listBuf.push(entry);
    } else {
      flushList();
      blocks.push({ kind: "p", text: line });
    }
  }
  flushList();
  return blocks;
}

export function BriefingView({ markdown }: Props) {
  const blocks = parse(markdown);

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        if (block.kind === "h2") {
          return (
            <h2
              key={i}
              className="text-base font-semibold tracking-tight text-foreground"
            >
              {block.text}
            </h2>
          );
        }
        if (block.kind === "h3") {
          return (
            <h3
              key={i}
              className="text-sm font-medium uppercase tracking-wide text-muted-foreground"
            >
              {block.text}
            </h3>
          );
        }
        if (block.kind === "p") {
          return (
            <p key={i} className="text-sm text-foreground">
              {parseInline(block.text)}
            </p>
          );
        }
        return (
          <dl
            key={i}
            className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-[140px_1fr]"
          >
            {block.items.map((item, j) => (
              <React.Fragment key={j}>
                {item.label !== null ? (
                  <>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground sm:pt-0.5">
                      {item.label}
                    </dt>
                    <dd className="text-sm text-foreground">
                      {parseInline(item.value)}
                    </dd>
                  </>
                ) : (
                  <dd className="text-sm text-foreground sm:col-span-2">
                    • {parseInline(item.value)}
                  </dd>
                )}
              </React.Fragment>
            ))}
          </dl>
        );
      })}
    </div>
  );
}
