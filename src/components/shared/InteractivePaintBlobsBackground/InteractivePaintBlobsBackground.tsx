// InteractivePaintBlobsBackground.tsx
import React, { useEffect, useMemo, useRef } from 'react'

type Composite =
    | 'source-over'
    | 'lighter'
    | 'screen'
    | 'multiply'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity'

export type BlobsConfig = {
    maxBlobs: number
    spawnPerSecond: number
    minRadius: number
    maxRadius: number
    jitter: number
    fadeInMs: number
    lifeMs: [number, number]
    fadeOutMs: number
    bgColor: string
    useTransparent: boolean
    palette: string[] | null
    hueRange: [number, number]
    satRange: [number, number]
    lightRange: [number, number]
    alpha: number
    composite: Composite
    spawnOnPointer: boolean
    pointerSpawnRate: number
}

export type InteractivePaintBlobsBackgroundProps = {
    /** Optional custom config (merged over defaults) */
    config?: Partial<BlobsConfig>
    /** Pause animation/rendering (hard pause) */
    paused?: boolean
    /** Extra styles applied to the canvas element */
    style?: React.CSSProperties
    /** Extra className for the canvas */
    className?: string
    /** If true, the component will fill the viewport with fixed positioning (good for page background) */
    fixedFullScreen?: boolean
    /** When true, spawn/draw only if canvas is visible in viewport and tab is visible */
    spawnOnlyWhenVisible?: boolean
    /** Minimum visible ratio required to render/spawn (0..1). Default: 0.5 */
    visibleRatioRequired?: number
}

const DEFAULTS: BlobsConfig = {
    maxBlobs: 8000,
    spawnPerSecond: 150,
    minRadius: 5,
    maxRadius: 20,
    jitter: 0.0,
    fadeInMs: 330,
    lifeMs: [1800, 5200],
    fadeOutMs: 900,
    bgColor: '#ffffff',
    useTransparent: true,
    palette: ['#fc9220ff', '#2f20fccc', '#fc20dfcc'],
    hueRange: [0, 360],
    satRange: [60, 95],
    lightRange: [55, 70],
    alpha: 0.12,
    composite: 'lighter',
    spawnOnPointer: true,
    pointerSpawnRate: 40,
}

// ---------- Utilities (no DOM access) ----------
const rand = (a: number, b: number) => a + Math.random() * (b - a)
const choice = <T,>(arr: T[]): T => arr[(Math.random() * arr.length) | 0]
const now = () => performance.now()

function randomColor(cfg: BlobsConfig): string {
    if (Array.isArray(cfg.palette) && cfg.palette.length)
        return choice(cfg.palette)
    const h = rand(cfg.hueRange[0], cfg.hueRange[1])
    const s = rand(cfg.satRange[0], cfg.satRange[1])
    const l = rand(cfg.lightRange[0], cfg.lightRange[1])
    return `hsl(${h.toFixed(1)} ${s.toFixed(0)}% ${l.toFixed(0)}%)`
}

// Stable rounded blob outline using Bezier curves
function roundedBlobStablePath(
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

// ---------- Blob model ----------
class BlobModel {
    birth: number
    life: number
    fadeIn: number
    fadeOut: number
    dead: boolean

    x: number
    y: number
    r: number
    color: string

    vx: number
    vy: number

    // Stable shape factors to avoid per-frame jitter in the outline
    rxFactor: number
    ryFactor: number

    constructor(
        x: number,
        y: number,
        r: number,
        color: string,
        cfg: BlobsConfig
    ) {
        const t = now()
        this.birth = t
        this.life = rand(cfg.lifeMs[0], cfg.lifeMs[1])
        this.fadeIn = cfg.fadeInMs
        this.fadeOut = cfg.fadeOutMs
        this.dead = false

        this.x = x
        this.y = y
        this.r = r
        this.color = color

        // Subtle position drift (kept tiny for calm movement)
        this.vx = (Math.random() - 0.5) * cfg.jitter
        this.vy = (Math.random() - 0.5) * cfg.jitter

        // Persisted per-blob shape variation (prevents outline "shiver")
        this.rxFactor = 1 + (Math.random() - 0.5) * 0.2
        this.ryFactor = 1 + (Math.random() - 0.5) * 0.2
    }

    private opacity(t: number, cfg: BlobsConfig): number {
        const elapsed = t - this.birth
        const aIn = Math.min(1, elapsed / this.fadeIn)
        const timeLeft = this.birth + this.fadeIn + this.life + this.fadeOut - t
        const aOut = Math.min(1, Math.max(0, timeLeft / this.fadeOut))
        return Math.min(aIn, aOut) * cfg.alpha
    }

    update(dt: number) {
        this.x += this.vx * dt
        this.y += this.vy * dt
        const t = now()
        if (t > this.birth + this.fadeIn + this.life + this.fadeOut)
            this.dead = true
    }

    draw(ctx: CanvasRenderingContext2D, cfg: BlobsConfig) {
        const t = now()
        const a = this.opacity(t, cfg)
        if (a <= 0) return

        ctx.globalCompositeOperation = cfg.composite
        ctx.fillStyle = this.color
        ctx.globalAlpha = a

        ctx.beginPath()
        // Very gentle “breathing” on base radius for a calm vibe
        const base = this.r * (0.92 + Math.sin(t * 0.001 + this.x) * 0.04)
        roundedBlobStablePath(
            ctx,
            this.x,
            this.y,
            base * this.rxFactor,
            base * this.ryFactor
        )
        ctx.fill()

        ctx.globalAlpha = 1
        ctx.globalCompositeOperation = 'source-over'
    }
}

export const InteractivePaintBlobsBackground: React.FC<
    InteractivePaintBlobsBackgroundProps
> = ({
    config,
    paused = false,
    style,
    className,
    fixedFullScreen = true,
    spawnOnlyWhenVisible = true,
    visibleRatioRequired = 0.5,
}) => {
    const merged = useMemo<BlobsConfig>(
        () => ({ ...DEFAULTS, ...config }),
        [config]
    )

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

    // Internal state refs (persist across renders without re-rendering)
    const dprRef = useRef<number>(1)
    const WRef = useRef<number>(0)
    const HRef = useRef<number>(0)
    const rafRef = useRef<number | null>(null)
    const lastRef = useRef<number>(0)
    const spawnAccRef = useRef<number>(0)
    const blobsRef = useRef<BlobModel[]>([])
    const visibleRatioRef = useRef<number>(spawnOnlyWhenVisible ? 0 : 1) // 0..1

    // Visibility and viewport state
    const pageVisibleRef = useRef<boolean>(
        typeof document !== 'undefined'
            ? document.visibilityState === 'visible'
            : true
    )
    // const inViewportRef = useRef<boolean>(!spawnOnlyWhenVisible) // default true if opted out

    // Extract for effect deps (avoid object identity jitter)
    const lifeMs0 = merged.lifeMs[0]
    const lifeMs1 = merged.lifeMs[1]
    const hueRange0 = merged.hueRange[0]
    const hueRange1 = merged.hueRange[1]
    const satRange0 = merged.satRange[0]
    const satRange1 = merged.satRange[1]
    const lightRange0 = merged.lightRange[0]
    const lightRange1 = merged.lightRange[1]

    // Track page/tab visibility
    useEffect(() => {
        const onVis = () => {
            pageVisibleRef.current = document.visibilityState === 'visible'
        }
        document.addEventListener('visibilitychange', onVis)
        return () => document.removeEventListener('visibilitychange', onVis)
    }, [])

    // Track canvas viewport visibility with IntersectionObserver
    useEffect(() => {
        const el = canvasRef.current
        if (!el) return

        if (!spawnOnlyWhenVisible) {
            visibleRatioRef.current = 1
            return
        }

        const io = new IntersectionObserver(
            ([entry]) => {
                // נעדכן את היחס המדויק (0..1)
                visibleRatioRef.current = entry.intersectionRatio || 0
            },
            { root: null, threshold: [0, 0.5, 1] } // 👈 0.5 ברשימת ספים
        )
        io.observe(el)
        return () => io.disconnect()
    }, [spawnOnlyWhenVisible])

    useEffect(() => {
        // Skip on SSR
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctxRef.current = ctx

        // Resize respecting devicePixelRatio
        const resize = () => {
            const w = fixedFullScreen
                ? document.documentElement.clientWidth
                : canvas.clientWidth
            const h = fixedFullScreen
                ? document.documentElement.clientHeight
                : canvas.clientHeight

            const dpr = Math.max(1, window.devicePixelRatio || 1)
            dprRef.current = dpr
            WRef.current = w
            HRef.current = h

            canvas.width = Math.floor(w * dpr)
            canvas.height = Math.floor(h * dpr)
            if (fixedFullScreen) {
                canvas.style.width = `${w}px`
                canvas.style.height = `${h}px`
            }
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }

        // Initial size & listener
        resize()
        window.addEventListener('resize', resize)

        // Pointer-based spawning (throttled)
        let pointerLastSpawn = 0
        const addFromEvent = (e: PointerEvent) => {
            if (!merged.spawnOnPointer) return
            const ratio = fixedFullScreen ? 1 : visibleRatioRef.current
            const canInteract =
                pageVisibleRef.current &&
                (!spawnOnlyWhenVisible || ratio >= visibleRatioRequired)
            if (!canInteract) return

            const t = now()
            if (t - pointerLastSpawn < 30) return
            pointerLastSpawn = t

            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            for (let i = 0; i < merged.pointerSpawnRate; i++) {
                spawn(x + rand(-20, 20), y + rand(-20, 20))
            }
        }

        window.addEventListener('pointerdown', addFromEvent)
        window.addEventListener('pointermove', addFromEvent)

        // Main RAF loop
        lastRef.current = performance.now()

        // small helper to clear/paint background once
        const clearFrame = (
            ctx: CanvasRenderingContext2D,
            W: number,
            H: number
        ) => {
            if (merged.useTransparent) {
                ctx.clearRect(0, 0, W, H)
            } else {
                ctx.fillStyle = merged.bgColor
                ctx.fillRect(0, 0, W, H)
            }
        }

        const loop = () => {
            if (paused) {
                rafRef.current = requestAnimationFrame(loop)
                return
            }

            const t = performance.now()
            const dt = Math.min(50, t - lastRef.current)
            lastRef.current = t

            const ctx = ctxRef.current!
            const W = WRef.current
            const H = HRef.current

            // ---- visibility gate (tab + viewport ratio) ----
            const isTabVisible = pageVisibleRef.current
            const ratio = fixedFullScreen ? 1 : visibleRatioRef.current
            const meetsRatio = ratio >= visibleRatioRequired // e.g. 0.5
            const canRender = spawnOnlyWhenVisible
                ? isTabVisible && meetsRatio
                : isTabVisible

            // keep background consistent even if we don't render blobs
            clearFrame(ctx, W, H)

            if (!canRender) {
                // Skip spawning and drawing when not visible enough
                rafRef.current = requestAnimationFrame(loop)
                return
            }

            // ---- spawn (rate-limited) only when visible enough ----
            if (!spawnOnlyWhenVisible || meetsRatio) {
                spawnAccRef.current += (dt / 1000) * merged.spawnPerSecond
                while (spawnAccRef.current >= 1) {
                    spawn()
                    spawnAccRef.current -= 1
                }
            }

            // ---- update & draw ----
            const arr = blobsRef.current
            for (let i = arr.length - 1; i >= 0; i--) {
                const b = arr[i]
                b.update(dt)
                b.draw(ctx, merged)
                if (b.dead) arr.splice(i, 1)
            }

            rafRef.current = requestAnimationFrame(loop)
        }

        rafRef.current = requestAnimationFrame(loop)

        // Cleanup
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            window.removeEventListener('resize', resize)
            window.removeEventListener('pointerdown', addFromEvent)
            window.removeEventListener('pointermove', addFromEvent)
            blobsRef.current = []
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        paused,
        fixedFullScreen,
        spawnOnlyWhenVisible,
        merged.spawnOnPointer,
        merged.pointerSpawnRate,
        merged.useTransparent,
        merged.bgColor,
        merged.spawnPerSecond,
        merged.composite,
        merged.alpha,
        merged.jitter,
        merged.fadeInMs,
        merged.fadeOutMs,
        lifeMs0,
        lifeMs1,
        merged.minRadius,
        merged.maxRadius,
        merged.palette,
        hueRange0,
        hueRange1,
        satRange0,
        satRange1,
        lightRange0,
        lightRange1,
    ])

    // Spawner uses latest config
    const spawn = (x?: number, y?: number) => {
        const arr = blobsRef.current
        if (arr.length >= merged.maxBlobs) return

        const W = WRef.current
        const H = HRef.current

        const px = x ?? rand(0, W)
        const py = y ?? rand(0, H)
        const r = rand(merged.minRadius, merged.maxRadius)
        const c = randomColor(merged)

        arr.push(new BlobModel(px, py, r, c, merged))
    }

    // Default style: fixed, full screen, behind content
    const baseStyle: React.CSSProperties = fixedFullScreen
        ? {
              position: 'fixed',
              inset: 0,
              zIndex: -1,
              width: '100vw',
              height: '100vh',
              display: 'block',
          }
        : {
              position: 'absolute',
              inset: 0,
              zIndex: -1,
              width: '100%',
              height: '100%',
              display: 'block',
          }

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ ...baseStyle, ...style }}
            // Prevent default context-menu which can interrupt flow on long-press
            onContextMenu={(e) => e.preventDefault()}
        />
    )
}
