// useVisibility.ts
import { useEffect, useRef } from 'react'

/**
 * Tracks page visibility and (optionally) canvas viewport intersection ratio.
 * Returns refs so consumers can read latest values without re-rendering.
 */
export function useVisibility(
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    spawnOnlyWhenVisible: boolean,
    visibleRatioRequired: number
) {
    // Intersection ratio (0..1). If visibility gating is disabled, assume fully visible.
    const visibleRatioRef = useRef<number>(spawnOnlyWhenVisible ? 0 : 1)

    // Document/tab visibility
    const pageVisibleRef = useRef<boolean>(
        typeof document !== 'undefined'
            ? document.visibilityState === 'visible'
            : true
    )

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
            // If gating disabled, treat as always visible.
            visibleRatioRef.current = 1
            return
        }

        let io: IntersectionObserver | null = null

        if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
            const clamped = Math.min(Math.max(visibleRatioRequired, 0), 1)
            io = new IntersectionObserver(
                ([entry]) => {
                    visibleRatioRef.current = entry?.intersectionRatio ?? 0
                },
                { root: null, threshold: [0, clamped, 1] }
            )
            io.observe(el)
        } else {
            // Fallback for environments without IO: assume visible
            visibleRatioRef.current = 1
        }

        return () => {
            io?.disconnect()
        }
    }, [canvasRef, spawnOnlyWhenVisible, visibleRatioRequired])

    return { visibleRatioRef, pageVisibleRef }
}
