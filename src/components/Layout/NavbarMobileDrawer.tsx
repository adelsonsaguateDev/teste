'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X, Home, MapPinned, Info, LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function NavbarMobile() {
    const [aberto, setAberto] = useState(false)
    const router = useRouter()
    const { logout } = useAuth()

    const navegar = (path: string) => {
        setAberto(false)
        router.push(path)
    }

    return (
        <>
            {/* Ícone hambúrguer com fundo semi-transparente */}
            <div className="fixed top-6 left-6 z-50">
                <button
                    onClick={() => setAberto(true)}
                    className="bg-white/90 backdrop-blur-sm text-blue-700 p-3 rounded-2xl shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Fundo escuro ao abrir o menu */}
            {aberto && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={() => setAberto(false)}
                ></div>
            )}

            {/* Menu lateral */}
            <div
                className={`fixed top-0 left-0 h-full w-72 bg-white/95 backdrop-blur-md shadow-2xl p-6 z-50 transform transition-transform duration-300 flex flex-col ${aberto ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-blue-700">Menu</h2>
                    <button
                        onClick={() => setAberto(false)}
                        className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-xl transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex flex-col gap-2 flex-grow">
                    <button
                        onClick={() => navegar('/home')}
                        className="flex items-center gap-4 text-blue-800 hover:text-blue-900 hover:bg-blue-50 p-4 rounded-xl transition-all duration-200"
                    >
                        <Home className="w-5 h-5" />
                        <span className="font-medium">Home</span>
                    </button>

                    <button
                        onClick={() => navegar('/mapa')}
                        className="flex items-center gap-4 text-blue-800 hover:text-blue-900 hover:bg-blue-50 p-4 rounded-xl transition-all duration-200"
                    >
                        <MapPinned className="w-5 h-5" />
                        <span className="font-medium">Mapa da Sala</span>
                    </button>

                    <button
                        onClick={() => navegar('/detalhes')}
                        className="flex items-center gap-4 text-blue-800 hover:text-blue-900 hover:bg-blue-50 p-4 rounded-xl transition-all duration-200"
                    >
                        <Info className="w-5 h-5" />
                        <span className="font-medium">Detalhes do Exame</span>
                    </button>

                    <div className="flex-grow"></div>

                    <div className="border-t border-gray-200 pt-4">
                        <button
                            onClick={() => {
                                logout()
                                router.push('/')
                            }}
                            className="flex items-center gap-4 text-red-600 hover:text-red-700 hover:bg-red-50 p-4 rounded-xl transition-all duration-200 w-full"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Terminar Sessão</span>
                        </button>
                    </div>
                </nav>
            </div>
        </>
    )
}