'use client'

import { Button, Stack, Text } from '@core'
import { useTheme } from '@hooks'
import { sizes } from '@styles'
import { useRouter } from 'next/navigation'

export const AcademyTitle = () => {
    const theme = useTheme()
    const router = useRouter()

    return (
        <Stack>
            <Stack>
                <Text
                    variant="h1"
                    sx={{
                        color: theme.text.onContrastBackground,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '11rem',
                        [sizes.breakpoints.down('tablet')]: {
                            fontSize: '8rem',
                        },
                        [sizes.breakpoints.down('mobile')]: {
                            fontSize: '5rem',
                        },
                    }}
                    text="אקדמיה"
                />
            </Stack>
            <Stack>
                <Text
                    variant="h1"
                    sx={{
                        color: theme.text.onContrastBackground,
                        zIndex: 2,
                        textAlign: 'center',
                        fontWeight: 'regular',
                        fontSize: '2rem',
                        [sizes.breakpoints.down('tablet')]: {
                            fontSize: '1.8rem',
                        },
                        [sizes.breakpoints.down('mobile')]: {
                            fontSize: '1.2rem',
                            textAlign: 'center',
                        },
                    }}
                    text="האקדמיה של קראפטירו - למידה שמביאה תוצאות"
                />
            </Stack>
            <Stack
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button
                    label="כניסה לאקדמיה"
                    color="secondary"
                    onClick={() => {
                        router.push('/academy')
                    }}
                    style={{
                        marginTop: '24px',
                        width: '200px',
                    }}
                    // sx={{
                    //     [sizes.breakpoints.down('mobile')]: {
                    //         border: 'solid red 2px',
                    //         display: 'none',
                    //     },
                    // }}
                    // TODO: fix this
                />
            </Stack>
        </Stack>
    )
}
