'use client'

import { useJsApiLoader, GoogleMap, MarkerF, DirectionsRenderer, InfoWindowF } from '@react-google-maps/api';
import { useState, useEffect, useCallback } from 'react';
import { Search, Navigation, Phone, MessageCircle, Info, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LayoutInterno from '@/components/Layout/LayoutInterno';


// --- TIPOS E DADOS MOCK ---
type SalaExame = {
  codigoCandidato: string;
  nome: string;
  pos: google.maps.LatLngLiteral;
  bloco: string;
  horario: string;
  disciplina: string;
};

const salasExame: SalaExame[] = [
  {
    codigoCandidato: '12345',
    nome: 'Sala A1',
    pos: { lat: -25.9435212531231, lng: 32.54335458023248 },
    bloco: 'Bloco A',
    horario: '08:00 - 11:00',
    disciplina: 'Matemática'
  },
  {
    codigoCandidato: '67890',
    nome: 'Sala B2',
    pos: { lat: -25.9663, lng: 32.5821 },
    bloco: 'Bloco B',
    horario: '14:00 - 17:00',
    disciplina: 'Português'
  },
];

// --- ESTILOS E CONFIGURAÇÕES DO MAPA ---
const containerStyle = { width: '100%', height: '100%' };
const DEFAULT_MAP_TYPE = 'hybrid'; // Pode ser 'roadmap', 'satellite', 'hybrid' ou 'terrain'
const mapOptions = {
  streetViewControl: true,
  mapTypeControl: true,
  fullscreenControl: true,
  zoomControl: true,
  mapTypeId: DEFAULT_MAP_TYPE,
};

// --- COMPONENTE PRINCIPAL ---
export default function MapaGoogleMaps() {
  // --- STATE MANAGEMENT ---
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [pesquisa, setPesquisa] = useState('');
  const [salaEncontrada, setSalaEncontrada] = useState<SalaExame | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [mostrarInfos, setMostrarInfos] = useState(false);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);


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

  // --- GEOLOCATION ---
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => {
          const pos = { lat: p.coords.latitude, lng: p.coords.longitude };
          setUserPosition(pos);
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

  // --- DIRECTIONS & MAP BOUNDS ---
  useEffect(() => {
    if (!userPosition || !salaEncontrada) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: userPosition,
        destination: salaEncontrada.pos,
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && result) {
          setDirectionsResponse(result);
          const route = result.routes[0].legs[0];
          setDistance(route.distance?.text || '');
          setDuration(route.duration?.text || '');
          
          // Fit map to bounds
          if (map && result.routes[0].bounds) {
            map.fitBounds(result.routes[0].bounds);
          }
        }
      }
    );
  }, [userPosition, salaEncontrada, map]);

  // --- LÓGICA DE PESQUISA ---
  const procurarSala = () => {
    const sala = salasExame.find(
      (s) => s.codigoCandidato.toLowerCase() === pesquisa.trim().toLowerCase() || s.nome.toLowerCase() === pesquisa.trim().toLowerCase()
    );
    setSalaEncontrada(sala || null);
    setActiveMarker(sala ? sala.codigoCandidato : null);

    if (!sala) {
      alert("Sala ou código não encontrado.");
      setDirectionsResponse(null);
      setDistance('');
      setDuration('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => { if (e.key === 'Enter') procurarSala(); };

  const handleMarkerClick = (markerId: string) => {
    setActiveMarker(markerId);
  };

  // --- RENDERIZAÇÃO ---
  const renderMap = () => {
    if (loadError) return <div className="h-full w-full flex items-center justify-center bg-red-50"><p className="text-red-600 text-center">Erro ao carregar o mapa.</p></div>;
    if (loadingLocation || !isLoaded) return <div className="h-full w-full flex items-center justify-center bg-gray-100"><div className="text-center"><div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600">A carregar mapa e localização...</p></div></div>;

    return (
      <GoogleMap 
        mapContainerStyle={containerStyle} 
        center={userPosition || salasExame[0].pos} 
        zoom={16} 
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {directionsResponse && <DirectionsRenderer options={{ directions: directionsResponse, suppressMarkers: true, polylineOptions: { strokeColor: '#1D4ED8', strokeWeight: 5 } }} />}
        
        {userPosition && <MarkerF position={userPosition} title="Sua Localização" icon={{ path: window.google.maps.SymbolPath.CIRCLE, scale: 7, fillColor: "#4285F4", fillOpacity: 1, strokeWeight: 2, strokeColor: "white" }} />}
        
        {salaEncontrada && (
          <MarkerF 
            position={salaEncontrada.pos} 
            title={salaEncontrada.nome} 
            onClick={() => handleMarkerClick(salaEncontrada.codigoCandidato)}
          >
            {activeMarker === salaEncontrada.codigoCandidato && (
              <InfoWindowF position={salaEncontrada.pos} onCloseClick={() => setActiveMarker(null)}>
                <div className="p-2 font-sans">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{salaEncontrada.nome}</h3>
                  <p className="text-gray-600">{salaEncontrada.bloco}</p>
                  <p className="text-gray-600 mb-2">{salaEncontrada.disciplina}</p>
                  <div className="flex items-center gap-2 text-sm bg-blue-50 px-3 py-1 rounded-lg mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-800 font-medium">{salaEncontrada.horario}</span>
                  </div>
                  {duration && distance && (
                    <div className="flex items-center gap-2 text-sm bg-orange-50 px-3 py-1 rounded-lg">
                      <Navigation className="w-4 h-4 text-orange-600" />
                      <span className="text-orange-800 font-medium">{duration} ({distance})</span>
                    </div>
                  )}
                </div>
              </InfoWindowF>
            )}
          </MarkerF>
        )}
      </GoogleMap>
    );
  }

  return (
    <LayoutInterno>
      <div className="h-screen flex flex-col">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">Localização da Sala de Exame</h1>
                <p className="text-blue-100">Encontra facilmente o local do teu exame</p>
              </div>
              <div className="flex-shrink-0 lg:w-96">
                <div className="relative">
                  <input type="text" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} onKeyPress={handleKeyPress} placeholder="Código do candidato ou nome da sala" className="w-full bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-3 pl-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg" />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <button onClick={procurarSala} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors duration-200"><Search className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 relative">
          {renderMap()}
          <div className="absolute bottom-6 left-6 space-y-3 z-[1000]">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setMostrarInfos(!mostrarInfos)} className="w-14 h-14 bg-white hover:bg-gray-50 text-blue-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 border border-gray-200"><Info className="w-6 h-6" /></motion.button>
            <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href="https://wa.me/258840000000" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"><MessageCircle className="w-6 h-6" /></motion.a>
            <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href="tel:+258840000000" className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"><Phone className="w-6 h-6" /></motion.a>
          </div>
          <AnimatePresence>
            {mostrarInfos && (
              <motion.div initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -300 }} className="absolute top-4 left-4 bg-white rounded-2xl shadow-xl p-6 z-[1000] max-w-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Legenda do Mapa</h3>
                  <button onClick={() => setMostrarInfos(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3"><div className="w-4 h-4 rounded-full mt-1 bg-[#4285F4] border-2 border-white"></div><div><p className="font-medium text-gray-800">Marcador Azul</p><p className="text-gray-600">A sua localização actual</p></div></div>
                  <div className="flex items-start gap-3"><div className="w-4 h-4 rounded-full mt-1 bg-[#DB4437]"></div><div><p className="font-medium text-gray-800">Marcador Vermelho</p><p className="text-gray-600">Localização da sala de exame</p></div></div>
                  <div className="flex items-start gap-3"><div className="w-4 h-1 bg-blue-700 opacity-80 mt-2"></div><div><p className="font-medium text-gray-800">Linha Azul</p><p className="text-gray-600">Direcção até à sala</p></div></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
     
    </LayoutInterno>
  )
}
