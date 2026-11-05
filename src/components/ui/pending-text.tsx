import type { CSSProperties, JSX } from "react";
import { cn } from "@/lib/cn";

type Tag = "p" | "h1" | "h2" | "h3" | "span";

export function PendingText({
  lines,
  as = "p",
  children,
  className,
  style,
}: {
  lines: number;
  as?: Tag;
  children: string;
  className?: string;
  style?: CSSProperties;
}) {
  const TagName = as as keyof JSX.IntrinsicElements;
  return (
    <TagName className={cn(className)} style={{ minHeight: `calc(${lines} * 1lh)`, ...style }}>
      [[PENDING: {children}]]
    </TagName>
  );
}
