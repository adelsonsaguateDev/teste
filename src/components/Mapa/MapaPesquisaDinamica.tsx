'use client'

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'
import L, { LatLngTuple } from 'leaflet'

const marcador = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -30],
})

const salasExame: {
    codigoCandidato: string
    nome: string
    pos: LatLngTuple
    bloco: string
}[] = [
        { codigoCandidato: '12345', nome: 'Sala A1', pos: [-25.9658, 32.5834], bloco: 'Bloco A' },
        { codigoCandidato: '67890', nome: 'Sala B2', pos: [-25.9663, 32.5821], bloco: 'Bloco B' },
        { codigoCandidato: '11223', nome: 'Sala C3', pos: [-25.9645, 32.5842], bloco: 'Bloco C' },
    ]

function Centralizar({ pos }: { pos: LatLngTuple }) {
    const map = useMap()
    useEffect(() => {
        map.setView(pos, 17)
    }, [map, pos])
    return null
}

export default function MapaPesquisaDinamica() {
    const [posicao, setPosicao] = useState<LatLngTuple | null>(null)
    const [pesquisa, setPesquisa] = useState('')
    const [salaEncontrada, setSalaEncontrada] = useState<typeof salasExame[0] | null>(null)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((p) =>
                setPosicao([p.coords.latitude, p.coords.longitude])
            )
        }
    }, [])

    const procurarSala = () => {
        const sala = salasExame.find(
            (s) =>
                s.codigoCandidato === pesquisa.trim() ||
                s.nome.toLowerCase() === pesquisa.trim().toLowerCase()
        )
        setSalaEncontrada(sala || null)
    }

    return (
        <div className="h-full w-full">
            <div className="p-4 bg-white shadow flex gap-2 items-center">
                <input
                    type="text"
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                    placeholder="Código do candidato ou nome da sala"
                    className="flex-grow border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={procurarSala}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Pesquisar
                </button>
            </div>

            <div className="h-[calc(100vh-100px)]">
                {posicao ? (
                    <MapContainer center={posicao} zoom={16} className="h-full w-full">
                        <TileLayer
                            attribution='&copy; OpenStreetMap'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={posicao} icon={marcador}>
                            <Popup>Você está aqui 📍</Popup>
                        </Marker>

                        {salaEncontrada && (
                            <Marker position={salaEncontrada.pos} icon={marcador}>
                                <Popup>
                                    <strong>{salaEncontrada.nome}</strong><br />
                                    {salaEncontrada.bloco}
                                </Popup>
                            </Marker>
                        )}

                        {salaEncontrada && (
                            <Polyline positions={[posicao, salaEncontrada.pos]} color="blue" />
                        )}

                        <Centralizar pos={salaEncontrada ? salaEncontrada.pos : posicao} />
                    </MapContainer>
                ) : (
                    <div className="text-center pt-10 text-gray-600">
                        A obter localização atual...
                    </div>
                )}
            </div>
        </div>
    )
}
