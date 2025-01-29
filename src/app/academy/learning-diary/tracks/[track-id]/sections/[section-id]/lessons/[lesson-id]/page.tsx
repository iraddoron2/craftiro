'use client'

import { currentUser } from '@/data'
import { useTabsNavbar } from '@/lib'
import { LinksGroups } from '@/types'
import {
    getLessonFromLessonId,
    getLessonNumberInTrackFromLessonId,
} from '@/utils'
import { Stack, Text } from '@core'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'

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

        // Retrieve saved linksGroups from localStorage
        const savedLinksGroups = localStorage.getItem('linksGroups')
        const parsedLinksGroups = savedLinksGroups
            ? JSON.parse(savedLinksGroups)
            : null

        // Update linksGroups only if it differs from the current state
        if (parsedLinksGroups) {
            if (
                JSON.stringify(parsedLinksGroups) !==
                JSON.stringify(linksGroups)
            ) {
                updateLinksGroups(parsedLinksGroups)
            }
        } else {
            localStorage.setItem(
                'linksGroups',
                JSON.stringify(defaultLinksGroups)
            )
            updateLinksGroups(defaultLinksGroups)
        }
    }, [
        pathname,
        updateCurrentPath,
        updateLinksGroups,
        defaultLinksGroups,
        linksGroups,
    ])

    if (!lesson) {
        return <Text text="Lesson not found" />
    }

    const lessonNumber = getLessonNumberInTrackFromLessonId(
        currentUser,
        lessonId
    )

    return (
        <Stack>
            <Text
                variant="h1"
                sx={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    fontSize: '48px',
                }}
                text={`שיעור ${lessonNumber}`}
            />
        </Stack>
    )
}
