import Image from "next/image";

export function PageHero({
  image,
  title,
  subtitle,
}: {
  image: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b bg-muted">
      <div className="container grid items-center gap-6 py-8 sm:gap-10 sm:py-12 md:grid-cols-[1fr_1.1fr]">
        <div>
          <h1 className="font-display text-4xl font-normal sm:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        <div className="relative aspect-[2/1] overflow-hidden rounded-xl bg-accent">
          <Image
            src={image}
            alt=""
            fill
            preload
            sizes="(min-width: 768px) 52vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
