"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { priceRange, propertyFeatures, propertyTypes } from "@/lib/constants";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const formSchema = z.object({
  search: z.string(),
  property_type: z.string(),
  beds: z.string(),
  baths: z.string(),
  carpark: z.string(),
  minPrice: z.string(),
  maxPrice: z.string(),
});

const PropertySearch = () => {
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: searchParams.get("search") || "",
      property_type: searchParams.get("property_type") || "",
      beds: searchParams.get("beds") || "",
      baths: searchParams.get("baths") || "",
      carpark: searchParams.get("carpark") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const searchParams = new URLSearchParams();

    searchParams.set("search", data.search);
    searchParams.set("property_type", data.property_type);
    searchParams.set("beds", data.beds);
    searchParams.set("baths", data.baths);
    searchParams.set("carpark", data.carpark);
    searchParams.set("minPrice", data.minPrice);
    searchParams.set("maxPrice", data.maxPrice);

    window.location.href = `/properties?${searchParams.toString()}`;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <Input
                  {...field}
                  id="search"
                  placeholder="Search Address"
                  className="bg-white/80 text-black rounded-sm text-lg py-1"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 mt-4">
          <FormField
            control={form.control}
            name="property_type"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full bg-white/80 text-black rounded-sm text-lg py-1">
                      <SelectValue placeholder="Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Property Type</SelectLabel>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="beds"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full bg-white/80 text-black rounded-sm text-lg py-1">
                      <SelectValue placeholder="Beds" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Beds</SelectLabel>
                        {propertyFeatures.map((feature) => (
                          <SelectItem key={feature.value} value={feature.value}>
                            {feature.text}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="baths"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full bg-white/80 text-black rounded-sm text-lg py-1">
                      <SelectValue placeholder="Baths" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Baths</SelectLabel>
                        {propertyFeatures.map((feature) => (
                          <SelectItem key={feature.value} value={feature.value}>
                            {feature.text}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="carpark"
            render={({ field }) => (
              <FormItem className="">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full bg-white/80 text-black rounded-sm text-lg py-1">
                      <SelectValue placeholder="Carpark" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Carpark</SelectLabel>
                      {propertyFeatures.map((feature) => (
                        <SelectItem key={feature.value} value={feature.value}>
                          {feature.text}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="minPrice"
            render={({ field }) => (
              <FormItem className="">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full bg-white/80 text-black rounded-sm text-lg py-1">
                      <SelectValue placeholder="Min Price" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Min Price</SelectLabel>
                      {priceRange.map((price) => (
                        <SelectItem key={price.value} value={price.value}>
                          {price.text}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxPrice"
            render={({ field }) => (
              <FormItem className="">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full bg-white/80 text-black rounded-sm text-lg py-1">
                      <SelectValue placeholder="Max Price" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Max Price</SelectLabel>
                      {priceRange.map((price) => (
                        <SelectItem key={price.value} value={price.value}>
                          {price.text}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="bg-rose-600 hover:bg-rose-500 mt-4 w-full lg:w-1/2 text-lg"
        >
          Search
        </Button>
      </form>
    </Form>
  );
};

export default PropertySearch;
