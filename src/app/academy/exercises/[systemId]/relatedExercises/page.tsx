'use client'

import { exercises } from '@/data/demoData/exercises'
import { Stack, Text } from '@core'
import { useParams } from 'next/navigation'
import { CraftExerciseCard } from '../../_components'
import { getExerciseBySystemId } from '../../utils'

export default function Page() {
    const { systemId } = useParams<{ systemId: string }>()

    const exercise = getExerciseBySystemId(exercises, systemId)

    if (!exercise) {
        return <Text variant="h2" text="תרגיל לא נמצא" />
    }

    const { baseDetails } = exercise

    const { relatedExercisesIds = [] } = baseDetails

    if (!relatedExercisesIds || relatedExercisesIds.length === 0) {
        return <Text variant="h2" text="אין תרגילים קשורים" />
    }

    const relatedExercises = relatedExercisesIds.map((id) => {
        const relatedExercise = getExerciseBySystemId(exercises, id)
        return relatedExercise ? relatedExercise : null
    })

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
            {relatedExercises.map((exercise, index) => {
                if (!exercise) return null
                return (
                    <CraftExerciseCard key={index} craftExercise={exercise} />
                )
            })}
        </Stack>
    )
}
