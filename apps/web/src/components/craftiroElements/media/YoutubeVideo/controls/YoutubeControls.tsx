// components/YoutubeVideo/controls/YoutubeControls.tsx
'use client'
import React from 'react'
import {
    exitFsIcon,
    fsIcon,
    muteIcon,
    pauseIcon,
    playIcon,
    restartIcon,
    stopIcon,
    unmuteIcon,
} from '../icons'

type Props = {
    isPlaying: boolean
    isMuted: boolean
    isFs: boolean
    onTogglePlay: () => void
    onStop: () => void
    onRestart: () => void
    onToggleMute: () => void
    onToggleFullscreen: () => void
    rowStyle: React.CSSProperties
    btnStyle: React.CSSProperties
}

export function YoutubeControls({
    isPlaying,
    isMuted,
    isFs,
    onTogglePlay,
    onStop,
    onRestart,
    onToggleMute,
    onToggleFullscreen,
    rowStyle,
    btnStyle,
}: Props) {
    return (
        <div style={rowStyle}>
            <button
                type="button"
                onClick={onTogglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                style={btnStyle}
            >
                {isPlaying ? pauseIcon : playIcon}
            </button>
            <button
                type="button"
                onClick={onStop}
                aria-label="Stop"
                style={btnStyle}
            >
                {stopIcon}
            </button>
            <button
                type="button"
                onClick={onRestart}
                aria-label="Restart"
                style={btnStyle}
            >
                {restartIcon}
            </button>
            <button
                type="button"
                onClick={onToggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                style={btnStyle}
            >
                {isMuted ? unmuteIcon : muteIcon}
            </button>
            <button
                type="button"
                onClick={onToggleFullscreen}
                aria-label={isFs ? 'Exit fullscreen' : 'Enter fullscreen'}
                style={btnStyle}
            >
                {isFs ? exitFsIcon : fsIcon}
            </button>
        </div>
    )
}
