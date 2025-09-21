// components/YoutubeVideo/utils/youtubeUrl.ts
export function extractFirstUrl(
    textObj: { content?: string } | undefined | null
): string | null {
    const text = textObj?.content
    if (!text) return null
    const match = text.match(/https?:\/\/[^\s)]+/i)
    return match ? match[0] : null
}

export function parseStartTime(t: string | null): number {
    if (!t) return 0
    if (/^\d+$/.test(t)) return Number(t)
    const h = Number(/(\d+)h/.exec(t)?.[1] ?? 0)
    const m = Number(/(\d+)m/.exec(t)?.[1] ?? 0)
    const s = Number(/(\d+)s/.exec(t)?.[1] ?? 0)
    return h * 3600 + m * 60 + s
}

export function parseYouTubeUrl(rawUrl: string | null): {
    videoId: string | null
    startSeconds: number
} {
    if (!rawUrl) return { videoId: null, startSeconds: 0 }
    try {
        const u = new URL(rawUrl)
        const host = u.host.replace(/^www\./, '')
        const path = u.pathname
        const qs = u.searchParams

        let videoId: string | null = null
        if (host === 'youtu.be') videoId = path.slice(1) || null
        if (!videoId && host.endsWith('youtube.com') && path === '/watch')
            videoId = qs.get('v')
        if (
            !videoId &&
            host.endsWith('youtube.com') &&
            path.startsWith('/embed/')
        )
            videoId = path.split('/')[2] || null
        if (
            !videoId &&
            host.endsWith('youtube.com') &&
            path.startsWith('/shorts/')
        )
            videoId = path.split('/')[2] || null
        if (
            !videoId &&
            host.endsWith('youtube.com') &&
            path.startsWith('/live/')
        )
            videoId = path.split('/')[2] || null

        const start = parseStartTime(qs.get('t') || qs.get('start'))
        return { videoId, startSeconds: start }
    } catch {
        return { videoId: null, startSeconds: 0 }
    }
}

export function buildEmbedSrc(videoId: string, startSeconds = 0): string {
    const params = new URLSearchParams()
    if (startSeconds) params.set('start', String(startSeconds))
    params.set('rel', '0')
    params.set('modestbranding', '1')
    params.set('controls', '0')
    params.set('disablekb', '1')
    params.set('fs', '0')
    params.set('iv_load_policy', '3')
    params.set('playsinline', '1')
    params.set('enablejsapi', '1')
    if (typeof window !== 'undefined')
        params.set('origin', window.location.origin)
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`
}
