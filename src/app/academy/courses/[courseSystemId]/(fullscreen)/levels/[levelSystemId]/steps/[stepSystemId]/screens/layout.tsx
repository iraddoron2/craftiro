'use client'

import { Stack, Text } from '@core'
import { useCraftiroCoursesStore } from '@store'
import { useParams } from 'next/navigation'
import CourseLocalNav from './_components/CourseLocalNav'

type LayoutProps = { children: React.ReactNode }

export default function Layout({ children }: LayoutProps) {
    const { courseSystemId, levelSystemId, stepSystemId } = useParams() as {
        courseSystemId: string
        levelSystemId: string
        stepSystemId: string
    }

    const courses = useCraftiroCoursesStore((s) => s.craftiroCourses)
    const step = (() => {
        const course = courses.find((c) => c.systemId === courseSystemId)
        const level = course?.levels?.find(
            (l) => l.levelSystemId === levelSystemId
        )
        return (
            level?.steps?.find((st) => st.stepSystemId === stepSystemId) ?? null
        )
    })()

    if (!step) {
        return <Text variant="h2" text="הצעד לא נמצא" />
    }

    return (
        <Stack sx={{ display: 'flex', flexDirection: 'column' }}>
            <CourseLocalNav
                courseSystemId={courseSystemId}
                levelSystemId={levelSystemId}
                stepSystemId={stepSystemId}
            />
            <Stack>{children}</Stack>
        </Stack>
    )
}
