'use client'

import { useCraftiroExercisesStore } from '@/store/craftiroExercisesStore'
import { Stack, Text } from '@craftiro/ui'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export default function ExerciseScorePage() {
    // Route param from [exerciseSystemId]
    const { exerciseSystemId } = useParams<{ exerciseSystemId: string }>()

    // Zustand selectors (separate for stable snapshots)
    const craftiroExercises = useCraftiroExercisesStore(
        (s) => s.craftiroExercises
    )
    const craftiroExercisesLoading = useCraftiroExercisesStore(
        (s) => s.craftiroExercisesLoading
    )
    const craftiroExercisesError = useCraftiroExercisesStore(
        (s) => s.craftiroExercisesError
    )

    // Resolve current exercise (by systemId, fallback to _id if needed)
    const exercise = useMemo(() => {
        if (!craftiroExercises?.length || !exerciseSystemId) return null
        return (
            craftiroExercises.find(
                (ex) =>
                    ex.systemId === exerciseSystemId ||
                    ex._id === exerciseSystemId
            ) ?? null
        )
    }, [craftiroExercises, exerciseSystemId])

    // Loading / Error / Not found states
    if (craftiroExercisesLoading) return <Text variant="h2">טוען תרגיל...</Text>
    if (craftiroExercisesError)
        return <Text variant="h2">שגיאה: {craftiroExercisesError}</Text>
    if (!exercise) return <Text variant="h2">תרגיל לא נמצא</Text>

    const xpScore = exercise.baseEvaluation?.xpScore ?? 0
    const skillsScore = exercise.baseEvaluation?.skillsScore ?? 0

    return (
        <Stack
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '40px',
            }}
        >
            <Stack
                style={{
                    gap: '40px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    flexWrap: 'wrap',
                }}
            >
                {/* XP Score card */}
                <Stack
                    style={{
                        width: '300px',
                        height: '180px',
                        backgroundColor: 'var(--color-background-contrast)',
                        borderRadius: '12px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}
                >
                    <Stack>
                        <Text
                            variant="h3"
                            style={{
                                color: 'var(--color-text-on-contrast-background)',
                                fontSize: '24px',
                                fontWeight: 600,
                            }}
                        >
                            ניקוד XP
                        </Text>
                    </Stack>
                    <Stack style={{ height: 'fit-content' }}>
                        <Text
                            variant="h3"
                            style={{
                                color: 'var(--color-text-on-contrast-background)',
                                fontFamily: 'Assistant',
                                fontSize: '52px',
                                fontWeight: 700,
                            }}
                        >
                            {xpScore}
                        </Text>
                        <Text
                            variant="body"
                            style={{
                                color: 'var(--color-text-on-contrast-background)',
                                fontFamily: 'Assistant',
                                fontSize: '16px',
                                fontWeight: 400,
                            }}
                        >
                            נקודות ניסיון כלליות
                        </Text>
                    </Stack>
                </Stack>

                {/* Skills Score card */}
                <Stack
                    style={{
                        width: '300px',
                        height: '180px',
                        backgroundColor: 'var(--color-background-contrast)',
                        borderRadius: '12px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}
                >
                    <Stack>
                        <Text
                            variant="h3"
                            style={{
                                color: 'var(--color-text-on-contrast-background)',
                                fontSize: '24px',
                                fontWeight: 600,
                            }}
                        >
                            ניקוד Skills
                        </Text>
                    </Stack>
                    <Stack style={{ height: 'fit-content' }}>
                        <Text
                            variant="h3"
                            style={{
                                color: 'var(--color-text-on-contrast-background)',
                                fontFamily: 'Assistant',
                                fontSize: '52px',
                                fontWeight: 700,
                            }}
                        >
                            {skillsScore}
                        </Text>
                        <Text
                            variant="body"
                            style={{
                                color: 'var(--color-text-on-contrast-background)',
                                fontFamily: 'Assistant',
                                fontSize: '16px',
                                fontWeight: 400,
                            }}
                        >
                            נקודות מיומנות
                        </Text>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
