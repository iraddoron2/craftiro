// BlobModel.ts
import type { BlobsConfig } from './types'
import { now, roundedBlobStablePath } from './utils'

/**
 * Single blob entity: manages its own lifecycle, motion and drawing.
 */
export class BlobModel {
    // Lifecycle
    birth: number
    life: number
    fadeIn: number
    fadeOut: number
    dead: boolean

    // Position & size
    x: number
    y: number
    r: number

    // Style
    color: string

    // Velocity (very subtle drift for calm motion)
    vx: number
    vy: number

    // Shape factors kept stable per blob to prevent outline "shiver"
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
        this.life =
            Math.random() * (cfg.lifeMs[1] - cfg.lifeMs[0]) + cfg.lifeMs[0]
        this.fadeIn = cfg.fadeInMs
        this.fadeOut = cfg.fadeOutMs
        this.dead = false

        this.x = x
        this.y = y
        this.r = r
        this.color = color

        // Extremely small drift to avoid a static look; 0 keeps them still.
        this.vx = (Math.random() - 0.5) * cfg.jitter
        this.vy = (Math.random() - 0.5) * cfg.jitter

        // Keep shape stable to avoid per-frame jitter in the Bezier outline
        this.rxFactor = 1 + (Math.random() - 0.5) * 0.2
        this.ryFactor = 1 + (Math.random() - 0.5) * 0.2
    }

    /** Composite opacity from fade-in and fade-out envelopes multiplied by global alpha */
    private opacity(t: number, cfg: BlobsConfig): number {
        const elapsed = t - this.birth
        const aIn = Math.min(1, elapsed / this.fadeIn)
        const end = this.birth + this.fadeIn + this.life + this.fadeOut
        const timeLeft = end - t
        const aOut = Math.min(1, Math.max(0, timeLeft / this.fadeOut))
        return Math.min(aIn, aOut) * cfg.alpha
    }

    /** Advance position and mark as dead when lifetime expires */
    update(dt: number): void {
        this.x += this.vx * dt
        this.y += this.vy * dt
        const t = now()
        if (t > this.birth + this.fadeIn + this.life + this.fadeOut) {
            this.dead = true
        }
    }

    /** Draw the blob with stable Bezier outline and composite mode */
    draw(ctx: CanvasRenderingContext2D, cfg: BlobsConfig): void {
        const t = now()
        const a = this.opacity(t, cfg)
        if (a <= 0) return

        ctx.globalCompositeOperation = cfg.composite
        ctx.fillStyle = this.color
        ctx.globalAlpha = a

        // Gentle “breathing” on base radius for a subtle organic feel
        const base = this.r * (0.92 + Math.sin(t * 0.001 + this.x) * 0.04)

        ctx.beginPath()
        roundedBlobStablePath(
            ctx,
            this.x,
            this.y,
            base * this.rxFactor,
            base * this.ryFactor
        )
        ctx.fill()

        // Reset context
        ctx.globalAlpha = 1
        ctx.globalCompositeOperation = 'source-over'
    }
}
