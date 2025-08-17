'use client';
import dynamic from 'next/dynamic'

const MapaGoogleMaps = dynamic(() => import('@/components/Mapa/MapaGoogleMaps'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">A preparar o mapa...</p>
      </div>
    </div>
  ),
})

export default function PaginaMapa() {
  return (
    <MapaGoogleMaps />
  )
}
