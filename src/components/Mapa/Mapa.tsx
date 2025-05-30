'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import type { LatLngTuple } from 'leaflet'

// Ícone padrão do Leaflet (corrige bug visual no Next.js)
const marcador = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -30],
})

// Lista de salas de exame com coordenadas e bloco
const salasExame: { nome: string; pos: LatLngTuple; bloco: string }[] = [
    { nome: 'Sala A1', pos: [-25.9658, 32.5834], bloco: 'Bloco A' },
    { nome: 'Sala B2', pos: [-25.9663, 32.5821], bloco: 'Bloco B' },
    { nome: 'Sala C3', pos: [-25.9645, 32.5842], bloco: 'Bloco C' },
]

// Componente auxiliar para centralizar o mapa
function Centralizar({ pos }: { pos: LatLngTuple }) {
    const map = useMap()

    useEffect(() => {
        map.setView(pos, 18)
    }, [map, pos])

    return null
}

export default function Mapa() {
    const [posicao, setPosicao] = useState<LatLngTuple | null>(null)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((p) =>
                setPosicao([p.coords.latitude, p.coords.longitude])
            )
        }
    }, [])

    return (
        <div className="h-full w-full">
            {posicao ? (
                <MapContainer center={posicao} zoom={17} className="h-full w-full">
                    <TileLayer
                        attribution='&copy; OpenStreetMap'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={posicao} icon={marcador}>
                        <Popup>Você está aqui 📍</Popup>
                    </Marker>

                    {salasExame.map((sala, idx) => (
                        <Marker key={idx} position={sala.pos} icon={marcador}>
                            <Popup>
                                <strong>{sala.nome}</strong><br />
                                {sala.bloco}
                            </Popup>
                        </Marker>
                    ))}

                    <Centralizar pos={posicao} />
                </MapContainer>
            ) : (
                <div className="text-center pt-10 text-gray-600">
                    A obter localização atual...
                </div>
            )}
        </div>
    )
}
