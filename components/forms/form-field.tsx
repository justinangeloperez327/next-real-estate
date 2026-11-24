import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FieldProps = {
  id: string;
  label: React.ReactNode;
  error?: string[];
  hint?: React.ReactNode;
  className?: string;
  /** Receives the aria props to spread onto the control. */
  children: (aria: {
    id: string;
    "aria-invalid"?: true;
    "aria-describedby"?: string;
  }) => React.ReactNode;
};

/** Label + control + error message, with the ARIA wiring done for you. */
export function FormField({
  id,
  label,
  error,
  hint,
  className,
  children,
}: FieldProps) {
  const message = error?.[0];
  const describedBy =
    [message && `${id}-error`, hint && `${id}-hint`]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className={cn("grid w-full items-center gap-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      {children({
        id,
        "aria-invalid": message ? true : undefined,
        "aria-describedby": describedBy,
      })}
      {hint && !message && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {message && (
        <p id={`${id}-error`} className="text-sm text-red-400">
          {message}
        </p>
      )}
    </div>
  );
}
