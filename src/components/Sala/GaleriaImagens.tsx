'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageUrl } from '@/lib/storage';

interface Imagem {
  id: number;
  nome_arquivo: string;
  caminho_arquivo: string;
  descricao?: string | null;
  principal: number;
}

interface GaleriaImagensProps {
  imagens: Imagem[];
  nomeSala: string;
}

export default function GaleriaImagens({ imagens, nomeSala }: GaleriaImagensProps) {
  const [imagemSelecionada, setImagemSelecionada] = useState<number | null>(null);

  if (!imagens || imagens.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <p className="text-gray-600 text-lg">
          📷 Nenhuma imagem disponível para esta sala
        </p>
      </div>
    );
  }

  const abrirImagem = (index: number) => {
    setImagemSelecionada(index);
  };

  const fecharImagem = () => {
    setImagemSelecionada(null);
  };

  const proximaImagem = () => {
    if (imagemSelecionada !== null && imagemSelecionada < imagens.length - 1) {
      setImagemSelecionada(imagemSelecionada + 1);
    }
  };

  const imagemAnterior = () => {
    if (imagemSelecionada !== null && imagemSelecionada > 0) {
      setImagemSelecionada(imagemSelecionada - 1);
    }
  };

  return (
    <>
      {/* Grid de miniaturas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {imagens.map((imagem, index) => (
          <button
            key={imagem.id}
            onClick={() => abrirImagem(index)}
            className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label={`Ver imagem ${index + 1} da sala ${nomeSala}${imagem.descricao ? `: ${imagem.descricao}` : ''}`}
          >
            <Image
              src={getImageUrl(imagem.caminho_arquivo)}
              alt={imagem.descricao || `Foto ${index + 1} da sala ${nomeSala}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {imagem.principal === 1 && (
              <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                Principal
              </span>
            )}
            {imagem.descricao && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-sm">
                {imagem.descricao}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Modal de visualização em tela cheia */}
      {imagemSelecionada !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={fecharImagem}
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de imagem em tela cheia"
        >
          {/* Botão fechar */}
          <button
            onClick={fecharImagem}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 focus:outline-none focus:ring-4 focus:ring-white z-10"
            aria-label="Fechar visualizador"
          >
            <X size={32} />
          </button>

          {/* Contador de imagens */}
          <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 rounded-full px-4 py-2 text-lg font-semibold">
            {imagemSelecionada + 1} / {imagens.length}
          </div>

          {/* Imagem atual */}
          <div
            className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getImageUrl(imagens[imagemSelecionada].caminho_arquivo)}
              alt={imagens[imagemSelecionada].descricao || `Foto ${imagemSelecionada + 1} da sala ${nomeSala}`}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Descrição da imagem */}
          {imagens[imagemSelecionada].descricao && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-70 rounded-lg px-6 py-3 text-lg max-w-2xl">
              {imagens[imagemSelecionada].descricao}
            </div>
          )}

          {/* Botão anterior */}
          {imagemSelecionada > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                imagemAnterior();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 focus:outline-none focus:ring-4 focus:ring-white"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={40} />
            </button>
          )}

          {/* Botão próxima */}
          {imagemSelecionada < imagens.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                proximaImagem();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 focus:outline-none focus:ring-4 focus:ring-white"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={40} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
