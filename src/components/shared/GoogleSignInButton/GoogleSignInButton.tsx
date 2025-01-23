'use client'

import googleLogo from '@/assets/googleLogo.png'
import { Stack } from '@core'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export const GoogleSignInButton = () => {
    const { status } = useSession()
    const handleClick = () => {
        signIn('google')
    }

    const handleSignOutclick = () => {
        signOut()
    }

    return (
        <Stack>
            <button onClick={handleClick}></button>

            {status === 'authenticated' && (
                <button onClick={handleSignOutclick}>Sign out</button>
            )}

            {status === 'loading' && <p>Loading...</p>}

            {status === 'unauthenticated' && (
                <button onClick={handleClick}>
                    <Image
                        src={googleLogo}
                        alt="Google Logo"
                        width={20}
                        height={20}
                    />
                    <span> Sign in with Google</span>
                </button>
            )}
        </Stack>
    )
}
