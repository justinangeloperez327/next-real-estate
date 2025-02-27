import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { createProperty } from "../actions";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function PropertyCreatePage() {
  return (
    <>
      <div className="text-2xl mb-4 px-4 py-2 rounded-md shadow-lg">
        Create Property
      </div>
      <div className="w-full lg:w-1/2 shadow-lg rounded-md border border-gray-100 overflow-hidden px-6 py-4">
        <form className="flex-1 flex flex-col min-w-64">
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="title">Title</Label>
            <Input name="title" placeholder="Title" required />

            <Label htmlFor="description">Description</Label>
            <Textarea name="description" placeholder="Description" required />

            <Label htmlFor="address">Address</Label>
            <Textarea name="address" placeholder="Address" required />

            <Label htmlFor="price">Price</Label>
            <Input name="price" type="number" required />

            <Label htmlFor="beds">Bedrooms</Label>
            <Input name="beds" type="number" required />

            <Label htmlFor="baths">Bathrooms</Label>
            <Input name="baths" type="number" required />

            <Label htmlFor="carpark">Carpark</Label>
            <Input name="carpark" type="number" required />

            <Label htmlFor="title">Property Type</Label>
            <Select name="property_type">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Property Type</SelectLabel>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label htmlFor="title">Category</Label>
            <Select name="category">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label htmlFor="longitude">Longitude</Label>
            <Input name="longitude" placeholder="Longitude" required />
            <Label htmlFor="latitude">Latitude</Label>
            <Input name="latitude" placeholder="Latitude" required />
            <SubmitButton pendingText="Creating" formAction={createProperty}>
              Submit
            </SubmitButton>
          </div>
        </form>
      </div>
    </>
  );
}
