'use client'

import { useEffect, useState, useCallback } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api'
import { Search, MapPin, Navigation, Phone, MessageCircle, Info, Clock, User, Route } from 'lucide-react'

// Simular o hook useAuth e LayoutInterno para demonstração
const useAuth = () => ({ codigo: '12345' })
const LayoutInterno = ({ children }: { children: React.ReactNode }) => <div>{children}</div>

interface SalaExame {
  codigoCandidato: string
  nome: string
  lat: number
  lng: number
  bloco: string
  horario: string
  disciplina: string
  endereco?: string
}

const salasExame: SalaExame[] = [
  {
    codigoCandidato: '12345',
    nome: 'Sala A1',
    lat: -25.9658,
    lng: 32.5834,
    bloco: 'Bloco A - Piso Térreo',
    horario: '08:00 - 11:00',
    disciplina: 'Engenharia Informática',
    endereco: 'Universidade Pedagógica de Maputo, Campus de Lhanguene'
  },
  {
    codigoCandidato: '67890',
    nome: 'Sala B2',
    lat: -25.9663,
    lng: 32.5821,
    bloco: 'Bloco B - 1º Andar',
    horario: '14:00 - 17:00',
    disciplina: 'Direito',
    endereco: 'Universidade Pedagógica de Maputo, Campus de Lhanguene'
  },
  {
    codigoCandidato: '11223',
    nome: 'Sala C3',
    lat: -25.9645,
    lng: 32.5842,
    bloco: 'Bloco C - 2º Andar',
    horario: '08:00 - 11:00',
    disciplina: 'História',
    endereco: 'Universidade Pedagógica de Maputo, Campus de Lhanguene'
  },
]

const mapContainerStyle = {
  width: '100%',
  height: '100%',
}

const defaultCenter = {
  lat: -25.9658,
  lng: 32.5834,
}

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: true,
  mapTypeControl: true,
  fullscreenControl: true,
}

// Bibliotecas necessárias para o Google Maps
const libraries = ['places', 'geometry'] as const

export default function PaginaMapa() {
  const { codigo } = useAuth()
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [posicaoAtual, setPosicaoAtual] = useState<{ lat: number; lng: number } | null>(null)
  const [pesquisa, setPesquisa] = useState('')
  const [salaEncontrada, setSalaEncontrada] = useState<SalaExame | null>(null)
  const [carregandoLocalizacao, setCarregandoLocalizacao] = useState(true)
  const [distancia, setDistancia] = useState<string | null>(null)
  const [tempoViagem, setTempoViagem] = useState<string | null>(null)
  const [mostrarInfos, setMostrarInfos] = useState(false)
  const [markerSelecionado, setMarkerSelecionado] = useState<string | null>(null)
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null)
  const [mostrarRota, setMostrarRota] = useState(false)
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false)

  // Função para buscar sala
  const buscarSala = useCallback((termo: string) => {
    const sala = salasExame.find(
      (s) =>
        s.codigoCandidato === termo ||
        s.nome.toLowerCase().includes(termo.toLowerCase()) ||
        s.bloco.toLowerCase().includes(termo.toLowerCase())
    )

    setSalaEncontrada(sala || null)
    setMostrarRota(false)
    setDirectionsResponse(null)
    setDistancia(null)
    setTempoViagem(null)

    if (sala && map) {
      map.panTo({ lat: sala.lat, lng: sala.lng })
      map.setZoom(18)
      setMarkerSelecionado(sala.codigoCandidato)
    }

    return sala
  }, [map])

  // Função para pesquisar com o valor atual do input
  const procurarSala = useCallback(() => {
    buscarSala(pesquisa.trim())
  }, [pesquisa, buscarSala])

  // Obter localização atual
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setPosicaoAtual(pos)
          setCarregandoLocalizacao(false)
        },
        (error) => {
          console.error('Erro ao obter localização:', error)
          setPosicaoAtual(defaultCenter)
          setCarregandoLocalizacao(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      )
    } else {
      setPosicaoAtual(defaultCenter)
      setCarregandoLocalizacao(false)
    }
  }, [])

  // Auto-buscar pela sala do código do usuário
  useEffect(() => {
    if (codigo && codigo !== pesquisa && googleMapsLoaded) {
      setPesquisa(codigo)
      const timer = setTimeout(() => {
        buscarSala(codigo)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [codigo, pesquisa, buscarSala, googleMapsLoaded])

  // Função para calcular rota
  const calcularRota = useCallback(async (destino: SalaExame) => {
    if (!posicaoAtual || !googleMapsLoaded || !window.google?.maps) {
      console.warn('Google Maps não carregado ou posição atual não disponível')
      return
    }

    const directionsService = new window.google.maps.DirectionsService()

    try {
      const result = await directionsService.route({
        origin: posicaoAtual,
        destination: { lat: destino.lat, lng: destino.lng },
        travelMode: window.google.maps.TravelMode.WALKING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
        avoidHighways: true,
        avoidTolls: true,
      })

      setDirectionsResponse(result)
      setMostrarRota(true)

      const route = result.routes[0]
      if (route && route.legs[0]) {
        setDistancia(route.legs[0].distance?.text || null)
        setTempoViagem(route.legs[0].duration?.text || null)
      }
    } catch (error) {
      console.error('Erro ao calcular rota:', error)
    }
  }, [posicaoAtual, googleMapsLoaded])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      procurarSala()
    }
  }

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
    setGoogleMapsLoaded(true)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
    setGoogleMapsLoaded(false)
  }, [])

  // Função para criar ícones de marcadores
  const createMarkerIcon = (isSelected: boolean, isUser: boolean = false) => {
    if (!googleMapsLoaded || !window.google?.maps) return undefined

    if (isUser) {
      return {
        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOCIgZmlsbD0iIzNBODJGNiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIgZmlsbD0iI2ZmZmZmZiIvPgo8L3N2Zz4K',
        scaledSize: new window.google.maps.Size(20, 20),
        anchor: new window.google.maps.Point(10, 10),
      }
    }

    return {
      url: isSelected
        ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjMTU5OTJBIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K'
        : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRUY0NDQ0IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K',
      scaledSize: new window.google.maps.Size(isSelected ? 35 : 25, isSelected ? 35 : 25),
      anchor: new window.google.maps.Point(isSelected ? 17.5 : 12.5, isSelected ? 17.5 : 12.5),
    }
  }

  return (
    <LayoutInterno>
      <div className="h-screen flex flex-col">
        {/* Header da Página */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 shadow-lg z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">Localização da Sala de Exame</h1>
                <p className="text-blue-100">
                  {codigo ? `Encontra a tua sala - Código: ${codigo}` : 'Encontra facilmente o local do teu exame'}
                </p>
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
        </div>

        {/* Informações da Sala Encontrada */}
        {salaEncontrada && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200 z-10">
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
                          {distancia} • {tempoViagem}
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => calcularRota(salaEncontrada)}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl transition-colors"
                    >
                      <Route className="w-4 h-4" />
                      <span>Ver Rota</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mapa */}
        <div className="flex-1 relative">
          {carregandoLocalizacao ? (
            <div className="h-full flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Navigation className="w-8 h-8 text-blue-600 animate-pulse" />
                </div>
                <p className="text-gray-600 text-lg">A obter localização atual...</p>
                <p className="text-gray-500 text-sm mt-2">Certifica-te de que permitiste o acesso à localização</p>
              </div>
            </div>
          ) : (
            <LoadScript
              googleMapsApiKey="AIzaSyAs5vmPVTbTnnz8QR_oSuhlSS-0RRf_LwY"
              libraries={libraries}
              onLoad={() => setGoogleMapsLoaded(true)}
              onError={(error) => console.error('Erro ao carregar Google Maps:', error)}
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={salaEncontrada ? { lat: salaEncontrada.lat, lng: salaEncontrada.lng } : posicaoAtual || defaultCenter}
                zoom={salaEncontrada ? 18 : 16}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={mapOptions}
              >
                {/* Marcador da posição atual */}
                {posicaoAtual && googleMapsLoaded && (
                  <Marker
                    position={posicaoAtual}
                    icon={createMarkerIcon(false, true)}
                    title="Tua localização atual"
                  />
                )}

                {/* Marcadores das salas */}
                {googleMapsLoaded && salasExame.map((sala) => (
                  <Marker
                    key={sala.codigoCandidato}
                    position={{ lat: sala.lat, lng: sala.lng }}
                    icon={createMarkerIcon(salaEncontrada?.codigoCandidato === sala.codigoCandidato)}
                    onClick={() => {
                      setMarkerSelecionado(markerSelecionado === sala.codigoCandidato ? null : sala.codigoCandidato)
                    }}
                    title={`${sala.nome} - ${sala.bloco}`}
                  >
                    {markerSelecionado === sala.codigoCandidato && (
                      <InfoWindow
                        onCloseClick={() => setMarkerSelecionado(null)}
                      >
                        <div className="p-3 min-w-[250px]">
                          <div className="text-center mb-3">
                            <h4 className="font-bold text-lg text-green-600">{sala.nome}</h4>
                            <p className="text-gray-600">{sala.bloco}</p>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <span>{sala.horario}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Info className="w-4 h-4 text-green-500" />
                              <span>{sala.disciplina}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-purple-500" />
                              <span>Código: {sala.codigoCandidato}</span>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <button
                                onClick={() => {
                                  setSalaEncontrada(sala)
                                  calcularRota(sala)
                                  setMarkerSelecionado(null)
                                }}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                              >
                                <Route className="w-4 h-4" />
                                Ver Rota
                              </button>
                            </div>
                          </div>
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                ))}

                {/* Renderizar rota */}
                {mostrarRota && directionsResponse && googleMapsLoaded && (
                  <DirectionsRenderer
                    directions={directionsResponse}
                    options={{
                      suppressMarkers: true,
                      polylineOptions: {
                        strokeColor: '#3B82F6',
                        strokeWeight: 4,
                        strokeOpacity: 0.8,
                      },
                    }}
                  />
                )}
              </GoogleMap>
            </LoadScript>
          )}

          {/* Botões Flutuantes */}
          <div className="absolute bottom-6 right-6 space-y-3 z-[1000]">
            {/* Botão de Informações */}
            <button
              onClick={() => setMostrarInfos(!mostrarInfos)}
              className="w-14 h-14 bg-white hover:bg-gray-50 text-blue-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 border border-gray-200"
            >
              <Info className="w-6 h-6" />
            </button>

            {/* Botão do WhatsApp */}
            <a
              href="https://wa.me/258840000000?text=Olá,%20preciso%20de%20ajuda%20com%20o%20Portal%20do%20Candidato"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
            >
              <MessageCircle className="w-6 h-6" />
            </a>

            {/* Botão de Chamada */}
            <a
              href="tel:+258210401000"
              className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
            >
              <Phone className="w-6 h-6" />
            </a>
          </div>

          {/* Painel de Informações */}
          {mostrarInfos && (
            <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-xl p-6 z-[1000] max-w-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Informações do Mapa</h3>
                <button
                  onClick={() => setMostrarInfos(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mt-1"></div>
                  <div>
                    <p className="font-medium text-gray-800">Marcador Azul</p>
                    <p className="text-gray-600">A tua localização atual</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full mt-1"></div>
                  <div>
                    <p className="font-medium text-gray-800">Marcador Verde</p>
                    <p className="text-gray-600">Sala de exame selecionada</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full mt-1"></div>
                  <div>
                    <p className="font-medium text-gray-800">Marcador Vermelho</p>
                    <p className="text-gray-600">Outras salas disponíveis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Route className="w-4 h-4 text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Linha Azul</p>
                    <p className="text-gray-600">Rota a pé até à sala</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Clica nos marcadores para ver mais informações sobre cada sala.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutInterno>
  )
}