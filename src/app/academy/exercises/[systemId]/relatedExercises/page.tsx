'use client'

import { useCraftiroExercises } from '@/context/craftiroExercisesContext'
import { Stack, Text } from '@core'
import { useParams } from 'next/navigation'
import { CraftiroExerciseCard } from '../../_components'

export default function Page() {
    const { systemId } = useParams<{ systemId: string }>()
    const { exercises } = useCraftiroExercises()

    const exercise = exercises.find((ex) => ex.systemId === systemId)

    if (!exercise) {
        return <Text variant="h2" text="תרגיל לא נמצא" />
    }

    const { baseDetails } = exercise
    const { relatedExercisesIds = [] } = baseDetails

    if (!relatedExercisesIds.length) {
        return <Text variant="h2" text="אין תרגילים קשורים" />
    }

    // מוצאים את כל התרגילים הקשורים לפי ה־id שלהם
    const relatedExercises = relatedExercisesIds
        .map((id) => exercises.find((ex) => ex.systemId === id))
        .filter((ex): ex is NonNullable<typeof ex> => ex !== undefined)

    if (relatedExercises.length === 0) {
        return <Text variant="h2" text="לא נמצאו תרגילים קשורים" />
    }

    return (
        <Stack
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '16px',
                padding: '20px',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
            }}
        >
            {relatedExercises.map((exercise) => (
                <CraftiroExerciseCard
                    key={exercise.systemId}
                    craftiroExercise={exercise}
                />
            ))}
        </Stack>
    )
}
