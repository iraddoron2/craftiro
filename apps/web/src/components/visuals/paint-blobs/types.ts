// types.ts
import type React from 'react'

/** Canvas globalCompositeOperation values supported by the component */
export type Composite =
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

/** Runtime configuration for PaintBlobs (merged with defaults) */
export type BlobsConfig = {
    /** Max number of blobs kept in memory/rendered */
    maxBlobs: number
    /** How many blobs to spawn per second (when allowed) */
    spawnPerSecond: number
    /** Minimal base radius of a blob (px) */
    minRadius: number
    /** Maximal base radius of a blob (px) */
    maxRadius: number
    /** Subtle per-frame position drift (px/ms), tiny values keep motion calm */
    jitter: number
    /** Fade-in duration in ms */
    fadeInMs: number
    /** Lifespan range in ms before fade-out starts: [min, max] */
    lifeMs: [number, number]
    /** Fade-out duration in ms */
    fadeOutMs: number
    /** Solid background color when not transparent */
    bgColor: string
    /** If true, uses transparent canvas and clears each frame; otherwise paints bgColor */
    useTransparent: boolean
    /** Optional fixed palette to pick colors from; when null, uses HSL ranges */
    palette: string[] | null
    /** HSL hue range (degrees) used when palette is null */
    hueRange: [number, number]
    /** HSL saturation range (%) used when palette is null */
    satRange: [number, number]
    /** HSL lightness range (%) used when palette is null */
    lightRange: [number, number]
    /** Global alpha applied after fade curves (0..1) */
    alpha: number
    /** Canvas composite mode for filling blobs */
    composite: Composite
    /** Spawn additional blobs on pointer interactions */
    spawnOnPointer: boolean
    /** Number of blobs spawned per pointer event burst */
    pointerSpawnRate: number
}

/** Public props for the PaintBlobs component */
export type BlobsBackgroundProps = {
    /** Custom config merged over defaults */
    config?: Partial<BlobsConfig>
    /** Hard-pause the animation loop (keeps canvas sized and cleared) */
    paused?: boolean
    /** Extra inline styles for the <canvas> */
    style?: React.CSSProperties
    /** Extra className for the <canvas> */
    className?: string
    /** If true, canvas is absolutely positioned to fill the viewport */
    fixedFullScreen?: boolean
    /**
     * When true, spawn/draw only if:
     *  - document is visible, and
     *  - canvas meets the visibleRatioRequired threshold in the viewport
     */
    spawnOnlyWhenVisible?: boolean
    /** IntersectionObserver ratio (0..1) required to render/spawn. Default: 0.5 */
    visibleRatioRequired?: number
}
