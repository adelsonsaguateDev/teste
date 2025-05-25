import './globals.css'
import { ReactNode } from 'react'
import { AuthProvider } from '@/context/AuthContext'

export const metadata = {
  title: 'Portal do Candidato',
  description: 'Sistema de localização de salas de exame - UP Maputo',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <body className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        <AuthProvider>
          <div className="flex-grow flex flex-col">{children}</div>
        </AuthProvider>
      </body>
    </html>
  )
}
