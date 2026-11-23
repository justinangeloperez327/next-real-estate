"use client";

import { useState, useTransition } from "react";
import { deleteProperty } from "@/app/(admin)/dashboard/properties/actions";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function DeleteButton({
  propertyId,
  title,
}: {
  propertyId: number;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    setError(undefined);
    startTransition(async () => {
      // On success the action redirects to the property list.
      const result = await deleteProperty(propertyId);
      if (result?.error) setError(result.error);
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Delete “{title}”?</SheetTitle>
          <SheetDescription>
            This permanently removes the listing. This cannot be undone.
          </SheetDescription>
        </SheetHeader>
        {error && (
          <p role="alert" className="px-4 text-sm text-destructive">
            {error}
          </p>
        )}
        <SheetFooter className="mt-6 gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Keep property
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={pending}
          >
            {pending ? "Deleting…" : "Delete property"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
