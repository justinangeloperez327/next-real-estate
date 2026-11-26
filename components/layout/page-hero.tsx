export function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <header className="border-b border-brass/55 bg-muted">
      <div className="container py-9 sm:py-12">
        <h1 className="font-display text-5xl sm:text-6xl">{title}</h1>
        <p className="mt-3 max-w-xl text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      </div>
    </header>
  );
}
