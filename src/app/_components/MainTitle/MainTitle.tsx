'use client'

import { Stack, Text } from '@core'
import { useTheme } from '@hooks'
import { sizes } from '@styles'

export const MainTitle = () => {
    const theme = useTheme()
    return (
        <Stack
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text
                variant="h1"
                sx={{
                    color: theme.text.onPageBackground,
                    fontWeight: 'bold',
                    fontSize: '6rem',
                    [sizes.breakpoints.down('fullHd')]: {
                        fontSize: '5rem',
                    },
                    [sizes.breakpoints.down('desktop')]: {
                        fontSize: '4rem',
                    },
                    [sizes.breakpoints.down('tablet')]: {
                        fontSize: '3rem',
                    },
                    [sizes.breakpoints.down('mobile')]: {
                        fontSize: '1.6rem',
                    },
                }}
                text="כל אחד יכול ללמוד מוזיקה "
            />
            <Text
                variant="h2"
                sx={{
                    color: theme.text.onPageBackground,
                    fontSize: '3rem',
                    [sizes.breakpoints.down('fullHd')]: {
                        fontSize: '2.5rem',
                    },
                    [sizes.breakpoints.down('desktop')]: {
                        fontSize: '2rem',
                    },
                    [sizes.breakpoints.down('tablet')]: {
                        fontSize: '1.8rem',
                    },
                    [sizes.breakpoints.down('mobile')]: {
                        fontSize: '1rem',
                    },
                }}
                text=" ללמוד מוזיקה בדרך שמתאימה לכם"
            />
        </Stack>
    )
}
