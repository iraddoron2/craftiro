import { colors } from '@/styles'
import { Stack } from '@core'
import { SxProps } from '@mui/material'
import { FullWidthCardTitle } from './FullWidthCardTitle'

type Props = {
    children?: React.ReactNode
    sx?: SxProps
    title?: string
    color?: 'blue' | 'orange' | 'green' | 'purple' | 'red'
}

export const FullWidthCard = ({
    children = <></>,
    sx,
    title,
    color = 'blue',
}: Props) => {
    return (
        <Stack
            sx={{
                width: '100%',
                bgcolor: colors[color][170],
                borderRadius: '16px',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: colors.gray[160],
                boxSizing: 'border-box',
                opacity: 0.9,
                ...sx,
            }}
        >
            {title && <FullWidthCardTitle title={title} />}
            {children}
        </Stack>
    )
}
