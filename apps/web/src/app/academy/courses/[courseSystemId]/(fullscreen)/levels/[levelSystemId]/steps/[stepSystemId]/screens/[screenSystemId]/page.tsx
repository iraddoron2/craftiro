'use client'

import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { Button, Stack, Text } from '@craftiro/ui'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

import { CraftiroCourseElementRenderer } from './_components'

export default function StepScreenPage() {
    const { courseSystemId, levelSystemId, stepSystemId, screenSystemId } =
        useParams() as {
            courseSystemId: string
            levelSystemId: string
            stepSystemId: string
            screenSystemId: string
        }

    const router = useRouter()
    const courses = useCraftiroCoursesStore((s) => s.craftiroCourses)

    const currentCourse = courses.find((c) => c.systemId === courseSystemId)
    const currentLevel = currentCourse?.levels?.find(
        (l) => l.levelSystemId === levelSystemId
    )
    const currentStep = currentLevel?.steps?.find(
        (s) => s.stepSystemId === stepSystemId
    )
    const currentScreen = currentStep?.screens?.find(
        (sc) => sc.screenSystemId === screenSystemId
    )

    const handleNavigateToCourse = () => {
        router.push(`/academy/courses/${courseSystemId}`)
    }

    if (!currentCourse || !currentLevel || !currentStep || !currentScreen) {
        return (
            <Stack
                style={{
                    backgroundColor: 'var(--color-text-on-contrast-background)',
                    width: '100%',
                    minHeight: '400px',
                    borderRadius: '12px',
                    borderColor: 'var(--color-divider-main)',
                    borderStyle: 'solid',
                    borderWidth: '2px',
                    padding: '20px',
                    margin: '0 auto',
                }}
            >
                <Text variant="h4" style={{ marginBottom: '12px' }}>
                    לא הצלחנו למצוא את הקורס/הרמה/הצעד/המסך
                </Text>
                <Button onClick={handleNavigateToCourse} label="חזרה לקורס" />
            </Stack>
        )
    }

    return (
        <Stack
            style={{
                backgroundColor: 'var(--color-text-on-contrast-background)',
                width: '100%',
                height: '100%',
                minHeight: '400px',
                borderRadius: '12px',
                margin: '0 auto',
                position: 'static',
            }}
        >
            <Stack
                style={{
                    padding: '12px 24px',
                }}
            >
                {currentScreen.elements.map((element) => (
                    <CraftiroCourseElementRenderer
                        key={element.id}
                        element={element}
                    />
                ))}
            </Stack>
        </Stack>
    )
}
