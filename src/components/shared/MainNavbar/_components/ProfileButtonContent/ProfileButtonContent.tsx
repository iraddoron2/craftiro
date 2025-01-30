'use server'

import { getSession } from '@/lib/auth'
import { Stack } from '@core'

const Container = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Stack
            sx={{
                padding: '8px',
                borderRadius: '500px',
                overflow: 'hidden',
                backgroundColor: 'white',
                border: '3px solid #2266C7',
                '&:hover': {
                    backgroundColor: '#2266C7',
                    cursor: 'pointer',
                    color: 'white',
                },
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
    const fullName = `${firstName} ${lastName}`

    const state = session ? 'authenticated' : 'unauthenticated'

    if (state === 'authenticated') {
        return (
            <Stack direction="row" alignItems="center">
                <Stack
                    sx={{
                        borderRadius: '50%',
                        overflow: 'hidden',
                    }}
                ></Stack>
                <Stack>
                    <span>{fullName}</span>
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
