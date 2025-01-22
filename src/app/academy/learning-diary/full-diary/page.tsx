'use client'

import { currentUser } from '@/data'
import { useTabsNavbar } from '@/lib'
import { LinksGroups } from '@/types'
import { Stack } from '@core'
import { MainLinkButton, SectionTitleWithLines } from '@shared'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'

export default function Page() {
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
        if (tabsNavbar.currentPath !== pathname) {
            tabsNavbar.updateCurrentPath(pathname)
            tabsNavbar.updateLinksGroups(linksGroups)
        }
    }, [linksGroups, pathname, tabsNavbar])
    const { tracks } = currentUser.academy.learningDiary

    return (
        <Stack>
            {tracks.map((track, index) => {
                const { startingDate, title, id } = track
                return (
                    <Stack key={index}>
                        <SectionTitleWithLines
                            title={startingDate.getFullYear()}
                        />
                        <MainLinkButton
                            label={title}
                            url={`/academy/learning-diary/tracks/${id}`}
                        />
                    </Stack>
                )
            })}
        </Stack>
    )
}
