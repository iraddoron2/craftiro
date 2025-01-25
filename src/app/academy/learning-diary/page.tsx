'use client'

import { useTabsNavbar } from '@/lib'
import { LinksGroups } from '@/types'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'

export default function Page() {
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
    return <h1>יומן למידה</h1>
}
