import { getSession } from '@/lib/auth'
import { LinksGroups, User } from '@/types'
import { getBaseDomain } from '@/utils'
import { TabsNavbar } from '@shared'
import { cookies } from 'next/headers'

type Props = {
    params: Promise<{ userId: string }>
}

export default async function Page({ params }: Props) {
    const { userId } = (await params) as { userId: string }
    console.log('userId', userId)
    const session = await getSession()
    const cookieStore = await cookies()

    const tabsLinksGroups: LinksGroups = [
        [
            { path: '/admin/users', label: 'כל הלקוחות' },
            { path: `/admin/users/${userId}`, label: 'פרטי לקוח' },
        ],
        [
            {
                path: `/admin/users/${userId}/academy`,
                label: 'אקדמיה',
            },
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

    const user = session?.user as User | null
    if (!user) {
        return <h1>Loading...</h1>
    }

    try {
        const res = await fetch(`${getBaseDomain()}/api/users/${userId}`, {
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

        const userData = (await res.json()) as { body: User }

        const user = userData.body

        return (
            <>
                <pre>{JSON.stringify(user, null, 2)}</pre>
                <TabsNavbar linksGroups={tabsLinksGroups} />
            </>
        )
    } catch (error) {
        console.error('Error getting user', error)
        return <h1>Error getting user</h1>
    }
}
