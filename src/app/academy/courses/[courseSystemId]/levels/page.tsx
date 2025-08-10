'use client'

import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { CraftiroCourse } from '@/types/craftiroCourses'
import { Button, Stack, Text } from '@core'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export default function CourseLevelsPage() {
    // Route param from [courseSystemId]
    const { courseSystemId } = useParams<{ courseSystemId: string }>()

    // Select state from courses store (separate selectors keep snapshots stable)
    const craftiroCourses = useCraftiroCoursesStore((s) => s.craftiroCourses)
    const craftiroCoursesLoading = useCraftiroCoursesStore(
        (s) => s.craftiroCoursesLoading
    )
    const craftiroCoursesError = useCraftiroCoursesStore(
        (s) => s.craftiroCoursesError
    )

    // Resolve current course by systemId
    const course: CraftiroCourse | null = useMemo(() => {
        if (!craftiroCourses?.length || !courseSystemId) return null
        return (
            craftiroCourses.find((c) => c.systemId === courseSystemId) ?? null
        )
    }, [craftiroCourses, courseSystemId])

    // Guard states
    if (craftiroCoursesLoading)
        return <Text variant="h2" text="טוען שלבים..." />
    if (craftiroCoursesError)
        return <Text variant="h2" text={`שגיאה: ${craftiroCoursesError}`} />
    if (!course) return <Text variant="h2" text="הקורס לא נמצא" />

    const levels = course.levels ?? []

    if (levels.length === 0) {
        return (
            <Stack sx={{ alignItems: 'center', paddingTop: '40px' }}>
                <Text variant="h2" text="אין שלבים זמינים בקורס זה" />
            </Stack>
        )
    }

    return (
        <Stack
            sx={{
                flexDirection: 'column',
                alignItems: 'center',
                padding: '32px 16px',
                gap: '24px',
            }}
        >
            <Text
                variant="h2"
                text="שלבי הקורס"
                sx={{ color: '#2266C7', fontWeight: 700 }}
            />

            {/* Levels grid */}
            <Stack
                sx={{
                    width: '100%',
                    maxWidth: '1200px',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: 'center',
                }}
            >
                {levels.map((level, idx) => {
                    const levelId = level.levelSystemId || `level-${idx}`
                    const title = level.levelTitle || 'שלב ללא שם'
                    const shortDesc = level.levelShortDescription || ''
                    const longDesc = level.levelLongDescription || ''

                    return (
                        <Stack
                            key={levelId}
                            sx={{
                                width: '360px',
                                minHeight: '220px',
                                background: '#F7F8FA',
                                borderRadius: '14px',
                                padding: '16px',
                                boxShadow: '0 2px 10px 0 rgba(33,102,199,0.07)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                justifyContent: 'space-between',
                            }}
                        >
                            {/* Level header */}
                            <Stack sx={{ gap: '6px' }}>
                                <Text
                                    variant="h3"
                                    text={title}
                                    sx={{ color: '#2266C7', fontWeight: 700 }}
                                />
                                {shortDesc && (
                                    <Text
                                        variant="body2"
                                        text={shortDesc}
                                        sx={{ color: '#444' }}
                                    />
                                )}
                                {longDesc && (
                                    <Text
                                        variant="caption"
                                        text={longDesc}
                                        sx={{ color: '#777' }}
                                    />
                                )}
                            </Stack>

                            {/* Enter level button */}
                            <Stack sx={{ alignItems: 'flex-end' }}>
                                <Link
                                    href={`/academy/courses/${courseSystemId}/levels/${levelId}`}
                                >
                                    <Button
                                        label="כניסה לשלב"
                                        color="primary"
                                    />
                                </Link>
                            </Stack>
                        </Stack>
                    )
                })}
            </Stack>
        </Stack>
    )
}
