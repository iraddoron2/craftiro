/**
 * Build asset API URL from a relative path stored in CSV,
 * e.g. "courses/<id>/thumb.png" -> "/api/assets/courses/<id>/thumb.png"
 *
 * - Returns null for empty/invalid inputs.
 * - If an absolute URL is passed (http/https/data), it is returned as-is.
 */
export const buildAssetUrl = (relativePath?: string | null): string | null => {
    if (!relativePath) return null
    const raw = String(relativePath).trim()
    if (!raw) return null

    // Pass-through for absolute/external urls (useful during migration)
    const isAbsolute = /^https?:\/\//i.test(raw) || /^data:/i.test(raw)
    if (isAbsolute) return raw

    // Normalize: remove leading slashes to avoid "//"
    const clean = raw.replace(/^\/+/, '')
    return `/api/assets/${clean}`
}
