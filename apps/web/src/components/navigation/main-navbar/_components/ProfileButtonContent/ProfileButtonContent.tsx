'use server'

import { getSession } from '@/lib/auth'
import { Stack, Text } from '@craftiro/ui'

const Container = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Stack
            style={{
                padding: '8px',
                borderRadius: '500px',
                overflow: 'hidden',
                backgroundColor: 'white',
                border: '3px solid #2266C7',
                // '&:hover': {
                //     backgroundColor: '#2266C7',
                //     cursor: 'pointer',
                //     color: 'white',
                // },
            }}
        >
            {children}
        </Stack>
    )
}

const Content = async () => {
    const session = await getSession()
    const { user } = session || {}
    const { firstName } = user || ''
    const { lastName } = user || ''

    const state = session ? 'authenticated' : 'unauthenticated'

    if (state === 'authenticated') {
        return (
            <Stack direction="row" align="center">
                <Stack
                    style={{
                        borderRadius: '500px',
                        minWidth: '48px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }}
                >
                    <Text>{firstName}</Text>
                </Stack>
            </Stack>
        )
    }

    if (state === 'unauthenticated') {
        return <span>כניסה</span>
    }

    return null
}

export const ProfileButtonContent = async () => {
    return (
        <Container>
            <Content />
        </Container>
    )
}
