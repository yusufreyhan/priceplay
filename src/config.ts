export const CHEAPSHARK_BASE = 'https://www.cheapshark.com/api/1.0'

/**
 * Steam Store API tabanı.
 * - Dev: Vite `/steam-store` proxy (CORS yok).
 * - Production (Vercel): `vercel.json` rewrite ile aynı proxy yolu.
 * - İsteğe bağlı: `VITE_STEAM_API_BASE` ile başka bir taban.
 */
export function steamApiBase(): string {
  const fromEnv = import.meta.env.VITE_STEAM_API_BASE as string | undefined
  if (fromEnv?.trim()) return fromEnv.replace(/\/$/, '')
  return '/steam-store/api'
}
