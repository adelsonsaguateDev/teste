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

const STORAGE_KEYS = {
    IS_AUTHENTICATED: 'up_portal_authenticated',
    CODIGO: 'up_portal_codigo',
    SESSION_START: 'up_portal_session_start',
    TEMPO_SESSAO: 'up_portal_tempo_sessao'
}

const TEMPO_SESSAO_INICIAL = 30 // 30 minutos

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [codigo, setCodigo] = useState('')
    const [tempoSessao, setTempoSessao] = useState(TEMPO_SESSAO_INICIAL)
    const [shouldLogout, setShouldLogout] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)
    const router = useRouter()
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    // Função para salvar no localStorage
    const salvarSessao = useCallback((codigo: string, tempo: number) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true')
            localStorage.setItem(STORAGE_KEYS.CODIGO, codigo)
            localStorage.setItem(STORAGE_KEYS.SESSION_START, Date.now().toString())
            localStorage.setItem(STORAGE_KEYS.TEMPO_SESSAO, tempo.toString())
        }
    }, [])

    // Função para limpar localStorage
    const limparSessao = useCallback(() => {
        if (typeof window !== 'undefined') {
            Object.values(STORAGE_KEYS).forEach(key => {
                localStorage.removeItem(key)
            })
        }
    }, [])

    // Função para carregar sessão do localStorage
    const carregarSessao = useCallback(() => {
        if (typeof window !== 'undefined') {
            try {
                const isAuth = localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED) === 'true'
                const codigoSalvo = localStorage.getItem(STORAGE_KEYS.CODIGO)
                const sessionStart = localStorage.getItem(STORAGE_KEYS.SESSION_START)
                const tempoSalvo = localStorage.getItem(STORAGE_KEYS.TEMPO_SESSAO)

                if (isAuth && codigoSalvo && sessionStart && tempoSalvo) {
                    const agora = Date.now()
                    const inicioSessao = parseInt(sessionStart)
                    const tempoDecorrido = Math.floor((agora - inicioSessao) / (1000 * 60)) // em minutos
                    const tempoRestante = parseInt(tempoSalvo) - tempoDecorrido

                    if (tempoRestante > 0) {
                        // Sessão ainda válida
                        setIsAuthenticated(true)
                        setCodigo(codigoSalvo)
                        setTempoSessao(tempoRestante)
                        return true
                    } else {
                        // Sessão expirada
                        limparSessao()
                        return false
                    }
                }
            } catch (error) {
                console.error('Erro ao carregar sessão:', error)
                limparSessao()
            }
        }
        return false
    }, [limparSessao])

    // Inicializar sessão ao carregar o componente
    useEffect(() => {
        const sessaoCarregada = carregarSessao()
        setIsInitialized(true)

        if (!sessaoCarregada && typeof window !== 'undefined') {
            // Se não há sessão válida, redirecionar para login apenas se não estiver na página de login
            const currentPath = window.location.pathname
            if (currentPath !== '/' && currentPath !== '/login') {
                router.push('/')
            }
        }
    }, [carregarSessao, router])

    // Função de logout que sempre redireciona
    const logout = useCallback(() => {
        setCodigo('')
        setIsAuthenticated(false)
        setTempoSessao(TEMPO_SESSAO_INICIAL)
        setShouldLogout(false)

        // Limpar timer se existir
        if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }

        // Limpar localStorage
        limparSessao()

        // Redirecionar para login usando setTimeout para evitar erro
        setTimeout(() => {
            router.push('/')
        }, 0)
    }, [router, limparSessao])

    // Função para resetar o tempo da sessão
    const resetarTempo = useCallback(() => {
        const novoTempo = TEMPO_SESSAO_INICIAL
        setTempoSessao(novoTempo)

        // Atualizar localStorage
        if (isAuthenticated && codigo) {
            salvarSessao(codigo, novoTempo)
        }
    }, [isAuthenticated, codigo, salvarSessao])

    const login = useCallback((codigoCandidato: string) => {
        setCodigo(codigoCandidato)
        setIsAuthenticated(true)
        setTempoSessao(TEMPO_SESSAO_INICIAL)
        setShouldLogout(false)

        // Salvar no localStorage
        salvarSessao(codigoCandidato, TEMPO_SESSAO_INICIAL)
    }, [salvarSessao])

    // Efeito separado para lidar com logout automático
    useEffect(() => {
        if (shouldLogout) {
            logout()
        }
    }, [shouldLogout, logout])

    // Timer da sessão - só roda quando autenticado e inicializado
    useEffect(() => {
        if (!isAuthenticated || !isInitialized) {
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
            return
        }

        timerRef.current = setInterval(() => {
            setTempoSessao(prev => {
                const novoTempo = prev - 1

                // Atualizar localStorage com o novo tempo
                if (codigo) {
                    salvarSessao(codigo, novoTempo)
                }

                if (novoTempo <= 0) {
                    // Tempo esgotado - marcar para logout
                    setShouldLogout(true)
                    return 0
                }

                return novoTempo
            })
        }, 60000) // A cada minuto

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
        }
    }, [isAuthenticated, isInitialized, codigo, salvarSessao])

    // Detectar atividade do usuário para resetar timer
    useEffect(() => {
        if (!isAuthenticated || !isInitialized) return

        const resetarNaAtividade = () => {
            const novoTempo = TEMPO_SESSAO_INICIAL
            setTempoSessao(novoTempo)

            // Atualizar localStorage
            if (codigo) {
                salvarSessao(codigo, novoTempo)
            }
        }

        // Eventos que indicam atividade do usuário
        const eventos = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']

        // Throttle para não resetar muito frequentemente
        let lastReset = 0
        const throttledReset = () => {
            const now = Date.now()
            if (now - lastReset > 30000) { // Reset no máximo a cada 30 segundos
                lastReset = now
                resetarNaAtividade()
            }
        }

        eventos.forEach(evento => {
            document.addEventListener(evento, throttledReset, true)
        })

        return () => {
            eventos.forEach(evento => {
                document.removeEventListener(evento, throttledReset, true)
            })
        }
    }, [isAuthenticated, isInitialized, codigo, salvarSessao])

    // Listener para mudanças de localStorage (para sincronizar entre abas)
    useEffect(() => {
        if (typeof window === 'undefined') return

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEYS.IS_AUTHENTICATED && e.newValue === null) {
                // Logout feito em outra aba
                logout()
            }
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [logout])

    // Não renderizar até estar inicializado
    if (!isInitialized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando portal...</p>
                </div>
            </div>
        )
    }

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