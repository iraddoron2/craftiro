'use client'

import { useCraftiroCourses } from '@/context/craftiroCoursesContext'
import { CraftiroCourse } from '@/types/craftiroCourses'
import { Button, Stack, Text } from '@core'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
    const [course, setCourse] = useState<CraftiroCourse | null>(null)
    const { courseSystemId } = useParams<{ courseSystemId: string }>()
    const { courses } = useCraftiroCourses()

    useEffect(() => {
        const foundCourse = courses.find((c) => c.systemId === courseSystemId)
        if (foundCourse) {
            setCourse(foundCourse)
        } else {
            console.error('Course not found:', courseSystemId)
        }
    }, [courseSystemId, courses])

    if (!course) {
        return (
            <Stack sx={{ padding: '40px', alignItems: 'center' }}>
                <h2>courseSystemId: {courseSystemId}</h2>
                <h2>course</h2>
                <pre
                    style={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        maxWidth: '600px',
                        marginBottom: '20px',
                    }}
                >
                    {JSON.stringify(course, null, 2)}
                </pre>
                <h2>Courses</h2>
                <pre
                    style={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        maxWidth: '600px',
                    }}
                >
                    {JSON.stringify(courses, null, 2)}
                </pre>

                <Text variant="h2" text="הקורס לא נמצא" />
                <Link href="/academy/courses">
                    <Button label="חזרה לכל הקורסים" color="primary" />
                </Link>
            </Stack>
        )
    }

    const {
        name,
        shortDescription,
        longDescription,
        mainSubjects,
        difficulty,
        tags,
        authorsIds,
        levels,
    } = course

    const getDifficultyLabel = (diff: number) => {
        switch (diff) {
            case 1:
                return 'מתחילים'
            case 2:
                return 'קל'
            case 3:
                return 'בינוני'
            case 4:
                return 'מתקדם'
            case 5:
                return 'מאתגר'
            default:
                return 'לא ידוע'
        }
    }

    return (
        <Stack
            sx={{
                flexDirection: 'column',
                alignItems: 'center',
                padding: '40px 0 0 0',
                gap: '30px',
                maxWidth: '800px',
                margin: '0 auto',
            }}
        >
            <Text
                variant="h2"
                text={name}
                sx={{
                    fontWeight: 700,
                    fontSize: '2.2rem',
                    color: '#2266C7',
                }}
            />
            <Text
                variant="body1"
                text={shortDescription}
                sx={{
                    color: '#444',
                    fontWeight: 600,
                    fontSize: '1.15rem',
                }}
            />
            <Text
                variant="body2"
                text={longDescription}
                sx={{ color: '#222', fontSize: '1rem' }}
            />

            {/* רמת קושי + תגיות */}
            <Stack
                sx={{ flexDirection: 'row', gap: '20px', marginTop: '12px' }}
            >
                <Text
                    variant="caption"
                    text={`רמה: ${getDifficultyLabel(difficulty)}`}
                    sx={{ color: '#2266C7', fontWeight: 700 }}
                />
                {tags && tags.length > 0 && (
                    <Stack sx={{ flexDirection: 'row', gap: '9px' }}>
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                style={{
                                    background: '#F2F7FF',
                                    color: '#2266C7',
                                    borderRadius: '7px',
                                    padding: '2px 10px',
                                    fontSize: '0.93em',
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </Stack>
                )}
            </Stack>

            {/* נושאים עיקריים */}
            {mainSubjects && mainSubjects.length > 0 && (
                <Stack
                    sx={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginTop: '10px',
                    }}
                >
                    {mainSubjects.map((subject) => (
                        <span
                            key={subject}
                            style={{
                                background: '#E9ECF8',
                                color: '#3352c3',
                                borderRadius: '6px',
                                padding: '2px 8px',
                                fontSize: '0.91em',
                            }}
                        >
                            {subject}
                        </span>
                    ))}
                </Stack>
            )}

            {/* מחברי הקורס */}
            {authorsIds && authorsIds.length > 0 && (
                <Text
                    variant="caption"
                    text={`מורים/מחברים: ${authorsIds.join(', ')}`}
                    sx={{ color: '#777', fontWeight: 500, marginTop: '8px' }}
                />
            )}

            {/* רמות הקורס */}
            {levels && levels.length > 0 && (
                <Stack sx={{ width: '100%', marginTop: '32px', gap: '24px' }}>
                    <Text
                        variant="h3"
                        text="רמות הקורס"
                        sx={{ color: '#2266C7', fontWeight: 600 }}
                    />
                    {levels.map((level, idx) => (
                        <Stack
                            key={level.levelSystemId || idx}
                            sx={{
                                background: '#F7F8FA',
                                borderRadius: '14px',
                                padding: '16px',
                                marginBottom: '14px',
                                boxShadow: '0 2px 10px 0 rgba(33,102,199,0.07)',
                            }}
                        >
                            <Text
                                variant="h4"
                                text={level.levelTitle}
                                sx={{ color: '#2266C7', fontWeight: 700 }}
                            />
                            <Text
                                variant="body2"
                                text={level.levelShortDescription}
                                sx={{ marginBottom: '4px', color: '#444' }}
                            />
                            <Text
                                variant="caption"
                                text={level.levelLongDescription}
                                sx={{ color: '#777' }}
                            />
                        </Stack>
                    ))}
                </Stack>
            )}

            <Stack sx={{ marginTop: '40px' }}>
                <Link href="/academy/courses">
                    <Button label="חזרה לכל הקורסים" color="primary" />
                </Link>
            </Stack>
        </Stack>
    )
}
