'use client'

import { Stack, Text } from '@craftiro/ui'

type Props = {
    title: string
    subtitle: string
}

export const HomePageTitle = ({ title, subtitle }: Props) => {
    return (
        <Stack
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
            }}
        >
            <Text
                variant="h1"
                style={{
                    color: 'var(--color-text-on-background)',
                    fontWeight: 'bold',
                    fontSize: '6rem',
                }}
            >
                {title}
            </Text>
            <Text
                variant="h2"
                style={{
                    color: 'var(--color-text-on-background)',
                    fontSize: '3rem',
                }}
            >
                {subtitle}
            </Text>
        </Stack>
    )
}
