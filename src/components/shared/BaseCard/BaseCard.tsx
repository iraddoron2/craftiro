'use client'

import { colors } from '@/styles'
import { Stack, Text } from '@core'
import { useTheme } from '@hooks'
import { SxProps } from '@mui/material'

type Props = {
    children: React.ReactNode
    title?: string
    sx?: SxProps
}

// color: var(--Grey-3, #696969);
// text-align: justify;
// leading-trim: both;
// text-edge: cap;
// font-family: Assistant;
// font-size: 20px;
// font-style: normal;
// font-weight: 700;
// line-height: normal;

const Title = ({ title }: { title: string }) => (
    <Text
        text={title}
        variant="h6"
        sx={{
            color: colors.gray[100],
            textAlign: 'right',
            fontFamily: 'Assistant',
            fontSize: '28px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            marginBottom: '10px',
        }}
    />
)

const BaseCardWithTitle = ({ title = '', children, sx }: Props) => {
    const theme = useTheme()
    return (
        <Stack
            sx={{
                borderRadius: '8px',
                backgroundColor: colors.base.white,
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: theme.common.border,
                padding: '16px',
                ...sx,
            }}
        >
            <Title title={title} />
            {children}
        </Stack>
    )
}

type BaseCardProps = {
    children?: React.ReactNode
    title?: string
    sx?: SxProps
}
export const BaseCard = ({ children = <></>, title, sx }: BaseCardProps) => {
    const theme = useTheme()

    if (title) {
        return (
            <BaseCardWithTitle title={title} sx={sx}>
                {children}
            </BaseCardWithTitle>
        )
    }
    return (
        <Stack
            sx={{
                borderRadius: '8px',
                backgroundColor: colors.base.white,
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: theme.common.border,
                padding: '16px',
                ...sx,
            }}
        >
            {children}
        </Stack>
    )
}
