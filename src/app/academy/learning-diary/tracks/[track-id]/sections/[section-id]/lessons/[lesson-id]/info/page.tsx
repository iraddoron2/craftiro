'use client'

import { currentUser } from '@/data'
import { useTabsNavbar } from '@/lib'
import { LinksGroups } from '@/types'
import {
    getDateInFormatDDMMYYYY,
    getDayInWeekFromDateHebrew,
    getLessonFromLessonId,
    getTimeBetweenDatesInMinutes,
    getTimeFromDateInFormatHHMM,
} from '@/utils'
import { Stack, Text } from '@core'
import { useParams, usePathname } from 'next/navigation'
import {
    JSXElementConstructor,
    Key,
    ReactElement,
    ReactNode,
    ReactPortal,
    useEffect,
    useMemo,
} from 'react'
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
        return <h1>Lesson not found</h1>
    }

    const { id, mainSubjects, lessonStart, lessonEnd } = lesson

    return (
        <Stack>
            <LessonTitle lessonId={id} />
            <Stack
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: '24px',
                }}
            >
                <Text
                    variant="body1"
                    sx={{
                        fontSize: '24px',
                    }}
                    text={`יום ${getDayInWeekFromDateHebrew(lessonStart)}`}
                />
                <Text
                    variant="body1"
                    sx={{
                        fontSize: '24px',
                    }}
                    text={getDateInFormatDDMMYYYY(lessonStart)}
                />
                <Text
                    variant="body1"
                    sx={{
                        fontSize: '24px',
                    }}
                    text={`${getTimeFromDateInFormatHHMM(
                        lessonStart
                    )} - ${getTimeFromDateInFormatHHMM(lessonEnd)}`}
                />
                <Text
                    variant="body1"
                    sx={{
                        fontSize: '24px',
                    }}
                    text={`${getTimeBetweenDatesInMinutes(
                        lessonStart,
                        lessonEnd
                    )} דקות`}
                />
            </Stack>
            <Text
                variant="h3"
                text={`נושאים עיקריים:`}
                sx={{
                    fontSize: '32px',
                }}
            />
            <Stack>
                <ol>
                    {mainSubjects.map(
                        (
                            subject:
                                | boolean
                                | Key
                                | ReactElement<
                                      unknown,
                                      string | JSXElementConstructor<unknown>
                                  >
                                | Iterable<ReactNode>
                                | Promise<
                                      | string
                                      | number
                                      | bigint
                                      | boolean
                                      | ReactPortal
                                      | ReactElement<
                                            unknown,
                                            | string
                                            | JSXElementConstructor<unknown>
                                        >
                                      | Iterable<ReactNode>
                                      | null
                                      | undefined
                                  >
                                | null
                                | undefined,
                            idx: number
                        ) => (
                            <li
                                key={idx}
                                style={{
                                    fontSize: '24px',
                                    marginRight: '20px',
                                }}
                            >
                                {subject}
                            </li>
                        )
                    )}
                </ol>
            </Stack>
        </Stack>
    )
}
