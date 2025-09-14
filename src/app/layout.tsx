import './globals.css'
import { ReactNode } from 'react'
import { AuthProvider } from '@/context/AuthContext'

export const metadata = {
  title: 'Portal do Candidato',
  description: 'Sistema de localização de salas de exame - UP Maputo',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/icon-180.png', sizes: '180x180', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/icon-512.png' },
    ],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <head>
        {/* Favicon principal */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16.png" />

        {/* PWA e Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Apple/iOS */}
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-180.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192.png" />

        {/* Cor do tema */}
        <meta name="theme-color" content="#1D4ED8" />

        {/* Adicional para melhor suporte mobile */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Portal Candidato" />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        <AuthProvider>
          <div className="flex-grow flex flex-col">{children}</div>
        </AuthProvider>
      </body>
    </html>
  )
}