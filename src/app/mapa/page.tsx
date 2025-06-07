'use client';

import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'

const MapaPesquisaDinamica = dynamic(() => import('@/components/Mapa/MapaPesquisaDinamica'), {
  ssr: false,
})

export default function PaginaMapa() {
  return (
    <MapaPesquisaDinamica />
  )
}
