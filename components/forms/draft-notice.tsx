import { Button } from "@/components/ui/button";

/** Shown when a saved draft was restored into the form. */
export function DraftNotice({ onDiscard }: { onDiscard: () => void }) {
  return (
    <div
      role="status"
      className="flex flex-wrap items-center justify-between gap-2 rounded-md border bg-muted px-4 py-2 text-sm"
    >
      <span>We restored your unsaved draft.</span>
      <Button type="button" variant="ghost" size="sm" onClick={onDiscard}>
        Discard draft
      </Button>
    </div>
  );
}
