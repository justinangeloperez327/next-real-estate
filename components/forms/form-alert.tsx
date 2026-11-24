import { cn } from "@/lib/utils";

/** Form-level success or error message, announced to screen readers. */
export function FormAlert({
  status,
  children,
  className,
}: {
  status?: "success" | "error";
  children?: React.ReactNode;
  className?: string;
}) {
  if (!children) return null;
  return (
    <p
      role={status === "error" ? "alert" : "status"}
      className={cn(
        "rounded-md border px-4 py-3 text-sm",
        status === "error"
          ? "border-destructive/40 bg-destructive/5 text-destructive"
          : "border-success/40 bg-success/5 text-success",
        className,
      )}
    >
      {children}
    </p>
  );
}
