export function HomeHero({
  heading,
  body,
  image,
}: {
  heading: string;
  body: string;
  image: { src: string; alt: string };
}) {
  return (
    <section data-band="1" className="home-hero relative min-h-[var(--hero-min-height)] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={image.src}
          alt={image.alt}
          width={1440}
          height={810}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="hero-photo-scrim absolute inset-0" aria-hidden="true" />
      </div>
      <div className="home-hero__content relative z-10 flex min-h-[var(--hero-min-height)] flex-col items-center justify-center px-[var(--gutter-narrow)] text-center md:px-[var(--gutter)]">
        <div className="mx-auto flex w-full max-w-[var(--content-max)] flex-col items-center gap-[var(--space-24)]">
          <h1 className="hero-headline">{heading}</h1>
          <p className="hero-subline">{body}</p>
        </div>
      </div>
    </section>
  );
}
