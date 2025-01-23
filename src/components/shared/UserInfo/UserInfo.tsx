'use client'

import { useSession } from 'next-auth/react'

import { Stack } from '@core'
import Image from 'next/image'

export const UserInfo = () => {
    const { status, data: session } = useSession()

    if (status === 'loading') return null

    if (status === 'unauthenticated') return <div>Not signed in</div>

    if (status === 'authenticated' && !session) return <div>Not signed in</div>

    if (status === 'authenticated' && session) {
        return (
            <Stack>
                <div>Signed in as {session?.user?.email}</div>
                <Image
                    src={session?.user?.image ?? '/default-image.png'}
                    alt={session?.user?.name ?? 'User'}
                    width={50}
                    height={50}
                />
                <div>
                    Name: <span>{session?.user?.name ?? 'Unknown'}</span>
                </div>
            </Stack>
        )
    }

    return null
}
