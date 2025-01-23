'use client'

import { useTabsNavbar } from '@/lib'
import { LinksGroups } from '@/types'
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
    const tabsNavbar = useTabsNavbar()
    const linksGroups: LinksGroups = useMemo(() => [[]], [])

    useEffect(() => {
        if (tabsNavbar.currentPath !== pathname) {
            tabsNavbar.updateCurrentPath(pathname)
            tabsNavbar.updateLinksGroups(linksGroups)
        }
    }, [linksGroups, pathname, tabsNavbar])

    return (
        <Stack
            sx={{
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
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
