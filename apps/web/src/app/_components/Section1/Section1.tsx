'use client'

import { MainBackground } from '@/components'
import { SystemHomePageTitle } from '@/components/layout'
import { Section } from '@craftiro/ui'
import { LogoImage, ScrollingBadges } from '../../_components'

export const Section1 = () => {
    return (
        <Section
            padding="none"
            style={{
                position: 'relative',
                height: '100vh',
                maxWidth: '100vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            <SystemHomePageTitle
                title="כל אחד יכול ללמוד מוזיקה"
                subtitle="ללמוד מוזיקה בדרך שמתאימה לכם"
            />
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
                    'var(--color-brand-blue-100)',
                    'var(--color-brand-orange-100)',
                    'var(--color-brand-pink-100)',
                    'var(--color-purple-100)',
                ]}
                orientation="column"
                gap={24}
            />
            <MainBackground fullScreen />
        </Section>
    )
}
