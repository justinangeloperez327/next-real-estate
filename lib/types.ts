export interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    image: string;
    beds: number;
    baths: number;
    carpark: number;
    pool: boolean;
    category: string;
    propertyType: string;
    address: string;
    keyFeatures: string[];
    whyYouLoveIt: string;
    locationHighlights: string[];
    latitude: number;
    longitude: number;
    slug: string;
    floorplan: string;
}