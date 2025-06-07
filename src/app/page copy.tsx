'use client'

import React, { useState } from 'react'

export default function LoginPage() {
  const [codigo, setCodigo] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!codigo.trim()) {
      setError('Por favor, insira o seu código de candidato')
      return
    }

    setError('')
    setIsLoading(true)

    // Simulação de autenticação
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (codigo === '12345') {
      // Sucesso - redirecionar para o mapa
      alert('Login realizado com sucesso!')
    } else {
      setError('Código inválido! Verifique o seu código e tente novamente.')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-red-700 via-red-800 to-red-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-yellow-300/15 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-red-400/10 rounded-full blur-2xl" />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="bg-white/98 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="flex flex-col lg:flex-row min-h-[650px]">

            {/* Painel esquerdo - Informações da UPM */}
            <div className="lg:w-3/5 bg-gradient-to-br from-red-700 to-red-900 p-8 lg:p-12 text-white flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-black/5" />
              <div className="relative z-10">
                {/* Logo/Ícone da UPM */}
                <div className="w-24 h-24 bg-white/15 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20">
                  <svg className="w-14 h-14 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                  </svg>
                </div>

                {/* Título principal */}
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                  Portal do<br />
                  <span className="text-yellow-300 drop-shadow-sm">Candidato</span>
                </h1>

                {/* Subtítulo */}
                <h2 className="text-2xl lg:text-3xl text-red-100 mb-2 font-semibold">
                  Universidade Pedagógica
                </h2>
                <p className="text-xl text-red-200 mb-10 font-medium">
                  de Maputo
                </p>

                {/* Lista de funcionalidades */}
                <div className="space-y-5">
                  {[
                    { icon: "📍", text: "Localização da sua sala de exame" },
                    { icon: "📝", text: "Informações detalhadas do exame" },
                    { icon: "🗺️", text: "Mapa interativo do campus" },
                    { icon: "⚡", text: "Acesso rápido e seguro" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-red-800 text-lg font-bold shadow-lg">
                        {item.icon}
                      </div>
                      <span className="text-lg text-red-50">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Painel direito - Formulário de Login */}
            <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-b from-gray-50 to-white">
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-red-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2H7v-2H4a1 1 0 01-1-1v-4a1 1 0 011-1h3l2.257-2.257A6 6 0 0121 9z" />
                  </svg>
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                  Bem-vindo!
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Insira o seu código de candidato<br />
                  para acessar as informações do exame
                </p>
              </div>

              <div className="space-y-6">
                {/* Campo de entrada */}
                <div>
                  <label className="block text-gray-800 font-bold mb-3 text-lg">
                    Código do Candidato
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={codigo}
                      onChange={(e) => {
                        setCodigo(e.target.value.toUpperCase())
                        setError('')
                      }}
                      placeholder="Ex: UPM12345"
                      className={`w-full px-6 py-5 text-lg border-2 rounded-2xl shadow-sm focus:outline-none transition-all duration-300 text-gray-800 bg-white ${error
                          ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
                          : 'border-gray-200 focus:border-red-600 focus:ring-4 focus:ring-red-600/20'
                        }`}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2H7v-2H4a1 1 0 01-1-1v-4a1 1 0 011-1h3l2.257-2.257A6 6 0 0121 9z" />
                      </svg>
                    </div>
                  </div>

                  {/* Mensagem de erro */}
                  {error && (
                    <div className="mt-3 flex items-center space-x-2 text-red-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">{error}</span>
                    </div>
                  )}
                </div>

                {/* Botão de login */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !codigo.trim()}
                  className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center space-x-3 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Verificando...</span>
                    </>
                  ) : (
                    <>
                      <span>Acessar Portal</span>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Dica de ajuda */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-yellow-800">Código de teste</p>
                      <p className="text-sm text-yellow-700">Use o código <strong>12345</strong> para testar o sistema</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Links de ajuda */}
              <div className="mt-8 text-center space-y-3">
                <p className="text-gray-600 text-sm">
                  Problemas com o acesso?{' '}
                  <a href="#" className="text-red-700 hover:text-red-800 font-semibold hover:underline transition-colors">
                    Entre em contacto
                  </a>
                </p>
                <p className="text-gray-500 text-xs">
                  Suporte: candidatos@upm.ac.mz | +258 21 401 000
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center mt-8 text-white/90">
          <p className="text-sm font-medium">
            © 2025 Universidade Pedagógica de Maputo - Portal do Candidato
          </p>
          <p className="text-xs text-white/70 mt-1">
            Desenvolvido por Eng. Adelson Saguate
          </p>
        </div>
      </div>
    </div>
  )
}