'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const [codigo, setCodigo] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState('')

  const { login, blockUntil } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!blockUntil) {
      setCountdown('');
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = blockUntil - now;

      if (remaining <= 0) {
        clearInterval(interval);
        setCountdown('');
        setError('Pode tentar fazer o login novamente.'); 
        return;
      }

      const minutes = Math.floor((remaining / 1000) / 60);
      const seconds = Math.floor((remaining / 1000) % 60);

      setCountdown(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [blockUntil, setError]);

  const handleCodigoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numericValue = value.replace(/[^0-9]/g, '')
    setCodigo(numericValue)
    if (error && !blockUntil) {
      setError('')
    }
  }

  const handleSubmit = async () => {
    if (codigo.length < 5) {
      setError('O código do candidato deve ter no mínimo 5 dígitos.')
      return
    }
    
    setError('')
    setIsLoading(true)

    const result = await login(codigo)

    if (result.success) {
      router.push('/home')
    } else {
      setError(result.error || 'Ocorreu um erro inesperado.')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-yellow-300/15 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl" />
      </div>
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        <div className="lg:hidden text-center text-white mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-white rounded-full p-2 shadow-lg border-2 border-yellow-300/20">
              <Image
                src="/logo_up.png"
                width={400}
                height={400}
                alt="Logo da Universidade Pedagógica de Maputo"
                className="w-full h-full object-contain"
                unoptimized
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold leading-tight">
            Portal do <span className="text-yellow-300 drop-shadow-sm">Candidato</span>
          </h1>
          <p className="text-lg text-white/80 mt-1">
            Universidade Pedagógica de Maputo
          </p>
        </div>
        <div className="w-full max-w-md lg:max-w-5xl bg-white/98 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex lg:h-[85vh] lg:max-h-[650px]">
            <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-blue-700 to-blue-900 p-6 lg:p-8 text-white flex-col justify-center relative">
              <div className="absolute inset-0 bg-black/5" />
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-24 h-24 bg-white rounded-full p-2 shadow-2xl border-4 border-yellow-300/20">
                    <Image
                      src="/logo_up.png"
                      width={400}
                      height={400}
                      alt="Logo da Universidade Pedagógica de Maputo"
                      className="w-full h-full object-contain"
                      unoptimized
                    />
                  </div>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4 text-center">
                  Portal do{' '}
                  <span className="text-yellow-300 drop-shadow-sm">Candidato</span>
                </h1>
                <h2 className="text-xl lg:text-2xl text-white/90 mb-1 font-semibold text-center">
                  Universidade Pedagógica
                </h2>
                <p className="text-lg text-white/70 mb-8 font-medium text-center">
                  de Maputo
                </p>
                <div className="space-y-3">
                  {[
                    {
                      icon: (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      ),
                      text: "Localização da sua sala de exame"
                    },
                    {
                      icon: (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h4v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 3a1 1 0 100 2h2a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      ),
                      text: "Informações detalhadas do exame"
                    },
                    {
                      icon: (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      ),
                      text: "Mapa interactivo do campus"
                    },
                    {
                      icon: (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ),
                      text: "Acesso rápido e seguro"
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-blue-900 shadow-lg">
                        {item.icon}
                      </div>
                      <span className="text-sm text-white/90">{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <p className="text-yellow-300 font-semibold italic text-base">
                    &ldquo;Osomiha, Kupisakira, Kutirhela&rdquo;
                  </p>
                  <p className="text-blue-200 text-xs mt-1">
                    Ensinar - Pesquisar - Servir
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/5 p-6 lg:p-8 flex flex-col justify-center bg-gradient-to-b from-gray-50 to-white">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-blue-700 rounded-xl items-center justify-center mx-auto mb-4 shadow-lg hidden lg:flex">
                  <div className="relative w-8 h-8 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-yellow-300 absolute -top-1.5 -right-1.5 drop-shadow-lg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                  Acesso ao Portal
                </h3>
                <div className="text-gray-700">
                  <ul className="space-y-2 inline-block text-left text-sm">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Use o seu <strong>código de candidato</strong>.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>O código tem no mínimo <strong>5 dígitos</strong>.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-800 font-bold mb-2 text-base">
                    Código do Candidato
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15A2.25 2.25 0 0 0 2.25 6.75v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={codigo}
                      onChange={handleCodigoChange}
                      placeholder="Ex: 12345"
                      className={`w-full pl-12 pr-4 py-3 text-base border-2 rounded-xl shadow-sm focus:outline-none transition-all duration-300 text-gray-800 bg-white ${error
                        ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
                        : 'border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20'
                        }`}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2H7v-2H4a1 1 0 01-1-1v-4a1 1 0 011-1h3l2.257-2.257A6 6 0 0121 9z" />
                      </svg>
                    </div>
                  </div>
                  {error && (
                    <div className="mt-2 text-center text-red-600">
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-medium">{error}</span>
                      </div>
                      {blockUntil && countdown && (
                        <div className="font-mono text-lg mt-1 tracking-wider">{countdown}</div>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || codigo.length < 5 || !!blockUntil}
                  className="w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-base flex items-center justify-center space-x-3 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-xs font-semibold text-yellow-800">Código de teste</p>
                      <p className="text-xs text-yellow-700">Use o código <strong>12345</strong> para testar o sistema</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center space-y-2">
                <p className="text-gray-600 text-xs">
                  Problemas com o acesso?{' '}
                  <a href="#" className="text-blue-700 hover:text-blue-800 font-semibold hover:underline transition-colors">
                    Entre em contacto
                  </a>
                </p>
                <p className="text-gray-500 text-xs">
                  Suporte: candidatos@up.ac.mz | +258 21 401 000
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4 text-white/90">
          <p className="text-xs font-medium">
            © 2025 Universidade Pedagógica de Maputo - Portal do Candidato
          </p>
          <p className="text-xs text-white/70 mt-1">
            Desenvolvido por{' '}
            <a
              href="https://adelsonsaguatedev.github.io/adelsonsaguate/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white hover:underline"
            >
              Eng. Adelson Saguate
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
