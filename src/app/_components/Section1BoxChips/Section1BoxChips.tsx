'use client'

import { Stack } from '@core'
import { useTheme } from '@hooks'
import { sizes } from '@styles'
import { BoxChip } from '../../_components'

export const Section1BoxChips = () => {
    const theme = useTheme()
    return (
        <Stack
            sx={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'start',
                width: '100%',
                padding: '0px 80px',
                [sizes.breakpoints.down('fullHd')]: {
                    flexDirection: 'row',
                    height: '100%',
                    flexWrap: 'nowrap',
                    justifyContent: 'center',
                    alignItems: 'end',
                    padding: '80px 40px',
                },
                [sizes.breakpoints.down('tablet')]: {
                    display: 'flex',
                    position: 'absolute',
                    bottom: '0px',
                    flexDirection: 'row',
                    width: '600px',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'end',
                    height: 'fit-content',
                    padding: '80px 20px',
                },
                [sizes.breakpoints.down('mobile')]: {
                    width: '240px',
                    display: 'flex',
                    position: 'absolute',
                    bottom: '0px',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'end',
                    height: 'fit-content',
                    padding: '8px 20px',
                    gap: '12px',
                },
            }}
        >
            <BoxChip
                label="נגינת שירים בפסנתר"
                backgroundColor={theme.background.miroColors[6]}
                textColor={theme.text.onContrastBackground}
                sx={{
                    [sizes.breakpoints.down('desktop')]: {
                        padding: '8px 16px',
                        width: '220px',
                        fontSize: '20px',
                    },
                    [sizes.breakpoints.down('tablet')]: {
                        fontSize: '18px',
                    },
                    [sizes.breakpoints.down('mobile')]: {
                        fontSize: '18px',
                        height: '40px',
                    },
                }}
            />

            <BoxChip
                label="תיאוריית המוזיקה"
                backgroundColor={theme.background.miroColors[3]}
                textColor={theme.text.onContrastBackground}
                sx={{
                    [sizes.breakpoints.down('desktop')]: {
                        padding: '8px 16px',
                        width: '220px',
                        fontSize: '20px',
                    },
                    [sizes.breakpoints.down('mobile')]: {
                        fontSize: '18px',
                        height: '40px',
                    },
                }}
            />
            <BoxChip
                label="אלתורים"
                backgroundColor={theme.background.miroColors[1]}
                textColor={theme.text.onContrastBackground}
                sx={{
                    [sizes.breakpoints.down('desktop')]: {
                        padding: '8px 16px',
                        width: '220px',
                        fontSize: '20px',
                    },
                    [sizes.breakpoints.down('mobile')]: {
                        fontSize: '18px',
                        height: '40px',
                    },
                }}
            />
            <BoxChip
                label="הלחנה"
                backgroundColor={theme.background.miroColors[5]}
                textColor={theme.text.onContrastBackground}
                sx={{
                    [sizes.breakpoints.down('desktop')]: {
                        padding: '8px 16px',
                        width: '220px',
                        fontSize: '20px',
                    },
                    [sizes.breakpoints.down('mobile')]: {
                        fontSize: '18px',
                        height: '40px',
                    },
                }}
            />
        </Stack>
    )
}
