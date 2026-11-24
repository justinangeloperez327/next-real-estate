import Image from "next/image";

/** Photo banner with a darkened overlay (keeps white text at AA). */
export function PageHero({
  image,
  title,
  subtitle,
  children,
}: {
  image: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-80 items-center justify-center px-4 py-16">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-slate-950/65" />
      <div className="w-full max-w-5xl text-center text-white">
        <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-xl text-lg text-white/90">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
