// timeConvertor.ts
// A smart, flexible time unit converter.
// to:   output unit
// from: input unit
// value: number | string | flexible duration text ("1h 30m", "01:30:15.250", "90m", "5400s", "1.5h")
// opts: rounding options

export type Unit = 'ms' | 's' | 'm' | 'h' | 'd' | 'w'
type UnitLike = Unit | string

type Rounding = 'none' | 'round' | 'floor' | 'ceil'
export interface TimeConvertOptions {
    rounding?: Rounding
    /** Used only when rounding = 'round' */
    decimals?: number
}

const FACTOR_TO_MS: Record<Unit, number> = {
    ms: 1,
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
}

// Map many aliases to canonical Unit
const UNIT_ALIASES: Record<string, Unit> = {
    // ms
    ms: 'ms',
    msec: 'ms',
    millis: 'ms',
    millisecond: 'ms',
    milliseconds: 'ms',
    // s
    s: 's',
    sec: 's',
    secs: 's',
    second: 's',
    seconds: 's',
    // m
    m: 'm',
    min: 'm',
    mins: 'm',
    minute: 'm',
    minutes: 'm',
    // h
    h: 'h',
    hr: 'h',
    hrs: 'h',
    hour: 'h',
    hours: 'h',
    // d
    d: 'd',
    day: 'd',
    days: 'd',
    // w
    w: 'w',
    wk: 'w',
    wks: 'w',
    week: 'w',
    weeks: 'w',
}

function normalizeUnit(u: UnitLike): Unit {
    const key = String(u).trim().toLowerCase()
    const canonical = UNIT_ALIASES[key as keyof typeof UNIT_ALIASES]
    if (!canonical) {
        throw new Error(
            `Unknown unit "${u}". Use one of: ${Object.keys(FACTOR_TO_MS).join(
                ', '
            )}`
        )
    }
    return canonical
}

function isFiniteNumberLike(x: unknown): x is number {
    return typeof x === 'number' && Number.isFinite(x)
}

/** Parse flexible textual durations into milliseconds */
function parseFlexibleDurationToMs(str: string): number {
    const raw = str.trim().toLowerCase()

    // 1) hh:mm(:ss(.ms)?) format (e.g., "01:30", "01:30:15.250")
    if (/^\d{1,2}:\d{2}(:\d{2}(\.\d{1,3})?)?$/.test(raw)) {
        const [hh, mm, rest] = raw.split(':')
        const h = parseInt(hh ?? '', 10) || 0
        const m = parseInt(mm ?? '', 10) || 0
        let s = 0
        let ms = 0
        if (rest != null) {
            if (rest.includes('.')) {
                const [sPart, msPart] = rest.split('.')
                s = parseInt(sPart ?? '', 10) || 0
                ms =
                    parseInt((msPart ?? '0').padEnd(3, '0').slice(0, 3), 10) ||
                    0
            } else {
                s = parseInt(rest, 10) || 0
            }
        }
        return h * FACTOR_TO_MS.h + m * FACTOR_TO_MS.m + s * FACTOR_TO_MS.s + ms
    }

    // 2) tokenized like "1h 30m 15s 200ms" or "90m" or "5400s" or "1.5h"
    // Try explicit tokens first:
    const tokenRe =
        /(\d+(\.\d+)?)(ms|milliseconds?|s|secs?|seconds?|m|mins?|minutes?|h|hrs?|hours?|d|days?|w|wks?|weeks?)/g
    let match: RegExpExecArray | null
    let totalMs = 0
    let matchedAny = false
    while ((match = tokenRe.exec(raw)) !== null) {
        matchedAny = true
        const amount = parseFloat(match[1] ?? '')
        const unit = normalizeUnit(match[3] ?? '')
        totalMs += amount * FACTOR_TO_MS[unit]
    }
    if (matchedAny) return totalMs

    // 3) plain number string (e.g., "123.45") – treat as seconds by default? Prefer explicit: interpret as number directly in the caller.
    // Here we just try parse float and return as-is *seconds*? That’s ambiguous.
    // We'll return NaN to let the caller decide.
    return Number.NaN
}

/** Convert any input (value + unit) into milliseconds */
function valueToMs(from: Unit, value: number | string): number {
    if (isFiniteNumberLike(value)) {
        return value * FACTOR_TO_MS[from]
    }
    // String path
    const numeric = Number(value)
    if (Number.isFinite(numeric)) {
        // Numeric-like string (e.g., "2.5") – treat as unit 'from'
        return numeric * FACTOR_TO_MS[from]
    }
    const ms = parseFlexibleDurationToMs(value)
    if (!Number.isFinite(ms)) {
        throw new Error(
            `Could not parse duration string "${value}". Try patterns like "1h 30m", "5400s", or "01:30:00".`
        )
    }
    return ms
}

export const timeConvertor = (
    to: UnitLike,
    from: UnitLike,
    value: number | string,
    opts: TimeConvertOptions = {}
): number => {
    const toU = normalizeUnit(to)
    const fromU = normalizeUnit(from)

    const ms = valueToMs(fromU, value)
    let out = ms / FACTOR_TO_MS[toU]

    const rounding = opts.rounding ?? 'none'
    if (rounding === 'round') {
        const decimals = Math.max(0, opts.decimals ?? 0)
        const pow = 10 ** decimals
        out = Math.round(out * pow) / pow
    } else if (rounding === 'floor') {
        out = Math.floor(out)
    } else if (rounding === 'ceil') {
        out = Math.ceil(out)
    }
    return out
}
