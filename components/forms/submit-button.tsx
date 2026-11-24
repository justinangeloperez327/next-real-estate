import { Button } from "@/components/ui/button";

type Props = React.ComponentProps<typeof Button> & {
  pending: boolean;
  pendingText: string;
};

/** Submit button that disables itself and swaps its label while pending. */
export function SubmitButton({
  pending,
  pendingText,
  children,
  ...props
}: Props) {
  return (
    <Button type="submit" disabled={pending} aria-busy={pending} {...props}>
      {pending ? pendingText : children}
    </Button>
  );
}
