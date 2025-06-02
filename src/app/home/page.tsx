'use client'

import { useEffect, useState } from 'react'
import TutorialInicial from '@/components/Tutorial/TutorialInicial'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { LogOut, MapPinned, Info, User, Calendar, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import LayoutInterno from '@/components/Layout/LayoutInterno'
import Image from 'next/image'

export default function HomePage() {
    const { codigo, logout } = useAuth()
    const router = useRouter()
    const [mostrarTutorial, setMostrarTutorial] = useState(false)

    useEffect(() => {
        const visto = localStorage.getItem('tutorial_visto')
        if (!visto) setMostrarTutorial(true)
    }, [])

    return (
        <LayoutInterno>
            {mostrarTutorial && (
                <TutorialInicial onFechar={() => setMostrarTutorial(false)} />
            )}

            {/* Hero Section - Ocupando toda a altura da tela */}
            <div className="min-h-screen flex flex-col">
                {/* Header Principal */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 px-6"
                >
                    {/* Padrão decorativo de fundo */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-6"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                    </div>

                    <div className="relative max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            {/* Conteúdo principal */}
                            <div className="flex-1 text-center lg:text-left space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                                        Bem-vindo ao<br />
                                        <span className="text-blue-200">Portal do Candidato</span>
                                    </h1>
                                    <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-2xl">
                                        Tudo o que precisas para o teu exame está aqui. Consulta a localização da tua sala e acede às informações importantes.
                                    </p>
                                </motion.div>

                                {/* Card do Código do Candidato */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-4 rounded-2xl"
                                >
                                    <User className="w-6 h-6 text-blue-200" />
                                    <div className="text-left">
                                        <p className="text-blue-200 text-sm font-medium">Código do Candidato</p>
                                        <p className="text-white text-2xl font-bold">{codigo}</p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Imagem */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="flex-shrink-0"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl"></div>
                                    <Image
                                        src="/exam-illustration.png"
                                        alt="Ilustração de Exame"
                                        width={400}
                                        height={400}
                                        className="relative rounded-3xl shadow-2xl"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Seção de Ações Principais */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex-1 bg-gradient-to-b from-blue-50 to-white py-16 px-6"
                >
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                                O que podes fazer?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Acede rapidamente às funcionalidades mais importantes para o teu exame
                            </p>
                        </div>

                        {/* Grid de Ações */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {/* Mapa da Sala */}
                            <motion.button
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push('/mapa')}
                                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative">
                                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-200 transition-colors">
                                        <MapPinned className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Mapa da Sala</h3>
                                    <p className="text-gray-600 mb-4">
                                        Encontra facilmente a localização da tua sala de exame
                                    </p>
                                    <div className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                                        Ver Localização →
                                    </div>
                                </div>
                            </motion.button>

                            {/* Dados do Exame */}
                            <motion.button
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push('/detalhe')}
                                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative">
                                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-green-200 transition-colors">
                                        <Info className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Dados do Exame</h3>
                                    <p className="text-gray-600 mb-4">
                                        Consulta informações detalhadas sobre o teu exame
                                    </p>
                                    <div className="inline-flex items-center text-green-600 font-semibold group-hover:text-green-700">
                                        Ver Detalhes →
                                    </div>
                                </div>
                            </motion.button>

                            {/* Terminar Sessão */}
                            <motion.button
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    logout()
                                    router.push('/')
                                }}
                                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 md:col-span-2 lg:col-span-1"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative">
                                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-red-200 transition-colors">
                                        <LogOut className="w-8 h-8 text-red-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Terminar Sessão</h3>
                                    <p className="text-gray-600 mb-4">
                                        Sair do portal de forma segura
                                    </p>
                                    <div className="inline-flex items-center text-red-600 font-semibold group-hover:text-red-700">
                                        Sair →
                                    </div>
                                </div>
                            </motion.button>
                        </div>

                        {/* Seção de Estatísticas/Info Adicional */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 text-white">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                <div>
                                    <Calendar className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                                    <h4 className="text-2xl font-bold mb-2">Período de Exames</h4>
                                    <p className="text-blue-200">Consulta sempre as datas atualizadas</p>
                                </div>
                                <div>
                                    <Clock className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                                    <h4 className="text-2xl font-bold mb-2">Pontualidade</h4>
                                    <p className="text-blue-200">Chega com 30 minutos de antecedência</p>
                                </div>
                                <div>
                                    <User className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                                    <h4 className="text-2xl font-bold mb-2">Suporte</h4>
                                    <p className="text-blue-200">Estamos aqui para te ajudar</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8 px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <p className="text-gray-400">
                            <strong className="text-white">Universidade Pedagógica</strong> • Portal do Candidato • © 2025
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                            Construído com dedicação para o teu sucesso académico
                        </p>
                    </div>
                </footer>
            </div>
        </LayoutInterno>
    )
}