/**
 * Helper para gerar caminhos corretos de assets em produção (GitHub Pages)
 * Em desenvolvimento: /logo.svg
 * Em produção: /web-sindipetro-rj/logo.svg
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/web-sindipetro-rj' : '';
  // Remove barra inicial se existir
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${basePath}/${cleanPath}`;
}
