'use client'

import { useState, useEffect } from 'react'
import LayoutInterno from '@/components/Layout/LayoutInterno'
import { useAuth } from '@/context/AuthContext'
import { Calendar, Clock, MapPin, Building, BookOpen, User, Download, Share2, Bell } from 'lucide-react'

type DadosCandidato = {
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
}

const dadosCandidatos: DadosCandidato[] = [
    {
        codigo: '12345',
        nome: 'João Silva',
        curso: 'Engenharia Informática',
        sala: 'Sala A1',
        bloco: 'Bloco A',
        data: '2025-07-15',
        hora: '08:00',
        duracao: '3 horas',
        material: 'Calculadora científica permitida',
        observacoes: 'Chegar 30 minutos antes do início',
        status: 'confirmado'
    },
    {
        codigo: '67890',
        nome: 'Maria Santos',
        curso: 'Direito',
        sala: 'Sala B2',
        bloco: 'Bloco B',
        data: '2025-07-15',
        hora: '10:00',
        duracao: '4 horas',
        material: 'Apenas caneta azul ou preta',
        observacoes: 'Documento de identificação obrigatório',
        status: 'confirmado'
    },
]

export default function DetalhesExame() {
    const { codigo } = useAuth()
    const [dados, setDados] = useState<DadosCandidato | null>(null)
    const [loading, setLoading] = useState(true)
    const [tempoRestante, setTempoRestante] = useState('')

    useEffect(() => {
        // Simular carregamento
        setTimeout(() => {
            const candidato = dadosCandidatos.find((c) => c.codigo === codigo)
            setDados(candidato || null)
            setLoading(false)
        }, 500)
    }, [codigo])

    useEffect(() => {
        if (dados) {
            const calcularTempoRestante = () => {
                const agora = new Date()
                const dataExame = new Date(`${dados.data}T${dados.hora}:00`)
                const diferenca = dataExame.getTime() - agora.getTime()

                if (diferenca > 0) {
                    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24))
                    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60))

                    setTempoRestante(`${dias}d ${horas}h ${minutos}m`)
                } else {
                    setTempoRestante('Exame em andamento ou finalizado')
                }
            }

            calcularTempoRestante()
            const intervalo = setInterval(calcularTempoRestante, 60000) // Atualizar a cada minuto

            return () => clearInterval(intervalo)
        }
    }, [dados])

    const formatarData = (data: string) => {
        return new Date(data).toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const adicionarLembrete = () => {
        if (dados) {
            // Aqui você implementaria a lógica para adicionar ao calendário
            // const evento = {
            //     title: `Exame - ${dados.curso}`,
            //     start: new Date(`${dados.data}T${dados.hora}:00`),
            //     description: `Local: ${dados.sala}, ${dados.bloco}`
            // }
            alert('Funcionalidade de lembrete será implementada')
        }
    }

    const compartilhar = async () => {
        if (navigator.share && dados) {
            try {
                await navigator.share({
                    title: 'Detalhes do Exame',
                    text: `Exame de ${dados.curso} - ${formatarData(dados.data)} às ${dados.hora}`,
                    url: window.location.href
                })
            } catch (error) {
                console.log('Erro ao compartilhar:', error)
            }
        }
    }

    if (loading) {
        return (
            <LayoutInterno>
                <div className="max-w-4xl mx-auto mt-8">
                    <div className="bg-white shadow-lg rounded-2xl p-8 animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
            </LayoutInterno>
        )
    }

    if (!dados) {
        return (
            <LayoutInterno>
                <div className="max-w-4xl mx-auto mt-8">
                    <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
                        <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                            <User className="w-12 h-12 text-red-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Dados Não Encontrados</h1>
                        <p className="text-gray-600 mb-6">
                            Não foram encontrados dados de exame para o código fornecido.
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                            Verificar Código
                        </button>
                    </div>
                </div>
            </LayoutInterno>
        )
    }

    return (
        <LayoutInterno>
            <div className="max-w-4xl mx-auto mt-8 space-y-6">
                {/* Header com countdown */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Detalhes do Exame</h1>
                            <p className="text-blue-100 text-lg">{dados.nome}</p>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                                <p className="text-sm text-blue-100 mb-1">Tempo restante</p>
                                <p className="text-2xl font-bold">{tempoRestante}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Informações principais */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <Calendar className="w-6 h-6 mr-2 text-blue-600" />
                            Informações do Exame
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                                <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-600">Curso</p>
                                    <p className="font-semibold text-gray-800">{dados.curso}</p>
                                </div>
                            </div>

                            <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                                <Calendar className="w-5 h-5 text-green-600 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-600">Data</p>
                                    <p className="font-semibold text-gray-800">{formatarData(dados.data)}</p>
                                </div>
                            </div>

                            <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                                <Clock className="w-5 h-5 text-orange-600 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-600">Horário</p>
                                    <p className="font-semibold text-gray-800">{dados.hora} • {dados.duracao}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <MapPin className="w-6 h-6 mr-2 text-red-600" />
                            Local do Exame
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                                <Building className="w-5 h-5 text-red-600 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-600">Bloco</p>
                                    <p className="font-semibold text-gray-800">{dados.bloco}</p>
                                </div>
                            </div>

                            <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                                <MapPin className="w-5 h-5 text-purple-600 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-600">Sala</p>
                                    <p className="font-semibold text-gray-800">{dados.sala}</p>
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <div className="flex items-start">
                                    <User className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-blue-800 font-medium mb-1">Código do Candidato</p>
                                        <p className="text-lg font-bold text-blue-900">{dados.codigo}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instruções importantes */}
                <div className="bg-white shadow-lg rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Instruções Importantes</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
                            <h3 className="font-semibold text-yellow-800 mb-2">Material Permitido</h3>
                            <p className="text-yellow-700">{dados.material}</p>
                        </div>

                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
                            <h3 className="font-semibold text-red-800 mb-2">Observações</h3>
                            <p className="text-red-700">{dados.observacoes}</p>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-green-800 font-medium">Status: Confirmado</span>
                        </div>
                    </div>
                </div>

                {/* Ações */}
                <div className="bg-white shadow-lg rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Ações Rápidas</h2>

                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={adicionarLembrete}
                            className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                        >
                            <Bell className="w-5 h-5 mr-2" />
                            Adicionar Lembrete
                        </button>

                        <button
                            onClick={compartilhar}
                            className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
                        >
                            <Share2 className="w-5 h-5 mr-2" />
                            Compartilhar
                        </button>

                        <button className="flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors">
                            <Download className="w-5 h-5 mr-2" />
                            Baixar PDF
                        </button>
                    </div>
                </div>
            </div>
        </LayoutInterno>
    )
}