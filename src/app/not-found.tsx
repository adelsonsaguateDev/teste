'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import {
    AlertTriangle,
    Home,
    MapPin,
    FileText,
    ArrowLeft,
    RefreshCw,
    Clock,
    Shield,
    HelpCircle,
    Phone,
    Mail
} from 'lucide-react'

export default function Page404Melhorada() {
    const router = useRouter()
    const { codigo, isAuthenticated } = useAuth()
    const [countdown, setCountdown] = useState(10)
    const [isRedirecting, setIsRedirecting] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    setIsRedirecting(true)
                    setTimeout(() => {
                        router.push(isAuthenticated ? '/home' : '/')
                    }, 500)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [router, isAuthenticated])

    const navegarPara = (rota: string) => {
        setIsRedirecting(true)
        setTimeout(() => {
            router.push(rota)
        }, 200)
    }

    const recarregarPagina = () => {
        window.location.reload()
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
            {/* Header simples apenas com logo */}
            <header className="bg-white shadow-sm border-b border-gray-200 py-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg p-2">
                                <Image
                                    src="/logo_up.png"
                                    alt="UP Logo"
                                    width={24}
                                    height={24}
                                    className="object-contain filter brightness-0 invert"
                                />
                            </div>
                            <div className="text-center">
                                <h1 className="text-lg font-bold text-gray-800">Portal do Candidato</h1>
                                <p className="text-xs text-gray-500">Universidade Pedagógica de Maputo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Conteúdo principal */}
            <main className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="max-w-4xl mx-auto text-center space-y-8">

                    {/* Header visual */}
                    <div className="relative">
                        {/* Ilustração principal */}
                        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-50 animate-pulse"></div>

                            {/* Ícone 404 criativo */}
                            <div className="relative z-10 flex items-center justify-center h-full">
                                <div className="text-center">
                                    <div className="text-6xl md:text-8xl font-bold text-blue-600 mb-4">404</div>
                                    <AlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-yellow-500 mx-auto animate-bounce" />
                                </div>
                            </div>

                            {/* Elementos decorativos */}
                            <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-300 rounded-full opacity-60 animate-ping"></div>
                            <div className="absolute bottom-8 left-8 w-6 h-6 bg-blue-400 rounded-full opacity-40 animate-pulse"></div>
                            <div className="absolute top-1/2 left-0 w-4 h-4 bg-purple-400 rounded-full opacity-50 animate-bounce delay-300"></div>
                        </div>
                    </div>

                    {/* Conteúdo principal */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
                                Página não encontrada
                            </h2>
                            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                A página que procuras não existe ou foi movida. Mas não te preocupes,
                                podemos ajudar-te a encontrar o que precisas!
                            </p>
                        </div>

                        {/* Informações do usuário se autenticado */}
                        {isAuthenticated && (
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-md mx-auto">
                                <div className="flex items-center gap-3 justify-center">
                                    <Shield className="w-5 h-5 text-blue-600" />
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-blue-800">Sessão Ativa</p>
                                        <p className="text-xs text-blue-600">Candidato: {codigo}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Ações rápidas */}
                    <div className="space-y-4">
                        {/* Botão principal */}
                        <button
                            onClick={() => navegarPara(isAuthenticated ? '/home' : '/')}
                            className="w-full max-w-md mx-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
                            disabled={isRedirecting}
                        >
                            <Home className="w-6 h-6" />
                            <div>
                                <p className="font-semibold text-lg">
                                    {isAuthenticated ? 'Voltar ao Portal' : 'Ir para Login'}
                                </p>
                                <p className="text-sm text-blue-100">Página principal</p>
                            </div>
                        </button>

                        {/* Ações secundárias - apenas se autenticado */}
                        {isAuthenticated && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                                <button
                                    onClick={() => navegarPara('/mapa')}
                                    className="bg-white hover:bg-gray-50 border border-gray-200 p-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-3"
                                    disabled={isRedirecting}
                                >
                                    <MapPin className="w-5 h-5 text-purple-600" />
                                    <div>
                                        <p className="font-medium text-gray-800">Mapa</p>
                                        <p className="text-xs text-gray-500">Localização da Sala</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => navegarPara('/detalhe')}
                                    className="bg-white hover:bg-gray-50 border border-gray-200 p-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-3"
                                    disabled={isRedirecting}
                                >
                                    <FileText className="w-5 h-5 text-green-600" />
                                    <div>
                                        <p className="font-medium text-gray-800">Detalhes</p>
                                        <p className="text-xs text-gray-500">Informações do Exame</p>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Outras opções */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={recarregarPagina}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                            disabled={isRedirecting}
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>Recarregar Página</span>
                        </button>

                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                            disabled={isRedirecting}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Página Anterior</span>
                        </button>
                    </div>

                    {/* Informações de suporte */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-2xl mx-auto shadow-sm">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <HelpCircle className="w-5 h-5 text-gray-600" />
                            <h3 className="font-semibold text-gray-800">Precisas de Ajuda?</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 justify-center">
                                <Phone className="w-4 h-4 text-blue-600" />
                                <span className="text-gray-700">+258 21 401 000</span>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                                <Mail className="w-4 h-4 text-blue-600" />
                                <span className="text-gray-700">candidatos@up.ac.mz</span>
                            </div>
                        </div>

                        <p className="text-xs text-gray-500 text-center mt-3">
                            Segunda a Sexta: 8h00 - 17h00
                        </p>
                    </div>

                    {/* Contador de redirecionamento */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
                        <div className="flex items-center justify-center gap-3">
                            <Clock className={`w-5 h-5 text-yellow-600 ${countdown <= 3 ? 'animate-pulse' : ''}`} />
                            <div className="text-center">
                                <p className="text-sm font-medium text-yellow-800">
                                    {isRedirecting ? 'Redirecionando...' : `Redirecionamento automático em ${countdown}s`}
                                </p>
                                <p className="text-xs text-yellow-600">
                                    {isRedirecting ? 'Aguarde...' : 'Ou clica num botão acima para navegar'}
                                </p>
                            </div>
                        </div>

                        {/* Barra de progresso */}
                        <div className="w-full bg-yellow-200 rounded-full h-1.5 mt-3">
                            <div
                                className="bg-yellow-500 h-1.5 rounded-full transition-all duration-1000 ease-linear"
                                style={{ width: `${((10 - countdown) / 10) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer simples */}
            <footer className="bg-white border-t border-gray-200 py-6">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-sm text-gray-600">
                        © 2025 Universidade Pedagógica de Maputo - Portal do Candidato
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Desenvolvido para facilitar o acesso ao ensino superior
                    </p>
                </div>
            </footer>
        </div>
    )
}