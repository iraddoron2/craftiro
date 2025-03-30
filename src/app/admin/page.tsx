import { getSession } from '@/lib/auth'
import { LinksGroups, User } from '@/types'
import { getBaseDomain, isAdmin } from '@/utils'
import { Stack } from '@core'
import { TabsNavbar } from '@shared'
import { cookies } from 'next/headers' // Import cookies from Next.js
import { CustomerLink } from './_components'

const tabsLinksGroups: LinksGroups = [
    [
        { path: '/admin/users', label: 'כל הלקוחות' },
        { path: '/admin/users/details', label: 'פרטי לקוח' },
    ],
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
    const session = await getSession()
    // const cookieStore = await cookies()

    const isLoading = session === null
    if (isLoading) return <h1>Loading...</h1>

    // Get all users
}
