'use client'

import { MiroHeader } from '@/components/shared'
import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { CraftiroCourse } from '@/types/craftiroCourses'
import { Button, Stack, Text } from '@craftiro/ui'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { CourseLocalNav } from '../_components'

export default function CourseLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { courseSystemId } = useParams<{ courseSystemId: string }>()
    const craftiroCourses = useCraftiroCoursesStore((s) => s.craftiroCourses)
    const craftiroCoursesLoading = useCraftiroCoursesStore(
        (s) => s.craftiroCoursesLoading
    )
    const craftiroCoursesError = useCraftiroCoursesStore(
        (s) => s.craftiroCoursesError
    )

    // Find current course
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
                style={{ padding: '40px', alignItems: 'center', gap: '12px' }}
            >
                <Text variant="h2" style={{ color: '#C72222' }}>
                    שגיאה בטעינת קורסים
                </Text>
                <Text variant="caption" style={{ color: '#C72222' }}>
                    {craftiroCoursesError}
                </Text>
                <Link href="/academy/courses">
                    <Button variant="outlined" label="חזרה לכל הקורסים" />
                </Link>
            </Stack>
        )
    }

    // Not found
    if (!course) {
        return (
            <Stack
                style={{ padding: '40px', alignItems: 'center', gap: '12px' }}
            >
                <Text variant="h2">הקורס לא נמצא</Text>
                <Text variant="caption" style={{ color: '#777' }}>
                    מזהה קורס: {courseSystemId}
                </Text>
                <Link href="/academy/courses">
                    <Button variant="outlined" label="חזרה לכל הקורסים" />
                </Link>
            </Stack>
        )
    }

    const { name = 'קורס לא מזוהה', shortDescription = '' } = course

    return (
        <Stack
            style={{
                flexDirection: 'column',
                minHeight: '100vh',
                width: '100%',
            }}
        >
            {/* Header */}
            <MiroHeader title={name} subtitle={shortDescription} />

            {/* Local navigation */}
            <CourseLocalNav courseSystemId={courseSystemId} />

            {/* Nested routes content */}
            {children}
        </Stack>
    )
}
