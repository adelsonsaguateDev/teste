'use client'

import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'

const Mapa = dynamic(() => import('@/components/Mapa/Mapa'), {
  ssr: false,
})

export default function PaginaMapa() {
  return (
    <div className="h-screen">
      <Mapa />
    </div>
  )
}
