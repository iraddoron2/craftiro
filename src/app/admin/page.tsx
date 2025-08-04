'use client'

import { useUser } from '@/hooks'
import { isAdmin } from '@/utils'

export default function Page() {
    const { user, isLoading, error } = useUser()

    if (isLoading) return <h1>Loading...</h1>

    if (error) return <h1>Error: {error.message}</h1>

    if (user === null) return <h1>Unauthorized</h1>

    const admin = isAdmin(user)

    if (!admin) return <h1>אין גישה</h1>

    return (
        <>
            <h1>Admin Page</h1>
            <p>
                Welcome, {user.firstName} {user.lastName}!
            </p>
            <h1>admin</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <br />
        </>
    )
}
