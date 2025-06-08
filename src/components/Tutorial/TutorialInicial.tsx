'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  Home,
  MapPin,
  FileText,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
  X,
  Lightbulb,
  Navigation,
  AlertTriangle
} from 'lucide-react'

const passos = [
  {
    id: 'boas-vindas',
    titulo: 'Bem-vindo ao Portal do Candidato!',
    descricao: 'O teu guia digital para o exame de admissão da UPM. Vamos mostrar-te como usar todas as funcionalidades.',
    icon: Home,
    cor: 'from-blue-500 to-blue-600',
    dica: 'Este tutorial aparece apenas uma vez. Podes sempre revisitar as funcionalidades no menu.',
    visual: (
      <div className="relative w-16 h-16 mx-auto">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Image
            src="/logo_up.png"
            alt="UP"
            width={32}
            height={32}
            className="object-contain filter brightness-0 invert"
          />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-blue-900">✨</span>
        </div>
      </div>
    )
  },
  {
    id: 'navegacao',
    titulo: 'Navegação Simples e Intuitiva',
    descricao: 'O menu principal tem três secções essenciais. A página ativa fica destacada para saberes sempre onde estás.',
    icon: Navigation,
    cor: 'from-green-500 to-green-600',
    dica: 'O link ativo fica com fundo azul e ícone dourado. Muito fácil de identificar!',
    visual: (
      <div className="space-y-2">
        <div className="flex items-center gap-2 p-2 bg-blue-600 text-white rounded-lg text-sm">
          <Home className="w-4 h-4 text-yellow-300" />
          <span className="font-medium">Início</span>
          <div className="ml-auto w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse"></div>
        </div>
        <div className="flex items-center gap-2 p-2 bg-gray-100 text-gray-600 rounded-lg text-sm">
          <MapPin className="w-4 h-4" />
          <span>Mapa</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-gray-100 text-gray-600 rounded-lg text-sm">
          <FileText className="w-4 h-4" />
          <span>Detalhes</span>
        </div>
      </div>
    )
  },
  {
    id: 'localizacao',
    titulo: 'Encontra a Tua Sala de Exame',
    descricao: 'O mapa interativo mostra-te exactamente onde fica a tua sala. Com rotas passo-a-passo desde a entrada.',
    icon: MapPin,
    cor: 'from-purple-500 to-purple-600',
    dica: 'Podes ampliar o mapa, ver detalhes da sala e até calcular o tempo de caminhada.',
    visual: (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 rounded-lg">
        <div className="w-full h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg relative overflow-hidden">
          <div className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-purple-600" />
          </div>
          <div className="absolute top-1/2 left-1/4 w-0.5 h-6 bg-purple-400 rounded transform -rotate-12"></div>
        </div>
        <p className="text-xs text-gray-600 mt-1 text-center">Mapa do Campus</p>
      </div>
    )
  },
  {
    id: 'detalhes',
    titulo: 'Informações Completas do Exame',
    descricao: 'Horários, documentos necessários, regras importantes e tudo que precisas saber para o dia do exame.',
    icon: FileText,
    cor: 'from-orange-500 to-orange-600',
    dica: 'Guarda bem o teu código de candidato. Vais precisar dele no dia do exame!',
    visual: (
      <div className="space-y-2">
        <div className="bg-yellow-50 border border-yellow-200 p-2 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-3 h-3 text-orange-600" />
            <span className="text-xs font-medium text-orange-800">Horário</span>
          </div>
          <p className="text-xs text-orange-700">8:00 - 12:00</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-2 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-3 h-3 text-blue-600" />
            <span className="text-xs font-medium text-blue-800">Documentos</span>
          </div>
          <p className="text-xs text-blue-700">BI ou Passaporte</p>
        </div>
      </div>
    )
  },
  {
    id: 'seguranca',
    titulo: 'Segurança e Sessão Temporizada',
    descricao: 'A tua sessão é segura e tem tempo limitado. Ficas sempre informado sobre o tempo restante.',
    icon: Shield,
    cor: 'from-red-500 to-red-600',
    dica: 'Se a sessão expirar, simplesmente faz login novamente com o teu código.',
    visual: (
      <div className="space-y-2">
        <div className="bg-green-50 border border-green-200 p-2 rounded-lg">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-green-800">Conexão Segura</span>
            <CheckCircle className="w-3 h-3 text-green-600 ml-auto" />
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-2 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium text-blue-800">Sessão: 25min</span>
            <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'dicas-finais',
    titulo: 'Dicas Importantes para o Sucesso',
    descricao: 'Algumas recomendações essenciais para garantires que tudo corre bem no dia do exame.',
    icon: Lightbulb,
    cor: 'from-yellow-500 to-yellow-600',
    dica: 'Estas dicas podem fazer a diferença entre chegar a tempo ou chegar atrasado!',
    visual: (
      <div className="space-y-2">
        <div className="flex items-start gap-2 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
          <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <p className="text-xs font-medium text-yellow-800">Chega 30min antes</p>
            <p className="text-xs text-yellow-700">Para te orientares</p>
          </div>
        </div>
        <div className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <p className="text-xs font-medium text-blue-800">Usa o mapa antes</p>
            <p className="text-xs text-blue-700">Familiariza-te</p>
          </div>
        </div>
      </div>
    )
  }
]

export default function TutorialInicial({ onFechar }: { onFechar: () => void }) {
  const [etapa, setEtapa] = useState(0)
  const [mostrarResumo, setMostrarResumo] = useState(false)

  const proximo = () => {
    if (etapa < passos.length - 1) {
      setEtapa(etapa + 1)
    } else {
      setMostrarResumo(true)
    }
  }

  const anterior = () => {
    if (etapa > 0) {
      setEtapa(etapa - 1)
    }
  }

  const finalizar = () => {
    localStorage.setItem('tutorial_visto', 'true')
    onFechar()
  }

  const pular = () => {
    localStorage.setItem('tutorial_visto', 'true')
    onFechar()
  }

  const progressoPercentual = ((etapa + 1) / passos.length) * 100

  if (mostrarResumo) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl text-center space-y-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Tutorial Completo!</h2>
              <p className="text-gray-600">
                Agora já sabes como usar o portal. Boa sorte no teu exame!
              </p>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2 text-sm">Lembra-te:</h3>
              <ul className="text-xs text-blue-700 space-y-1 text-left">
                <li>• Explora o mapa antes do dia do exame</li>
                <li>• Verifica os detalhes e horários</li>
                <li>• Chega com 30 minutos de antecedência</li>
                <li>• Mantém o teu código seguro</li>
              </ul>
            </div>

            <button
              onClick={finalizar}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg text-sm"
            >
              Começar a usar o Portal
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  const IconComponent = passos[etapa].icon

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          key={etapa}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl relative"
        >
          {/* Botão de fechar */}
          <button
            onClick={pular}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Pular tutorial"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Barra de progresso */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Passo {etapa + 1} de {passos.length}
              </span>
              <span className="text-sm text-gray-500">{Math.round(progressoPercentual)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressoPercentual}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Ícone e visual */}
          <div className="text-center mb-4">
            {passos[etapa].visual}
          </div>

          {/* Conteúdo */}
          <div className="text-center space-y-3 mb-6">
            <div className={`w-12 h-12 bg-gradient-to-br ${passos[etapa].cor} rounded-xl flex items-center justify-center mx-auto shadow-lg`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              {passos[etapa].titulo}
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed">
              {passos[etapa].descricao}
            </p>

            {/* Dica */}
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-medium text-yellow-800 mb-1">Dica:</p>
                  <p className="text-xs text-yellow-700">{passos[etapa].dica}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botões de navegação */}
          <div className="flex gap-2 mb-4">
            {etapa > 0 && (
              <button
                onClick={anterior}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
              >
                Anterior
              </button>
            )}

            <button
              onClick={proximo}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg flex items-center justify-center gap-2 text-sm"
            >
              <span>{etapa < passos.length - 1 ? 'Próximo' : 'Finalizar'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Indicadores de passo */}
          <div className="flex justify-center gap-1.5">
            {passos.map((_, index) => (
              <button
                key={index}
                onClick={() => setEtapa(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${index === etapa
                    ? 'bg-blue-600 scale-125'
                    : index < etapa
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}