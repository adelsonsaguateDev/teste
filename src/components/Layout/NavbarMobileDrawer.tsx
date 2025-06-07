'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X, Home, MapPin, FileText, LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function NavbarMobileDrawer() {
    const [menuMobileAberto, setMenuMobileAberto] = useState(false)
    const router = useRouter()
    const { codigo, logout } = useAuth()

    const navegarPara = (pagina: string) => {
        router.push(pagina)
    }

    const handleLogout = () => {
        if (confirm('Tem certeza que deseja sair do portal?')) {
            logout()
            router.push('/')
        }
    }

    return (
        <>
            {/* Barra de Navegação Principal */}
            <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo e título */}
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg p-1.5">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/logo_up.png"
                                    alt="UP Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-800">Portal do Candidato</h1>
                                <p className="text-xs text-gray-500">Universidade Pedagógica</p>
                            </div>
                        </div>

                        {/* Menu desktop */}
                        <div className="hidden md:flex items-center space-x-6">
                            <button
                                onClick={() => navegarPara('/home')}
                                className="flex items-center gap-2 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg font-medium"
                            >
                                <Home className="w-4 h-4" />
                                <span>Início</span>
                            </button>
                            <button
                                onClick={() => navegarPara('/mapa')}
                                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <MapPin className="w-4 h-4" />
                                <span>Mapa</span>
                            </button>
                            <button
                                onClick={() => navegarPara('/detalhe')}
                                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <FileText className="w-4 h-4" />
                                <span>Detalhes</span>
                            </button>

                            {/* Informações do usuário */}
                            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-800">{codigo}</p>
                                    <p className="text-xs text-gray-500">Candidato</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                    title="Sair do portal"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Botão menu mobile */}
                        <button
                            onClick={() => setMenuMobileAberto(!menuMobileAberto)}
                            className="md:hidden p-2 text-gray-600"
                        >
                            {menuMobileAberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Menu mobile dropdown (dentro da navbar) */}
                    {menuMobileAberto && (
                        <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
                            <button
                                onClick={() => {
                                    navegarPara('/home')
                                    setMenuMobileAberto(false)
                                }}
                                className="flex items-center gap-3 w-full px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium"
                            >
                                <Home className="w-5 h-5" />
                                <span>Início</span>
                            </button>
                            <button
                                onClick={() => {
                                    navegarPara('/mapa')
                                    setMenuMobileAberto(false)
                                }}
                                className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
                            >
                                <MapPin className="w-5 h-5" />
                                <span>Localização da Sala</span>
                            </button>
                            <button
                                onClick={() => {
                                    navegarPara('/detalhe')
                                    setMenuMobileAberto(false)
                                }}
                                className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
                            >
                                <FileText className="w-5 h-5" />
                                <span>Detalhes do Exame</span>
                            </button>
                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <div className="flex items-center justify-between px-4 py-2">
                                    <div>
                                        <p className="font-medium text-gray-800">Código: {codigo}</p>
                                        <p className="text-sm text-gray-500">Status: Ativo</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setMenuMobileAberto(false)
                                            handleLogout()
                                        }}
                                        className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Sair</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )
}