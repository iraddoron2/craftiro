'use client'

import { useCraftiroCoursesStore } from '@/store'
import { Stack, Text } from '@craftiro/ui'
import { useParams } from 'next/navigation'

type Props = {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
    const { courseSystemId, levelSystemId, stepSystemId } = useParams() as {
        courseSystemId: string
        levelSystemId: string
        stepSystemId: string
    }

    const courses = useCraftiroCoursesStore((s) => s.craftiroCourses)

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

    return (
        <Stack style={{ display: 'flex' }}>
            <Stack>{children}</Stack>
        </Stack>
    )
}
