// General parsing helpers (pure)
export const toReqString = (v: string) => v?.trim() ?? ''
export const toOptString = (v: string) => {
    const t = v?.trim()
    return t ? t : undefined
}
export const toList = (value: string) =>
    value
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)

export const toInt = (v: string, def = 0) => {
    const n = parseInt(v, 10)
    return Number.isFinite(n) ? n : def
}
export const toFloat = (v: string, def = 0) => {
    const n = parseFloat(v)
    return Number.isFinite(n) ? n : def
}
export const clampDifficulty = (n: number): 1 | 2 | 3 | 4 | 5 =>
    Math.min(5, Math.max(1, n || 1)) as 1 | 2 | 3 | 4 | 5

export const parseSkillsXp = (text: string) =>
    text
        .split('|')
        .map((pair) => {
            const [skillComponentId, xpRaw] = pair.split(':')
            return {
                skillComponentId: (skillComponentId || '').trim(),
                xp: toInt((xpRaw || '').trim(), 0),
            }
        })
        .filter((x) => x.skillComponentId && x.xp > 0)
