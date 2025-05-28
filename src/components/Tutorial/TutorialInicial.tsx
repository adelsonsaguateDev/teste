'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const passos = [
  {
    titulo: 'Bem-vindo ao Portal!',
    descricao: 'Aqui vais encontrar tudo o que precisas para o dia do exame.',
  },
  {
    titulo: 'Localização da Sala',
    descricao: 'Podes ver no mapa onde será realizada a tua prova.',
  },
  {
    titulo: 'Simples e Acessível',
    descricao: 'O portal foi feito para todos. É rápido, intuitivo e seguro.',
  },
]

export default function TutorialInicial({ onFechar }: { onFechar: () => void }) {
  const [etapa, setEtapa] = useState(0)

  const proximo = () => {
    if (etapa < passos.length - 1) {
      setEtapa(etapa + 1)
    } else {
      localStorage.setItem('tutorial_visto', 'true')
      onFechar()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          key={etapa}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl text-center space-y-6"
        >
          <h2 className="text-2xl font-bold text-blue-800">{passos[etapa].titulo}</h2>
          <p className="text-gray-700 text-lg">{passos[etapa].descricao}</p>
          <button
            onClick={proximo}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            {etapa < passos.length - 1 ? 'Próximo' : 'Começar'}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
