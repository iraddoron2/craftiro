'use client'
import React from 'react'

type Props = {
    src: string
    onTogglePlay: () => void
    style: React.CSSProperties
    iframeStyle: React.CSSProperties
    clickOverlayStyle: React.CSSProperties
    title?: string
}

// מקבלים ref מההורה במקום prop iframeRef
export const YouTubeIframe = React.forwardRef<HTMLIFrameElement, Props>(
    (
        {
            src,
            onTogglePlay,
            style,
            iframeStyle,
            clickOverlayStyle,
            title = 'YouTube video',
        },
        ref
    ) => {
        return (
            <div style={style}>
                <iframe
                    ref={ref} // <-- forwardRef
                    src={src}
                    title={title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen={false}
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={iframeStyle}
                />
                <button
                    type="button"
                    aria-label="Toggle play"
                    onClick={onTogglePlay}
                    style={clickOverlayStyle}
                />
            </div>
        )
    }
)

YouTubeIframe.displayName = 'YouTubeIframe'
