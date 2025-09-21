'use client'

import { Stack } from '@craftiro/ui'

export type MainBackgroundProps = {
    className?: string
    fullScreen?: boolean
}

export const MainBackground = ({
    className,
    fullScreen = false,
}: MainBackgroundProps) => {
    return (
        <Stack
            className={`main-background ${className || ''}`}
            style={{
                height: '100vh',
                width: fullScreen ? '100vw' : 'calc(100vw - 254px)',
                left: 0,
                top: '-4px',
                position: 'absolute',
                backgroundImage: 'url("/backgrounds/Miro Background 5.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'right',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                zIndex: -1,
            }}
        >
            <Stack
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'var(--color-background-main)',
                    opacity: 'var(--opacity-80)',
                    pointerEvents: 'none',
                    overflow: 'hidden',
                    zIndex: 1,
                }}
            />
        </Stack>
    )
}
