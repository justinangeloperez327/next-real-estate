import Image from "next/image";

/** Full-width image banner with a darkened overlay and centred heading. */
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
    <section className="relative flex min-h-96 items-center justify-center py-16">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-gray-900/60" />
      <div className="container relative z-10 mx-auto text-center text-white">
        <h1 className="text-4xl font-bold tracking-wider">{title}</h1>
        {subtitle && <p className="mt-2 tracking-widest">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
