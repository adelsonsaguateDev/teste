'use client'

import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [codigo, setCodigo] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async () => {
    if (!codigo.trim()) return
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (codigo === '12345') {
      login(codigo)
      router.push('/home')
    } else {
      alert('Código inválido! Verifique e tente novamente.')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-400/20 rounded-full blur-2xl" />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">

            {/* Painel esquerdo */}
            <div className="lg:w-3/5 bg-gradient-to-br from-blue-500 to-blue-700 p-8 lg:p-12 text-white flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  Portal do<br />
                  <span className="text-yellow-300">Candidato</span>
                </h1>

                <p className="text-xl lg:text-2xl text-blue-100 mb-8">
                  Universidade Pedagógica
                </p>

                <ul className="space-y-4">
                  {[
                    'Localização da sala de exame',
                    'Informações do exame',
                    'Acesso rápido e seguro'
                  ].map((text, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-lg">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Painel direito - Formulário */}
            <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                  Bem-vindo!
                </h2>
                <p className="text-gray-600 text-lg">
                  Insira o seu código para aceder<br />às informações do seu exame.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-lg">
                    Código do Candidato
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                      placeholder="Ex: 12345"
                      className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 text-gray-800 bg-gray-50/50 transition-all duration-300"
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2H7v-2H4a1 1 0 01-1-1v-4a1 1 0 011-1h3l2.257-2.257A6 6 0 0121 9z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !codigo.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Verificando...</span>
                    </>
                  ) : (
                    <>
                      <span>Acessar Portal</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                  Problemas com o acesso?{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                    Entre em contacto
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center mt-8 text-white/80">
          <p className="text-sm">© 2025 Universidade Pedagógica - Portal do Candidato - Eng. Adelson Saguate</p>
        </div>
      </div>
    </div>
  )
}
