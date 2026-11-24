import Image from "next/image";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { PropertyFeatures } from "@/features/properties/components/property-features";
import { formatListingPrice } from "@/lib/format";
import type { Listing } from "@/features/properties/types";

const CATEGORY_LABEL = { sale: "For sale", rent: "For rent", sold: "Sold" };

export function PropertyCard({
  listing,
  priority = false,
}: {
  listing: Listing;
  priority?: boolean;
}) {
  const photo = listing.photos[0];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground hover:border-input hover:shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {photo ? (
          <Image
            src={photo}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            alt=""
            className="object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          <HomeIcon
            aria-hidden
            className="absolute inset-0 m-auto size-10 text-muted-foreground"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-sm text-muted-foreground">
          {CATEGORY_LABEL[listing.category]} · {listing.propertyType}
          {listing.isPending && " · Pending"}
        </p>
        <p className="text-2xl font-semibold tracking-tight text-primary tabular-nums">
          {formatListingPrice(listing.price, listing.priceMax)}
          {listing.category === "rent" && listing.price !== null && (
            <span className="text-base font-normal text-muted-foreground">
              {" "}
              / month
            </span>
          )}
        </p>
        <h3 className="font-medium group-hover:underline underline-offset-4">
          {/* Stretched link: the whole card is clickable, but only the
              address is announced as the link name. */}
          <Link
            href={`/properties/${listing.id}`}
            className="after:absolute after:inset-0 focus-visible:outline-hidden"
          >
            {listing.address.line}
          </Link>
        </h3>
        <p className="line-clamp-1 text-sm text-muted-foreground">
          {[listing.address.city, listing.address.state]
            .filter(Boolean)
            .join(", ")}
        </p>
        <PropertyFeatures
          listing={listing}
          className="mt-auto border-t pt-4 text-sm"
          iconClassName="size-4 text-muted-foreground"
        />
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl ring-ring group-has-[a:focus-visible]:ring-2 group-has-[a:focus-visible]:ring-inset"
      />
    </article>
  );
}
