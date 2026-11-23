import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PropertyFeatures } from "@/features/properties/components/property-features";
import { formatPrice } from "@/lib/format";
import type { Property } from "@/features/properties/types";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="group relative mx-4 block h-[560px] overflow-hidden rounded-lg text-white shadow-xl lg:mx-0"
    >
      <div className="overflow-hidden">
        <Image
          src="/images/properties/1.jpeg"
          width={420}
          height={400}
          alt={property.title}
          className="h-96 w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="px-4 pt-4 pb-2 capitalize">
        <h3 className="text-2xl group-hover:text-rose-600">
          {property.address}
        </h3>
      </div>
      <div className="mt-2 px-4 text-2xl">{formatPrice(property.price)}</div>
      <div className="mt-4 flex justify-between px-4">
        <PropertyFeatures property={property} className="gap-4" />
        <ChevronRight
          size={32}
          aria-hidden
          className="mr-3 transition-all duration-300 group-hover:mr-0 group-hover:text-rose-600"
        />
      </div>
    </Link>
  );
}
