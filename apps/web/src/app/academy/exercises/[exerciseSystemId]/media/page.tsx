'use client'

import { useCraftiroExercisesStore } from '@/store/craftiroExercisesStore'
import { DriveChartsLink } from '@/types'
import { ExerciseVersion } from '@/types/craftiroExercises'
import { Button, Stack, Text } from '@craftiro/ui'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { ExerciseDetailCard } from '../../_components'

// Translate Drive asset labels (hebrew UI labels)
const translateDriveLabel = (label: string) => {
    const dict: Record<string, string> = {
        'Lead Sheet': 'Lead Sheet',
        'Chord Chart': 'טבלת אקורדים',
        'Full Score': 'תווים מלאים',
        Scale: 'תווים גדולים',
        Tablature: 'טבלטורה',
    }
    return dict[label] || label
}

// Safe helper: null/undefined -> []
const safeArray = <T,>(val: T[] | null | undefined): T[] =>
    Array.isArray(val) ? val : []

export default function ExerciseMediaPage() {
    const { exerciseSystemId } = useParams<{ exerciseSystemId: string }>()
    const craftiroExercises = useCraftiroExercisesStore(
        (s) => s.craftiroExercises
    )

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

    if (!exercise) {
        return <Text variant="h2">תרגיל לא נמצא</Text>
    }

    // Extract mainVersion + assets safely
    const { mainVersion = {} as ExerciseVersion } = exercise
    const driveChartsLinks: DriveChartsLink[] = safeArray(
        mainVersion?.assets?.driveChartsLinks
    )

    return (
        <Stack
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '40px',
            }}
        >
            <ExerciseDetailCard title="תווים">
                <Stack
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '16px',
                    }}
                >
                    {driveChartsLinks.length === 0 && (
                        <Text>לא נמצאו קישורים לתווים</Text>
                    )}

                    {driveChartsLinks.map((link) => {
                        const url = link?.url ?? ''
                        const labels = safeArray(link?.labels).map(
                            translateDriveLabel
                        )
                        const formattedLabels =
                            labels.join(' | ') || 'ללא תוויות'

                        return (
                            <Stack
                                key={url || formattedLabels}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    variant="h2"
                                    style={{
                                        fontSize: '24px',
                                        marginBottom: '8px',
                                    }}
                                >
                                    {formattedLabels}
                                </Text>
                                {url ? (
                                    <Link href={url} target="_blank">
                                        <Button
                                            label="כניסה לתווים"
                                            color="primary"
                                        />
                                    </Link>
                                ) : (
                                    <Text
                                        variant="caption"
                                        style={{ color: '#c22' }}
                                    >
                                        לינק חסר
                                    </Text>
                                )}
                            </Stack>
                        )
                    })}
                </Stack>
            </ExerciseDetailCard>
        </Stack>
    )
}
