'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Building2, Layers, ArrowLeft, Loader2 } from 'lucide-react';
import GaleriaImagens from '@/components/Sala/GaleriaImagens';

interface Sala {
  id: number;
  localID: number;
  provinciaID: number;
  No_Sala: string;
  Andar: string;
  Em_Uso: string;
  latitude: number;
  longitute: number;
  caminho_ficheiro: string;
  imagens: {
    id: number;
    nome_arquivo: string;
    caminho_arquivo: string;
    descricao?: string | null;
    principal: number;
  }[];
}

export default function DetalhesSalaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [sala, setSala] = useState<Sala | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const buscarSala = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/salas/${id}`);
        const data = await response.json();

        if (data.success) {
          setSala(data.data);
        } else {
          setErro('Sala não encontrada');
        }
      } catch (error) {
        setErro('Erro ao carregar detalhes da sala');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    buscarSala();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Carregando detalhes da sala...</p>
        </div>
      </div>
    );
  }

  if (erro || !sala) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {erro || 'Sala não encontrada'}
          </h1>
          <p className="text-gray-600 mb-6">
            Não foi possível encontrar as informações desta sala.
          </p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com botão voltar */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-2"
            aria-label="Voltar para página anterior"
          >
            <ArrowLeft size={24} />
            <span className="text-lg font-semibold">Voltar</span>
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Cabeçalho da sala */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Sala {sala.No_Sala}
              </h1>
              <p className="text-xl text-gray-600">
                {sala.Andar}
              </p>
            </div>
            <span
              className={`px-6 py-3 rounded-full text-lg font-semibold ${
                sala.Em_Uso === 'Sim'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {sala.Em_Uso === 'Sim' ? '✓ Em uso' : 'Não está em uso'}
            </span>
          </div>

          {/* Informações da sala */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
              <Building2 className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-gray-600 mb-1">Número da Sala</p>
                <p className="text-2xl font-bold text-gray-900">{sala.No_Sala}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
              <Layers className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-gray-600 mb-1">Andar</p>
                <p className="text-2xl font-bold text-gray-900">{sala.Andar}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
              <MapPin className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-gray-600 mb-1">Localização</p>
                <p className="text-lg font-semibold text-gray-900">
                  {sala.latitude.toFixed(4)}, {sala.longitute.toFixed(4)}
                </p>
              </div>
            </div>
          </div>

          {/* Dica de acessibilidade */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-yellow-800">
              <span className="font-semibold">💡 Dica:</span> Clique nas imagens abaixo para vê-las em tamanho maior e facilitar a identificação da sala.
            </p>
          </div>
        </div>

        {/* Galeria de imagens */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            📸 Fotos da Sala
          </h2>
          <GaleriaImagens imagens={sala.imagens} nomeSala={sala.No_Sala} />
        </div>

        {/* Botão para ver no mapa */}
        {sala.latitude !== 0 && sala.longitute !== 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push(`/mapa?salaId=${sala.id}`)}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-xl font-semibold inline-flex items-center gap-3 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <MapPin size={24} />
              Ver localização no mapa
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
