export function AuthFormHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-medium">{title}</h1>
      {children && <p className="mt-1 text-sm">{children}</p>}
    </div>
  );
}
