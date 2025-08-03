'use client'

import { Stack, Text } from '@core'
import { useTheme } from '@hooks'

type Props = {
    children: React.ReactNode
    title: string
}

export const ExerciseDetailCard = ({ children, title }: Props) => {
    const theme = useTheme()

    return (
        <Stack
            sx={{
                border: '1px solid',
                borderColor: theme.common.border,
                backgroundColor: theme.background.card,
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
                text={title}
                sx={{
                    color: theme.text.onPageBackground,
                    fontSize: '32px',
                }}
            />
            {children}
        </Stack>
    )
}
