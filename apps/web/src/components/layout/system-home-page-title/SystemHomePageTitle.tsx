'use client'

import { Stack, Text } from '@craftiro/ui'
import type { SystemHomePageTitleProps } from './types'

/**
 * מציג כותרת+סאב־טייטל רספונסיביים.
 * צבע הטקסט נקבע סמנטית דרך var(--page-hero-text)
 * עם פוליבק ל־--color-text-primary ואז ל־currentColor.
 *
 * מומלץ למפות בתמה:
 *   page.hero.text -> color.intent.primary.onSubtle (למשל)
 */
export const SystemHomePageTitle = ({
    title = 'עירד תכניס כותרת',
    subtitle = 'עירד תכניס גם סאב־טייטל',
    style = {},
}: SystemHomePageTitleProps) => {
    return (
        <Stack
            style={{
                gap: '0px',
                width: '100%',
                zIndex: 1,
                ...style,
            }}
            gap={0}
            align="center"
            justify="center"
        >
            <Text
                as="h1"
                style={{
                    color: 'var(--color-text-on-background)',
                    lineHeight: 1.1,
                    fontSize: '96px',
                    fontWeight: 700,
                    textAlign: 'center',
                    margin: 0,
                }}
            >
                {title}
            </Text>

            <Text
                as="h2"
                style={{
                    color: 'var(--color-text-on-background)',
                    fontSize: '40px',
                    lineHeight: 1.2,
                    fontWeight: 400,
                    textAlign: 'center',
                    margin: 0,
                }}
            >
                {subtitle}
            </Text>
        </Stack>
    )
}
