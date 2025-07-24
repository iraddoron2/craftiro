'use client'

import { Stack } from '@core'
import { useTheme } from '@hooks'
import { sizes } from '@styles'
import { BoxChip } from '../../_components'

export const Section2BoxChips = () => {
    const theme = useTheme()
    return (
        <Stack
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '24px',
                justifyContent: 'end',
                alignItems: 'center',
                width: '800px',
                [sizes.breakpoints.down('fullHd')]: {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                [sizes.breakpoints.down('tablet')]: {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '600px',
                    flexWrap: 'wrap',
                },
                [sizes.breakpoints.down('mobile')]: {
                    width: '300px',
                    gap: '12px',
                },
            }}
        >
            <BoxChip
                label="קורסים דיגיטליים"
                backgroundColor={theme.background.miroColors[6]}
                textColor={theme.text.onContrastBackground}
                sx={{
                    [sizes.breakpoints.down('tablet')]: {
                        padding: '12px',
                        width: '200px',
                        height: '80px',
                        fontSize: '22px',
                    },
                    [sizes.breakpoints.down('mobile')]: {
                        fontSize: '18px',
                        height: '40px',
                    },
                }}
            />
            <BoxChip
                label="שיעורים פרטיים"
                backgroundColor={theme.background.miroColors[1]}
                textColor={theme.text.onContrastBackground}
                sx={{
                    [sizes.breakpoints.down('tablet')]: {
                        padding: '12px',
                        width: '200px',
                        height: '80px',
                        fontSize: '22px',
                    },
                    [sizes.breakpoints.down('mobile')]: {
                        fontSize: '18px',
                        height: '40px',
                    },
                }}
            />
            <BoxChip
                label="סיכומים"
                backgroundColor={theme.background.miroColors[2]}
                textColor={theme.text.onContrastBackground}
                sx={{
                    [sizes.breakpoints.down('tablet')]: {
                        padding: '12px',
                        width: '200px',
                        height: '80px',
                        fontSize: '22px',
                    },
                    [sizes.breakpoints.down('mobile')]: {
                        fontSize: '18px',
                        height: '40px',
                    },
                }}
            />
            <BoxChip
                label="משחקים"
                backgroundColor={theme.background.miroColors[4]}
                textColor={theme.text.onContrastBackground}
                sx={{
                    [sizes.breakpoints.down('tablet')]: {
                        padding: '12px',
                        width: '200px',
                        height: '80px',
                        fontSize: '22px',
                    },
                    [sizes.breakpoints.down('mobile')]: {
                        fontSize: '18px',
                        height: '40px',
                    },
                }}
            />
            <BoxChip
                label="תרגילים"
                backgroundColor={theme.background.miroColors[3]}
                textColor={theme.text.onContrastBackground}
                sx={{
                    [sizes.breakpoints.down('tablet')]: {
                        padding: '12px',
                        width: '200px',
                        height: '80px',
                        fontSize: '22px',
                    },
                    [sizes.breakpoints.down('mobile')]: {
                        fontSize: '18px',
                        height: '40px',
                    },
                }}
            />
            <BoxChip
                label="אתגרים"
                backgroundColor={theme.background.miroColors[5]}
                textColor={theme.text.onContrastBackground}
                sx={{
                    [sizes.breakpoints.down('tablet')]: {
                        padding: '12px',
                        width: '200px',
                        height: '80px',
                        fontSize: '22px',
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
