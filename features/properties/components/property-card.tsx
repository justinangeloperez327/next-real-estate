import Image from "next/image";
import Link from "next/link";
import { PropertyFeatures } from "@/features/properties/components/property-features";
import { formatPrice } from "@/lib/format";
import type { Property } from "@/features/properties/types";

export function PropertyCard({ property }: { property: Property }) {
  const forRent = property.category === "rent";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground hover:shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src="/images/properties/1.jpeg"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          alt=""
          className="object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-sm text-muted-foreground">
          {forRent ? "For rent" : "For sale"} ·{" "}
          <span className="capitalize">{property.property_type}</span>
        </p>
        <p className="text-2xl font-semibold tabular-nums">
          {formatPrice(property.price)}
          {forRent && (
            <span className="text-base font-normal text-muted-foreground">
              {" "}
              / month
            </span>
          )}
        </p>
        <h3 className="font-medium">
          {/* Stretched link: the whole card is clickable, but only the
              title is announced as the link name. */}
          <Link
            href={`/properties/${property.id}`}
            className="after:absolute after:inset-0 focus-visible:outline-hidden group-has-[:focus-visible]:underline"
          >
            {property.title}
          </Link>
        </h3>
        <p className="line-clamp-1 text-sm text-muted-foreground">
          {property.address}
        </p>
        <PropertyFeatures
          property={property}
          className="mt-auto gap-5 border-t pt-4 text-sm"
          iconClassName="size-4 text-muted-foreground"
        />
      </div>
      {/* Visible focus ring for the stretched link. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl ring-ring ring-offset-2 group-has-[a:focus-visible]:ring-2"
      />
    </article>
  );
}
