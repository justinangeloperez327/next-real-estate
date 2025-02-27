import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React from "react";

const ContactPage = () => {
  return (
    <>
      <section className="relative h-96 flex items-center justify-center">
        <Image
          alt="Contact"
          height={720}
          width={1270}
          src="/images/contact.jpg"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute w-full h-full bg-gray-900 opacity-60"></div>
        <div className="container mx-auto text-center text-white relative z-10">
          <h1 className="text-4xl font-bold tracking-wider capitalize">
            Contact Us
          </h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto justify-center my-20">
        <h1 className="text-3xl text-center">Get in Touch</h1>
        <p className="text-lg text-center mt-2">
          Whether you`re looking to buy, sell, rent or invest, our property
          specialists have the knowledge, experience and passion to guide you
          through your next real estate transaction.
        </p>
        <p className="text-lg text-center mt-2">
          Provide your details and we`ll be in touch soon.
        </p>
        <p className="text-lg text-center mt-2">
          We look forward to hearing from you.
        </p>
        <form className="mt-8 space-y-6 bg-gray-800 p-4 rounded-md">
          <h5>We're here to help you</h5>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              name="message"
              id="message"
              placeholder="Message"
              rows={4}
              required
            ></Textarea>
          </div>
          <div>
            <Button type="submit" variant="secondary">
              Submit
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default ContactPage;
