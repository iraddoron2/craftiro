// components/YoutubeVideo/YoutubeVideo.tsx
'use client'

import type { CraftiroYoutubeVideo } from '@/types/craftiroElements'
import { Stack } from '@craftiro/ui'
import React, { useMemo } from 'react'
import { YoutubeControls } from './controls/YoutubeControls'
import { useYouTubePlayer } from './player/useYouTubePlayer'
import { YouTubeIframe } from './player/YouTubeIframe'
import {
    clickOverlayStyle,
    controlBtnStyle,
    controlsRowStyle,
    fallbackBoxStyle,
    fullscreenBoxStyle,
    iframeStyle,
    outerWrapStyle,
    videoBoxFsStyle,
    videoBoxStyle,
} from './style'
import {
    buildEmbedSrc,
    extractFirstUrl,
    parseYouTubeUrl,
} from './utils/youtubeUrl'

type Props = { content: CraftiroYoutubeVideo }

export const YoutubeVideo: React.FC<Props> = ({ content }) => {
    const {
        iframeRef,
        containerRef,
        isPlaying,
        isMuted,
        isFs,
        togglePlay,
        stop,
        restart,
        toggleMute,
        toggleFullscreen,
        onKeyDown,
    } = useYouTubePlayer()

    const watchUrl = useMemo(() => extractFirstUrl(content), [content])

    const embedSrc = useMemo(() => {
        const { videoId, startSeconds } = parseYouTubeUrl(watchUrl)
        if (!videoId) return null
        return buildEmbedSrc(videoId, startSeconds)
    }, [watchUrl])

    if (!embedSrc) {
        return (
            <div style={fallbackBoxStyle}>
                לא נמצא קישור יוטיוב תקין בטקסט שסופק.
                <pre dir="ltr" style={{ marginTop: 8 }}>
                    {JSON.stringify(watchUrl, null, 2)}
                </pre>
            </div>
        )
    }

    return (
        <Stack style={outerWrapStyle}>
            <div
                ref={containerRef}
                style={isFs ? fullscreenBoxStyle : videoBoxStyle}
                tabIndex={0}
                onKeyDown={onKeyDown}
                aria-label={'YouTube video'}
            >
                <YouTubeIframe
                    ref={iframeRef}
                    src={embedSrc}
                    onTogglePlay={togglePlay}
                    style={isFs ? videoBoxFsStyle : videoBoxStyle}
                    iframeStyle={iframeStyle}
                    clickOverlayStyle={clickOverlayStyle}
                    title={'YouTube video'}
                />
            </div>

            <YoutubeControls
                isPlaying={isPlaying}
                isMuted={isMuted}
                isFs={isFs}
                onTogglePlay={togglePlay}
                onStop={stop}
                onRestart={restart}
                onToggleMute={toggleMute}
                onToggleFullscreen={toggleFullscreen}
                rowStyle={controlsRowStyle}
                btnStyle={controlBtnStyle}
            />
        </Stack>
    )
}
