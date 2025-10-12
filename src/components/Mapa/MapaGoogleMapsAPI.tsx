'use client'

import { useJsApiLoader, GoogleMap, MarkerF, DirectionsRenderer, InfoWindowF } from '@react-google-maps/api';
import { useState, useEffect, useCallback } from 'react';
import { Search, Navigation, Clock, Eye, Loader2, MapPin } from 'lucide-react';
import Link from 'next/link';
import LayoutInterno from '@/components/Layout/LayoutInterno';

// --- TIPOS ---
type Sala = {
  id: number;
  No_Sala: string;
  Andar: string;
  Em_Uso: string;
  latitude: number;
  longitude: number;
  imagens: any[];
};

// --- CONFIGURAÇÕES DO MAPA ---
const containerStyle = { width: '100%', height: '100%' };
const DEFAULT_MAP_TYPE = 'hybrid';
const mapOptions = {
  streetViewControl: true,
  mapTypeControl: true,
  fullscreenControl: true,
  zoomControl: true,
  mapTypeId: DEFAULT_MAP_TYPE,
};

export default function MapaGoogleMapsAPI() {
  // --- STATE ---
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [pesquisa, setPesquisa] = useState('');
  const [salas, setSalas] = useState<Sala[]>([]);
  const [loadingSalas, setLoadingSalas] = useState(true);
  const [salaPesquisada, setSalaPesquisada] = useState<Sala | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  // --- API LOADER ---
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ['places'],
  });

  // --- MAP HANDLERS ---
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // --- BUSCAR LOCALIZAÇÃO DO USUÁRIO ---
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => {
          setUserPosition({ lat: p.coords.latitude, lng: p.coords.longitude });
          setLoadingLocation(false);
        },
        () => {
          alert('Não foi possível obter a sua localização. A usar uma localização padrão.');
          setUserPosition({ lat: -25.9658, lng: 32.5834 });
          setLoadingLocation(false);
        }
      );
    }
  }, []);

  // --- BUSCAR SALAS DA API ---
  useEffect(() => {
    const buscarSalas = async () => {
      try {
        const response = await fetch('/api/salas?limit=1000', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        });
        const data = await response.json();

        if (data.success) {
          // Filtrar apenas salas com coordenadas válidas
          const salasValidas = data.data.filter((sala: Sala) =>
            sala.latitude !== 0 && sala.longitude !== 0
          );
          setSalas(salasValidas);
        }
      } catch (error) {
        console.error('Erro ao buscar salas:', error);
      } finally {
        setLoadingSalas(false);
      }
    };

    buscarSalas();
  }, []);

  // --- CALCULAR ROTA PARA SALA PESQUISADA ---
  useEffect(() => {
    if (!userPosition || !salaPesquisada || !window.google) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: userPosition,
        destination: { lat: salaPesquisada.latitude, lng: salaPesquisada.longitude },
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && result) {
          setDirectionsResponse(result);
          const route = result.routes[0].legs[0];
          setDistance(route.distance?.text || '');
          setDuration(route.duration?.text || '');

          // Ajustar o mapa para mostrar toda a rota
          if (map && result.routes[0].bounds) {
            map.fitBounds(result.routes[0].bounds);
          }
        }
      }
    );
  }, [userPosition, salaPesquisada, map]);

  // --- PESQUISAR SALA ---
  const procurarSala = () => {
    const termo = pesquisa.trim().toLowerCase();
    if (!termo) {
      alert('Digite o número da sala para pesquisar');
      return;
    }

    const salaEncontrada = salas.find((s) =>
      s.No_Sala.toLowerCase().includes(termo)
    );

    if (salaEncontrada) {
      setSalaPesquisada(salaEncontrada);
      setActiveMarker(salaEncontrada.id);

      // Centralizar no mapa
      if (map) {
        map.panTo({ lat: salaEncontrada.latitude, lng: salaEncontrada.longitude });
        map.setZoom(18);
      }
    } else {
      alert('Sala não encontrada. Tente outro número.');
      setSalaPesquisada(null);
      setDirectionsResponse(null);
      setDistance('');
      setDuration('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') procurarSala();
  };

  const handleMarkerClick = (salaId: number) => {
    setActiveMarker(salaId);
  };

  // --- RENDERIZAÇÃO DO MAPA ---
  const renderMap = () => {
    if (loadError) {
      return (
        <div className="h-full w-full flex items-center justify-center bg-red-50">
          <p className="text-red-600 text-center">Erro ao carregar o mapa.</p>
        </div>
      );
    }

    if (loadingLocation || !isLoaded || loadingSalas) {
      return (
        <div className="h-full w-full flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <Loader2 className="w-16 h-16 border-4 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">
              {loadingSalas ? 'A carregar salas...' : 'A carregar mapa e localização...'}
            </p>
          </div>
        </div>
      );
    }

    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userPosition || { lat: -25.9658, lng: 32.5834 }}
        zoom={15}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Rota para sala pesquisada */}
        {directionsResponse && (
          <DirectionsRenderer
            options={{
              directions: directionsResponse,
              suppressMarkers: true,
              polylineOptions: { strokeColor: '#1D4ED8', strokeWeight: 5 }
            }}
          />
        )}

        {/* Marker da localização do usuário */}
        {userPosition && (
          <MarkerF
            position={userPosition}
            title="Sua Localização"
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeWeight: 3,
              strokeColor: "white"
            }}
          />
        )}

        {/* Markers de todas as salas */}
        {salas.map((sala) => {
          const isSalaPesquisada = salaPesquisada?.id === sala.id;

          return (
            <MarkerF
              key={sala.id}
              position={{ lat: sala.latitude, lng: sala.longitude }}
              title={`Sala ${sala.No_Sala}`}
              onClick={() => handleMarkerClick(sala.id)}
              icon={isSalaPesquisada ? {
                path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                scale: 6,
                fillColor: "#DC2626",
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "white",
                rotation: 180
              } : undefined}
            >
              {activeMarker === sala.id && (
                <InfoWindowF
                  position={{ lat: sala.latitude, lng: sala.longitude }}
                  onCloseClick={() => setActiveMarker(null)}
                >
                  <div className="p-2 font-sans max-w-xs">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      Sala {sala.No_Sala}
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">{sala.Andar}</p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 ${
                        sala.Em_Uso === 'Sim'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {sala.Em_Uso === 'Sim' ? 'Em uso' : 'Não em uso'}
                    </span>

                    {sala.imagens && sala.imagens.length > 0 && (
                      <p className="text-xs text-gray-600 mb-2">
                        📷 {sala.imagens.length} {sala.imagens.length === 1 ? 'foto' : 'fotos'}
                      </p>
                    )}

                    {isSalaPesquisada && duration && distance && (
                      <div className="flex items-center gap-2 text-sm bg-orange-50 px-3 py-1 rounded-lg mb-2">
                        <Navigation className="w-4 h-4 text-orange-600" />
                        <span className="text-orange-800 font-medium">
                          {duration} ({distance})
                        </span>
                      </div>
                    )}

                    <Link
                      href={`/sala/${sala.id}`}
                      className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-2 text-sm font-semibold"
                    >
                      <Eye className="w-4 h-4" />
                      Ver detalhes e fotos
                    </Link>
                  </div>
                </InfoWindowF>
              )}
            </MarkerF>
          );
        })}
      </GoogleMap>
    );
  };

  return (
    <LayoutInterno>
      <div className="h-screen flex flex-col">
        {/* Barra de pesquisa */}
        <div className="bg-white shadow-md p-4 z-10">
          <div className="flex gap-3 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Digite o número da sala (ex: A101, B202...)"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={procurarSala}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold"
            >
              <Search size={20} />
              Pesquisar
            </button>
          </div>

          {/* Informações */}
          <div className="mt-3 flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-600" />
              <span>{salas.length} salas no mapa</span>
            </div>
            {salaPesquisada && (
              <div className="flex items-center gap-2 text-orange-600 font-semibold">
                <Navigation size={16} />
                <span>Rota para: Sala {salaPesquisada.No_Sala}</span>
              </div>
            )}
          </div>
        </div>

        {/* Mapa */}
        <div className="flex-1">{renderMap()}</div>
      </div>
    </LayoutInterno>
  );
}
