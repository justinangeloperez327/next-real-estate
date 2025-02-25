'use client'
import { Field, Input, Select } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { priceRange, propertyFeatures, propertyTypes } from '@/lib/constants';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'


const PropertySearch = () => {
    const searchParams = useSearchParams()

    const [formData, setFormData] = useState({
        search: '',
        propertyType: '',
        beds: '',
        baths: '',
        carpark: '',
        minPrice: '',
        maxPrice: '',
        pool: '',
    });

    useEffect(() => {
        if (searchParams) {
            setFormData({
                search: searchParams.get('search') || '',
                propertyType: searchParams.get('propertyType') || '',
                beds: searchParams.get('beds') || '',
                baths: searchParams.get('baths') || '',
                carpark: searchParams.get('carpark') || '',
                minPrice: searchParams.get('minPrice') || '',
                maxPrice: searchParams.get('maxPrice') || '',
                pool: searchParams.get('pool') || '',
            });
        }
    }, [searchParams]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <form action="properties">
            <div className="mt-6 mx-auto max-w-4xl">
                <div className="flex space-x-2">
                    <Field className={clsx("w-full lg:mx-0 mx-2")}>
                        <div className="relative">
                            <Input
                                name="search"
                                id="what"
                                type="text"
                                value={formData.search}
                                onChange={handleChange}
                                className={clsx(
                                    "mt-1 block w-full rounded-lg border-none bg-white/60 py-2 px-3 text-sm/6 text-white placeholder-white",
                                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                )}
                                placeholder="Enter Keywords"
                            />
                        </div>
                    </Field>
                </div>
            </div>
            <div className="mt-2 mx-auto max-w-4xl text-white">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:mx-0 mx-2">
                    <Field>
                        <div className="relative">
                            <Select
                                id="property_type"
                                className={clsx(
                                    "mt-1 block w-full appearance-none rounded-lg border-none bg-white/60 py-1.5 px-3 text-sm/6 text-white",
                                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 capitalize",
                                    "*:text-black "
                                )}
                                value={formData.propertyType}
                                onChange={handleChange}
                                name="propertyType"
                                aria-label="Property Type"
                            >
                                <option value="">
                                    Property Type
                                </option>
                                {propertyTypes.map((type) => (
                                    <option key={type} value={type} className=''>
                                        {type}
                                    </option>
                                ))}
                            </Select>
                            <ChevronDownIcon
                                className="group pointer-events-none absolute top-3 right-2.5 size-4 fill-white/60"
                                aria-hidden="true"
                            />
                        </div>
                    </Field>
                    <Field>
                        <div className="relative">
                            <Select
                                id="beds"
                                className={clsx(
                                    "mt-1 block w-full appearance-none rounded-lg border-none bg-white/60 py-1.5 px-3 text-sm/6 text-white",
                                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 capitalize",
                                    "*:text-black "
                                )}
                                name="beds"
                                value={formData.beds}
                                onChange={handleChange}
                                aria-label="Beds"
                            >
                                <option value="">
                                    Beds
                                </option>
                                {propertyFeatures.map((feature) => (
                                    <option key={feature.value} value={feature.value} className=''>
                                        {feature.text}
                                    </option>
                                ))}
                            </Select>
                            <ChevronDownIcon
                                className="group pointer-events-none absolute top-3 right-2.5 size-4 fill-white/60"
                                aria-hidden="true"
                            />
                        </div>
                    </Field>
                    <Field>
                        <div className="relative">
                            <Select
                                id="baths"
                                className={clsx(
                                    "mt-1 block w-full appearance-none rounded-lg border-none bg-white/60 py-1.5 px-3 text-sm/6 text-white",
                                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 capitalize",
                                    "*:text-black "
                                )}
                                value={formData.baths}
                                onChange={handleChange}
                                name="baths"
                                aria-label="Baths"
                            >
                                <option value="">
                                    Baths
                                </option>
                                {propertyFeatures.map((feature) => (
                                    <option key={feature.value} value={feature.value} className=''>
                                        {feature.text}
                                    </option>
                                ))}
                            </Select>
                            <ChevronDownIcon
                                className="group pointer-events-none absolute top-3 right-2.5 size-4 fill-white/60"
                                aria-hidden="true"
                            />
                        </div>
                    </Field>
                    <Field>
                        <div className="relative">
                            <Select
                                id="carpark"
                                className={clsx(
                                    "mt-1 block w-full appearance-none rounded-lg border-none bg-white/60 py-1.5 px-3 text-sm/6 text-white",
                                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 capitalize",
                                    "*:text-black "
                                )}
                                name="carpark"
                                value={formData.carpark}
                                onChange={handleChange}
                                aria-label="Carpark"
                            >
                                <option value="">
                                    Carpark
                                </option>
                                {propertyFeatures.map((feature) => (
                                    <option key={feature.value} value={feature.value} className=''>
                                        {feature.text}
                                    </option>
                                ))}
                            </Select>
                            <ChevronDownIcon
                                className="group pointer-events-none absolute top-3 right-2.5 size-4 fill-white/60"
                                aria-hidden="true"
                            />
                        </div>
                    </Field>
                    <Field>
                        <div className="relative">
                            <Select
                                id="min_price"
                                className={clsx(
                                    "mt-1 block w-full appearance-none rounded-lg border-none bg-white/60 py-1.5 px-3 text-sm/6 text-white",
                                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 capitalize",
                                    "*:text-black "
                                )}
                                value={formData.minPrice}
                                onChange={handleChange}
                                name="minPrice"
                                aria-label="Min Price"
                            >
                                <option value="">
                                    Min Price
                                </option>
                                {priceRange.map((price) => (
                                    <option key={price.value} value={price.value} className=''>
                                        {price.text}
                                    </option>
                                ))}
                            </Select>
                            <ChevronDownIcon
                                className="group pointer-events-none absolute top-3 right-2.5 size-4 fill-white/60"
                                aria-hidden="true"
                            />
                        </div>
                    </Field>
                    <Field>
                        <div className="relative">
                            <Select
                                id="max_price"
                                className={clsx(
                                    "mt-1 block w-full appearance-none rounded-lg border-none bg-white/60 py-1.5 px-3 text-sm/6 text-white",
                                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 capitalize",
                                    "*:text-black "
                                )}
                                name="maxPrice"
                                value={formData.maxPrice}
                                onChange={handleChange}
                                aria-label="Max Price"
                            >
                                <option value="">
                                    Max Price
                                </option>
                                {priceRange.map((price) => (
                                    <option key={price.value} value={price.value} className=''>
                                        {price.text}
                                    </option>
                                ))}
                            </Select>
                            <ChevronDownIcon
                                className="group pointer-events-none absolute top-3 right-2.5 size-4 fill-white/60"
                                aria-hidden="true"
                            />
                        </div>
                    </Field>
                    <Field className={clsx("col-span-2")}>
                        <button
                            id="submitButton"
                            type='submit'
                            className={clsx(
                                "mt-1 block w-full appearance-none rounded-lg border-none bg-rose-600 py-1.5 px-3 text-sm/6 text-white",
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                "hover:bg-rose-500"
                            )}
                        >
                            Search
                        </button>
                    </Field>
                </div>
            </div>
        </form>
    )
}

export default PropertySearch
