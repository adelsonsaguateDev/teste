'use client'

import { useEffect, useState } from 'react'
import { LogOut, MapPin, FileText, User, Calendar, Clock, Shield, Phone, Mail, ExternalLink, ChevronRight, AlertTriangle, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import TutorialInicial from '@/components/Tutorial/TutorialInicial'
import LayoutInterno from '@/components/Layout/LayoutInterno'
import Footer from '@/components/Layout/Footer'

export default function HomePage() {
    const { codigo, logout, tempoSessao } = useAuth()
    const [mostrarTutorial, setMostrarTutorial] = useState(false)
    const router = useRouter()

    const navegarPara = (pagina: string) => {
        router.push(pagina)
    }

    useEffect(() => {
        const visto = localStorage?.getItem('tutorial_visto')
        if (!visto) setMostrarTutorial(true)
    }, [])

    const handleLogout = () => {
        logout() // O AuthContext já cuida do redirecionamento
    }

    return (
        <LayoutInterno>
            {mostrarTutorial && (
                <TutorialInicial onFechar={() => {
                    setMostrarTutorial(false)
                    localStorage?.setItem('tutorial_visto', 'true')
                }} />
            )}

            {/* Cabeçalho de Segurança e Status */}
            <div className="bg-blue-900 text-white py-2 px-4">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
                    <div className="flex items-center gap-2 mb-2 sm:mb-0">
                        <Shield className="w-4 h-4 text-green-400" />
                        <span>Conexão Segura</span>
                        <span className="text-blue-300">•</span>
                        <span className={`${tempoSessao <= 5 ? 'text-yellow-300 font-bold' : ''}`}>
                            Sessão expira em: {tempoSessao}min
                        </span>
                        {tempoSessao <= 5 && (
                            <span className="text-yellow-300">⚠️</span>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <span>Suporte: candidatos@up.ac.mz</span>
                        <span className="text-blue-300">•</span>
                        <span>+258 21 401 000</span>
                    </div>
                </div>
            </div>

            {/* Aviso de sessão prestes a expirar */}
            {tempoSessao <= 5 && tempoSessao > 0 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex items-center max-w-7xl mx-auto">
                        <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3" />
                        <div className="flex-1">
                            <p className="text-yellow-800">
                                <strong>Atenção!</strong> Sua sessão expirará em {tempoSessao} minuto{tempoSessao !== 1 ? 's' : ''}.
                                Continue navegando para manter-se conectado.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Header Principal */}
            <header className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
                {/* Elementos decorativos */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-12 lg:py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Conteúdo principal */}
                        <div className="space-y-8">
                            {/* Logo da UP */}
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white rounded-xl p-2 shadow-lg">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/logo_up.png"
                                        alt="Logo da Universidade Pedagógica de Maputo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-2xl lg:text-3xl font-bold">Portal do Candidato</h2>
                                    <p className="text-blue-200">Universidade Pedagógica de Maputo</p>
                                </div>
                            </div>

                            {/* Mensagem de boas-vindas */}
                            <div className="space-y-4">
                                <h3 className="text-3xl lg:text-5xl font-bold leading-tight">
                                    Bem-vindo ao seu<br />
                                    <span className="text-yellow-300">espaço pessoal</span>
                                </h3>
                                <p className="text-xl text-blue-100 leading-relaxed">
                                    Acesse todas as informações necessárias para o seu exame de admissão
                                    de forma rápida e segura.
                                </p>
                            </div>

                            {/* Informações do candidato */}
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <User className="w-6 h-6 text-yellow-300" />
                                    <h4 className="text-lg font-semibold">Seus Dados</h4>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-blue-200 text-sm">Código do Candidato</p>
                                        <p className="text-2xl font-bold text-yellow-300">{codigo}</p>
                                    </div>
                                    <div>
                                        <p className="text-blue-200 text-sm">Estado</p>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                            <span className="font-semibold text-green-400">Activo</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Área visual */}
                        <div className="relative">
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                                <div className="text-center space-y-6">
                                    <div className="w-32 h-32 bg-yellow-300/20 rounded-full flex items-center justify-center mx-auto">
                                        <Calendar className="w-16 h-16 text-yellow-300" />
                                    </div>
                                    <div>
                                        <h5 className="text-2xl font-bold mb-2">Pronto para o Exame?</h5>
                                        <p className="text-blue-200">
                                            Encontre sua sala e consulte os detalhes importantes
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Seção de Ações Principais */}
            <main className="bg-gradient-to-b from-gray-50 to-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Título da seção */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                            Acesso Rápido
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Navegue pelas funcionalidades essenciais do portal
                        </p>
                    </div>

                    {/* Cards de ação principais */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {/* Localização da Sala */}
                        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                            <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                            <div className="p-8">
                                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                                    <MapPin className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                    Localização da Sala
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Encontre facilmente sua sala de exame com nosso mapa interativo
                                    e instruções passo a passo.
                                </p>
                                <button
                                    onClick={() => navegarPara('/mapa')}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                                    aria-label="Acessar mapa da sala de exame"
                                >
                                    <span>Ver no Mapa</span>
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Informações Importantes */}
                        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                            <div className="h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
                            <div className="p-8">
                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                                    <FileText className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                    Informações Importantes
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Aceda às regras do exame, documentos necessários,
                                    material permitido e instruções essenciais.
                                </p>
                                <button
                                    onClick={() => navegarPara('/detalhe')}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                                    aria-label="Ver informações importantes do exame"
                                >
                                    <span>Ver Informações</span>
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Sair do Portal */}
                        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 md:col-span-2 lg:col-span-1">
                            <div className="h-2 bg-gradient-to-r from-red-500 to-red-600"></div>
                            <div className="p-8">
                                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                                    <LogOut className="w-8 h-8 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                    Sair do Portal
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Termine sua sessão de forma segura quando
                                    finalizar o uso do portal.
                                </p>
                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                                    aria-label="Sair do portal de forma segura"
                                >
                                    <span>Terminar Sessão</span>
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Contatos de suporte */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-8 mb-16">
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-6">
                                <h4 className="text-2xl font-bold text-blue-900 mb-2">
                                    Precisa de Ajuda?
                                </h4>
                                <p className="text-blue-700">
                                    Nossa equipa está disponível para o apoiar
                                </p>
                            </div>
                            <div className="grid sm:grid-cols-3 gap-6">
                                <div className="bg-white rounded-xl p-5 shadow-sm text-center">
                                    <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                                    <p className="text-sm text-gray-600 mb-1">Telefone</p>
                                    <p className="font-semibold text-gray-800">+258 21 401 000</p>
                                </div>
                                <div className="bg-white rounded-xl p-5 shadow-sm text-center">
                                    <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                                    <p className="text-sm text-gray-600 mb-1">Email</p>
                                    <p className="font-semibold text-gray-800">candidatos@up.ac.mz</p>
                                </div>
                                <div className="bg-white rounded-xl p-5 shadow-sm text-center">
                                    <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                                    <p className="text-sm text-gray-600 mb-1">Horário</p>
                                    <p className="font-semibold text-gray-800">Seg-Sex: 8h-17h</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seção informativa */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
                        <h3 className="text-2xl font-bold mb-4">
                            Universidade Pedagógica de Maputo
                        </h3>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            Comprometida com a excelência educacional e o desenvolvimento
                            de profissionais qualificados para Moçambique.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>Fundada em 1985</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>15,000+ Estudantes</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ExternalLink className="w-4 h-4" />
                                <span>www.up.ac.mz</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />

        </LayoutInterno>
    )
}