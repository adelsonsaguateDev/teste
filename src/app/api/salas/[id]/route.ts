import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

/**
 * GET /api/salas/[id]
 * Busca uma sala específica por ID com todas as suas imagens
 *
 * Exemplo:
 * - GET /api/salas/1
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Buscar a sala
    const sqlSala = `SELECT * FROM salas WHERE id = ? AND estado = 1`;
    const salas: any = await query(sqlSala, [id]);

    if (!salas || salas.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Sala não encontrada'
      }, { status: 404 });
    }

    const sala = salas[0];

    // Buscar as imagens da sala
    const sqlImagens = `
      SELECT * FROM sala_imagens
      WHERE sala_id = ? AND estado = 1
      ORDER BY principal DESC, ordem ASC
    `;
    const imagens: any = await query(sqlImagens, [id]);

    // Combinar sala com suas imagens
    const salaProcessada = {
      ...sala,
      imagens: imagens || []
    };

    return NextResponse.json({
      success: true,
      data: salaProcessada
    });

  } catch (error: any) {
    console.error('Erro ao buscar sala:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao buscar sala',
      error: error.message
    }, { status: 500 });
  }
}
