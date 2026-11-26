"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORT_OPTIONS } from "@/features/properties/constants";

/** Changes the `sort` URL param (and resets to page 1). */
export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  return (
    <div className="flex items-center gap-2">
      <span id="sort-label" className="text-sm text-muted-foreground">
        Sort by
      </span>
      <Select
        value={params.get("sort") ?? "Recommended"}
        onValueChange={(value) => {
          const next = new URLSearchParams(params);
          next.set("sort", value);
          next.delete("page");
          router.push(`${pathname}?${next.toString()}` as never);
        }}
      >
        <SelectTrigger aria-labelledby="sort-label" className="w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end" className="public-theme">
          {SORT_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
