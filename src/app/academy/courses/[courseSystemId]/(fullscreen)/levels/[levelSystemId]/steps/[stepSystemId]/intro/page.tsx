'use client'

import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { Button, Stack, Text } from '@core'
import { BaseCard, MiroHeader } from '@shared'
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
        return <Text variant="h2" text="הצעד לא נמצא" />
    }

    const { stepTitle, stepShortDescription } = currentStep

    // Loading / error / not-found guards
    if (loading) {
        return (
            <Stack sx={{ padding: '40px', alignItems: 'center' }}>
                <Text variant="h2" text="טוען צעד..." />
            </Stack>
        )
    }

    if (error) {
        return (
            <Stack sx={{ padding: '40px', alignItems: 'center', gap: '12px' }}>
                <Text
                    variant="h2"
                    text="שגיאה בטעינת צעד"
                    sx={{ color: '#C72222' }}
                />
                <Text
                    variant="caption"
                    text={error}
                    sx={{ color: '#C72222' }}
                />
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
            <Stack sx={{ padding: '40px', alignItems: 'center', gap: '12px' }}>
                <Text variant="h2" text="הצעד לא נמצא" />
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
            sx={{
                flexDirection: 'column',

                alignItems: 'center',
                width: '100%',
            }}
        >
            <MiroHeader
                title={`צעד ${stepSystemId}: ${stepTitle}`}
                subtitle={stepShortDescription}
            />
            <CourseLocalNav
                courseSystemId={courseSystemId}
                levelSystemId={levelSystemId}
                stepSystemId={stepSystemId}
            />
            {/* Step long description */}
            <BaseCard title="תיאור" sx={{ width: '100%', maxWidth: '800px' }}>
                <Text
                    variant="body1"
                    text={stepLongDescription || 'אין תיאור ארוך לצעד זה'}
                />
            </BaseCard>

            {/* CTAs */}
            <Stack
                sx={{
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
