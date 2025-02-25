'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

interface MapProps {
    latitude: string;
    longitude: string;
}

const Map = ({ latitude, longitude }: MapProps) => {
    console.log(latitude, longitude)
    return (
        <MapContainer
            center={[35.5951, -82.5515]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '400px', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[35.5951, -82.5515]}>
                <Popup>
                    Property Location
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map