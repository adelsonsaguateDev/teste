import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

/**
 * GET /api/salas
 * Lista todas as salas com suas imagens
 *
 * Query params:
 * - limit: número máximo de salas (padrão: 100)
 * - localID: filtrar por local
 * - provinciaID: filtrar por província
 * - Em_Uso: filtrar por uso (Sim/Não)
 *
 * Exemplos:
 * - GET /api/salas
 * - GET /api/salas?limit=10
 * - GET /api/salas?localID=1
 * - GET /api/salas?Em_Uso=Sim
 * - GET /api/salas?localID=1&provinciaID=1&Em_Uso=Sim
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const localID = searchParams.get('localID');
    const provinciaID = searchParams.get('provinciaID');
    const emUso = searchParams.get('Em_Uso');

    // Buscar salas com filtros
    let sqlSalas = `SELECT * FROM salas WHERE estado = 1`;
    const params: any[] = [];

    // Adicionar filtros se fornecidos
    if (localID) {
      sqlSalas += ` AND localID = ?`;
      params.push(parseInt(localID));
    }

    if (provinciaID) {
      sqlSalas += ` AND provinciaID = ?`;
      params.push(parseInt(provinciaID));
    }

    if (emUso) {
      sqlSalas += ` AND Em_Uso = ?`;
      params.push(emUso);
    }

    // LIMIT não funciona bem com prepared statements em algumas versões do MySQL
    // Por isso, usar valor direto (já validado como número)
    sqlSalas += ` ORDER BY id DESC LIMIT ${limit}`;

    const salas: any = await query(sqlSalas, params);

    // Se não houver salas, retornar vazio
    if (!salas || salas.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        count: 0,
        filters: {
          localID: localID || null,
          provinciaID: provinciaID || null,
          Em_Uso: emUso || null
        }
      });
    }

    // Buscar todas as imagens das salas encontradas
    const salaIds = salas.map((s: any) => s.id);
    const placeholders = salaIds.map(() => '?').join(',');
    const sqlImagens = `
      SELECT * FROM sala_imagens
      WHERE sala_id IN (${placeholders}) AND estado = 1
      ORDER BY sala_id, principal DESC, ordem ASC
    `;
    const imagens: any = await query(sqlImagens, salaIds);

    // Agrupar imagens por sala_id
    const imagensPorSala: { [key: number]: any[] } = {};
    imagens.forEach((img: any) => {
      if (!imagensPorSala[img.sala_id]) {
        imagensPorSala[img.sala_id] = [];
      }
      imagensPorSala[img.sala_id].push(img);
    });

    // Combinar salas com suas imagens
    const salasProcessadas = salas.map((sala: any) => ({
      ...sala,
      imagens: imagensPorSala[sala.id] || []
    }));

    return NextResponse.json({
      success: true,
      data: salasProcessadas,
      count: salasProcessadas.length,
      filters: {
        localID: localID || null,
        provinciaID: provinciaID || null,
        Em_Uso: emUso || null
      }
    });

  } catch (error: any) {
    console.error('Erro ao buscar salas:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao buscar salas',
      error: error.message
    }, { status: 500 });
  }
}
