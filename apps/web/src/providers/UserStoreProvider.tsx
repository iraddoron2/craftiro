'use client'

import { useUserStore } from '@/store/userStore'
import { ReactNode, useEffect } from 'react'

export function UserStoreProvider({ children }: { children: ReactNode }) {
    const updateUser = useUserStore((state) => state.updateUser)

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch('/api/user')
                if (!res.ok) throw new Error('Failed to fetch user')
                const data = await res.json()
                updateUser(data.body)
            } catch {
                updateUser(null)
            }
        }
        fetchUser()
    }, [updateUser])

    return <>{children}</>
}
