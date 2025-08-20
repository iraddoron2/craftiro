// utils.ts

/** Random float in [a, b) */
export const rand = (a: number, b: number) => a + Math.random() * (b - a)

/** Pick a random element from a non-empty array */
export const choice = <T>(arr: T[]): T | undefined =>
    arr.length > 0 ? arr[(Math.random() * arr.length) | 0] : undefined

/** High-resolution timestamp */
export const now = () => performance.now()

/**
 * Returns a color string.
 * If a palette is provided and non-empty, picks from it; otherwise builds HSL from ranges.
 */
export function randomColor(cfg: {
    palette: string[] | null
    hueRange: [number, number]
    satRange: [number, number]
    lightRange: [number, number]
}): string {
    if (Array.isArray(cfg.palette) && cfg.palette.length)
        return choice(cfg.palette) || cfg.palette[0] || '#ffffff'
    const h = rand(cfg.hueRange[0], cfg.hueRange[1])
    const s = rand(cfg.satRange[0], cfg.satRange[1])
    const l = rand(cfg.lightRange[0], cfg.lightRange[1])
    return `hsl(${h.toFixed(1)} ${s.toFixed(0)}% ${l.toFixed(0)}%)`
}

/**
 * Draws a stable rounded blob outline using 4 cubic Bezier segments.
 * Keeps visual smoothness with the circle control-point constant k.
 */
export function roundedBlobStablePath(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    rx: number,
    ry: number
) {
    // Circle control point constant
    const k = 0.551915024494
    const cx = rx * k
    const cy = ry * k

    ctx.moveTo(x, y - ry)
    ctx.bezierCurveTo(x + cx, y - ry, x + rx, y - cy, x + rx, y)
    ctx.bezierCurveTo(x + rx, y + cy, x + cx, y + ry, x, y + ry)
    ctx.bezierCurveTo(x - cx, y + ry, x - rx, y + cy, x - rx, y)
    ctx.bezierCurveTo(x - rx, y - cy, x - cx, y - ry, x, y - ry)
}
