"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { PropertyMapProps } from "./property-map-inner";

// mapbox-gl is ~1.9 MB of JavaScript. Load it in its own chunk, client-only,
// and only once the map is about to scroll into view.
const MapInner = dynamic(() => import("./property-map-inner"), {
  ssr: false,
  loading: () => null,
});

export function PropertyMap(props: PropertyMapProps) {
  const height = props.height ?? 600;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ height }}
      className="overflow-hidden rounded-md bg-muted"
    >
      {visible && <MapInner {...props} />}
    </div>
  );
}
