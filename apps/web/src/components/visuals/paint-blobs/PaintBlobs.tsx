'use client'

import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { BlobModel } from './BlobModel'
import { DEFAULTS } from './defaults'
import { useVisibility } from './hooks'
import type {
    BlobsConfig,
    BlobsBackgroundProps as PaintBlobsProps,
} from './types'
import { rand, randomColor } from './utils'

/** PaintBlobs – animated, GPU-friendly paint blobs background */
export const PaintBlobs: React.FC<PaintBlobsProps> = ({
    config,
    paused = false,
    style,
    className,
    fixedFullScreen = true,
    spawnOnlyWhenVisible = true,
    visibleRatioRequired = 0.5,
}) => {
    // Merge user config with defaults only once per config identity
    const merged = useMemo<BlobsConfig>(
        () => ({ ...DEFAULTS, ...config }),
        [config]
    )

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

    // Internal state refs that should not cause re-renders
    const dprRef = useRef<number>(1)
    const WRef = useRef<number>(0)
    const HRef = useRef<number>(0)
    const rafRef = useRef<number | null>(null)
    const lastRef = useRef<number>(0)
    const spawnAccRef = useRef<number>(0)
    const blobsRef = useRef<BlobModel[]>([])

    // Track page visibility + intersection ratio without re-renders
    const { visibleRatioRef, pageVisibleRef } = useVisibility(
        canvasRef,
        spawnOnlyWhenVisible,
        visibleRatioRequired
    )

    // Spawner uses latest config (memoized)
    const spawn = useCallback(
        (x?: number, y?: number) => {
            const arr = blobsRef.current
            if (arr.length >= merged.maxBlobs) return

            const W = WRef.current
            const H = HRef.current
            const px = x ?? rand(0, W)
            const py = y ?? rand(0, H)
            const r = rand(merged.minRadius, merged.maxRadius)
            const c = randomColor(merged)

            arr.push(new BlobModel(px, py, r, c, merged))
        },
        [merged]
    )

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctxRef.current = ctx

        // Handle resize with device pixel ratio
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

            const t = performance.now()
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

        const clearFrame = (W: number, H: number) => {
            const c = ctxRef.current!
            if (merged.useTransparent) {
                c.clearRect(0, 0, W, H)
            } else {
                c.fillStyle = merged.bgColor
                c.fillRect(0, 0, W, H)
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

            const c = ctxRef.current!
            const W = WRef.current
            const H = HRef.current

            // Always keep background consistent
            clearFrame(W, H)

            // Visibility gate (tab + viewport ratio)
            const isTabVisible = pageVisibleRef.current
            const ratio = fixedFullScreen ? 1 : visibleRatioRef.current
            const meetsRatio = ratio >= visibleRatioRequired
            const canRender = spawnOnlyWhenVisible
                ? isTabVisible && meetsRatio
                : isTabVisible

            if (canRender) {
                // Spawn (rate-limited) only when visible enough
                if (!spawnOnlyWhenVisible || meetsRatio) {
                    spawnAccRef.current += (dt / 1000) * merged.spawnPerSecond
                    while (spawnAccRef.current >= 1) {
                        spawn()
                        spawnAccRef.current -= 1
                    }
                }

                // Update & draw
                const arr = blobsRef.current
                for (let i = arr.length - 1; i >= 0; i--) {
                    const b = arr[i]
                    b?.update(dt)
                    b?.draw(c, merged)
                    if (b?.dead) arr.splice(i, 1)
                }
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
    }, [
        paused,
        fixedFullScreen,
        spawnOnlyWhenVisible,
        visibleRatioRequired,
        merged,
        spawn,
        pageVisibleRef,
        visibleRatioRef,
    ])

    // Default style: absolute, full screen, behind content
    const baseStyle: React.CSSProperties = fixedFullScreen
        ? {
              position: 'absolute',
              inset: 0,
              top: 0,
              left: 0,
              zIndex: 0,
              width: '100vw',
              height: '100vh',
              display: 'block',
          }
        : {
              position: 'absolute',
              inset: 0,
              top: 0,
              left: 0,
              zIndex: 0,
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
