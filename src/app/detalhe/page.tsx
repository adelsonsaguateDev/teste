'use client'

import { useState, useEffect } from 'react'
import LayoutInterno from '@/components/Layout/LayoutInterno'
import { useAuth } from '@/context/AuthContext'
import {
    Calendar,
    Clock,
    MapPin,
    Building,
    BookOpen,
    User,
    Download,
    Share2,
    Bell,
    CheckCircle,
    AlertTriangle,
    FileText,
    Navigation,
    Shield,
    Info,
    ExternalLink,
    Timer,
    Badge
} from 'lucide-react'
import Footer from '@/components/Layout/Footer'

interface DadosCandidato {
    codigo: string
    nome: string
    curso: string
    sala: string
    bloco: string
    data: string
    hora: string
    duracao: string
    material: string
    observacoes: string
    status: string
    telefoneContato?: string
    emailContato?: string
    instrucoesEspeciais?: string[]
    documentosNecessarios?: string[]
}

const dadosCandidatos: DadosCandidato[] = [
    {
        codigo: '12345',
        nome: 'João Silva Santos',
        curso: 'Engenharia Informática',
        sala: 'Sala A1',
        bloco: 'Bloco A - Piso Térreo',
        data: '2025-07-15',
        hora: '08:00',
        duracao: '3 horas',
        material: 'Calculadora científica permitida (sem programação)',
        observacoes: 'Chegar 30 minutos antes do início do exame',
        status: 'confirmado',
        telefoneContato: '+258 21 401 000',
        emailContato: 'candidatos@up.ac.mz',
        instrucoesEspeciais: [
            'Apresentar documento de identificação original',
            'Não é permitido uso de telemóveis durante o exame',
            'Material de escrita será fornecido pela instituição',
            'Intervalos não são permitidos durante o exame'
        ],
        documentosNecessarios: [
            'Bilhete de Identidade ou Passaporte',
            'Comprovativo de inscrição (impresso ou digital)',
            'Calculadora científica (se aplicável ao curso)'
        ]
    },
    {
        codigo: '67890',
        nome: 'Maria Santos Benedita',
        curso: 'Direito',
        sala: 'Sala B2',
        bloco: 'Bloco B - 1º Andar',
        data: '2025-07-15',
        hora: '10:00',
        duracao: '4 horas',
        material: 'Apenas caneta azul ou preta',
        observacoes: 'Documento de identificação obrigatório',
        status: 'confirmado',
        telefoneContato: '+258 21 401 000',
        emailContato: 'candidatos@up.ac.mz',
        instrucoesEspeciais: [
            'Exame dissertativo - use apenas caneta',
            'Não é permitido uso de corretivo',
            'Leia todas as questões antes de começar',
            'Gerir bem o tempo disponível'
        ],
        documentosNecessarios: [
            'Bilhete de Identidade ou Passaporte',
            'Comprovativo de inscrição',
            'Caneta azul ou preta'
        ]
    },
]

export default function DetalhesExameMelhorado() {
    const { codigo } = useAuth()
    const [dados, setDados] = useState<DadosCandidato | null>(null)
    const [loading, setLoading] = useState(true)
    const [tempoRestante, setTempoRestante] = useState('')
    const [diasRestantes, setDiasRestantes] = useState(0)

    useEffect(() => {
        // Simular carregamento
        const timer = setTimeout(() => {
            const candidato = dadosCandidatos.find((c) => c.codigo === codigo) || null
            setDados(candidato)
            setLoading(false)
        }, 800)

        return () => clearTimeout(timer)
    }, [codigo])

    useEffect(() => {
        if (!dados) return

        const calcularTempoRestante = () => {
            const agora = new Date()
            const dataExame = new Date(`${dados.data}T${dados.hora}:00`)
            const diferenca = dataExame.getTime() - agora.getTime()

            if (diferenca > 0) {
                const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24))
                const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60))

                setDiasRestantes(dias)
                setTempoRestante(`${dias}d ${horas}h ${minutos}m`)
            } else {
                setTempoRestante('Exame em andamento ou finalizado')
                setDiasRestantes(0)
            }
        }

        calcularTempoRestante()
        const intervalo = setInterval(calcularTempoRestante, 60000)

        return () => clearInterval(intervalo)
    }, [dados])

    const formatarData = (data: string): string => {
        return new Date(data).toLocaleDateString('pt-PT', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const adicionarLembrete = (): void => {
        if (!dados) return

        // Simular adição ao calendário
        const confirmacao = confirm(`Adicionar lembrete para o exame de ${dados.curso} no dia ${formatarData(dados.data)}?`)
        if (confirmacao) {
            alert('Lembrete adicionado com sucesso! Receberás uma notificação 1 hora antes do exame.')
        }
    }

    const compartilhar = async (): Promise<void> => {
        if (!dados) return

        const textoParaCompartilhar = `Exame de ${dados.curso} - ${formatarData(dados.data)} às ${dados.hora} na ${dados.sala}, ${dados.bloco}`

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Detalhes do Exame - UPM',
                    text: textoParaCompartilhar,
                    url: window.location.href
                })
            } catch (shareError) {
                // Se o compartilhamento for cancelado ou falhar, tentar copiar
                console.log(shareError)
                await copiarParaAreaTransferencia(textoParaCompartilhar)
            }
        } else {
            // Fallback para navegadores que não suportam Web Share API
            await copiarParaAreaTransferencia(textoParaCompartilhar)
        }
    }

    const copiarParaAreaTransferencia = async (texto: string): Promise<void> => {
        try {
            await navigator.clipboard.writeText(texto)
            alert('Informações copiadas para a área de transferência!')
        } catch (clipboardError) {
            console.error('Erro ao copiar:', clipboardError)
            alert('Não foi possível copiar as informações')
        }
    }

    const baixarPDF = (): void => {
        alert('Funcionalidade de download será implementada em breve')
    }

    const navegarParaMapa = (): void => {
        // Implementar navegação para o mapa
        window.location.href = '/mapa'
    }

    if (loading) {
        return (
            <LayoutInterno>
                <div className="w-full px-4 py-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Header skeleton */}
                        <div className="bg-gray-200 rounded-2xl h-32 animate-pulse"></div>

                        {/* Cards skeleton */}
                        <div className="grid lg:grid-cols-3 gap-6">
                            <div className="bg-gray-200 rounded-2xl h-64 animate-pulse"></div>
                            <div className="bg-gray-200 rounded-2xl h-64 animate-pulse"></div>
                            <div className="bg-gray-200 rounded-2xl h-64 animate-pulse"></div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6">
                            <div className="bg-gray-200 rounded-2xl h-48 animate-pulse"></div>
                            <div className="bg-gray-200 rounded-2xl h-48 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </LayoutInterno>
        )
    }

    if (!dados) {
        return (
            <LayoutInterno>
                <div className="w-full px-4 py-8 min-h-[70vh] flex items-center justify-center">
                    <div className="max-w-lg mx-auto bg-white shadow-xl rounded-2xl p-8 text-center">
                        <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-12 h-12 text-red-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Dados Não Encontrados</h1>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Não foram encontrados dados de exame para o código <strong>{codigo}</strong>.
                            Verifica se o código está correto ou contacta o suporte.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Tentar Novamente
                            </button>
                            <p className="text-sm text-gray-500">
                                Suporte: candidatos@up.ac.mz | +258 21 401 000
                            </p>
                        </div>
                    </div>
                </div>
            </LayoutInterno>
        )
    }

    return (
        <LayoutInterno>
            <div className="w-full px-4 py-6">
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* Header Hero simplificado */}
                    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="relative p-6 sm:p-8">
                            {/* Elementos decorativos */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>

                            <div className="relative">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-yellow-300" />
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Informações Importantes</h1>
                                </div>
                                <p className="text-blue-100 text-sm sm:text-base ml-15">
                                    Consulte todas as informações essenciais para o seu exame
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PRIORIDADE 1: Local do Exame */}
                    <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-red-600">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Local do Exame</h2>
                                <p className="text-sm text-gray-600">Onde realizar o seu exame</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center p-5 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                                    <Building className="w-8 h-8 text-red-600 mr-4 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm text-red-700 font-medium mb-1">Bloco</p>
                                        <p className="text-xl font-bold text-red-900">{dados.bloco}</p>
                                    </div>
                                </div>

                                <div className="flex items-center p-5 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                                    <MapPin className="w-8 h-8 text-purple-600 mr-4 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm text-purple-700 font-medium mb-1">Sala</p>
                                        <p className="text-xl font-bold text-purple-900">{dados.sala}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Navigation className="w-5 h-5 text-blue-600" />
                                        <h3 className="font-semibold text-blue-800">Como Chegar</h3>
                                    </div>
                                    <button
                                        onClick={navegarParaMapa}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                                    >
                                        <MapPin className="w-5 h-5" />
                                        Ver Localização no Mapa
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                                        <span className="text-sm font-bold text-yellow-800">Importante!</span>
                                    </div>
                                    <p className="text-sm text-yellow-700 leading-relaxed">
                                        Chegue com antecedência ao local do exame para evitar contratempos
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PRIORIDADE 2: Documentos Necessários */}
                    <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-purple-600">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <FileText className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Documentos Obrigatórios</h2>
                                <p className="text-sm text-gray-600">Leve no dia do exame</p>
                            </div>
                        </div>

                        {dados.documentosNecessarios && dados.documentosNecessarios.length > 0 ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {dados.documentosNecessarios.map((documento, index) => (
                                    <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                                        <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-800 font-medium leading-relaxed">{documento}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-gray-500">Nenhum documento específico listado</p>
                            </div>
                        )}
                    </div>

                    {/* PRIORIDADE 3: Regras e Material Permitido */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Regras do Exame */}
                        {dados.instrucoesEspeciais && dados.instrucoesEspeciais.length > 0 && (
                            <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-600">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <Info className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">Regras do Exame</h2>
                                        <p className="text-sm text-gray-600">Leia com atenção</p>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    {dados.instrucoesEspeciais.map((instrucao, index) => (
                                        <li key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700 leading-relaxed">{instrucao}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Material Permitido */}
                        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-yellow-600">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Material Permitido</h2>
                                    <p className="text-sm text-gray-600">O que pode levar</p>
                                </div>
                            </div>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                                <p className="text-gray-800 leading-relaxed font-medium">{dados.material}</p>
                            </div>
                        </div>
                    </div>

                    {/* PRIORIDADE 4: Ações Úteis */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Ações Úteis</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                            <button
                                onClick={adicionarLembrete}
                                className="flex flex-col items-center gap-3 p-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                                type="button"
                            >
                                <Bell className="w-7 h-7" />
                                <span>Adicionar Lembrete</span>
                            </button>

                            <button
                                onClick={compartilhar}
                                className="flex flex-col items-center gap-3 p-5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                                type="button"
                            >
                                <Share2 className="w-7 h-7" />
                                <span>Compartilhar</span>
                            </button>

                            <button
                                onClick={baixarPDF}
                                className="flex flex-col items-center gap-3 p-5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                                type="button"
                            >
                                <Download className="w-7 h-7" />
                                <span>Baixar PDF</span>
                            </button>
                        </div>
                    </div>

                    {/* PRIORIDADE 5: Contactos de Suporte (Final da página) */}
                    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <Shield className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Precisa de Ajuda?</h2>
                                <p className="text-sm text-gray-600">Entre em contacto connosco</p>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                                <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                                    <Info className="w-5 h-5" />
                                    Contactos
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        <span className="text-green-700 font-medium">📞 {dados.telefoneContato || '+258 21 401 000'}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        <span className="text-green-700 font-medium">✉️ {dados.emailContato || 'candidatos@up.ac.mz'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                                <h3 className="font-semibold text-blue-800 mb-4">Horário de Atendimento</h3>
                                <div className="text-sm text-blue-700 space-y-2">
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        Segunda a Sexta: 8h00 - 17h00
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        Sábado: 8h00 - 12h00
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                        Domingo: Fechado
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </LayoutInterno>
    )
}