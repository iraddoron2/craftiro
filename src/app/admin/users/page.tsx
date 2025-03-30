import { LinksGroups, User } from '@/types'
import { getBaseDomain } from '@/utils'
import { Stack } from '@core'
import { TabsNavbar } from '@shared'
import { cookies } from 'next/headers' // Import cookies from Next.js
import { CustomerLink } from './_components'

const tabsLinksGroups: LinksGroups = [
    [{ path: '/admin/users', label: 'כל הלקוחות' }],
    [
        {
            path: '/admin/users/transactions/future',
            label: 'עסקאות עתידיות',
        },
        {
            path: '/admin/users/transactions/commitments',
            label: 'מחויבויות',
        },
        { path: '/admin/users/transactions/requests', label: 'בקשות' },
        { path: '/admin/users/transactions/additions', label: 'תוספות' },
        {
            path: '/admin/users/transactions/history',
            label: 'היסטוריית עסקאות',
        },
        { path: '/admin/users/transactions/profits', label: 'רווחים' },
        { path: '/admin/users/general-info', label: 'מידע חופשי' },
    ],
]

export default async function Page() {
    const cookieStore = await cookies()

    try {
        const res = await fetch(`${getBaseDomain()}/api/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieStore.toString(), // Forward cookies manually
            },
            cache: 'no-store', // Ensure fresh data
        })

        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`)
        }

        const usersData = (await res.json()) as { body: User[] }

        const users = usersData.body

        return (
            <Stack>
                <h1>משתמשים</h1>
                <Stack gap={2}>
                    {users.map((user) => {
                        return <CustomerLink key={user._id} user={user} />
                    })}
                </Stack>
                <TabsNavbar linksGroups={tabsLinksGroups} />
            </Stack>
        )
    } catch (error) {
        console.error('Error getting users', error)
        return <h1>שגיאה בקבלת משתמשים</h1>
    }
}
