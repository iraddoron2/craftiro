'use client'

import { Stack, Text } from '@craftiro/ui'

type Props = {
    children: React.ReactNode
    title: string
}

export const ExerciseDetailCard = ({ children, title }: Props) => {
    return (
        <Stack
            style={{
                border: '1px solid',
                borderColor: 'var(--color-divider-main)',
                backgroundColor: 'var(--color-background-main)',
                borderWidth: '2px',
                borderRadius: '12px',
                padding: '24px',
                width: '600px',
                height: 'fit-content',
                minHeight: '200px',
            }}
        >
            <Text
                variant="h3"
                style={{
                    color: 'var(--color-text-on-background)',
                    fontSize: '32px',
                }}
            >
                {title}
            </Text>
            {children}
        </Stack>
    )
}
