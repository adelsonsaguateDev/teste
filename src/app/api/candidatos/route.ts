import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

/**
 * GET /api/candidatos
 * Lista todos os candidatos
 *
 * Exemplo de uso:
 * - GET /api/candidatos (todos os candidatos)
 * - GET /api/candidatos?limit=10 (primeiros 10 candidatos)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '100';

    // ALTERE 'users' para o nome correto da tabela no seu banco Laravel
    const sql = `SELECT * FROM users LIMIT ?`;
    const candidatos = await query(sql, [parseInt(limit)]);

    return NextResponse.json({
      success: true,
      data: candidatos,
      count: Array.isArray(candidatos) ? candidatos.length : 0
    });

  } catch (error: any) {
    console.error('Erro ao buscar candidatos:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao buscar candidatos',
      error: error.message
    }, { status: 500 });
  }
}

/**
 * POST /api/candidatos
 * Cria um novo candidato
 *
 * Body exemplo:
 * {
 *   "name": "João Silva",
 *   "email": "joao@example.com",
 *   "password": "senha123"
 * }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validação básica
    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Nome, email e senha são obrigatórios'
      }, { status: 400 });
    }

    // ALTERE 'users' para o nome correto da tabela no seu banco Laravel
    const sql = `INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())`;
    const result = await query(sql, [name, email, password]);

    return NextResponse.json({
      success: true,
      message: 'Candidato criado com sucesso',
      data: result
    }, { status: 201 });

  } catch (error: any) {
    console.error('Erro ao criar candidato:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao criar candidato',
      error: error.message
    }, { status: 500 });
  }
}