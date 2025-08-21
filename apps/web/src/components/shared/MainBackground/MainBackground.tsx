'use client'

import { Stack } from '@craftiro/ui'

export const MainBackground = () => {
    return (
        <Stack
            className="main-background"
            style={{
                height: '100vh',
                width: '100vw',
                right: 0,
                top: 0,
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
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#ffffffee',
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />
        </Stack>
    )
}
