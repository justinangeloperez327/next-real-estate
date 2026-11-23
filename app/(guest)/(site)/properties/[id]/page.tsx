import type { Metadata } from "next";
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

  return (
    <div className="mx-auto mt-10 min-h-screen max-w-6xl px-4 xl:px-0">
      <section className="flex items-center justify-center">
        <Carousel className="mx-12 w-full xl:mx-0">
          <CarouselContent>
            {GALLERY.map((image, i) => (
              <CarouselItem key={image.src}>
                <AspectRatio ratio={16 / 9} className="bg-muted">
                  <Image
                    src={image.src}
                    alt={`${property.title} – ${image.alt}`}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1152px) 1152px, 100vw"
                    className="object-cover"
                  />
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section className="my-10 flex flex-col gap-8 lg:flex-row">
        <div className="lg:basis-2/3">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-wide">
              {property.address}
            </h1>
            <p className="text-2xl">
              {formatPrice(property.price)}
              {property.category === "rent" && (
                <span className="text-base text-muted-foreground">
                  {" "}
                  / month
                </span>
              )}
            </p>
            <PropertyFeatures property={property} />
          </div>

          <hr className="my-8 border-gray-400" />

          <div className="space-y-4">
            <h2 className="text-2xl">{property.title}</h2>
            <p className="whitespace-pre-line text-lg tracking-wide">
              {property.description}
            </p>
            {property.pool && <p className="text-lg">✓ Swimming pool</p>}
          </div>

          <hr className="my-8 border-gray-400" />

          <div className="space-y-4 pb-20">
            <h2 className="text-2xl">Location</h2>
            <PropertyMap points={[property]} zoom={15} />
          </div>
        </div>

        <aside className="space-y-4 lg:basis-1/3">
          <div className="space-y-8 rounded-md bg-gray-800 p-4">
            {AGENTS.map((agent) => (
              <div key={agent.email} className="flex gap-4">
                <Image
                  src={agent.photo}
                  alt={agent.name}
                  width={100}
                  height={100}
                  className="h-[100px] w-[100px] rounded-full object-cover grayscale"
                />
                <div className="min-w-0 space-y-2">
                  <h3 className="text-lg">{agent.name}</h3>
                  <a href={`mailto:${agent.email}`} className="block truncate">
                    {agent.email}
                  </a>
                  <a
                    href={`tel:${agent.phone.replaceAll("-", "")}`}
                    className="block w-full rounded-md bg-slate-500 px-2 py-1 text-center hover:bg-slate-600"
                  >
                    Call {agent.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
