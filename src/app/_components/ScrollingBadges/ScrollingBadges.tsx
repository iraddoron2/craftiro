'use client'

import React, { useMemo } from 'react'
import { BadgeTile } from '../../_components'

type Orientation = 'column' | 'row'

export type ScrollingBadgesProps = {
    items: string[]
    colors: string[]
    orientation?: Orientation
    gap?: number
    tileHeight?: number | string
    tileMinWidth?: number | string
    radius?: number
    durationSec?: number
    pauseOnHover?: boolean
    className?: string
    style?: React.CSSProperties
    /** Seed for deterministic behavior (prevents SSR/CSR mismatch) */
    seed?: number
}

/* ------------------------- Deterministic PRNG + Shuffle ------------------------- */
function mulberry32(seed: number) {
    let t = seed >>> 0
    return function rnd() {
        t += 0x6d2b79f5
        let r = Math.imul(t ^ (t >>> 15), 1 | t)
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296
    }
}

// Fisher–Yates deterministic shuffle
function shuffleDeterministic<T>(arr: T[], seed: number): T[] {
    const a = arr.slice()
    const rnd = mulberry32(seed)
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rnd() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

/**
 * Build a color sequence for a seamless marquee (A + B, total 2N), with:
 * - No adjacent duplicates (including the A|B seam and circular wrap).
 * - Cycling over a shuffled palette (deterministic), so distribution מגוונת גם כשיש יותר צבעים מלייבלים.
 */
function buildColorsForMarquee(
    count: number, // N (items length)
    palette: string[],
    seed: number
): { a: string[]; b: string[] } {
    if (count <= 0) return { a: [], b: [] }
    if (palette.length === 0) {
        const fallback = Array(count).fill('#999')
        return { a: fallback, b: fallback }
    }

    const pal = shuffleDeterministic(palette, seed)
    const total = count * 2
    const seq: string[] = new Array(total)

    // pick color from pal at index p, increment with wrap
    let p = 0
    const nextColor = () => {
        const c = pal[p % pal.length]
        p++
        return c
    }

    // fill sequentially while avoiding adjacency duplicates
    for (let i = 0; i < total; i++) {
        let c = nextColor()
        if (i > 0 && pal.length > 1 && c === seq[i - 1]) {
            // step once more to avoid repeating previous
            c = nextColor()
            // extremely rare edge: if palette length is 1, we can't avoid
        }
        seq[i] = c
    }

    // ensure seam safety: last != first
    if (total > 1 && seq[total - 1] === seq[0] && pal.length > 1) {
        // move last forward by one in the cycle (guaranteed different from previous in most cases)
        const prev = seq[total - 2]
        let c = nextColor()
        if (c === prev) c = nextColor()
        if (c === seq[0]) c = nextColor()
        seq[total - 1] = c
    }

    // Additionally ensure the middle seam (A end vs B start) is safe
    if (count > 0 && seq[count - 1] === seq[count] && pal.length > 1) {
        // nudge B[0]
        let c = nextColor()
        if (c === seq[count - 1]) c = nextColor()
        seq[count] = c
    }

    return {
        a: seq.slice(0, count),
        b: seq.slice(count, total),
    }
}

/* ------------------------- Keyframes (CSS) ------------------------- */
function Keyframes({
    orientation,
    durationSec,
    pauseOnHover,
    containerClass,
}: {
    orientation: Orientation
    durationSec: number
    pauseOnHover: boolean
    containerClass: string
}) {
    const kfName = orientation === 'column' ? 'sb-scroll-y' : 'sb-scroll-x'
    const axis = orientation === 'column' ? 'translateY' : 'translateX'
    return (
        <style>{`
      @keyframes ${kfName} {
        from { transform: ${axis}(0); }
        to   { transform: ${axis}(-50%); }
      }
      .${containerClass} .sb-track {
        animation: ${kfName} ${durationSec}s linear infinite;
        will-change: transform;
      }
      ${
          pauseOnHover
              ? `
      .${containerClass}:hover .sb-track {
        animation-play-state: paused;
      }`
              : ''
      }
      @media (prefers-reduced-motion: reduce) {
        .${containerClass} .sb-track {
          animation: none !important;
        }
      }
    `}</style>
    )
}

/* ------------------------- Component ------------------------- */
export const ScrollingBadges: React.FC<ScrollingBadgesProps> = ({
    items,
    colors,
    orientation = 'column',
    gap = 10,
    tileHeight = 40,
    tileMinWidth = 120,
    radius = 10,
    durationSec = 10,
    pauseOnHover = false,
    className,
    style,
    seed = 42,
}) => {
    // Build a 2N color sequence (A+B) with no adjacency duplicates and seam safety
    const { a: colorsA, b: colorsB } = useMemo(
        () => buildColorsForMarquee(items.length, colors, seed),
        [items.length, colors, seed]
    )

    const isColumn = orientation === 'column'
    const containerClass = `sb-container-${orientation}`

    // Build lists (colors are per-occurrence, so same label may differ in A vs B)
    const listA = items.map((label, i) => ({
        label,
        color: colorsA[i],
        key: `a-${i}`,
    }))
    const listB = items.map((label, i) => ({
        label,
        color: colorsB[i],
        key: `b-${i}`,
    }))

    return (
        <div
            className={`${containerClass}${className ? ` ${className}` : ''}`}
            style={{
                position: 'absolute',
                overflow: 'hidden',
                height: '100%',
                width: '100%',
                zIndex: 0,
                marginRight: '40px',
                ...style,
            }}
            aria-hidden
        >
            <Keyframes
                orientation={orientation}
                durationSec={durationSec}
                pauseOnHover={pauseOnHover}
                containerClass={containerClass}
            />

            <div
                className="sb-track"
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: isColumn ? 'column' : 'row',
                    gap,
                }}
            >
                {/* Copy A */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: isColumn ? 'column' : 'row',
                        gap,
                        alignItems: isColumn ? 'stretch' : 'center',
                    }}
                >
                    {listA.map((it) => (
                        <BadgeTile
                            key={it.key}
                            label={it.label}
                            color={it.color}
                            height={tileHeight}
                            width={isColumn ? '100%' : tileMinWidth}
                            radius={radius}
                        />
                    ))}
                </div>

                {/* Copy B */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: isColumn ? 'column' : 'row',
                        gap,
                        alignItems: isColumn ? 'stretch' : 'center',
                    }}
                >
                    {listB.map((it) => (
                        <BadgeTile
                            key={it.key}
                            label={it.label}
                            color={it.color}
                            height={tileHeight}
                            width={isColumn ? '100%' : tileMinWidth}
                            radius={radius}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ScrollingBadges
