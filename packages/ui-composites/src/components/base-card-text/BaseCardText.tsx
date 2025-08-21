'use client'

import { Text } from '@craftiro/ui'
import clsx from 'clsx'
import { BaseCardTextProps } from './types'

export const BaseCardText = ({
    text = '',
    className,
    style,
}: BaseCardTextProps) => {
    return (
        <Text
            variant="body"
            className={clsx(
                'text-[color:var(--color-fg)]',
                'font-["Assistant"]',
                'text-[28px]',
                'font-light',
                'leading-normal',
                className
            )}
            style={{
                textAlign: 'right',
                ...style,
            }}
        >
            {text}
        </Text>
    )
}
