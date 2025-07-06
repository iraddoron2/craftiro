'use client'

import { useTabsNavbar } from '@/lib'
import { elementsSizes } from '@/styles'
import { LinksGroups } from '@/types'
import { Stack } from '@core'
import { PagesNavbar } from '@shared'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    const { linksGroups, updateLinksGroups, updateCurrentPath } =
        useTabsNavbar()

    const [isMobile, setIsMobile] = useState<boolean | null>(null)

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

    // Sometimes make a hydration error!!!
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        updateCurrentPath(pathname)

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

    // לא נרנדר כלום עד שהמסך הוגדר (מונע hydration mismatch)
    if (isMobile === null) return null

    return (
        <Stack sx={{ flexDirection: 'column', minHeight: '100vh' }}>
            <PagesNavbar
                links={[
                    { href: '/academy', label: 'עמוד בית' },
                    { href: '/academy/modules', label: 'מודולים' },
                ]}
            />
            <Stack
                sx={{
                    width: `100vw`,
                    marginRight: isMobile ? 0 : elementsSizes.pagesNavbarWidth,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh',
                    padding: '16px',
                }}
            >
                {children}
            </Stack>
        </Stack>
    )
}
