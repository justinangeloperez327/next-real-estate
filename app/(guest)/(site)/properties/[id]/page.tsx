import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  ChevronLeftIcon,
  ExternalLinkIcon,
  HomeIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PropertyFeatures } from "@/features/properties/components/property-features";
import { PropertyMap } from "@/features/properties/components/property-map";
import { PropertyDetailSkeleton } from "@/features/properties/components/property-skeletons";
import { toMapPoints } from "@/features/properties/map-points";
import { getListing } from "@/features/properties/queries";
import type { ListingDetail } from "@/features/properties/types";
import {
  formatDate,
  formatListingPrice,
  formatNumber,
  formatPrice,
} from "@/lib/format";

const MAX_PHOTOS = 24;
const CATEGORY_LABEL = { sale: "For sale", rent: "For rent", sold: "Sold" };

export async function generateMetadata({
  params,
}: PageProps<"/properties/[id]">): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) return { title: "Home not found" };
  return {
    title: listing.address.full,
    description: listing.description?.slice(0, 160),
    openGraph: listing.photos[0] ? { images: [listing.photos[0]] } : undefined,
  };
}

// Page pattern: Detail (media, summary, facts, sections, sticky contact).
export default function PropertyPage({
  params,
}: PageProps<"/properties/[id]">) {
  return (
    <Suspense fallback={<PropertyDetailSkeleton />}>
      <PropertyDetail params={params} />
    </Suspense>
  );
}

async function PropertyDetail({
  params,
}: Pick<PageProps<"/properties/[id]">, "params">) {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) notFound();

  const rent = listing.category === "rent";
  const mapPoints = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    ? toMapPoints([listing])
    : [];
  const phone = listing.agent?.phone;
  const email = listing.agent?.email;
  const dialablePhone = phone?.replace(/[^\d+]/g, "");
  const phoneHref =
    dialablePhone && /\d/.test(dialablePhone) ? `tel:${dialablePhone}` : null;
  const emailHref = email
    ? `mailto:${email}?subject=${encodeURIComponent(listing.address.full)}`
    : null;
  const facts: [string, string | null][] = [
    ["Type", listing.propertyType],
    ["Year built", listing.yearBuilt ? String(listing.yearBuilt) : null],
    [
      "Lot size",
      listing.lotSqft ? `${formatNumber(listing.lotSqft)} sq ft` : null,
    ],
    [
      "Price per sq ft",
      listing.pricePerSqft ? formatPrice(listing.pricePerSqft) : null,
    ],
    ["HOA fee", listing.hoaFee ? `${formatPrice(listing.hoaFee)}/month` : null],
    ["Garage", listing.garage ? `${listing.garage} spaces` : null],
    ["Stories", listing.stories ? String(listing.stories) : null],
    [
      "Days on market",
      listing.daysOnMarket !== null ? String(listing.daysOnMarket) : null,
    ],
    ["Neighborhood", listing.neighborhood],
  ];
  const shownFacts = facts.filter((f): f is [string, string] => !!f[1]);

  return (
    <article className="container pt-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:py-8">
      <Link
        href="/properties"
        className="-ml-2 inline-flex h-11 items-center gap-1 px-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeftIcon aria-hidden className="size-4" />
        All homes
      </Link>

      <Gallery listing={listing} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
        <div className="min-w-0">
          <header className="border-b border-brass/55 pb-6">
            <p className="mb-2 text-sm text-muted-foreground">
              {CATEGORY_LABEL[listing.category]}
              {listing.isPending && " · Pending"}
            </p>
            <p className="mb-4 text-3xl sm:text-4xl font-semibold text-primary tabular-nums">
              {formatListingPrice(listing.price, listing.priceMax)}
              {rent && listing.price !== null && (
                <span className="text-lg font-normal text-muted-foreground">
                  {" "}
                  / month
                </span>
              )}
            </p>
            <h1 className="font-display text-4xl font-normal wrap-anywhere sm:text-5xl">
              {listing.address.line}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {[
                listing.address.city,
                [listing.address.state, listing.address.postalCode]
                  .filter(Boolean)
                  .join(" "),
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
            <PropertyFeatures listing={listing} className="mt-4" />
          </header>

          {listing.description && (
            <section className="border-b py-8">
              <h2 className="font-display text-3xl">About this home</h2>
              <p className="mt-4 max-w-prose whitespace-pre-line leading-relaxed">
                {listing.description}
              </p>
            </section>
          )}

          {shownFacts.length > 0 && (
            <section className="border-b py-8">
              <h2 className="font-display text-3xl">Key facts</h2>
              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                {shownFacts.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-sm text-muted-foreground">{label}</dt>
                    <dd className="mt-0.5 font-medium tabular-nums">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {listing.features.length > 0 && (
            <section className="border-b py-8">
              <h2 className="font-display text-3xl">Features</h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {listing.features.slice(0, 10).map((section) => (
                  <div key={section.category}>
                    <h3 className="font-medium">{section.category}</h3>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {section.items.slice(0, 8).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {listing.schools.length > 0 && (
            <section className="border-b py-8">
              <h2 className="font-display text-3xl">Nearby schools</h2>
              <ul className="mt-4 divide-y rounded-xl border">
                {listing.schools.slice(0, 6).map((school) => (
                  <li
                    key={school.name}
                    className="flex items-center justify-between gap-4 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{school.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {[
                          school.grades,
                          school.type &&
                            school.type[0].toUpperCase() + school.type.slice(1),
                          school.distanceMiles !== null &&
                            `${school.distanceMiles} mi`,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                    {school.rating !== null && (
                      <p className="shrink-0 text-sm tabular-nums">
                        <span className="font-semibold">{school.rating}</span>
                        <span className="text-muted-foreground">/10</span>
                        <span className="sr-only"> rating</span>
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {listing.history.length > 0 && (
            <section className="border-b py-8">
              <h2 className="font-display text-3xl">Listing history</h2>
              <div className="mt-4 overflow-x-auto rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-muted text-left text-muted-foreground">
                    <tr>
                      <th scope="col" className="px-4 py-2 font-medium">
                        Date
                      </th>
                      <th scope="col" className="px-4 py-2 font-medium">
                        Event
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 text-right font-medium"
                      >
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {listing.history.slice(0, 10).map((h, i) => (
                      <tr key={`${h.date}-${i}`}>
                        <td className="px-4 py-2 whitespace-nowrap tabular-nums">
                          {formatDate(h.date)}
                        </td>
                        <td className="px-4 py-2">{h.event}</td>
                        <td className="px-4 py-2 text-right tabular-nums">
                          {h.price ? formatPrice(h.price) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {mapPoints.length > 0 && (
            <section className="py-8">
              <h2 className="font-display text-3xl">Location</h2>
              <div className="mt-4">
                <PropertyMap points={mapPoints} zoom={15} height={400} />
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <ContactCard
            listing={listing}
            phoneHref={phoneHref}
            emailHref={emailHref}
          />
        </aside>
      </div>
      <div className="property-contact-bar fixed inset-x-0 bottom-0 z-40 border-t bg-card px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden">
        <Button asChild className="w-full gap-2">
          {phoneHref ? (
            <a href={phoneHref}>
              <PhoneIcon aria-hidden className="size-4" />
              Call agent
            </a>
          ) : emailHref ? (
            <a href={emailHref}>
              <MailIcon aria-hidden className="size-4" />
              Email agent
            </a>
          ) : (
            <Link
              href={{ pathname: "/contact", query: { listing: listing.id } }}
            >
              Ask about this home
            </Link>
          )}
        </Button>
      </div>
    </article>
  );
}

function Gallery({ listing }: { listing: ListingDetail }) {
  const photos = listing.photos.slice(0, MAX_PHOTOS);

  if (photos.length === 0) {
    return (
      <div className="mt-2 flex aspect-[16/9] items-center justify-center rounded-xl bg-muted">
        <HomeIcon aria-hidden className="size-12 text-muted-foreground" />
        <span className="sr-only">No photos available</span>
      </div>
    );
  }

  return (
    <Carousel className="mt-2" aria-label="Photos">
      <CarouselContent>
        {photos.map((src, i) => (
          <CarouselItem key={src}>
            <AspectRatio
              ratio={16 / 9}
              className="overflow-hidden rounded-xl bg-muted"
            >
              <Image
                src={src}
                alt={`${listing.address.line}, photo ${i + 1} of ${photos.length}`}
                fill
                priority={i === 0}
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      {photos.length > 1 && (
        <>
          <CarouselPrevious className="left-3 border-0 bg-background/90 shadow-sm" />
          <CarouselNext className="right-3 border-0 bg-background/90 shadow-sm" />
        </>
      )}
    </Carousel>
  );
}

function ContactCard({
  listing,
  phoneHref,
  emailHref,
}: {
  listing: ListingDetail;
  phoneHref: string | null;
  emailHref: string | null;
}) {
  const agent = listing.agent;

  return (
    <div className="rounded-lg border border-t-2 border-t-brass bg-card p-6 shadow-sm">
      <h2 className="text-sm font-medium text-muted-foreground">
        {agent ? "Listed by" : "Interested in this home?"}
      </h2>
      {agent && (
        <div className="mt-4 flex items-center gap-4">
          {agent.photo ? (
            <Image
              src={agent.photo}
              alt=""
              width={64}
              height={64}
              className="size-16 rounded-full object-cover"
            />
          ) : (
            <span
              aria-hidden
              className="flex size-16 items-center justify-center rounded-full bg-muted text-lg font-semibold"
            >
              {agent.name.charAt(0)}
            </span>
          )}
          <div className="min-w-0">
            <p className="font-semibold">{agent.name}</p>
            {agent.office && (
              <p className="truncate text-sm text-muted-foreground">
                {agent.office}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="mt-6 grid gap-2">
        {agent?.phone && phoneHref && (
          <Button asChild>
            <a href={phoneHref}>
              <PhoneIcon aria-hidden className="mr-2 size-4" />
              Call {formatPhone(agent.phone)}
            </a>
          </Button>
        )}
        {agent?.email && emailHref && (
          <Button asChild variant={phoneHref ? "outline" : "default"}>
            <a href={emailHref}>
              <MailIcon aria-hidden className="mr-2 size-4" />
              Email {agent.name.split(" ")[0]}
            </a>
          </Button>
        )}
        {!phoneHref && !emailHref && (
          <Button asChild>
            <Link
              href={{ pathname: "/contact", query: { listing: listing.id } }}
            >
              Ask about this home
            </Link>
          </Button>
        )}
        {listing.sourceUrl && (
          <Button asChild variant="ghost">
            <a
              href={listing.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Realtor.com
              <ExternalLinkIcon aria-hidden className="ml-2 size-4" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
        )}
      </div>
      {listing.listedAt && (
        <p className="mt-4 text-xs text-muted-foreground">
          Listed {formatDate(listing.listedAt)}. Monthly sample from Realtor.com
          via RealtyAPI. Availability may have changed.
        </p>
      )}
    </div>
  );
}

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "");
  return d.length === 10
    ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
    : raw;
}
