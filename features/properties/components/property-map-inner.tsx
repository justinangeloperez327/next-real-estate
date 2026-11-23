"use client";

import Map, {
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Property } from "@/features/properties/types";

type Point = Pick<Property, "id" | "latitude" | "longitude" | "address">;

export type PropertyMapProps = {
  points: Point[];
  /** Initial centre; defaults to the first point. */
  center?: { latitude: number; longitude: number };
  zoom?: number;
  height?: number;
};

// Fallback centre (Abu Dhabi) when there are no points to show.
const DEFAULT_CENTER = { latitude: 24.495139, longitude: 54.369796 };

export default function PropertyMapInner({
  points,
  center,
  zoom = 10,
  height = 600,
}: PropertyMapProps) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  if (!token) {
    return (
      <div
        className="flex items-center justify-center rounded-md border text-sm text-muted-foreground"
        style={{ height }}
      >
        Map unavailable: set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN.
      </div>
    );
  }

  const initial = center ?? points[0] ?? DEFAULT_CENTER;

  return (
    <Map
      mapboxAccessToken={token}
      initialViewState={{
        latitude: initial.latitude,
        longitude: initial.longitude,
        zoom,
      }}
      style={{ width: "100%", height }}
      mapStyle="mapbox://styles/mapbox/standard"
    >
      <ScaleControl />
      <NavigationControl />
      {points.map((point) => (
        <Marker
          key={point.id}
          latitude={point.latitude}
          longitude={point.longitude}
          anchor="bottom"
        >
          {/* Marker icon: https://www.flaticon.com/free-icons/map-marker */}
          <img src="/marker.png" alt={point.address} className="h-10" />
        </Marker>
      ))}
    </Map>
  );
}
