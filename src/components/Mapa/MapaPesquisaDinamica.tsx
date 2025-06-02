'use client'

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'
import L, { LatLngTuple } from 'leaflet'
import { Search, MapPin, Navigation, Phone, MessageCircle, Info, Clock, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import LayoutInterno from '@/components/Layout/LayoutInterno'

const marcador = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -30],
})

const marcadorSala = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjMTU5OTJBIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
})

const salasExame: {
    codigoCandidato: string
    nome: string
    pos: LatLngTuple
    bloco: string
    horario: string
    disciplina: string
}[] = [
        {
            codigoCandidato: '12345',
            nome: 'Sala A1',
            pos: [-25.9658, 32.5834],
            bloco: 'Bloco A',
            horario: '08:00 - 11:00',
            disciplina: 'Matemática'
        },
        {
            codigoCandidato: '67890',
            nome: 'Sala B2',
            pos: [-25.9663, 32.5821],
            bloco: 'Bloco B',
            horario: '14:00 - 17:00',
            disciplina: 'Português'
        },
        {
            codigoCandidato: '11223',
            nome: 'Sala C3',
            pos: [-25.9645, 32.5842],
            bloco: 'Bloco C',
            horario: '08:00 - 11:00',
            disciplina: 'História'
        },
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
    const [carregandoLocalizacao, setCarregandoLocalizacao] = useState(true)
    const [distancia, setDistancia] = useState<number | null>(null)
    const [mostrarInfos, setMostrarInfos] = useState(false)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (p) => {
                    setPosicao([p.coords.latitude, p.coords.longitude])
                    setCarregandoLocalizacao(false)
                },
                (erro) => {
                    console.error('Erro ao obter localização:', erro)
                    // Localização padrão (Maputo)
                    setPosicao([-25.9658, 32.5834])
                    setCarregandoLocalizacao(false)
                }
            )
        } else {
            setPosicao([-25.9658, 32.5834])
            setCarregandoLocalizacao(false)
        }
    }, [])

    const calcularDistancia = (pos1: LatLngTuple, pos2: LatLngTuple) => {
        const R = 6371000 // Raio da Terra em metros
        const dLat = (pos2[0] - pos1[0]) * Math.PI / 180
        const dLon = (pos2[1] - pos1[1]) * Math.PI / 180
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(pos1[0] * Math.PI / 180) * Math.cos(pos2[0] * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c
    }

    const procurarSala = () => {
        const sala = salasExame.find(
            (s) =>
                s.codigoCandidato === pesquisa.trim() ||
                s.nome.toLowerCase() === pesquisa.trim().toLowerCase()
        )
        setSalaEncontrada(sala || null)

        if (sala && posicao) {
            const dist = calcularDistancia(posicao, sala.pos)
            setDistancia(dist)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            procurarSala()
        }
    }

    return (
        <LayoutInterno>
            <div className="h-screen flex flex-col">
                {/* Header da Página */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 shadow-lg"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold mb-2">Localização da Sala de Exame</h1>
                                <p className="text-blue-100">Encontra facilmente o local do teu exame</p>
                            </div>

                            {/* Barra de Pesquisa */}
                            <div className="flex-shrink-0 lg:w-96">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={pesquisa}
                                        onChange={(e) => setPesquisa(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Código do candidato ou nome da sala"
                                        className="w-full bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-3 pl-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                                    />
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                    <button
                                        onClick={procurarSala}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors duration-200"
                                    >
                                        <Search className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Informações da Sala Encontrada */}
                <AnimatePresence>
                    {salaEncontrada && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200"
                        >
                            <div className="max-w-7xl mx-auto p-4">
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                                                <MapPin className="w-6 h-6 text-green-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">{salaEncontrada.nome}</h3>
                                                <p className="text-gray-600">{salaEncontrada.bloco} • {salaEncontrada.disciplina}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm">
                                            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-xl">
                                                <Clock className="w-4 h-4 text-blue-600" />
                                                <span className="text-blue-800 font-medium">{salaEncontrada.horario}</span>
                                            </div>
                                            <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-xl">
                                                <User className="w-4 h-4 text-green-600" />
                                                <span className="text-green-800 font-medium">Código: {salaEncontrada.codigoCandidato}</span>
                                            </div>
                                            {distancia && (
                                                <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-xl">
                                                    <Navigation className="w-4 h-4 text-orange-600" />
                                                    <span className="text-orange-800 font-medium">
                                                        {distancia < 1000 ? `${Math.round(distancia)}m` : `${(distancia / 1000).toFixed(1)}km`}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mapa */}
                <div className="flex-1 relative">
                    {carregandoLocalizacao ? (
                        <div className="h-full flex items-center justify-center bg-gray-50">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Navigation className="w-8 h-8 text-blue-600 animate-pulse" />
                                </div>
                                <p className="text-gray-600 text-lg">A obter localização atual...</p>
                                <p className="text-gray-500 text-sm mt-2">Certifica-te de que permitiste o acesso à localização</p>
                            </motion.div>
                        </div>
                    ) : posicao ? (
                        <MapContainer center={posicao} zoom={16} className="h-full w-full z-0">
                            <TileLayer
                                attribution='&copy; OpenStreetMap contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {/* Marcador da posição atual */}
                            <Marker position={posicao} icon={marcador}>
                                <Popup>
                                    <div className="text-center p-2">
                                        <strong className="text-blue-600">📍 Tu estás aqui</strong>
                                        <br />
                                        <small className="text-gray-600">Localização atual</small>
                                    </div>
                                </Popup>
                            </Marker>

                            {/* Marcador da sala encontrada */}
                            {salaEncontrada && (
                                <Marker position={salaEncontrada.pos} icon={marcadorSala}>
                                    <Popup>
                                        <div className="p-3 min-w-[250px]">
                                            <div className="text-center mb-3">
                                                <h4 className="font-bold text-lg text-green-600">{salaEncontrada.nome}</h4>
                                                <p className="text-gray-600">{salaEncontrada.bloco}</p>
                                            </div>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-blue-500" />
                                                    <span>{salaEncontrada.horario}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Info className="w-4 h-4 text-green-500" />
                                                    <span>{salaEncontrada.disciplina}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4 text-purple-500" />
                                                    <span>Código: {salaEncontrada.codigoCandidato}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            )}

                            {/* Linha de direção */}
                            {salaEncontrada && (
                                <Polyline
                                    positions={[posicao, salaEncontrada.pos]}
                                    color="#3B82F6"
                                    weight={4}
                                    opacity={0.8}
                                    dashArray="10, 10"
                                />
                            )}

                            <Centralizar pos={salaEncontrada ? salaEncontrada.pos : posicao} />
                        </MapContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center bg-gray-50">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="w-8 h-8 text-red-600" />
                                </div>
                                <p className="text-gray-600 text-lg">Não foi possível obter a localização</p>
                                <p className="text-gray-500 text-sm mt-2">Verifica as definições de localização do teu navegador</p>
                            </div>
                        </div>
                    )}

                    {/* Botões Flutuantes */}
                    <div className="absolute bottom-6 right-6 space-y-3 z-[1000]">
                        {/* Botão de Informações */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMostrarInfos(!mostrarInfos)}
                            className="w-14 h-14 bg-white hover:bg-gray-50 text-blue-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 border border-gray-200"
                        >
                            <Info className="w-6 h-6" />
                        </motion.button>

                        {/* Botão do WhatsApp */}
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href="https://wa.me/258840000000?text=Olá,%20preciso%20de%20ajuda%20com%20o%20Portal%20do%20Candidato"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
                        >
                            <MessageCircle className="w-6 h-6" />
                        </motion.a>

                        {/* Botão de Chamada */}
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href="tel:+258840000000"
                            className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
                        >
                            <Phone className="w-6 h-6" />
                        </motion.a>
                    </div>

                    {/* Painel de Informações */}
                    <AnimatePresence>
                        {mostrarInfos && (
                            <motion.div
                                initial={{ opacity: 0, x: 300 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 300 }}
                                className="absolute top-4 right-4 bg-white rounded-2xl shadow-xl p-6 z-[1000] max-w-sm border border-gray-200"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-800">Informações Úteis</h3>
                                    <button
                                        onClick={() => setMostrarInfos(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <div>
                                            <p className="font-medium text-gray-800">Marcador Azul</p>
                                            <p className="text-gray-600">A tua localização atual</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                        <div>
                                            <p className="font-medium text-gray-800">Marcador Verde</p>
                                            <p className="text-gray-600">Localização da sala de exame</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-1 bg-blue-500 opacity-60 mt-2" style={{ background: 'repeating-linear-gradient(to right, #3B82F6 0, #3B82F6 10px, transparent 10px, transparent 20px)' }}></div>
                                        <div>
                                            <p className="font-medium text-gray-800">Linha Pontilhada</p>
                                            <p className="text-gray-600">Direção até à sala</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </LayoutInterno>
    )
}