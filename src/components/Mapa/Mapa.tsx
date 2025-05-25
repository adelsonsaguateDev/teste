'use client'

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'
import L from 'leaflet'

const marcador = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

function CentralizarMapa({ position }: { position: [number, number] }) {
    const map = useMap()
    useEffect(() => {
        map.setView(position, 16)
    }, [position])
    return null
}

export default function Mapa() {
    const [posicao, setPosicao] = useState<[number, number] | null>(null)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setPosicao([pos.coords.latitude, pos.coords.longitude])
            })
        }
    }, [])

    return (
        <div className="h-full w-full">
            {posicao ? (
                <MapContainer center={posicao} zoom={16} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; OpenStreetMap'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={posicao} icon={marcador} />
                    <CentralizarMapa position={posicao} />
                </MapContainer>
            ) : (
                <p className="text-center pt-10">A obter localização...</p>
            )}
        </div>
    )
}
