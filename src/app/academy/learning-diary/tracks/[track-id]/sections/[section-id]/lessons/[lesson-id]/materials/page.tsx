'use client'

import { currentUser } from '@/data'
import { getLessonFromLessonId } from '@/helpers'
import { useTabsNavbar } from '@/lib'
import { LinksGroups } from '@/types'
import { Stack, Text } from '@core'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { LessonTitle } from '../_components'

export default function Page() {
    const pathname = usePathname()
    const params = useParams()
    const tabsNavbar = useTabsNavbar()
    const lessonId = params['lesson-id'] as string
    const trackId = params['track-id'] as string
    const sectionId = params['section-id'] as string
    const lesson = getLessonFromLessonId(currentUser, lessonId)

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
        if (tabsNavbar.currentPath !== pathname) {
            tabsNavbar.updateCurrentPath(pathname)
            tabsNavbar.updateLinksGroups(linksGroups)
        }
    }, [linksGroups, pathname, tabsNavbar])

    if (!lesson) {
        return <Text text="שיעור לא נמצא" />
    }

    const { id, materials } = lesson
    return (
        <Stack>
            <LessonTitle lessonId={id} />
            <Stack>
                {materials.map((materialId) => {
                    return (
                        <Text key={materialId} text={`מודול ${materialId}`} />
                    )
                })}
            </Stack>
        </Stack>
    )
}
