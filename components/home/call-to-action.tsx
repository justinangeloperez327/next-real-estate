import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="mb-4 text-4xl">Ready to find your dream home?</h2>
        <p className="mb-8">Get in touch with us today</p>
        <Link
          href="/contact"
          className="rounded-lg bg-rose-600 px-6 py-3 text-white transition-colors hover:bg-rose-500"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
