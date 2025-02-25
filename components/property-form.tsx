'use client';
import { createProperty, updateProperty } from '@/app/(admin)/dashboard/properties/actions';
import { Property } from '@/lib/types';
import { Checkbox, Field, Input, Label, Select, Switch, Textarea } from '@headlessui/react';
import clsx from 'clsx';
import { redirect } from 'next/navigation';
import React, { useState, useEffect } from 'react';

interface PropertyFormProps {
    property?: Property
}

const PropertyForm: React.FC<PropertyFormProps> = ({ property }) => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        price: 0,
        beds: 1,
        baths: 1,
        carpark: 0,
        propertyType: 'house',
        category: 'sale',
        address: '',
        latitude: 0,
        longitude: 0,
        pool: false
    });

    useEffect(() => {
        if (property) {
            setFormData({
                id: property.id || '',
                title: property.title || '',
                description: property.description || '',
                price: property.price || 0,
                beds: property.beds || 1,
                baths: property.baths || 1,
                carpark: property.carpark || 0,
                propertyType: property.propertyType || 'house',
                category: property.category || 'sell',
                address: property.address || '',
                latitude: property.latitude || 0,
                longitude: property.longitude || 0,
                pool: property.pool || false
            });
        }
    }, [property]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (property) {
            await updateProperty(formData as Property);

        } else {
            await createProperty(formData as Property);
        }
        redirect('/dashboard/properties');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Field>
                <Label htmlFor="title" className="block text-sm font-medium text-white">Title</Label>
                <Input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={clsx(
                        "mt-1 block w-full rounded-lg border-none bg-white/40 py-2 px-3 text-sm/6 text-white placeholder-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                    required
                />
            </Field>
            <Field>
                <Label htmlFor="description" className="block text-sm font-medium text-white">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={clsx(
                        "mt-1 block w-full rounded-lg border-none bg-white/40 py-2 px-3 text-sm/6 text-white placeholder-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                    required
                />
            </Field>
            <Field className={clsx("w-1/2")}>
                <Label htmlFor="price" className="block text-sm font-medium text-white">Price</Label>
                <Input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={clsx(
                        "mt-1 block w-full rounded-lg border-none bg-white/40 py-2 px-3 text-sm/6 text-white placeholder-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                    required
                />
            </Field>

            <Field className={clsx("w-1/2")}>
                <Label htmlFor="beds" className="block text-sm font-medium text-white">Bedrooms</Label>
                <Input
                    type="number"
                    id="beds"
                    name="beds"
                    value={formData.beds}
                    onChange={handleChange}
                    className={clsx(
                        "mt-1 block w-full rounded-lg border-none bg-white/40 py-2 px-3 text-sm/6 text-white placeholder-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                    required
                />
            </Field>
            <Field className={clsx("w-1/2")}>
                <Label htmlFor="baths" className="block text-sm font-medium text-white">Bathrooms</Label>
                <Input
                    type="number"
                    id="baths"
                    name="baths"
                    value={formData.baths}
                    onChange={handleChange}
                    className={clsx(
                        "mt-1 block w-full rounded-lg border-none bg-white/40 py-2 px-3 text-sm/6 text-white placeholder-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                    required
                />
            </Field>
            <Field className={clsx("w-1/2")}>
                <Label htmlFor="carpark" className="block text-sm font-medium text-white">Car Park</Label>
                <Input
                    type="number"
                    id="carpark"
                    name="carpark"
                    value={formData.carpark}
                    onChange={handleChange}
                    className={clsx(
                        "mt-1 block w-full rounded-lg border-none bg-white/40 py-2 px-3 text-sm/6 text-white placeholder-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                    required
                />
            </Field>
            <Field>
                <Label htmlFor="pool" className="block text-sm font-medium text-white">Pool</Label>
                <input
                    type='checkbox'
                    id="pool"
                    name="pool"
                    checked={formData.pool}
                    onChange={handleCheckboxChange}
                />

            </Field>
            <Field className={clsx("w-1/2")}>
                <Label htmlFor="property-type" className="block text-sm font-medium text-white">Property Type</Label>
                <Select
                    id="property-type"
                    name="property-type"
                    value={formData.propertyType}
                    onChange={handleSelectChange}
                    className={clsx(
                        "mt-1 block w-full rounded-lg border-none bg-white/40 py-2 px-3 text-sm/6 text-white placeholder-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                        '*:text-black'
                    )}
                >
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="unit">Unit</option>
                </Select>
            </Field>
            <Field className={clsx("w-1/2")}>
                <Label htmlFor="category" className="block text-sm font-medium text-white">Category</Label>
                <Select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleSelectChange}
                    className={clsx(
                        "mt-1 block w-full rounded-lg border-none bg-white/40 py-2 px-3 text-sm/6 text-white placeholder-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                        '*:text-black'
                    )}
                >
                    <option value="sale">Sale</option>
                    <option value="rent">Rent</option>
                </Select>
            </Field>

            <Field>
                <Label htmlFor="address" className="block text-sm font-medium text-white">Address</Label>
                <Input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={clsx(
                        "mt-1 block w-full rounded-lg border-none bg-white/40 py-2 px-3 text-sm/6 text-white placeholder-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                    autoComplete='off'
                />
            </Field>
            <Field className={clsx("w-1/2")}>
                <Label htmlFor="latitude" className="block text-sm font-medium text-white">Latitude</Label>
                <Input
                    type="text"
                    id="latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    className={clsx(
                        "mt-1 block w-full rounded-lg border-none bg-white/40 py-2 px-3 text-sm/6 text-white placeholder-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                />
            </Field>
            <Field className={clsx("w-1/2")}>
                <Label htmlFor="longitude" className="block text-sm font-medium text-white">Longitude</Label>
                <Input
                    type="text"
                    id="longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    className={clsx(
                        "mt-1 block w-full rounded-lg border-none bg-white/40 py-2 px-3 text-sm/6 text-white placeholder-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                />
            </Field>
            <button type="submit" className="mt-4 bg-rose-600 hover:bg-rose-500 text-white py-2 px-4 rounded-md shadow-sm">Submit</button>
        </form>
    );
};

export default PropertyForm;