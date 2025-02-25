"use server"

import { createClient } from "@/utils/supabase/server"

interface QueryParams {
    search?: string;
    property_type?: string;
    beds?: string;
    baths?: string;
    carpark?: string;
    minPrice?: string;
    maxPrice?: string;
}

export async function getProperties(queryParams?: QueryParams) {


    const supabase = createClient()
    let query = (await supabase).from('properties').select('*').order('id', { ascending: true })

    const params = await queryParams;

    if (params) {
        if (params?.search) {
            console.log(params?.search)
            query = query.or(`title.ilike.%${params?.search}%,address.ilike.%${params?.search}%`)
        }
        if (params?.property_type) {
            console.log(params?.property_type)
            query = query.ilike('property_type', params?.property_type)
        }
        if (params?.beds) {
            query = query.gte('beds', parseInt(params?.beds))
        }
        if (params?.baths) {
            query = query.gte('baths', parseInt(params?.baths))
        }
        if (params?.carpark) {
            query = query.gte('carpark', parseInt(params?.carpark))
        }
        if (params?.minPrice) {
            query = query.gte('price', parseInt(params?.minPrice))
        }
        if (params?.maxPrice) {
            query = query.lte('price', parseInt(params?.maxPrice))
        }
    }

    const { data } = await query;
    return data;
}