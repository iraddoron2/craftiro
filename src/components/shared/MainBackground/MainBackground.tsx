'use client'

import { Stack } from '@core'
import { useTheme } from '@hooks'

export const MainBackground = () => {
    const theme = useTheme()
    return (
        <Stack
            sx={{
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
                // overlay:
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: theme.background.opacityCover,
                    pointerEvents: 'none',
                    zIndex: 1,
                },
            }}
        ></Stack>
    )
}
