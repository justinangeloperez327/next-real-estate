"use client";

import * as React from "react";
import Map, {
  Layer,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Property } from "@/lib/types";

interface MapProps {
  properties: Property[];
}

const MulitplePropertyMap = ({ properties }: MapProps) => {
  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  return (
    <Map
      mapboxAccessToken={mapboxAccessToken}
      initialViewState={{
        longitude: 54.369796,
        latitude: 24.495139,
        zoom: 10,
      }}
      style={{ width: "container", height: 600 }}
      mapStyle="mapbox://styles/mapbox/standard"
    >
      <ScaleControl />
      <NavigationControl />
      {properties.map((property) => (
        <Marker
          key={property.id}
          longitude={property.longitude}
          latitude={property.latitude}
        >
          <img
            src="/marker.png"
            alt="https://www.flaticon.com/free-icons/map-marker"
            className="h-10 shadow-slate-700"
          />
        </Marker>
      ))}
    </Map>
  );
};

export default MulitplePropertyMap;
