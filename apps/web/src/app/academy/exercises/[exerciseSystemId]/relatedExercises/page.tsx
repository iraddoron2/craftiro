'use client'

import { useCraftiroExercisesStore } from '@/store/craftiroExercisesStore'
import { Stack, Text } from '@craftiro/ui'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { CraftiroExerciseCard } from '../../_components'

export default function RelatedExercisesPage() {
    // 1) Route param from [exerciseSystemId]
    const { exerciseSystemId } = useParams<{ exerciseSystemId: string }>()

    // 2) Zustand selectors (separate to keep snapshots stable)
    const craftiroExercises = useCraftiroExercisesStore(
        (s) => s.craftiroExercises
    )
    const craftiroExercisesLoading = useCraftiroExercisesStore(
        (s) => s.craftiroExercisesLoading
    )
    const craftiroExercisesError = useCraftiroExercisesStore(
        (s) => s.craftiroExercisesError
    )

    // 3) Current exercise (memoized)
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

    // 4) Memoize related ids to avoid deps “changing every render”
    const relatedIds: string[] = useMemo(() => {
        return exercise?.baseDetails?.relatedExercisesIds ?? []
    }, [exercise])

    // 5) Resolve related exercises (memoized, depends only on stable inputs)
    const relatedExercises = useMemo(() => {
        if (!craftiroExercises?.length || relatedIds.length === 0) return []
        const byId = new Map<string, (typeof craftiroExercises)[number]>()
        for (const ex of craftiroExercises) {
            byId.set(ex.systemId, ex)
            if (ex._id) byId.set(ex._id, ex)
        }
        return relatedIds
            .map((id) => byId.get(id))
            .filter((ex): ex is NonNullable<typeof ex> => Boolean(ex))
    }, [craftiroExercises, relatedIds])

    // ---- Conditional rendering AFTER all hooks ----

    if (craftiroExercisesLoading)
        return <Text variant="h2">טוען תרגילים...</Text>
    if (craftiroExercisesError)
        return <Text variant="h2">שגיאה: {craftiroExercisesError}</Text>
    if (!exercise) return <Text variant="h2">תרגיל לא נמצא</Text>
    if (relatedIds.length === 0)
        return <Text variant="h2">אין תרגילים קשורים</Text>
    if (relatedExercises.length === 0) {
        return <Text variant="h2">לא נמצאו תרגילים קשורים</Text>
    }

    return (
        <Stack
            style={{
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
            {relatedExercises.map((ex) => (
                <CraftiroExerciseCard key={ex.systemId} craftiroExercise={ex} />
            ))}
        </Stack>
    )
}
