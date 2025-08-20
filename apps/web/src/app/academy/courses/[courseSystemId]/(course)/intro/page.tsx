'use client'

import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { CraftiroCourse } from '@/types/craftiroCourses'
import { Button, Stack, Text } from '@craftiro/ui'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { Description, MainSubjects, Tags } from './_components'

export default function CoursePage() {
    const { courseSystemId } = useParams<{ courseSystemId: string }>()

    // Select from Zustand store (separate selectors to avoid getSnapshot loop)
    const craftiroCourses = useCraftiroCoursesStore((s) => s.craftiroCourses)
    const craftiroCoursesLoading = useCraftiroCoursesStore(
        (s) => s.craftiroCoursesLoading
    )
    const craftiroCoursesError = useCraftiroCoursesStore(
        (s) => s.craftiroCoursesError
    )

    // Find course once inputs change
    const course: CraftiroCourse | null = useMemo(() => {
        if (!craftiroCourses?.length || !courseSystemId) return null
        return (
            craftiroCourses.find((c) => c.systemId === courseSystemId) ?? null
        )
    }, [craftiroCourses, courseSystemId])

    // Loading state
    if (craftiroCoursesLoading) {
        return (
            <Stack style={{ padding: '40px', alignItems: 'center' }}>
                <Text variant="h2">טוען קורסים...</Text>
            </Stack>
        )
    }

    // Error state
    if (craftiroCoursesError) {
        return (
            <Stack
                style={{ padding: '40px', alignItems: 'center', gap: '16px' }}
            >
                <Text variant="h2" style={{ color: '#C72222' }}>
                    שגיאה בטעינת קורסים
                </Text>
                <Text variant="caption" style={{ color: '#C72222' }}>
                    {craftiroCoursesError}
                </Text>
                <Link href="/academy/courses">
                    <Button label="חזרה לכל הקורסים" color="primary" />
                </Link>
            </Stack>
        )
    }

    // Not found state
    if (!course) {
        return (
            <Stack
                style={{ padding: '40px', alignItems: 'center', gap: '16px' }}
            >
                <Text variant="h2">הקורס לא נמצא</Text>
                <Text variant="caption" style={{ color: '#777' }}>
                    מזהה קורס: {courseSystemId}
                </Text>
                <Link href="/academy/courses">
                    <Button label="חזרה לכל הקורסים" color="primary" />
                </Link>
            </Stack>
        )
    }

    const { longDescription, mainSubjects, tags } = course

    return (
        <Stack
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                padding: '40px 0 0 0',
                gap: '30px',
                maxWidth: '800px',
                margin: '0 auto',
            }}
        >
            {longDescription && <Description description={longDescription} />}

            {/* Tags */}

            {!!tags?.length && <Tags tags={tags} />}

            {/* Main Subjects */}

            {!!mainSubjects?.length && (
                <MainSubjects mainSubjects={mainSubjects} />
            )}
        </Stack>
    )
}
