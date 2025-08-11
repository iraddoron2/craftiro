'use client'

import { useCraftiroExercisesStore } from '@/store/craftiroExercisesStore'
import { CraftiroTextSegment } from '@/types'
import { Stack, Text } from '@core'
import { Paragraph as CraftParagraph } from '@craftElements/base/Paragraph'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { ExerciseDetailCard } from '../../_components'

export default function ExerciseInfoPage() {
    // Read route param ([exerciseSystemId] folder)
    const { exerciseSystemId } = useParams<{ exerciseSystemId: string }>()

    // Pull exercises state from Zustand (separate selectors keep snapshots stable)
    const craftiroExercises = useCraftiroExercisesStore(
        (s) => s.craftiroExercises
    )

    // Find current exercise by systemId (or _id as fallback if needed)
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
        return <Text variant="h2" text="תרגיל לא נמצא" />
    }

    const { baseDetails } = exercise
    const { instructions = [] } = baseDetails

    // Render paragraph instructions only
    const Instructions = instructions.map((instruction, idx) => {
        if (!instruction || instruction.type !== 'paragraph') return null
        const { id, content, systemId } = instruction as {
            id: string
            type: 'paragraph'
            content: CraftiroTextSegment[]
            systemId: string
        }
        return (
            <CraftParagraph
                key={systemId || id || idx}
                paragraph={{ id, type: 'paragraph', content, systemId }}
            />
        )
    })

    return (
        <Stack
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '40px',
            }}
        >
            <ExerciseDetailCard title="הנחיות">
                <Stack>{Instructions}</Stack>
            </ExerciseDetailCard>
        </Stack>
    )
}
