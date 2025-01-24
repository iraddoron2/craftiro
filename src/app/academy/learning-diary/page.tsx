'use client'

import { useTabsNavbar } from '@/lib'
import { LinksGroups } from '@/types'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'

const PageContent = () => {
    const pathname = usePathname()
    const tabsNavbar = useTabsNavbar()

    const linksGroups: LinksGroups = useMemo(
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
        // Ensure updates are client-side only
        if (tabsNavbar.currentPath !== pathname) {
            tabsNavbar.updateCurrentPath(pathname)
            tabsNavbar.updateLinksGroups(linksGroups)
        }
    }, [linksGroups, pathname, tabsNavbar])

    return <h1>יומן למידה</h1>
}

// Use dynamic import to ensure client-side rendering
export default dynamic(() => Promise.resolve(PageContent), { ssr: false })
