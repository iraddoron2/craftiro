'use client'

import { Section, Stack } from '@core'
import { useTheme } from '@hooks'
import { sizes } from '@styles'
import { AcademyTitle, Section2BoxChips } from '../../_components'

export const Section2 = () => {
    const theme = useTheme()

    return (
        <Section
            sx={{
                minHeight: '100vh',
                width: '100vw',
                position: 'relative',
                backgroundImage: 'url("/backgrounds/Miro Background 7.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                // overlay:
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: theme.background.opacityCover,
                    backgroundBlendMode: 'darken', // TODO: Not working, need to investigate
                    pointerEvents: 'none',
                    zIndex: 1,
                },
            }}
        >
            <Stack
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '80px',
                }}
            >
                <Stack
                    sx={{
                        zIndex: 2,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'start',
                        gap: '80px',
                        justifyContent: 'space-between',
                        [sizes.breakpoints.down('fullHd')]: {
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                    }}
                >
                    <AcademyTitle />
                    <Section2BoxChips />
                </Stack>
            </Stack>
        </Section>
    )
}
