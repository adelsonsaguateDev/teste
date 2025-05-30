'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LayoutInterno from '@/components/Layout/LayoutInterno'
import Image from 'next/image'
import { AlertTriangle } from 'lucide-react'

export default function Page404() {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/')
        }, 12000)
        return () => clearTimeout(timer)
    }, [router])

    return (
        <LayoutInterno>
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center space-y-8">

                {/* Ilustração amigável */}
                <Image
                    src="/404-illustration.png"  // Adiciona esta imagem na pasta public
                    alt="Página não encontrada"
                    width={250}
                    height={250}
                    className="select-none"
                    priority
                />

                <AlertTriangle className="w-16 h-16 text-red-500" />

                <h1 className="text-4xl font-extrabold text-blue-900">
                    Oops! Página não encontrada
                </h1>

                <p className="max-w-md text-gray-700 text-lg leading-relaxed">
                    A página que procuras não está disponível ou foi movida. <br />
                    Não fiques preocupado, aqui está o que podes fazer:
                </p>

                <button
                    onClick={() => router.push('/')}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg py-4 px-12 rounded-lg shadow-lg transition"
                    aria-label="Voltar ao portal principal"
                >
                    Voltar ao Portal
                </button>

                <p className="text-gray-500 text-sm mt-2">
                    Redirecionamento automático em 12 segundos.
                </p>
            </div>
        </LayoutInterno>
    )
}
