import Map from "@/components/map";
import { faBed, faCar, faShower } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getProperty } from "../actions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const property = await getProperty(id);

  return (
    <div className="min-h-screen max-w-6xl mx-auto mt-10">
      <section className=" flex items-center justify-center">
        <Carousel className="w-full max-w-full mx-16 xl:mx-0">
          <CarouselContent className=" max-h-[560px]">
            <CarouselItem>
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  alt="property"
                  height={720}
                  width={1070}
                  src="/images/properties/1.jpeg"
                  className="h-full w-full object-cover cursor-pointer"
                />
              </AspectRatio>
            </CarouselItem>
            <CarouselItem>
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  alt="property"
                  height={720}
                  width={1270}
                  src="/images/properties/bedroom.jpg"
                  className="h-full  object-cover cursor-pointer"
                />
              </AspectRatio>
            </CarouselItem>
            <CarouselItem>
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  alt="property"
                  height={720}
                  width={1270}
                  src="/images/properties/bathroom.jpg"
                  className="h-full  object-cover cursor-pointer"
                />
              </AspectRatio>
            </CarouselItem>
            <CarouselItem>
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  alt="property"
                  height={720}
                  width={1270}
                  src="/images/properties/kitchen.jpg"
                  className="h-full  object-cover cursor-pointer"
                />
              </AspectRatio>
            </CarouselItem>
            <CarouselItem>
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  alt="property"
                  height={720}
                  width={1270}
                  src="/images/properties/floorplan.avif"
                  className="h-full  object-cover cursor-pointer"
                />
              </AspectRatio>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <section id="details" className=" my-10">
        <div className="flex flex-row gap-4">
          <div className="basis-2/3">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-wide">
                {property.address}
              </h1>
              <h3 className="text-2xl">${property.price.toLocaleString()}</h3>
              <div className="flex space-x-5">
                <div className="flex gap-2">
                  <FontAwesomeIcon icon={faBed} className="h-6" />{" "}
                  {property.beds}{" "}
                </div>
                <div className="flex gap-2">
                  <FontAwesomeIcon icon={faShower} className="h-6" />{" "}
                  {property.baths}{" "}
                </div>
                <div className="flex gap-2">
                  <FontAwesomeIcon icon={faCar} className="h-6" />{" "}
                  {property.carpark}{" "}
                </div>
              </div>
            </div>
            <hr className="my-8 border-gray-400" />
            <div className="space-y-4">
              <h2 className="text-2xl">Description</h2>
              <p className="text-lg tracking-wide">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo obcaecati libero natus iusto nesciunt aliquid.
                Deleniti fuga quisquam, autem dolores quas voluptates obcaecati
                consequatur deserunt nam corrupti sapiente, iusto veniam nisi
                saepe consequuntur perspiciatis impedit alias mollitia
                accusantium praesentium. Tenetur natus est deserunt magni
                voluptate fuga aspernatur ratione id deleniti.
              </p>
              <p className="text-lg tracking-wide">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo obcaecati libero natus iusto nesciunt aliquid.
                Deleniti fuga quisquam, autem dolores quas voluptates obcaecati
                consequatur deserunt nam corrupti sapiente, iusto veniam nisi
                saepe consequuntur perspiciatis impedit alias mollitia
                accusantium praesentium. Tenetur natus est deserunt magni
                voluptate fuga aspernatur ratione id deleniti.
              </p>
              <p className="text-lg tracking-wide">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo obcaecati libero natus iusto nesciunt aliquid.
                Deleniti fuga quisquam, autem dolores quas voluptates obcaecati
                consequatur deserunt nam corrupti sapiente, iusto veniam nisi
                saepe consequuntur perspiciatis impedit alias mollitia
                accusantium praesentium. Tenetur natus est deserunt magni
                voluptate fuga aspernatur ratione id deleniti.
              </p>
            </div>
            <hr className="my-8 border-gray-400" />
            <div className="space-y-4 pb-20">
              <h2 className="text-2xl">Location</h2>
              <Map
                longitude={property.longitude}
                latitude={property.latitude}
              />
            </div>
          </div>
          <div className="basis-1/3">
            <div className="space-y-8 rounded-md p-4 bg-gray-800">
              <div className="flex flex-row gap-4">
                <div>
                  <Image
                    src="/images/agents/agent.webp"
                    alt="agent"
                    width={100}
                    height={100}
                    className="rounded-full grayscale"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg">John Doe</h3>
                  <h2 className="text-md">johndoe@gmail.com</h2>
                  <p className="">
                    <a
                      href="tel:123456789"
                      className="w-full block text-center bg-slate-500 hover:bg-slate-600 rounded-md px-2 py-1"
                    >
                      123-456-789
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div>
                  <Image
                    src="/images/agents/agent.webp"
                    alt="agent"
                    width={100}
                    height={100}
                    className="rounded-full grayscale"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg">John Doe</h3>
                  <h2 className="text-md">johndoe@gmail.com</h2>
                  <p className="">
                    <a
                      href="tel:123456789"
                      className="w-full block text-center bg-slate-500 hover:bg-slate-600 rounded-md px-2 py-1"
                    >
                      123-456-789
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4 mt-4 rounded-md p-4 bg-gray-800">
              <h4 className="text-xl font-semibold tracking-wider">
                Inspection Times
              </h4>
              <div className="space-y-2">
                <div>
                  <p className="text-lg">Saturday 1st Mar</p>
                  <p className="text-md">9:00am - 5:00pm</p>
                </div>
                <button className="bg-white px-2 py-1 block w-full text-lg hover:bg-gray-200 rounded-md text-black">
                  Add to Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
