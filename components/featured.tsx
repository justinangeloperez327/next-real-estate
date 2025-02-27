import { createClient } from "@/utils/supabase/server";
import PropertyCarousel from "./property-carousel";

type Property = {
  id: number;
  image: string;
  title: string;
  address: string;
  beds: number;
  baths: number;
  carpark: number;
  property_type: string;
  price: number;
};

export default async function Featured() {
  const supabase = createClient();
  const { data } = await (await supabase)
    .from("properties")
    .select("*")
    .order("id", { ascending: false })
    .limit(5);
  const properties: Property[] = data ?? [];
  return (
    <section className="py-20 font-[Nimbus_Sans_L]">
      <div className="container mx-auto tracking-wide">
        <h2 className="text-4xl mb-4">Properties We Love</h2>
        <h6 className="text-md mb-6">
          A selection of our favourite sales listings
        </h6>
        <div className="w-full">
          <PropertyCarousel properties={properties} />
        </div>
      </div>
    </section>
  );
}
