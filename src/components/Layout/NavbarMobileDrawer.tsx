'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, Home, MapPin, FileText, LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function NavbarPureTailwind() {
    const [menuMobileAberto, setMenuMobileAberto] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const { codigo, logout } = useAuth()

    const navegarPara = (pagina: string) => {
        router.push(pagina)
    }

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    // Função para obter classes específicas com active
    const getMenuClasses = (menuClass: string, targetPath: string) => {
        const baseClasses = `${menuClass} flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 relative`
        const activeClasses = "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform -translate-y-0.5"
        const inactiveClasses = "text-gray-600 hover:text-blue-600 hover:bg-blue-50"

        return pathname === targetPath
            ? `${baseClasses} ${activeClasses} active`
            : `${baseClasses} ${inactiveClasses}`
    }

    const getMobileMenuClasses = (menuClass: string, targetPath: string) => {
        const baseClasses = `${menuClass} flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 relative`
        const activeClasses = "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
        const inactiveClasses = "text-gray-600 hover:bg-gray-50"

        return pathname === targetPath
            ? `${baseClasses} ${activeClasses} active`
            : `${baseClasses} ${inactiveClasses}`
    }

    const getIconClasses = (targetPath: string) => {
        return pathname === targetPath
            ? "w-4 h-4 text-yellow-300"
            : "w-4 h-4"
    }

    const getMobileIconClasses = (targetPath: string) => {
        return pathname === targetPath
            ? "w-5 h-5 text-yellow-300"
            : "w-5 h-5"
    }

    return (
        <>
            {/* Estilos CSS personalizados para indicadores */}
            <style jsx>{`
                .active::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 70%;
                    height: 3px;
                    background: #fbbf24;
                    border-radius: 2px 2px 0 0;
                }
                
                /* Para mobile */
                @media (max-width: 768px) {
                    .active::after {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 4px;
                        height: 70%;
                        background: #fbbf24;
                        border-radius: 0 4px 4px 0;
                    }
                }
            `}</style>

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
                                className={getMenuClasses('home-menu', '/home')}
                            >
                                <Home className={getIconClasses('/home')} />
                                <span className="font-medium">Início</span>
                            </button>

                            <button
                                onClick={() => navegarPara('/mapa')}
                                className={getMenuClasses('mapa-menu', '/mapa')}
                            >
                                <MapPin className={getIconClasses('/mapa')} />
                                <span className="font-medium">Mapa</span>
                            </button>

                            <button
                                onClick={() => navegarPara('/detalhe')}
                                className={getMenuClasses('detalhe-menu', '/detalhe')}
                            >
                                <FileText className={getIconClasses('/detalhe')} />
                                <span className="font-medium">Detalhes</span>
                            </button>

                            {/* Informações do usuário */}
                            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-800">{codigo}</p>
                                    <p className="text-xs text-gray-500">Candidato</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Sair do portal"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Botão menu mobile */}
                        <button
                            onClick={() => setMenuMobileAberto(!menuMobileAberto)}
                            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {menuMobileAberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Menu mobile dropdown */}
                    {menuMobileAberto && (
                        <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
                            <button
                                onClick={() => {
                                    navegarPara('/home')
                                    setMenuMobileAberto(false)
                                }}
                                className={getMobileMenuClasses('home-menu', '/home')}
                            >
                                <Home className={getMobileIconClasses('/home')} />
                                <span className="font-medium">Início</span>
                            </button>

                            <button
                                onClick={() => {
                                    navegarPara('/mapa')
                                    setMenuMobileAberto(false)
                                }}
                                className={getMobileMenuClasses('mapa-menu', '/mapa')}
                            >
                                <MapPin className={getMobileIconClasses('/mapa')} />
                                <span className="font-medium">Localização da Sala</span>
                            </button>

                            <button
                                onClick={() => {
                                    navegarPara('/detalhe')
                                    setMenuMobileAberto(false)
                                }}
                                className={getMobileMenuClasses('detalhe-menu', '/detalhe')}
                            >
                                <FileText className={getMobileIconClasses('/detalhe')} />
                                <span className="font-medium">Detalhes do Exame</span>
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
                                        className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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