// components/YoutubeVideo/player/useYouTubePlayer.ts
'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useYouTubePlayer() {
    const iframeRef = useRef<HTMLIFrameElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [isFs, setIsFs] = useState(false)

    // sync from player postMessage
    useEffect(() => {
        const onMessage = (e: MessageEvent) => {
            try {
                const data =
                    typeof e.data === 'string' ? JSON.parse(e.data) : e.data
                if (!data) return
                if (data.event === 'onStateChange') {
                    if (data.info === 1) setIsPlaying(true) // PLAYING
                    else if (data.info === 2 || data.info === 0)
                        setIsPlaying(false) // PAUSED/ENDED
                }
            } catch {}
        }
        window.addEventListener('message', onMessage)
        return () => window.removeEventListener('message', onMessage)
    }, [])

    // fullscreen tracking
    useEffect(() => {
        function onFsChange() {
            const el = document.fullscreenElement
            // עוזר לדבג אם האלמנט שמלא באמת זה שאנחנו מצפים לו
            // (אתה יכול להשאיר/להסיר אחרי שבדקת)
            // console.log('fullscreen element:', el, 'container:', containerRef.current)

            const active = !!el && el === containerRef.current
            setIsFs(active)
            if (active) setTimeout(() => containerRef.current?.focus(), 0)
        }
        document.addEventListener('fullscreenchange', onFsChange)
        return () =>
            document.removeEventListener('fullscreenchange', onFsChange)
    }, [])

    const send = useCallback((func: string, args: unknown[] = []) => {
        const frame = iframeRef.current
        frame?.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func, args }),
            '*'
        )
    }, [])

    const togglePlay = useCallback(() => {
        setIsPlaying((p) => {
            if (p) send('pauseVideo')
            else send('playVideo')
            return !p
        })
    }, [send])

    const stop = useCallback(() => {
        send('stopVideo')
        setIsPlaying(false)
    }, [send])

    const restart = useCallback(() => {
        send('seekTo', [0, true])
        send('playVideo')
    }, [send])

    const toggleMute = useCallback(() => {
        setIsMuted((m) => {
            if (m) send('unMute')
            else send('mute')
            return !m
        })
    }, [send])

    const toggleFullscreen = useCallback(async () => {
        const node = containerRef.current
        if (!node) return
        if (!document.fullscreenElement) {
            await node.requestFullscreen().catch(() => {})
            setTimeout(() => node.focus(), 0)
        } else {
            await document.exitFullscreen().catch(() => {})
        }
    }, [])

    const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        const key = e.key.toLowerCase()
        if (key === ' ' || e.code === 'Space') {
            e.preventDefault()
            togglePlay()
        } else if (key === 'm') {
            e.preventDefault()
            toggleMute()
        } else if (key === 'f') {
            e.preventDefault()
            toggleFullscreen()
        } else if (key === 's') {
            e.preventDefault()
            stop()
        } else if (key === 'r') {
            e.preventDefault()
            restart()
        }
    }

    // global keys while fullscreen
    useEffect(() => {
        if (!isFs) return
        const onDocKey = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase()
            if (key === ' ' || e.code === 'Space') {
                e.preventDefault()
                togglePlay()
            } else if (key === 'm') {
                e.preventDefault()
                toggleMute()
            } else if (key === 'f') {
                e.preventDefault()
                toggleFullscreen()
            } else if (key === 's') {
                e.preventDefault()
                stop()
            } else if (key === 'r') {
                e.preventDefault()
                restart()
            }
        }
        document.addEventListener('keydown', onDocKey)
        return () => document.removeEventListener('keydown', onDocKey)
    }, [isFs, togglePlay, toggleMute, toggleFullscreen, stop, restart])

    return {
        // refs
        iframeRef,
        containerRef,
        // state
        isPlaying,
        isMuted,
        isFs,
        // actions
        togglePlay,
        stop,
        restart,
        toggleMute,
        toggleFullscreen,
        // handlers
        onKeyDown,
    }
}
