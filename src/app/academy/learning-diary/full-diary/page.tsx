'use client'

import { currentUser } from '@/data'
import { useTabsNavbar } from '@/lib'
import { LinksGroups } from '@/types'
import { Stack } from '@core'
import { MainLinkButton, SectionTitleWithLines } from '@shared'
import { usePathname } from 'next/navigation'
import { Key, useEffect, useMemo } from 'react'

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

    const { tracks } = currentUser.academy.learningDiary

    return (
        <Stack>
            {tracks.map(
                (
                    track: {
                        startingDate: unknown
                        title: unknown
                        id: unknown
                    },
                    index: Key | null | undefined
                ) => {
                    const { startingDate, title, id } = track
                    return (
                        <Stack key={index}>
                            <SectionTitleWithLines
                                title={(startingDate instanceof Date
                                    ? startingDate
                                    : new Date(startingDate as string)
                                ).getFullYear()}
                            />
                            <MainLinkButton
                                label={String(title)}
                                url={`/academy/learning-diary/tracks/${id}`}
                            />
                        </Stack>
                    )
                }
            )}
        </Stack>
    )
}
