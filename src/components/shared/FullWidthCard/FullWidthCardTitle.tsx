'use client'

import { colors } from '@/styles'
import { Text } from '@core'

type Props = {
    title: string
}

export const FullWidthCardTitle = ({ title }: Props) => {
    return (
        <Text
            sx={{
                color: colors.gray[60],
                textAlign: 'center',
                fontFamily: 'Assistant',
                fontSize: '64px',
                fontStyle: 'normal',
                fontWeight: 800,
                lineHeight: 'normal',
            }}
            text={title}
        />
    )
}
