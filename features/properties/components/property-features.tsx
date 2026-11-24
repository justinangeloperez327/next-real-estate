import { Bath, BedDouble, Ruler } from "lucide-react";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Listing } from "@/features/properties/types";

/** Beds · baths · square feet, skipping anything the listing doesn't state. */
export function PropertyFeatures({
  listing,
  className,
  iconClassName = "size-5",
}: {
  listing: Pick<Listing, "beds" | "baths" | "sqft">;
  className?: string;
  iconClassName?: string;
}) {
  const features = [
    { label: "bedrooms", value: listing.beds, Icon: BedDouble, unit: "" },
    { label: "bathrooms", value: listing.baths, Icon: Bath, unit: "" },
    { label: "square feet", value: listing.sqft, Icon: Ruler, unit: " sq ft" },
  ].filter((f) => f.value !== null && f.value !== undefined);

  if (features.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-x-5 gap-y-2", className)}>
      {features.map(({ label, value, Icon, unit }) => (
        <li key={label} className="flex items-center gap-2 tabular-nums">
          <Icon className={iconClassName} aria-hidden />
          <span>
            {formatNumber(value!)}
            <span aria-hidden>{unit}</span>
            <span className="sr-only"> {label}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
