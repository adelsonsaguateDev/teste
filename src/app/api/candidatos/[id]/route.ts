import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

/**
 * GET /api/candidatos/[id]
 * Busca um candidato específico por ID
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // ALTERE 'users' para o nome correto da tabela no seu banco Laravel
    const sql = `SELECT * FROM users WHERE id = ?`;
    const result: any = await query(sql, [id]);

    if (!result || result.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Candidato não encontrado'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: result[0]
    });

  } catch (error: any) {
    console.error('Erro ao buscar candidato:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao buscar candidato',
      error: error.message
    }, { status: 500 });
  }
}

/**
 * PUT /api/candidatos/[id]
 * Atualiza um candidato específico
 *
 * Body exemplo:
 * {
 *   "name": "João Silva Atualizado",
 *   "email": "joao.novo@example.com"
 * }
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Construir dinamicamente o UPDATE baseado nos campos fornecidos
    const fields = Object.keys(body);
    if (fields.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Nenhum campo para atualizar'
      }, { status: 400 });
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const values = fields.map(field => body[field]);

    // ALTERE 'users' para o nome correto da tabela no seu banco Laravel
    const sql = `UPDATE users SET ${setClause}, updated_at = NOW() WHERE id = ?`;
    const result = await query(sql, [...values, id]);

    return NextResponse.json({
      success: true,
      message: 'Candidato atualizado com sucesso',
      data: result
    });

  } catch (error: any) {
    console.error('Erro ao atualizar candidato:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao atualizar candidato',
      error: error.message
    }, { status: 500 });
  }
}

/**
 * DELETE /api/candidatos/[id]
 * Remove um candidato específico
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // ALTERE 'users' para o nome correto da tabela no seu banco Laravel
    const sql = `DELETE FROM users WHERE id = ?`;
    const result = await query(sql, [id]);

    return NextResponse.json({
      success: true,
      message: 'Candidato removido com sucesso',
      data: result
    });

  } catch (error: any) {
    console.error('Erro ao remover candidato:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao remover candidato',
      error: error.message
    }, { status: 500 });
  }
}