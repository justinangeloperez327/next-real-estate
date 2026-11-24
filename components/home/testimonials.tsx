// TODO(content): replace with real client reviews (with their permission).
const TESTIMONIALS = [
  {
    quote:
      "The best real estate service I have ever experienced. Highly recommended!",
    name: "John Doe",
    role: "Home Buyer",
  },
  {
    quote:
      "Professional and efficient. They helped me find my dream home in no time.",
    name: "Jane Smith",
    role: "Home Buyer",
  },
  {
    quote:
      "Great experience from start to finish. The team was very supportive.",
    name: "Michael Johnson",
    role: "Home Seller",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="mb-4 text-4xl">What Our Clients Say</h2>
        <p className="mb-6">Testimonials from our happy clients</p>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <li key={t.name}>
              <figure className="h-full rounded-sm bg-white p-6 text-black shadow-lg">
                <blockquote className="mb-4 text-gray-800">
                  “{t.quote}”
                </blockquote>
                <figcaption>
                  <p className="text-lg font-bold">{t.name}</p>
                  <p className="text-sm text-gray-600">{t.role}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
