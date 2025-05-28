'use client'

import { useEffect, useState } from 'react'
import TutorialInicial from '@/components/Tutorial/TutorialInicial'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { LogOut, MapPinned, Info } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HomePage() {
    const { codigo, logout } = useAuth()
    const router = useRouter()
    const [mostrarTutorial, setMostrarTutorial] = useState(false)

    useEffect(() => {
        const visto = localStorage.getItem('tutorial_visto')
        if (!visto) setMostrarTutorial(true)
    }, [])

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
            {mostrarTutorial && (
                <TutorialInicial onFechar={() => setMostrarTutorial(false)} />
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6 text-center"
            >
                <h1 className="text-2xl font-bold text-blue-800">Olá, Candidato!</h1>
                <p className="text-gray-600">
                    O seu código é: <strong>{codigo}</strong>
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => router.push('/mapa')}
                        className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-xl shadow-md transition-all"
                    >
                        <MapPinned className="w-6 h-6" />
                        Ver Mapa da Sala de Exame
                    </button>

                    <button
                        onClick={() => alert('Esta funcionalidade estará disponível em breve.')}
                        className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 rounded-xl shadow-md transition-all"
                    >
                        <Info className="w-6 h-6" />
                        Ver Dados do Exame
                    </button>

                    <button
                        onClick={() => {
                            logout()
                            router.push('/')
                        }}
                        className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-3 rounded-xl shadow-md transition-all"
                    >
                        <LogOut className="w-6 h-6" />
                        Terminar Sessão
                    </button>
                </div>

                <p className="text-sm text-gray-400 pt-4">
                    Universidade Pedagógica • Portal do Candidato
                </p>
            </motion.div>
        </div>
    )
}
