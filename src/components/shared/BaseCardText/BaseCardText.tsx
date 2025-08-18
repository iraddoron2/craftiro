'use client'

import { colors } from '@/styles'
import { Text } from '@core'

type Props = {
    text: string
}

export const BaseCardText = ({ text = '' }: Props) => {
    return (
        <Text
            text={text}
            variant="body1"
            sx={{
                color: colors.gray[60],
                textAlign: 'right',
                fontFamily: 'Assistant',
                fontSize: '28px',
                fontStyle: 'normal',
                fontWeight: 300,
                lineHeight: 'normal',
            }}
        />
    )
}
