'use client'

import { currentUser } from '@/data'
import { useTabsNavbar } from '@/lib'
import { getLessonFromLessonId } from '@/utils'
import { Stack, Text } from '@core'
import { LinksGroups } from '@types'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { LessonTitle } from '../_components'

export default function Page() {
    const pathname = usePathname()
    const params = useParams()
    const { linksGroups, updateLinksGroups, updateCurrentPath } =
        useTabsNavbar()
    const lessonId = params['lesson-id'] as string
    const trackId = params['track-id'] as string
    const sectionId = params['section-id'] as string
    const lesson = getLessonFromLessonId(currentUser, lessonId)

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
            [
                {
                    path: `/academy/learning-diary/tracks/${trackId}/sections/${sectionId}/lessons/${lessonId}`,
                    label: 'מסך שיעור ראשי',
                },
                {
                    path: `/academy/learning-diary/tracks/${trackId}/sections/${sectionId}/lessons/${lessonId}/info`,
                    label: 'מידע על השיעור',
                },
                {
                    path: `/academy/learning-diary/tracks/${trackId}/sections/${sectionId}/lessons/${lessonId}/improvement`,
                    label: 'התפתחות',
                },
                {
                    path: `/academy/learning-diary/tracks/${trackId}/sections/${sectionId}/lessons/${lessonId}/next-goals`,
                    label: 'יעדים להמשך',
                },
                {
                    path: `/academy/learning-diary/tracks/${trackId}/sections/${sectionId}/lessons/${lessonId}/lesson-recording`,
                    label: 'הקלטת שיעור',
                },
                {
                    path: `/academy/learning-diary/tracks/${trackId}/sections/${sectionId}/lessons/${lessonId}/objectives`,
                    label: 'משימות',
                },
                {
                    path: `/academy/learning-diary/tracks/${trackId}/sections/${sectionId}/lessons/${lessonId}/materials`,
                    label: 'חומרי לימוד',
                },
                {
                    path: `/academy/learning-diary/tracks/${trackId}/sections/${sectionId}/lessons/${lessonId}/bonus-materials`,
                    label: 'חומרי העשרה',
                },
            ],
        ],
        [lessonId, sectionId, trackId]
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

    if (!lesson) {
        return <Text text="שיעור לא נמצא" />
    }

    const { id, objectives } = lesson
    return (
        <Stack>
            <LessonTitle lessonId={id} />
            <Stack>
                <Text
                    text="משימות:"
                    variant="h2"
                    sx={{
                        fontSize: '32px',
                        marginBottom: '20px',
                    }}
                />
                {objectives.map(
                    (
                        objective: {
                            id: string
                            title: string
                            description: string
                            status: string
                        },
                        index: number
                    ) => {
                        const { id, title, description, status } = objective

                        return (
                            <Stack key={id}>
                                <Text
                                    text={`משימה ${index + 1} - ${title}`}
                                    sx={{
                                        fontSize: '24px',
                                        marginBottom: '10px',
                                    }}
                                />

                                <Text text={description} />
                                <Text text={status} />
                            </Stack>
                        )
                    }
                )}
            </Stack>
        </Stack>
    )
}
