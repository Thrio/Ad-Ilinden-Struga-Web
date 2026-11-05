import type { JSX } from "react";

type Tag = "p" | "h1" | "h2" | "h3" | "span";

export function PendingText({ lines, as = "p", children }: { lines: number; as?: Tag; children: string }) {
  const TagName = as as keyof JSX.IntrinsicElements;
  return (
    <TagName style={{ minHeight: `calc(${lines} * 1lh)` }}>
      [[PENDING: {children}]]
    </TagName>
  );
}
