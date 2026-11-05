import { cn } from "@/lib/cn";

export function ImageSlot({ ratio = "4/3", fill = false, className }: { ratio?: string; fill?: boolean; className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-image-slot
      className={cn("bg-surface-raised", className)}
      style={fill ? undefined : { aspectRatio: ratio }}
    />
  );
}
