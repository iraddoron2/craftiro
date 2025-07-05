'use client'

import { useTabsNavbar } from '@/lib'
import { elementsSizes } from '@/styles'
import { LinksGroups } from '@/types'
import { Stack } from '@core'
import { TabsGroup } from '@shared'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'

const tabs = {
    links: [
        { href: '/academy/modules', label: 'ראשי' },
        { href: '/academy/modules/search', label: 'חיפוש' },
    ],
}

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    const { linksGroups, updateLinksGroups, updateCurrentPath } =
        useTabsNavbar()

    const defaultLinksGroups: LinksGroups = useMemo(
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

        // Handle senerio where linksGroups not in the local storage
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

        // Handle senerio where saved linksGroups not equal to defaultLinksGroups
        if (
            JSON.stringify(linksGroups) !== JSON.stringify(defaultLinksGroups)
        ) {
            localStorage.setItem(
                'linksGroups',
                JSON.stringify(defaultLinksGroups)
            )
            updateLinksGroups(defaultLinksGroups)
        }
    }, [
        pathname,
        linksGroups,
        updateCurrentPath,
        updateLinksGroups,
        defaultLinksGroups,
    ])

    return (
        <Stack
            sx={{
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <TabsGroup links={tabs.links} />

            <Stack
                sx={{
                    width: `calc(100vw - ${elementsSizes.pagesNavbarWidth})`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {children}
            </Stack>
        </Stack>
    )
}
