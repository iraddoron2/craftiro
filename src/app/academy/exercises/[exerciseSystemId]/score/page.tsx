'use client'

import { useCraftiroExercisesStore } from '@/store/craftiroExercisesStore'
import { Stack, Text } from '@core'
import { useTheme } from '@hooks'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export default function ExerciseScorePage() {
    // Route param from [exerciseSystemId]
    const { exerciseSystemId } = useParams<{ exerciseSystemId: string }>()
    const theme = useTheme()

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
    if (craftiroExercisesLoading)
        return <Text variant="h2" text="טוען תרגיל..." />
    if (craftiroExercisesError)
        return <Text variant="h2" text={`שגיאה: ${craftiroExercisesError}`} />
    if (!exercise) return <Text variant="h2" text="תרגיל לא נמצא" />

    const xpScore = exercise.baseEvaluation?.xpScore ?? 0
    const skillsScore = exercise.baseEvaluation?.skillsScore ?? 0

    return (
        <Stack
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '40px',
            }}
        >
            <Stack
                sx={{
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
                    sx={{
                        width: '300px',
                        height: '180px',
                        backgroundColor: theme.background.miroColors[1],
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
                            text="ניקוד XP"
                            sx={{
                                color: theme.text.onContrastBackground,
                                fontSize: '24px',
                                fontWeight: 600,
                            }}
                        />
                    </Stack>
                    <Stack sx={{ height: 'fit-content' }}>
                        <Text
                            variant="h3"
                            text={xpScore.toString()}
                            sx={{
                                color: theme.text.onContrastBackground,
                                fontFamily: 'Assistant',
                                fontSize: '52px',
                                fontWeight: 700,
                            }}
                        />
                        <Text
                            variant="body1"
                            text="נקודות ניסיון כלליות"
                            sx={{
                                color: theme.text.onContrastBackground,
                                fontFamily: 'Assistant',
                                fontSize: '16px',
                                fontWeight: 400,
                            }}
                        />
                    </Stack>
                </Stack>

                {/* Skills Score card */}
                <Stack
                    sx={{
                        width: '300px',
                        height: '180px',
                        backgroundColor: theme.background.miroColors[5],
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
                            text="ניקוד Skills"
                            sx={{
                                color: theme.text.onContrastBackground,
                                fontSize: '24px',
                                fontWeight: 600,
                            }}
                        />
                    </Stack>
                    <Stack sx={{ height: 'fit-content' }}>
                        <Text
                            variant="h3"
                            text={skillsScore.toString()}
                            sx={{
                                color: theme.text.onContrastBackground,
                                fontFamily: 'Assistant',
                                fontSize: '52px',
                                fontWeight: 700,
                            }}
                        />
                        <Text
                            variant="body1"
                            text="נקודות מיומנות"
                            sx={{
                                color: theme.text.onContrastBackground,
                                fontFamily: 'Assistant',
                                fontSize: '16px',
                                fontWeight: 400,
                            }}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
