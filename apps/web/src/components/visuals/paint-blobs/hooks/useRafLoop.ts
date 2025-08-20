import { useEffect, useRef } from 'react'

export function useRafLoop(onFrame: (dt: number) => void) {
    const rafRef = useRef<number | null>(null)
    useEffect(() => {
        let last = performance.now()
        const loop = () => {
            const t = performance.now()
            const dt = Math.min(50, t - last)
            last = t
            onFrame(dt)
            rafRef.current = requestAnimationFrame(loop)
        }
        rafRef.current = requestAnimationFrame(loop)
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [onFrame])
}
