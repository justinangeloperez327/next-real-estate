import type { MapPoint } from "@/features/properties/components/property-map-inner";
import type { Listing } from "@/features/properties/types";

/** Listings with coordinates, as map pins. */
export function toMapPoints(listings: Listing[]): MapPoint[] {
  return listings.flatMap((l) =>
    l.latitude !== null && l.longitude !== null
      ? [
          {
            id: l.id,
            latitude: l.latitude,
            longitude: l.longitude,
            label: l.address.full,
          },
        ]
      : [],
  );
}
