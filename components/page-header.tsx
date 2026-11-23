export function PageHeader({
  title,
  actions,
}: {
  title: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4 rounded-md px-4 py-2 shadow-lg">
      <h1 className="text-2xl">{title}</h1>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
