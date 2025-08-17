'use client'

import { createContext, useContext, useState, ReactNode, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

// --- TIPOS E CONSTANTES ---
interface LoginResult {
  success: boolean;
  error?: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (codigo: string) => Promise<LoginResult>;
  logout: () => void;
  codigo: string;
  tempoSessao: number;
  resetarTempo: () => void;
  loginAttempts: number;
  isBlocked: boolean;
  blockUntil: number | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

const STORAGE_KEYS = {
  IS_AUTHENTICATED: 'up_portal_authenticated',
  CODIGO: 'up_portal_codigo',
  SESSION_START: 'up_portal_session_start',
  TEMPO_SESSAO: 'up_portal_tempo_sessao',
  LOGIN_ATTEMPTS: 'up_portal_login_attempts',
  BLOCK_UNTIL: 'up_portal_block_until'
}

const TEMPO_SESSAO_INICIAL = 30 // 30 minutos
const MAX_LOGIN_ATTEMPTS = parseInt(process.env.NEXT_PUBLIC_MAX_LOGIN_ATTEMPTS || '5');
const BLOCK_DURATION_MINUTES = parseInt(process.env.NEXT_PUBLIC_BLOCK_DURATION_MINUTES || '5');

// --- COMPONENTE PROVIDER ---
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // ... (state for session)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [codigo, setCodigo] = useState('')
    const [tempoSessao, setTempoSessao] = useState(TEMPO_SESSAO_INICIAL)
    const [shouldLogout, setShouldLogout] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)
    const router = useRouter()
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    // State for login attempts
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [blockUntil, setBlockUntil] = useState<number | null>(null);
    const isBlocked = blockUntil ? Date.now() < blockUntil : false;

    // --- FUNÇÕES DE SESSÃO (localStorage) ---
    const salvarSessao = useCallback((codigo: string, tempo: number) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true')
            localStorage.setItem(STORAGE_KEYS.CODIGO, codigo)
            localStorage.setItem(STORAGE_KEYS.SESSION_START, Date.now().toString())
            localStorage.setItem(STORAGE_KEYS.TEMPO_SESSAO, tempo.toString())
        }
    }, [])

    const limparSessao = useCallback(() => {
        if (typeof window !== 'undefined') {
            const keysToKeep = [STORAGE_KEYS.LOGIN_ATTEMPTS, STORAGE_KEYS.BLOCK_UNTIL];
            Object.values(STORAGE_KEYS).forEach(key => {
                if (!keysToKeep.includes(key)) {
                    localStorage.removeItem(key)
                }
            })
        }
    }, [])

    // --- LÓGICA DE LOGIN E BLOQUEIO ---
    const login = useCallback(async (codigoCandidato: string): Promise<LoginResult> => {
        // 1. Verificar se está bloqueado
        if (blockUntil && Date.now() < blockUntil) {
            const tempoRestante = Math.ceil((blockUntil - Date.now()) / (1000 * 60));
            return {
                success: false,
                error: `Muitas tentativas falhadas. Tente novamente em ${tempoRestante} minutos.`
            };
        } else if (blockUntil && Date.now() >= blockUntil) {
            // Se o tempo de bloqueio passou, reseta
            setBlockUntil(null);
            setLoginAttempts(0);
            localStorage.removeItem(STORAGE_KEYS.BLOCK_UNTIL);
            localStorage.removeItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
        }

        // Simulação de chamada à API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 2. Validar o código (lógica de negócio)
        if (codigoCandidato === '12345') {
            // Sucesso
            setLoginAttempts(0);
            localStorage.removeItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
            setBlockUntil(null);
            localStorage.removeItem(STORAGE_KEYS.BLOCK_UNTIL);

            setCodigo(codigoCandidato)
            setIsAuthenticated(true)
            setTempoSessao(TEMPO_SESSAO_INICIAL)
            salvarSessao(codigoCandidato, TEMPO_SESSAO_INICIAL)

            return { success: true };
        } else {
            // Falha
            const novasTentativas = loginAttempts + 1;
            setLoginAttempts(novasTentativas);
            localStorage.setItem(STORAGE_KEYS.LOGIN_ATTEMPTS, novasTentativas.toString());

            if (novasTentativas >= MAX_LOGIN_ATTEMPTS) {
                const novoBlockUntil = Date.now() + BLOCK_DURATION_MINUTES * 60 * 1000;
                setBlockUntil(novoBlockUntil);
                localStorage.setItem(STORAGE_KEYS.BLOCK_UNTIL, novoBlockUntil.toString());
                return {
                    success: false,
                    error: `Código inválido. A sua conta foi bloqueada por ${BLOCK_DURATION_MINUTES} minutos.`
                };
            }

            const tentativasRestantes = MAX_LOGIN_ATTEMPTS - novasTentativas;
            return {
                success: false,
                error: `Código inválido! Restam ${tentativasRestantes} tentativas.`
            };
        }
    }, [loginAttempts, blockUntil, salvarSessao]);


    // --- INICIALIZAÇÃO E EFEITOS ---

    // Efeito para auto-desbloqueio
    useEffect(() => {
      if (blockUntil && Date.now() < blockUntil) {
        const remainingTime = blockUntil - Date.now();
        const timer = setTimeout(() => {
          setBlockUntil(null);
          setLoginAttempts(0);
          if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEYS.BLOCK_UNTIL);
            localStorage.removeItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
          }
        }, remainingTime);

        return () => clearTimeout(timer);
      }
    }, [blockUntil]);

    // Função para carregar sessão e estado de bloqueio do localStorage
    const carregarSessao = useCallback(() => {
        if (typeof window !== 'undefined') {
            try {
                // Carregar estado de bloqueio
                const attempts = parseInt(localStorage.getItem(STORAGE_KEYS.LOGIN_ATTEMPTS) || '0');
                const block = parseInt(localStorage.getItem(STORAGE_KEYS.BLOCK_UNTIL) || '0');
                setLoginAttempts(attempts);
                if (block && Date.now() < block) {
                    setBlockUntil(block);
                }

                // Carregar sessão de autenticação
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
                        setIsAuthenticated(true)
                        setCodigo(codigoSalvo)
                        setTempoSessao(tempoRestante)
                        return true
                    } else {
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

    // ... (Restante dos useEffects e lógica de sessão - sem alterações) ...
    // Inicializar sessão ao carregar o componente
    useEffect(() => {
        const sessaoCarregada = carregarSessao()
        setIsInitialized(true)

        if (!sessaoCarregada && typeof window !== 'undefined') {
            const currentPath = window.location.pathname
            if (currentPath !== '/' && currentPath !== '/login') {
                router.push('/')
            }
        }
    }, [carregarSessao, router])

    const logout = useCallback(() => {
        setCodigo('')
        setIsAuthenticated(false)
        setTempoSessao(TEMPO_SESSAO_INICIAL)
        setShouldLogout(false)
        if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }
        limparSessao()
        setTimeout(() => {
            router.push('/')
        }, 0)
    }, [router, limparSessao])

    const resetarTempo = useCallback(() => {
        const novoTempo = TEMPO_SESSAO_INICIAL
        setTempoSessao(novoTempo)
        if (isAuthenticated && codigo) {
            salvarSessao(codigo, novoTempo)
        }
    }, [isAuthenticated, codigo, salvarSessao])

    useEffect(() => {
        if (shouldLogout) {
            logout()
        }
    }, [shouldLogout, logout])

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
                if (codigo) {
                    salvarSessao(codigo, novoTempo)
                }
                if (novoTempo <= 0) {
                    setShouldLogout(true)
                    return 0
                }
                return novoTempo
            })
        }, 60000)

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
        }
    }, [isAuthenticated, isInitialized, codigo, salvarSessao])

    useEffect(() => {
        if (!isAuthenticated || !isInitialized) return

        const resetarNaAtividade = () => {
            const novoTempo = TEMPO_SESSAO_INICIAL
            setTempoSessao(novoTempo)
            if (codigo) {
                salvarSessao(codigo, novoTempo)
            }
        }

        const eventos = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
        let lastReset = 0
        const throttledReset = () => {
            const now = Date.now()
            if (now - lastReset > 30000) {
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

    useEffect(() => {
        if (typeof window === 'undefined') return

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEYS.IS_AUTHENTICATED && e.newValue === null) {
                logout()
            }
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [logout])

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
            resetarTempo,
            loginAttempts,
            isBlocked,
            blockUntil
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
