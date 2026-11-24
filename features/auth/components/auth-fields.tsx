import { FormField } from "@/components/forms/form-field";
import { Input } from "@/components/ui/input";

type FieldEvents = Pick<
  React.ComponentProps<typeof Input>,
  "onBlur" | "onChange"
>;

export function EmailField({
  error,
  defaultValue,
  ...events
}: {
  error?: string[];
  defaultValue?: string;
} & FieldEvents) {
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
          {...events}
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
  ...events
}: {
  id?: string;
  label?: React.ReactNode;
  autoComplete: "current-password" | "new-password";
  hint?: string;
  error?: string[];
} & FieldEvents) {
  return (
    <FormField id={id} label={label} hint={hint} error={error}>
      {(aria) => (
        <Input
          {...aria}
          name={id}
          type="password"
          autoComplete={autoComplete}
          required
          {...events}
        />
      )}
    </FormField>
  );
}
