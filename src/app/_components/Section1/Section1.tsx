'use client'

import { Section } from '@core'
import { useTheme } from '@hooks'
import { LogoImage, MainTitle, Section1BoxChips } from '../../_components'

export const Section1 = () => {
    const theme = useTheme()
    return (
        <Section
            sx={{
                minHeight: '100vh',
                width: '100vw',
                background: theme.background.page,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Section1BoxChips />
            <MainTitle />
            <LogoImage />
        </Section>
    )
}
