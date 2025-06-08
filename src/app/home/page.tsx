'use client'

import { useEffect, useState } from 'react'
import { LogOut, MapPin, FileText, User, Calendar, Clock, Shield, Phone, Mail, ExternalLink, ChevronRight, AlertTriangle, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import TutorialInicial from '@/components/Tutorial/TutorialInicial'
import LayoutInterno from '@/components/Layout/LayoutInterno'

export default function HomePage() {
    const { codigo, logout } = useAuth()
    const [mostrarTutorial, setMostrarTutorial] = useState(false)
    const [tempoSessao, setTempoSessao] = useState(30) // minutos restantes
    const router = useRouter()

    const navegarPara = (pagina: string) => {
        router.push(pagina)
    }

    useEffect(() => {
        const visto = localStorage?.getItem('tutorial_visto')
        if (!visto) setMostrarTutorial(true)

        // Timer de segurança da sessão
        const timer = setInterval(() => {
            setTempoSessao(prev => prev > 0 ? prev - 1 : 0)
        }, 60000)

        return () => clearInterval(timer)
    }, [])

    const handleLogout = () => {
        logout()
        router.push('/')
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
                        <span>Sessão expira em: {tempoSessao}min</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span>Suporte: candidatos@up.ac.mz</span>
                        <span className="text-blue-300">•</span>
                        <span>+258 21 401 000</span>
                    </div>
                </div>
            </div>

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
                                        <p className="text-blue-200 text-sm">Status</p>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                            <span className="font-semibold text-green-400">Ativo</span>
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

                        {/* Detalhes do Exame */}
                        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                            <div className="h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
                            <div className="p-8">
                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                                    <FileText className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                    Detalhes do Exame
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Consulte horários, disciplinas, documentos necessários
                                    e outras informações importantes.
                                </p>
                                <button
                                    onClick={() => navegarPara('/detalhe')}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                                    aria-label="Ver detalhes do exame"
                                >
                                    <span>Ver Detalhes</span>
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

                    {/* Avisos e Informações Importantes */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {/* Avisos importantes */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                            <div className="flex items-start gap-4">
                                <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="text-lg font-semibold text-yellow-800 mb-3">
                                        Informações Importantes
                                    </h4>
                                    <ul className="space-y-2 text-yellow-700 text-sm">
                                        <li>• Chegue com 30 minutos de antecedência</li>
                                        <li>• Traga documento de identificação válido</li>
                                        <li>• Verifique os materiais permitidos</li>
                                        <li>• Mantenha este código seguro: <strong>{codigo}</strong></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Contatos de suporte */}
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                            <h4 className="text-lg font-semibold text-blue-800 mb-4">
                                Precisa de Ajuda?
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-blue-600" />
                                    <span className="text-blue-700">+258 21 401 000</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-blue-600" />
                                    <span className="text-blue-700">candidatos@up.ac.mz</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                    <span className="text-blue-700">Seg-Sex: 8h00-17h00</span>
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
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-white rounded-lg p-1">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/logo_up.png"
                                        alt="UP Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className="font-bold text-lg">Portal do Candidato</span>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                Facilitando o acesso à educação superior
                                em Moçambique através da tecnologia.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Links Úteis</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Site Oficial da UP</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Regulamentos</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Suporte Técnico</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Segurança</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li className="flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-green-400" />
                                    <span>Conexão SSL Segura</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span>Dados Protegidos</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-yellow-400" />
                                    <span>Sessão Temporizada</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
                        <p className="mb-2">
                            © 2025 Universidade Pedagógica de Maputo. Todos os direitos reservados.
                        </p>
                        <p className="text-sm">
                            Desenvolvido por <span className="text-white font-medium">Eng. Adelson Saguate</span>
                            • Versão 1.0.0
                        </p>
                    </div>
                </div>
            </footer>
        </LayoutInterno>
    )
}