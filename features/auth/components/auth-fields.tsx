import { FormField } from "@/components/forms/form-field";
import { Input } from "@/components/ui/input";

export function EmailField({
  error,
  defaultValue,
}: {
  error?: string[];
  defaultValue?: string;
}) {
  return (
    <FormField id="email" label="Email" error={error}>
      {(aria) => (
        <Input
          {...aria}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          defaultValue={defaultValue}
          required
        />
      )}
    </FormField>
  );
}

export function PasswordField({
  id = "password",
  label = "Password",
  autoComplete,
  hint,
  error,
}: {
  id?: string;
  label?: React.ReactNode;
  autoComplete: "current-password" | "new-password";
  hint?: string;
  error?: string[];
}) {
  return (
    <FormField id={id} label={label} hint={hint} error={error}>
      {(aria) => (
        <Input
          {...aria}
          name={id}
          type="password"
          autoComplete={autoComplete}
          required
        />
      )}
    </FormField>
  );
}
