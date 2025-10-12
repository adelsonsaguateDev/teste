import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/db';

/**
 * Rota para testar a conexão com o banco de dados MySQL
 * GET /api/test-db
 */
export async function GET() {
  try {
    const isConnected = await testConnection();

    if (isConnected) {
      return NextResponse.json({
        success: true,
        message: 'Conexão com MySQL estabelecida com sucesso!',
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Falha ao conectar com MySQL. Verifique as credenciais no .env.local'
      }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Erro ao conectar com o banco de dados',
      error: error.message
    }, { status: 500 });
  }
}