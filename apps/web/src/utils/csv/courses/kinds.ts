// Row kind detection
export type RowKind =
    | 'course'
    | 'level'
    | 'step'
    | 'screen'
    | 'element'
    | 'unknown'

export const detectRowKind = (
    row: string[],
    I: Record<string, number>,
    get: typeof import('./headers').cell
): RowKind => {
    const has = (k: string) => typeof I[k] === 'number' && I[k] >= 0 && !!get(row, I[k])
    if (has('systemId')) return 'course'
    if (has('levelSystemId')) return 'level'
    if (has('stepSystemId')) return 'step'
    if (has('screenSystemId')) return 'screen'
    if (has('elementSystemId')) return 'element'
    return 'unknown'
}
