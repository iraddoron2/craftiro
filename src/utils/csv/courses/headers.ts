// Map CSV headers to indices and expose a safe cell() accessor
export type HeaderIndex = Record<string, number>

export const buildHeaderIndex = (
    headersRow: string[],
    keys: string[]
): HeaderIndex => {
    const headers = headersRow.map((h) => (h || '').trim())
    const index: HeaderIndex = {}
    for (const key of keys) {
        index[key] = headers.findIndex((h) => h === key)
    }
    return index
}

export const cell = (row: string[], i: number, fallback = '') =>
    (i >= 0 ? row[i] ?? '' : fallback).toString().trim()
