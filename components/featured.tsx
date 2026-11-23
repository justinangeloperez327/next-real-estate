import { PropertyCarousel } from "@/components/property-carousel";
import { unstable_rethrow } from "next/navigation";
import { getLatestProperties } from "@/lib/properties/queries";

export default async function Featured() {
  // The featured strip is decorative: if it fails, render the rest of the page.
  let properties: Awaited<ReturnType<typeof getLatestProperties>> = [];
  try {
    properties = await getLatestProperties(5);
  } catch (error) {
    unstable_rethrow(error); // let Next.js handle its own control-flow errors
    console.error("Featured properties failed to load:", error);
  }
  if (properties.length === 0) return null;

  return (
    <section className="py-20">
      <div className="container mx-auto tracking-wide">
        <h2 className="mb-4 text-4xl">Properties We Love</h2>
        <p className="mb-6">A selection of our favourite sales listings</p>
        <PropertyCarousel properties={properties} />
      </div>
    </section>
  );
}
