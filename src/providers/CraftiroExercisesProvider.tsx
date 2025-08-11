'use client'

import { useCraftiroExercisesStore } from '@/store'
import { CraftiroExercise } from '@/types/craftiroExercises'
import React, { useEffect } from 'react'

export const CraftiroExercisesProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const setCraftiroExercises = useCraftiroExercisesStore(
        (s) => s.setCraftiroExercises
    )
    const setCraftiroExercisesLoading = useCraftiroExercisesStore(
        (s) => s.setCraftiroExercisesLoading
    )
    const setCraftiroExercisesError = useCraftiroExercisesStore(
        (s) => s.setCraftiroExercisesError
    )

    useEffect(() => {
        const loadCraftiroExercises = async () => {
            try {
                setCraftiroExercisesLoading(true)

                // Fetch exercises from API
                const res = await fetch('/api/academy/exercises', {
                    cache: 'no-store',
                })
                if (!res.ok)
                    throw new Error(
                        `Failed to fetch CraftiroExercises: ${res.status}`
                    )

                // Expecting: { exercises: CraftiroExercise[] }
                const { exercises } = (await res.json()) as {
                    exercises: CraftiroExercise[]
                }

                // Update store
                setCraftiroExercises(exercises ?? [])
            } catch (err) {
                console.error('Craftiro Error! loading exercises:', err)
                setCraftiroExercisesError((err as Error).message)
            } finally {
                setCraftiroExercisesLoading(false)
            }
        }

        loadCraftiroExercises()
    }, [
        setCraftiroExercises,
        setCraftiroExercisesLoading,
        setCraftiroExercisesError,
    ])

    return <>{children}</>
}
