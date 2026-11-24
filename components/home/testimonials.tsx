// TODO(content): replace with real client reviews (with their permission).
const TESTIMONIALS = [
  {
    quote:
      "They listened to what we actually needed and found us a place we hadn't even considered. We couldn't be happier.",
    name: "John Doe",
    role: "Bought a family home",
  },
  {
    quote:
      "Clear, calm and always quick to reply. Selling felt far less stressful than I expected.",
    name: "Jane Smith",
    role: "Sold an apartment",
  },
  {
    quote:
      "From the first viewing to getting the keys, we always knew what was happening next.",
    name: "Michael Johnson",
    role: "First-time buyer",
  },
];

export default function Testimonials() {
  return (
    <section className="border-y bg-muted">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-semibold">What our clients say</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <li key={t.name}>
              <figure className="flex h-full flex-col rounded-xl border bg-card p-6">
                <blockquote className="flex-1 text-card-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t pt-4">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
