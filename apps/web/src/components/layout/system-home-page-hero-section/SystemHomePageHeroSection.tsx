'use client'

import { MainBackground, SystemHomePageTitle } from '@/components'
import { Section, Stack } from '@craftiro/ui'

export type HeroSectionProps = {
    title?: string | null
    subtitle?: string | null
    children?: React.ReactNode
    fullscreen?: boolean
    style?: React.CSSProperties
}

export const SystemHomePageHeroSection = ({
    title = 'עירד תכניס כותרת',
    subtitle = 'תכניס גם סאב־טייטל',
    children,
    fullscreen = false,
    style,
}: HeroSectionProps) => {
    const NAV_TOP_PX = 64
    const stickyTop = `calc(var(--size-nav-top, ${NAV_TOP_PX}px) + env(safe-area-inset-top))`
    // const stickyHeight = `calc(100dvh - (var(--size-nav-top, ${NAV_TOP_PX}px) + env(safe-area-inset-top)))`

    return (
        <Section
            padding="none"
            className="component-hero-section-element-section"
            style={{
                position: 'relative',
                minHeight: '100dvh', // קובע כמה זמן הרקע "דבוק"
                maxWidth: '100vw',
                overflow: 'visible',
                width: fullscreen ? '100vw' : 'calc(100vw - 256px)',
                right: fullscreen ? 0 : '256px',
                ...style,
            }}
        >
            {/* Sticky background */}
            <div
                style={{
                    position: 'sticky',
                    top: stickyTop,
                    width: '100%',
                    zIndex: 0,
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <MainBackground fullScreen={fullscreen} />
                </div>
            </div>

            {/* Foreground content */}
            <Stack
                style={{
                    position: 'relative',
                    zIndex: 1,
                    // minHeight: '100dvh',
                    // display: 'grid',
                    // placeItems: 'center',
                    gap: 16,
                    padding: 24,
                    textAlign: 'center',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {(title || subtitle) && (
                    <SystemHomePageTitle
                        title={title ?? ''}
                        subtitle={subtitle ?? ''}
                    />
                )}
                {children}
            </Stack>
        </Section>
    )
}
