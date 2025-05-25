'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextProps {
    isAuthenticated: boolean
    login: (codigo: string) => void
    logout: () => void
    codigo: string
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [codigo, setCodigo] = useState('')

    const login = (codigo: string) => {
        setCodigo(codigo)
        setIsAuthenticated(true)
    }

    const logout = () => {
        setCodigo('')
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, codigo }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider')
    return context
}
