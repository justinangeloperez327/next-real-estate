import { Bath, BedDouble, Car } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Property } from "@/features/properties/types";

export function PropertyFeatures({
  property,
  className,
  iconClassName = "size-6",
}: {
  property: Pick<Property, "beds" | "baths" | "carpark">;
  className?: string;
  iconClassName?: string;
}) {
  const features = [
    { label: "Bedrooms", value: property.beds, Icon: BedDouble },
    { label: "Bathrooms", value: property.baths, Icon: Bath },
    { label: "Car parks", value: property.carpark, Icon: Car },
  ];

  return (
    <ul className={cn("flex gap-5", className)}>
      {features.map(({ label, value, Icon }) => (
        <li key={label} className="flex items-center gap-2">
          <Icon className={iconClassName} aria-hidden />
          <span>
            {value}
            <span className="sr-only"> {label}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
