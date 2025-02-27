import Image from "next/image";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <section className="relative h-96 flex items-center justify-center">
        <Image
          alt="property"
          height={720}
          width={1270}
          src="/images/about.jpg"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute w-full h-full bg-gray-900 opacity-60"></div>
        <div className="container mx-auto text-center text-white relative z-10">
          <h1 className="text-4xl font-bold tracking-wider capitalize">
            Making your real estate experience more enjoyable.
          </h1>
          <h2 className="mt-2 tracking-widest">
            Our passion is people and property.
          </h2>
        </div>
      </section>
      <section className="my-10 container mx-auto ">
        <div>
          <h1 className="text-2xl font-semibold tracking-wider">Our Story</h1>
          <div className="my-4">
            <p className="text-lg tracking-wider">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
              aperiam eaque corrupti ducimus architecto sapiente in illum
              facilis ullam accusamus totam magni itaque distinctio pariatur
              libero facere nisi delectus quia adipisci. Ipsa a soluta molestias
              officiis iusto maxime id quae ipsum! Necessitatibus repellat
              quidem officiis fugiat ad minus iste accusantium perspiciatis?
              Fugiat saepe eveniet molestias natus eum ad reprehenderit est
              accusamus laboriosam nihil architecto nobis velit, sint sapiente
              optio. Laudantium repellat tenetur nostrum officiis et nobis enim
              fuga voluptatem, atque esse quos asperiores voluptates voluptas
              animi, cupiditate, incidunt vero unde!
            </p>
          </div>
        </div>
      </section>
      <section className="my-10 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col p-8 justify-center">
            <h3 className="text-xl font-bold tracking-widest">Our Community</h3>
            <p className="my-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              fugiat eius veritatis? Quo voluptatum vel corporis? Illum nesciunt
              at eveniet suscipit error, non consectetur dolor.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur labore maiores officia nulla cum ut?
            </p>
          </div>
          <div>
            <Image
              alt="community"
              src="/images/community.jpg"
              height={720}
              width={720}
              className="object-cover max-h-96"
            />
          </div>
          <div>
            <Image
              alt="community"
              src="/images/community2.jpg"
              height={720}
              width={720}
              className="object-cover max-h-96"
            />
          </div>
          <div className="flex flex-col p-8 justify-center">
            <h3 className="text-xl font-bold tracking-widest">Our Community</h3>
            <p className="my-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              fugiat eius veritatis? Quo voluptatum vel corporis? Illum nesciunt
              at eveniet suscipit error, non consectetur dolor.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur labore maiores officia nulla cum ut?
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
