'use client'

import { useEffect, useState } from 'react'
import TutorialInicial from '@/components/Tutorial/TutorialInicial'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { LogOut, MapPinned, Info } from 'lucide-react'
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

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 space-y-8"
            >
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <Image
                        // src="/logo_up.png"
                        src="/exam-illustration.png"
                        alt="Universidade Pedagógica Logo"
                        width={300}
                        height={300}
                        className="rounded-xl"
                    />

                    <div className="text-center md:text-left space-y-4">
                        <h1 className="text-3xl font-bold text-blue-800">Bem-vindo ao Portal do Candidato!</h1>
                        <p className="text-gray-600 text-lg">
                            Aqui poderás aceder facilmente às informações e localização da tua sala de exame. Estamos contigo neste momento importante!
                        </p>
                        <div className="text-blue-900 font-semibold text-sm bg-blue-100 px-4 py-2 rounded inline-block">
                            Código do Candidato: <strong>{codigo}</strong>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                        onClick={() => router.push('/mapa')}
                        className="flex flex-col items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-5 rounded-xl shadow-md transition-all"
                    >
                        <MapPinned className="w-8 h-8" />
                        Mapa da Sala
                    </button>

                    <button
                        onClick={() => alert('Esta funcionalidade estará disponível em breve.')}
                        className="flex flex-col items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-5 rounded-xl shadow-md transition-all"
                    >
                        <Info className="w-8 h-8" />
                        Dados do Exame
                    </button>

                    <button
                        onClick={() => {
                            logout()
                            router.push('/')
                        }}
                        className="flex flex-col items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-5 rounded-xl shadow-md transition-all"
                    >
                        <LogOut className="w-8 h-8" />
                        Terminar Sessão
                    </button>
                </div>

                <div className="text-center pt-6 text-gray-400 text-sm">
                    Universidade Pedagógica • Portal do Candidato • © 2025
                </div>
            </motion.div>
        </LayoutInterno>
    )
}
