'use client'

import { FullWidthCard, PaintBlobs } from '@/components'
import { Button, Section, Stack, Text } from '@craftiro/ui'
import { BaseCard } from '@craftiro/ui-composites'
import { useRouter } from 'next/navigation'
import React from 'react'

/**
 * Section2 (migrated)
 * - Uses only CSS Variables from themes
 */
export const Section2: React.FC = () => {
    const router = useRouter()

    // Semantic tokens from theme (for readability)
    const vars = {
        sectionBg: 'var(--color-background-contrast)',
        cardBg: 'var(--color-background-main)',
        cardText: 'var(--color-text-on-background)',
        titleText: 'var(--color-text-on-background)',
        overlayScrim: 'var(--color-alpha-black-14)',
        border: 'var(--color-intent-primary-main)',
        ctaBg: 'var(--color-intent-primary-main)',
        ctaText: 'var(--color-intent-primary-on-main)',
        ctaHoverBg: 'var(--color-intent-primary-accent)',
    } as const

    return (
        <Section
            style={{
                position: 'relative',
                paddingTop: 200,
                paddingBottom: 200,
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: vars.sectionBg,
            }}
        >
            <PaintBlobs />

            {/* Overlay (instead of ::after) */}
            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: vars.overlayScrim,
                    mixBlendMode: 'darken',
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />

            {/* Content */}
            <Stack
                style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                    maxWidth: 1280,
                    paddingInline: 24,
                    gap: '80px',
                }}
            >
                {/* Top card */}
                <FullWidthCard title="בקרו באקדמיה שלנו" color="orange">
                    <Stack
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: 24,
                            marginTop: '24px',
                        }}
                    >
                        <Stack
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 24,
                                flexWrap: 'wrap',
                            }}
                        >
                            <BaseCard
                                title="מה זאת האקדמיה של קראפטירו?"
                                style={{ width: 400, maxWidth: '100%' }}
                            >
                                <Text
                                    as="p"
                                    style={{
                                        margin: 0,
                                        lineHeight: 1.5,
                                        textAlign: 'right',
                                    }}
                                >
                                    סביבת למידה דיגיטלית שבה כל אחד יכול ללמוד
                                    מוזיקה בקצב שלו, ברמה שלו ובזמן שלו.
                                </Text>
                            </BaseCard>

                            <BaseCard
                                title="איך לומדים באקדמיה?"
                                style={{ width: 400, maxWidth: '100%' }}
                            >
                                <Text
                                    as="p"
                                    style={{
                                        margin: 0,
                                        lineHeight: 1.5,
                                        textAlign: 'right',
                                    }}
                                >
                                    באקדמיה אפשר ללמוד בעזרת מערכת קורסים
                                    דיגיטליים, מערכת תרגילים ומערכת סיכומים.
                                    בנוסף אפשר לתאם שיעורים פרטיים לבדיקה וחיזוק
                                    הידע.
                                </Text>
                            </BaseCard>
                        </Stack>

                        <Stack align="center">
                            <Button
                                label="כניסה לאקדמיה"
                                onClick={() => router.push('/academy')}
                                style={{
                                    background: vars.ctaBg,
                                    color: vars.ctaText,
                                    border: `1px solid ${vars.border}`,
                                    fontSize: 18,
                                    padding: '14px 20px',
                                    minWidth: 220,
                                    transition:
                                        'background 0.2s ease, border-color 0.2s ease',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background =
                                        vars.ctaHoverBg
                                    e.currentTarget.style.borderColor =
                                        vars.ctaHoverBg
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background =
                                        vars.ctaBg
                                    e.currentTarget.style.borderColor =
                                        vars.border
                                }}
                            />
                        </Stack>
                    </Stack>
                </FullWidthCard>

                {/* Bottom card – UPDATED to match the top one */}
                <FullWidthCard title="שיעורים פרטיים" color="blue">
                    <Stack
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: 24,
                            marginTop: '24px',
                        }}
                    >
                        <Stack
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 24,
                                flexWrap: 'wrap',
                            }}
                        >
                            <BaseCard
                                title="מדריכים פרטיים"
                                style={{ width: 400, maxWidth: '100%' }}
                            >
                                <Text
                                    as="p"
                                    style={{
                                        margin: 0,
                                        lineHeight: 1.5,
                                        textAlign: 'right',
                                    }}
                                >
                                    תוכלו למצוא כאן מדריכים שיעזרו לכם ללמוד את
                                    מה שאתם רוצים. אפשר לתאם שיעורים פרטיים,
                                    ליוויים אישיים, ולקבל עזרה בתהליך הלמידה.
                                </Text>
                            </BaseCard>

                            <BaseCard
                                title="מה זה ליווי אישי?"
                                style={{ width: 400, maxWidth: '100%' }}
                            >
                                <Text
                                    as="p"
                                    style={{
                                        margin: 0,
                                        lineHeight: 1.5,
                                        textAlign: 'right',
                                    }}
                                >
                                    במנוי של ליווי אישי תקבלו מדריך אישי שתוכלו
                                    להתייעץ איתו באופן אישי על החומר שאתם לומדים
                                    ולקבל ממנו פידבק וחוות דעת על ההתקדמות שלכם.
                                </Text>
                            </BaseCard>
                        </Stack>

                        <Stack align="center">
                            <Button
                                onClick={() => router.push('/lessons')}
                                label="כניסה לשיעורים פרטיים"
                                style={{
                                    background: vars.ctaBg,
                                    color: vars.ctaText,
                                    border: `1px solid ${vars.border}`,
                                    fontSize: 18,
                                    padding: '14px 20px',
                                    minWidth: 220,
                                    transition:
                                        'background 0.2s ease, border-color 0.2s ease',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background =
                                        vars.ctaHoverBg
                                    e.currentTarget.style.borderColor =
                                        vars.ctaHoverBg
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background =
                                        vars.ctaBg
                                    e.currentTarget.style.borderColor =
                                        vars.border
                                }}
                            />
                        </Stack>
                    </Stack>
                </FullWidthCard>
            </Stack>
        </Section>
    )
}
