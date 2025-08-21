'use client'

import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { CraftiroCourse } from '@/types/craftiroCourses'
import { Stack, Text } from '@craftiro/ui'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { LevelCard } from './_components'

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
    if (craftiroCoursesLoading) return <Text variant="h2">טוען שלבים...</Text>
    if (craftiroCoursesError)
        return <Text variant="h2">שגיאה: {craftiroCoursesError}</Text>
    if (!course) return <Text variant="h2">הקורס לא נמצא</Text>

    const levels = course.levels ?? []

    if (levels.length === 0) {
        return (
            <Stack style={{ alignItems: 'center', paddingTop: '40px' }}>
                <Text variant="h2">אין שלבים זמינים בקורס זה</Text>
            </Stack>
        )
    }

    return (
        <Stack
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                padding: '32px 16px',
                gap: '24px',
            }}
        >
            <Stack
                style={{
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

                    return (
                        <Stack key={levelId}>
                            <LevelCard
                                levelNumber={idx + 1}
                                title={title}
                                description={shortDesc}
                                courseSystemId={courseSystemId}
                                levelId={levelId}
                            />
                        </Stack>
                    )
                })}
            </Stack>
        </Stack>
    )
}
