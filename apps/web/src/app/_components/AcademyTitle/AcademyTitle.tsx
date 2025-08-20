'use client'

import { Button, Stack, Text } from '@craftiro/ui'
import { useRouter } from 'next/navigation'

export const AcademyTitle = () => {
    const router = useRouter()

    return (
        <Stack>
            <Stack>
                <Text
                    variant="h1"
                    style={{
                        color: 'var(--color-text-on-contrast-background)',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '11rem',
                    }}
                >
                    אקדמיה
                </Text>
            </Stack>
            <Stack>
                <Text
                    variant="h1"
                    style={{
                        color: 'var(--color-text-on-contrast-background)',
                        zIndex: 2,
                        textAlign: 'center',
                        fontWeight: 'regular',
                        fontSize: '2rem',
                    }}
                >
                    האקדמיה של קראפטירו - למידה שמביאה תוצאות
                </Text>
            </Stack>
            <Stack
                style={{
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
                    // style={{
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
