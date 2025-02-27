"use client";

import * as React from "react";
import Map, {
  Layer,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
interface MapProps {
  latitude: number;
  longitude: number;
}

const MapContainer = ({ latitude, longitude }: MapProps) => {
  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  return (
    <Map
      mapboxAccessToken={mapboxAccessToken}
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: 15,
      }}
      style={{ width: "container", height: 600 }}
      mapStyle="mapbox://styles/mapbox/standard"
    >
      <ScaleControl />
      <NavigationControl />
      <Marker key="property" longitude={longitude} latitude={latitude}>
        <img
          src="/marker.png"
          alt="https://www.flaticon.com/free-icons/map-marker"
          className="h-14 shadow-slate-700"
        />
      </Marker>
    </Map>
  );
};

export default MapContainer;
