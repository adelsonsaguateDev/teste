'use client'

import { createContext, useContext, useState, ReactNode, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextProps {
    isAuthenticated: boolean
    login: (codigo: string) => void
    logout: () => void
    codigo: string
    tempoSessao: number
    resetarTempo: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [codigo, setCodigo] = useState('')
    const [tempoSessao, setTempoSessao] = useState(30)
    const [shouldLogout, setShouldLogout] = useState(false)
    const router = useRouter()
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    // Função de logout que sempre redireciona
    const logout = useCallback(() => {
        setCodigo('')
        setIsAuthenticated(false)
        setTempoSessao(30) // Reset do tempo
        setShouldLogout(false)

        // Limpar timer se existir
        if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }

        // Limpar qualquer dado do localStorage se necessário
        if (typeof window !== 'undefined') {
            localStorage.removeItem('tutorial_visto') // opcional
        }

        // Redirecionar para login usando setTimeout para evitar erro
        setTimeout(() => {
            router.push('/')
        }, 0)
    }, [router])

    // Função para resetar o tempo da sessão (útil para atividade do usuário)
    const resetarTempo = useCallback(() => {
        setTempoSessao(30) // Reset para 30 minutos
    }, [])

    const login = useCallback((codigo: string) => {
        setCodigo(codigo)
        setIsAuthenticated(true)
        setTempoSessao(30) // Iniciar com 30 minutos
        setShouldLogout(false)
    }, [])

    // Efeito separado para lidar com logout automático
    useEffect(() => {
        if (shouldLogout) {
            logout()
        }
    }, [shouldLogout, logout])

    // Timer da sessão - só roda quando autenticado
    useEffect(() => {
        if (!isAuthenticated) {
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
            return
        }

        timerRef.current = setInterval(() => {
            setTempoSessao(prev => {
                if (prev <= 1) {
                    // Tempo esgotado - marcar para logout
                    setShouldLogout(true)
                    return 0
                }
                return prev - 1
            })
        }, 60000) // A cada minuto

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
        }
    }, [isAuthenticated])

    // Opcional: Detectar atividade do usuário para resetar timer
    useEffect(() => {
        if (!isAuthenticated) return

        const resetarNaAtividade = () => {
            setTempoSessao(30) // Reset para 30 minutos na atividade
        }

        // Eventos que indicam atividade do usuário
        const eventos = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']

        eventos.forEach(evento => {
            document.addEventListener(evento, resetarNaAtividade, true)
        })

        return () => {
            eventos.forEach(evento => {
                document.removeEventListener(evento, resetarNaAtividade, true)
            })
        }
    }, [isAuthenticated])

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            login,
            logout,
            codigo,
            tempoSessao,
            resetarTempo
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider')
    return context
}