'use client'

import { useTabsNavbar } from '@/lib'
import { LinksGroups } from '@/types'
import { Stack } from '@core'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'

export default function Page() {
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
                justifyContent: 'center',
                alignItems: 'center',
                gap: '24px',
                padding: '32px',
            }}
        ></Stack>
    )
}
