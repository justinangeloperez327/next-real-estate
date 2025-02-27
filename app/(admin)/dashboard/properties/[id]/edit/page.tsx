import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
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
import { updateProperty, getProperty } from "../../actions";

export default async function PropertyEditPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const property = await getProperty(id);

  return (
    <div className="p-4 min-h-screen rounded-md">
      {property ? (
        <>
          <div className="text-2xl mb-4 px-4 py-2 rounded-md shadow-lg">
            Edit Property Details
          </div>
          <div className="w-1/2 shadow-lg rounded-md border border-gray-200 overflow-hidden px-6 py-4">
            <form className="flex-1 flex flex-col min-w-64">
              <Input name="id" type="hidden" value={property.id} />
              <div className="flex flex-col gap-6 mt-8">
                <div className="">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    name="title"
                    placeholder="Title"
                    defaultValue={property.title}
                    required
                  />
                </div>

                <div className="">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    name="description"
                    placeholder="Description"
                    defaultValue={property.description}
                    required
                  />
                </div>
                <div className="">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    name="address"
                    placeholder="Address"
                    defaultValue={property.address}
                    required
                  />
                </div>
                <div className="">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    name="price"
                    type="number"
                    defaultValue={property.price}
                    required
                  />
                </div>

                <div className="flex space-x-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="beds">Bedrooms</Label>
                    <Input
                      name="beds"
                      type="number"
                      defaultValue={property.beds}
                      required
                    />
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="baths">Bathrooms</Label>
                    <Input
                      name="baths"
                      type="number"
                      defaultValue={property.baths}
                      required
                    />
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="carpark">Carpark</Label>
                    <Input
                      name="carpark"
                      type="number"
                      defaultValue={property.carpark}
                      required
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="title">Property Type</Label>
                    <Select defaultValue={property.property_type}>
                      <SelectTrigger className="w-">
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
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="title">Category</Label>
                    <Select defaultValue={property.category}>
                      <SelectTrigger className="w-">
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
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      name="longitude"
                      placeholder="Longitude"
                      defaultValue={property.longitude}
                      required
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      name="latitude"
                      placeholder="Latitude"
                      defaultValue={property.latitude}
                      required
                    />
                  </div>
                </div>
                <SubmitButton
                  pendingText="Updating"
                  formAction={updateProperty}
                >
                  Submit
                </SubmitButton>
              </div>
            </form>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
}
