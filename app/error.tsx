"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-semibold">We couldn’t load this page</h1>
      <p className="text-muted-foreground">
        This is on our side. Try again in a moment.
        {error.digest && (
          <span className="block text-xs">Ref: {error.digest}</span>
        )}
      </p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
