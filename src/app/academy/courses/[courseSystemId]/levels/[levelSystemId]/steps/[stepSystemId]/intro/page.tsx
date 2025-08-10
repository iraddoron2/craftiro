'use client'

import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { Button, Stack, Text } from '@core'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function StepPage() {
    const { courseSystemId, levelSystemId, stepSystemId } = useParams<{
        courseSystemId: string
        levelSystemId: string
        stepSystemId: string
    }>()

    const courses = useCraftiroCoursesStore((s) => s.craftiroCourses)
    const [tabValue, setTabValue] = useState(0)

    // Find current step
    const stepData = (() => {
        const course = courses.find((c) => c.systemId === courseSystemId)
        if (!course) return null
        const level = course.levels?.find(
            (l) => l.levelSystemId === levelSystemId
        )
        if (!level) return null
        return (
            level.steps?.find((st) => st.stepSystemId === stepSystemId) ?? null
        )
    })()

    if (!stepData) {
        return <Text variant="h2" text="הצעד לא נמצא" />
    }

    const { stepTitle, stepShortDescription, stepLongDescription } = stepData

    return (
        <Stack sx={{ flexDirection: 'column', gap: '24px', padding: '24px' }}>
            {/* Tabs */}
            <Stack
                sx={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    borderBottom: '1px solid #ddd',
                }}
            >
                <Link
                    href={`/academy/courses/${courseSystemId}/levels/${levelSystemId}/${stepSystemId}/intro`}
                >
                    <Button label="הקדמה לצעד" color="primary" />
                </Link>
                <Link
                    href={`/academy/courses/${courseSystemId}/levels/${levelSystemId}/${stepSystemId}/steps-map`}
                >
                    <Button label="מפת צעדים" color="primary" />
                </Link>
            </Stack>
            <Tabs
                value={tabValue}
                onChange={(_, newValue) => setTabValue(newValue)}
            >
                <Tab label="הקדמה לצעד" />
                <Tab label="מפת צעדים" />
            </Tabs>

            {/* Tab Panels */}
            {tabValue === 0 && (
                <Stack sx={{ gap: '16px' }}>
                    <Text variant="h2" text={stepTitle ?? ''} />
                    {stepShortDescription && (
                        <Text variant="body1" text={stepShortDescription} />
                    )}
                </Stack>
            )}

            {tabValue === 1 && (
                <Stack>
                    <Text text="פה תופיע מפת הצעדים" />
                    {/* כאן אפשר להוסיף את הקומפוננטה של המפה בעתיד */}
                </Stack>
            )}

            {/* Long Description */}
            <Stack
                sx={{
                    border: '1px solid #ddd',
                    padding: '16px',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                }}
            >
                <Text
                    variant="body1"
                    text={stepLongDescription || 'אין תיאור ארוך לצעד זה'}
                />
            </Stack>

            {/* Start Step Button */}
            <Button
                label="התחלת צעד"
                color="primary"
                onClick={() => {
                    // כאן נוסיף לוגיקה להתחלת הצעד
                }}
            />
        </Stack>
    )
}
