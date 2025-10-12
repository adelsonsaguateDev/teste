'use client';

import Link from 'next/link';
import { MapPin, Building2, Eye } from 'lucide-react';

interface CardSalaProps {
  id: number;
  No_Sala: string;
  Andar: string;
  Em_Uso: string;
  imagens?: any[];
  showDetailsButton?: boolean;
}

export default function CardSala({
  id,
  No_Sala,
  Andar,
  Em_Uso,
  imagens = [],
  showDetailsButton = true
}: CardSalaProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            Sala {No_Sala}
          </h3>
          <p className="text-gray-600 flex items-center gap-2">
            <Building2 size={16} />
            {Andar}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            Em_Uso === 'Sim'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {Em_Uso === 'Sim' ? 'Em uso' : 'Não em uso'}
        </span>
      </div>

      {imagens && imagens.length > 0 && (
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
          <span>📷 {imagens.length} {imagens.length === 1 ? 'foto' : 'fotos'}</span>
        </div>
      )}

      {showDetailsButton && (
        <Link
          href={`/sala/${id}`}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <Eye size={20} />
          Ver detalhes da sala
        </Link>
      )}
    </div>
  );
}
