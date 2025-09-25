'use client'

import { MainBackground, SystemHomePageTitle } from '@/components'
import { Section, Stack } from '@craftiro/ui'

export type HeroSectionProps = {
    title?: string | null
    subtitle?: string | null
    children?: React.ReactNode
    fullscreen?: boolean
    style?: React.CSSProperties
    opacity?: number
    contentPosition?: 'center' | 'top' | 'bottom'
}

export const SystemHomePageHeroSection = ({
    title = 'עירד תכניס כותרת',
    subtitle = 'תכניס גם סאב־טייטל',
    children,
    fullscreen = false,
    style,
    opacity = 70,
    contentPosition = 'center',
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
                height: fullscreen ? '100dvh' : 'calc(100dvh - 60px)',
                maxWidth: '100%', // was 100vw
                overflow: 'clip', // היה visible → יכול לגרום גלילות
                width: '100%', // היה 100vw / calc(100vw - 256px)
                right: '256px', // הסר לחלוטין
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
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
                    <MainBackground fullScreen={fullscreen} opacity={opacity} />
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
                    justifyContent:
                        contentPosition === 'center'
                            ? 'center'
                            : contentPosition === 'top'
                            ? 'flex-start'
                            : 'flex-end',
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
