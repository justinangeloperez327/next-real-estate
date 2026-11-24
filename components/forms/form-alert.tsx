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
        "border-l-2 px-4 text-sm",
        status === "error"
          ? "border-red-400 text-red-400"
          : "border-emerald-400 text-emerald-300",
        className,
      )}
    >
      {children}
    </p>
  );
}
