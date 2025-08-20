'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SignOutPage() {
    const router = useRouter()

    useEffect(() => {
        // מבצע sign out ואז שולח לדף הבית
        signOut({ redirect: false }).then(() => {
            router.push('/')
        })
    }, [router])

    return (
        <div>
            <h1>Signing out...</h1>
        </div>
    )
}
