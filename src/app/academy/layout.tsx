'use client'

import { useTabsNavbar } from '@/lib'

import { Stack } from '@core'
import { PagesNavbar, TabsNavbar } from '@shared'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    const { linksGroups, updateLinksGroups, updateCurrentPath } =
        useTabsNavbar()

    const defaultLinksGroups = useMemo(
        () => [
            [
                { path: '/academy/learning-diary', label: 'מסך ראשי' },
                {
                    path: '/academy/learning-diary/full-diary',
                    label: 'יומן מלא',
                },
                {
                    path: '/academy/learning-diary/tracks-in-progress',
                    label: 'מסלולים בתהליך',
                },
            ],
        ],
        []
    )

    useEffect(() => {
        // Update current path if it has changed
        updateCurrentPath(pathname)

        // Check if linksGroups is empty before updating
        if (linksGroups.length === 0) {
            const savedLinksGroups = localStorage.getItem('linksGroups')
            if (savedLinksGroups) {
                updateLinksGroups(JSON.parse(savedLinksGroups))
            } else {
                localStorage.setItem(
                    'linksGroups',
                    JSON.stringify(defaultLinksGroups)
                )
                updateLinksGroups(defaultLinksGroups)
            }
        }
    }, [
        pathname,
        linksGroups,
        updateCurrentPath,
        updateLinksGroups,
        defaultLinksGroups,
    ])

    return (
        <Stack sx={{ flexDirection: 'column', minHeight: '100vh' }}>
            <PagesNavbar
                links={[
                    { href: '/academy', label: 'עמוד בית' },
                    { href: '/academy/learning-diary', label: 'יומן למידה' },
                    { href: '/academy/syllabus', label: 'סילבוס' },
                    { href: '/academy/objectives', label: 'משימות' },
                    { href: '/academy/moduls', label: 'מודולים' },
                    { href: '/academy/games', label: 'משחקים' },
                    {
                        href: '/academy/online-lessons',
                        label: 'שיעורי אונליין',
                    },
                    { href: '/academy/goals', label: 'מטרות' },
                    { href: '/academy/books', label: 'ספרים' },
                    { href: '/academy/courses', label: 'קורסים' },
                    { href: '/academy/blinks', label: 'בלינקס' },
                    { href: '/academy/certificates', label: 'תעודות' },
                    { href: '/academy/stats', label: 'סטטיסטיקות' },
                    { href: '/academy/requests', label: 'בקשות' },
                    { href: '/academy/plan', label: 'מנוי' },
                ]}
            />
            <Stack>{children}</Stack>
            <TabsNavbar />
        </Stack>
    )
}
