'use client'

import { colors } from '@/styles'
import { Section } from '@core'
import { MainBackground } from '@shared'
import { LogoImage, MainTitle, ScrollingBadges } from '../../_components'

export const Section1 = () => {
    return (
        <Section
            sx={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <MainTitle />
            <LogoImage />
            <ScrollingBadges
                items={[
                    'קורסים דיגיטליים',
                    'תרגילים',
                    'מאמרים',
                    'שיעורים פרטיים',
                    'שירים',
                    'יצירות',
                    'משחקים',
                    'ספרים',
                    'מעקב למידה',
                ]}
                colors={[
                    colors.brandBlue[100],
                    colors.brandOrange[100],
                    colors.brandPink[100],
                    colors.purple[100],
                ]}
                orientation="column"
                gap={24}
            />

            <MainBackground />
        </Section>
    )
}
