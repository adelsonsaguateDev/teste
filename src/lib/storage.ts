/**
 * Helper para gerar URLs completas de imagens do storage Laravel
 */

const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage';

/**
 * Gera URL completa para uma imagem do storage
 * @param caminhoArquivo - Caminho relativo da imagem (ex: "salas_imagens/1760275501_0.png")
 * @returns URL completa da imagem
 */
export function getImageUrl(caminhoArquivo: string | null | undefined): string {
  if (!caminhoArquivo) {
    return '/placeholder-image.png'; // Imagem padrão quando não há imagem
  }

  // Remove barra inicial se houver
  const caminho = caminhoArquivo.startsWith('/')
    ? caminhoArquivo.substring(1)
    : caminhoArquivo;

  return `${STORAGE_URL}/${caminho}`;
}

/**
 * Gera URLs completas para um array de imagens
 * @param imagens - Array de objetos de imagem com caminho_arquivo
 * @returns Array de imagens com url_completa adicionada
 */
export function processImageUrls<T extends { caminho_arquivo?: string }>(imagens: T[]): (T & { url_completa: string })[] {
  return imagens.map(img => ({
    ...img,
    url_completa: getImageUrl(img.caminho_arquivo)
  }));
}

/**
 * Retorna a URL base do storage
 */
export function getStorageUrl(): string {
  return STORAGE_URL;
}
