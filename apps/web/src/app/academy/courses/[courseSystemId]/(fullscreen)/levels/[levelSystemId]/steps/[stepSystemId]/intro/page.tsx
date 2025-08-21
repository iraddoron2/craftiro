'use client'

import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { Button, Stack, Text } from '@craftiro/ui'
import { BaseCard } from '@craftiro/ui-composites'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { CourseLocalNav } from '../_components'

export default function StepPage() {
    const { courseSystemId, levelSystemId, stepSystemId } = useParams<{
        courseSystemId: string
        levelSystemId: string
        stepSystemId: string
    }>()

    const courses = useCraftiroCoursesStore((s) => s.craftiroCourses)
    const loading = useCraftiroCoursesStore((s) => s.craftiroCoursesLoading)
    const error = useCraftiroCoursesStore((s) => s.craftiroCoursesError)

    // Resolve course, level, step (memoized)
    const { course, level, step } = useMemo(() => {
        const course =
            courses.find((c) => c.systemId === courseSystemId) ?? null
        const level =
            course?.levels?.find((l) => l.levelSystemId === levelSystemId) ??
            null
        const step =
            level?.steps?.find((st) => st.stepSystemId === stepSystemId) ?? null
        return { course, level, step }
    }, [courses, courseSystemId, levelSystemId, stepSystemId])

    // Derive first screen system id (for "start step" CTA)
    const firstScreenSystemId = useMemo(() => {
        return step?.screens?.[0]?.screenSystemId ?? null
    }, [step])

    const currentCourse = courses.find(
        (course) => course.systemId === courseSystemId
    )

    const currentLevel = currentCourse?.levels?.find(
        (level) => level.levelSystemId === levelSystemId
    )

    const currentStep = currentLevel?.steps?.find(
        (step) => step.stepSystemId === stepSystemId
    )
    if (!currentStep) {
        return <Text variant="h2">הצעד לא נמצא</Text>
    }

    // Loading / error / not-found guards
    if (loading) {
        return (
            <Stack style={{ padding: '40px', alignItems: 'center' }}>
                <Text variant="h2">טוען צעד...</Text>
            </Stack>
        )
    }

    if (error) {
        return (
            <Stack
                style={{ padding: '40px', alignItems: 'center', gap: '12px' }}
            >
                <Text variant="h2" style={{ color: '#C72222' }}>
                    שגיאה בטעינת הצעד
                </Text>
                <Text variant="caption" style={{ color: '#C72222' }}>
                    {error}
                </Text>
                <Link
                    href={`/academy/courses/${courseSystemId}/levels/${levelSystemId}`}
                >
                    <Button variant="outlined" label="חזרה לשלב" />
                </Link>
            </Stack>
        )
    }

    if (!course || !level || !step) {
        return (
            <Stack
                style={{ padding: '40px', alignItems: 'center', gap: '12px' }}
            >
                <Text variant="h2">הצעד לא נמצא</Text>
                <Link
                    href={`/academy/courses/${courseSystemId}/levels/${levelSystemId}`}
                >
                    <Button variant="outlined" label="חזרה לשלב" />
                </Link>
            </Stack>
        )
    }

    const { stepLongDescription } = step

    return (
        <Stack
            style={{
                flexDirection: 'column',

                alignItems: 'center',
                width: '100%',
            }}
        >
            <CourseLocalNav
                courseSystemId={courseSystemId}
                levelSystemId={levelSystemId}
                stepSystemId={stepSystemId}
            />
            {/* Step long description */}
            <BaseCard
                title="תיאור"
                style={{ width: '100%', maxWidth: '800px' }}
            >
                <Text variant="body">
                    {stepLongDescription || 'אין תיאור ארוך לצעד זה'}
                </Text>
            </BaseCard>

            {/* CTAs */}
            <Stack
                style={{
                    gap: '12px',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                {firstScreenSystemId ? (
                    <Link
                        href={`/academy/courses/${courseSystemId}/levels/${levelSystemId}/steps/${stepSystemId}/screens/${firstScreenSystemId}`}
                    >
                        <Button label="התחלת צעד" color="primary" />
                    </Link>
                ) : (
                    <Button label="אין מסכים זמינים" disabled />
                )}
            </Stack>
        </Stack>
    )
}
