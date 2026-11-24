import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeftIcon, MailIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PropertyDetailSkeleton } from "@/features/properties/components/property-skeletons";
import { PropertyFeatures } from "@/features/properties/components/property-features";
import { PropertyMap } from "@/features/properties/components/property-map";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatPrice } from "@/lib/format";
import { getProperty } from "@/features/properties/queries";

// Placeholder gallery until property images are stored per listing.
const GALLERY = [
  { src: "/images/properties/1.jpeg", alt: "Exterior" },
  { src: "/images/properties/bedroom.jpg", alt: "Bedroom" },
  { src: "/images/properties/bathroom.jpg", alt: "Bathroom" },
  { src: "/images/properties/kitchen.jpg", alt: "Kitchen" },
  { src: "/images/properties/floorplan.avif", alt: "Floor plan" },
];

// Placeholder agent details until agents are stored in the database.
const AGENTS = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-789",
    photo: "/images/agents/agent.webp",
  },
];

export async function generateMetadata({
  params,
}: PageProps<"/properties/[id]">): Promise<Metadata> {
  const { id } = await params;
  const property = await getProperty(id);
  return property
    ? { title: property.title, description: property.description.slice(0, 160) }
    : { title: "Property not found" };
}

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
  const property = await getProperty(id);
  if (!property) notFound();

  const forRent = property.category === "rent";
  const facts: [string, React.ReactNode][] = [
    [
      "Type",
      <span key="t" className="capitalize">
        {property.property_type}
      </span>,
    ],
    ["Listing", forRent ? "For rent" : "For sale"],
    ["Bedrooms", property.beds],
    ["Bathrooms", property.baths],
    ["Car parks", property.carpark],
    ["Pool", property.pool ? "Yes" : "No"],
  ];

  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <Link
        href="/properties"
        className="-ml-2 inline-flex h-11 items-center gap-1 px-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeftIcon aria-hidden className="size-4" />
        All homes
      </Link>

      <Carousel className="mt-2" aria-label="Photos">
        <CarouselContent>
          {GALLERY.map((image, i) => (
            <CarouselItem key={image.src}>
              <AspectRatio
                ratio={16 / 9}
                className="overflow-hidden rounded-xl bg-muted"
              >
                <Image
                  src={image.src}
                  alt={`${property.title}: ${image.alt}`}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1152px) 1152px, 100vw"
                  className="object-cover"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 size-11 border-0 bg-background/90 shadow-sm" />
        <CarouselNext className="right-3 size-11 border-0 bg-background/90 shadow-sm" />
      </Carousel>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <header className="border-b pb-6">
            <p className="text-sm text-muted-foreground">
              {forRent ? "For rent" : "For sale"}
            </p>
            <h1 className="mt-1 text-3xl font-semibold">{property.title}</h1>
            <p className="mt-2 text-muted-foreground">{property.address}</p>
            <p className="mt-4 text-3xl font-semibold tabular-nums">
              {formatPrice(property.price)}
              {forRent && (
                <span className="text-lg font-normal text-muted-foreground">
                  {" "}
                  / month
                </span>
              )}
            </p>
            <PropertyFeatures property={property} className="mt-4" />
          </header>

          <section className="border-b py-8">
            <h2 className="text-xl font-semibold">About this home</h2>
            <p className="mt-4 max-w-prose whitespace-pre-line leading-relaxed">
              {property.description}
            </p>
          </section>

          <section className="border-b py-8">
            <h2 className="text-xl font-semibold">Key facts</h2>
            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-sm text-muted-foreground">{label}</dt>
                  <dd className="mt-0.5 font-medium tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="py-8">
            <h2 className="text-xl font-semibold">Location</h2>
            <div className="mt-4">
              <PropertyMap points={[property]} zoom={15} height={400} />
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          {AGENTS.map((agent) => (
            <div key={agent.email} className="rounded-xl border bg-card p-6">
              <h2 className="text-sm font-medium text-muted-foreground">
                Your agent
              </h2>
              <div className="mt-4 flex items-center gap-4">
                <Image
                  src={agent.photo}
                  alt=""
                  width={64}
                  height={64}
                  className="size-16 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="font-semibold">{agent.name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {agent.email}
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-2">
                <Button asChild>
                  <a
                    href={`mailto:${agent.email}?subject=${encodeURIComponent(property.title)}`}
                  >
                    <MailIcon aria-hidden className="mr-2 size-4" />
                    Email {agent.name.split(" ")[0]}
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={`tel:${agent.phone.replaceAll("-", "")}`}>
                    <PhoneIcon aria-hidden className="mr-2 size-4" />
                    Call {agent.phone}
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </article>
  );
}
