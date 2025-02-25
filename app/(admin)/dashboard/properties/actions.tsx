"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { Property } from "@/lib/types"

export const getProperties = async () => {
    const supabase = createClient()
    const { data, error } = await (await supabase).from('properties').select('*').order('id', { ascending: true })

    if (error) {
        return false
    }

    return data
}

export const getProperty = async (id: number) => {
    const supabase = createClient()
    const { data, error } = await (await supabase).from('properties').select('*').eq('id', id).limit(1).single()

    if (error) {
        return false
    }

    return data
}

export const createProperty = async (property: Property) => {

    const supabase = createClient()
    const { data, error } = await (await supabase).from('properties').insert({
        property_type: property.propertyType.toString(),
        title: property.title,
        description: property.description,
        price: property.price,
        beds: property.beds,
        baths: property.baths,
        carpark: property.carpark,
        pool: property.pool,
        category: property.category,
        address: property.address,
    })

    if (error) {
        return false
    }

    revalidatePath('/dashboard/properties')

    return data
}

export const updateProperty = async (property: Property) => {
    const supabase = createClient()
    const { data, error } = await (await supabase).from('properties').update({
        property_type: property.propertyType.toString(),
        title: property.title.toString(),
        description: property.description.toString(),
        price: property.price,
        beds: property.beds,
        baths: property.baths,
        carpark: property.carpark,
        pool: property.pool,
        category: property.category,
        address: property.address,
    }).eq('id', property.id)

    console.log(property.id)
    if (error) {
        return false
    }

    revalidatePath('/dashboard/properties')

    return data
}

export const deleteProperty = async (id: number) => {
    const supabase = createClient()
    const { error } = await (await supabase).from('properties').delete().eq('id', id)

    if (error) {
        return false
    }

    revalidatePath('/dashboard/properties')

    return true
}
