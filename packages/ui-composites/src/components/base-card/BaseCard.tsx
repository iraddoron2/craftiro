'use client'

import { Stack, Text } from '@craftiro/ui'
import clsx from 'clsx'
import React from 'react'

export type BaseCardProps = {
    title?: string
    children?: React.ReactNode
    className?: string
    style?: React.CSSProperties
    /** אופציונלי: מצב הרמה – משנה רקע/מסגרת (אם תרצה בעתיד) */
    elevated?: boolean
}

/** כותרת כקומפוננטה פנימית */
const Title: React.FC<{ title: string }> = ({ title }) => {
    return (
        <Text
            as="h3"
            weight="bold"
            className={clsx(
                'mb-2',
                // צבע טקסט מהתמה (אל תשתמש בצבע קשיח):
                'text-[color:var(--color-fg)]',
                // פונט במידת הצורך:
                "font-['Assistant']"
            )}
            style={{
                lineHeight: '1.2',
            }}
        >
            {title}
        </Text>
    )
}

/** BaseCard – משתמש ב־CSS Vars מהטוקנים (surface/border/fg) */
export const BaseCard: React.FC<BaseCardProps> = ({
    title,
    children,
    className,
    style,
    elevated = false,
}) => {
    return (
        <Stack
            direction="column"
            gap={12}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                gap: 'var(--spacing-20)',
                borderRadius: 'var(--radius-60)',
                borderColor: 'var(--color-divider-main)',
                borderWidth: 'var(--border-width-20)',
                borderStyle: 'solid',
                backgroundColor: 'var(--color-surface-main)',
                padding: 'var(--spacing-40)',
                ...style,
            }}
        >
            {title && <Title title={title} />}
            {children}
        </Stack>
    )
}
