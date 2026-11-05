export function ImageSlot({ ratio = "4/3" }: { ratio?: string }) {
  return (
    <div
      aria-hidden="true"
      data-image-slot
      className="bg-surface"
      style={{ aspectRatio: ratio }}
    />
  );
}
