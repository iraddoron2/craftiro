'use client'

import { currentUser } from '@/data'
import { getTrackFromTrackId } from '@/helpers'
import { useTabsNavbar } from '@/lib'
import { LinksGroups } from '@/types'
import { Stack, Text } from '@core'
import { MainLinkButton, SectionTitleWithLines } from '@shared'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'

export default function Page() {
    const params = useParams()
    const rawTrackId = params['track-id'] as string
    const trackId = rawTrackId.replace('_', '')
    const track = getTrackFromTrackId(currentUser, trackId)
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

    if (!track) {
        return <h1>Track not found</h1>
    }

    const { title, sections } = track

    return (
        <Stack>
            <Text
                variant="h1"
                sx={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    fontSize: '48px',
                }}
                text={`מסלול ${title}`}
            />

            <Stack>
                {sections.map((section, index) => {
                    const {
                        id: sectionId,
                        title,
                        description,
                        lessons,
                    } = section
                    return (
                        <Stack
                            key={sectionId}
                            sx={{
                                gap: '24px',
                            }}
                        >
                            <SectionTitleWithLines
                                title={`חלק ${index + 1}: ${title}`}
                            />
                            <Text
                                variant="h3"
                                sx={{
                                    fontSize: '24px',
                                    textAlign: 'center',
                                }}
                                text={description}
                            />
                            <Stack
                                sx={{
                                    display: 'flex',
                                    margin: '0 auto',
                                    gap: '24px',
                                    justifyContent: 'center',
                                }}
                            >
                                {lessons.map((lesson, index) => {
                                    const { id: lessonId } = lesson

                                    return (
                                        <MainLinkButton
                                            key={lessonId}
                                            label={`שיעור ${index + 1}`}
                                            url={`/academy/learning-diary/tracks/${trackId}/sections/${sectionId}/lessons/${lessonId}`}
                                        />
                                    )
                                })}
                            </Stack>
                        </Stack>
                    )
                })}
            </Stack>
        </Stack>
    )
}
