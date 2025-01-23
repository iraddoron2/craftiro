'use client'

import googleLogo from '@/assets/googleLogo.png'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export const GoogleSignInButton = () => {
    const handleClick = () => {
        signIn('google')
    }

    return (
        <button onClick={handleClick}>
            <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
        </button>
    )
}
