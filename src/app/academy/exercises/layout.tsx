'use client'

import { Stack } from '@core'
import { useCraftiroExercisesStore } from '@store'
import React from 'react'

export default function ExercisesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Select only what you need from the store (separate selectors)
    const craftiroExercises = useCraftiroExercisesStore(
        (s) => s.craftiroExercises
    )
    const craftiroExercisesLoading = useCraftiroExercisesStore(
        (s) => s.craftiroExercisesLoading
    )
    const craftiroExercisesError = useCraftiroExercisesStore(
        (s) => s.craftiroExercisesError
    )

    return (
        // Load exercises only under /exercises to avoid global fetch

        <Stack sx={{ width: '100%', minHeight: '100vh' }}>
            <h1>תרגילים</h1>

            {/* Loading state */}
            {craftiroExercisesLoading && <div>Loading exercises...</div>}

            {/* Error state */}
            {craftiroExercisesError && (
                <div style={{ color: '#c22' }}>
                    Error: {craftiroExercisesError}
                </div>
            )}

            {/* Empty state */}
            {!craftiroExercisesLoading &&
                !craftiroExercisesError &&
                (!craftiroExercises || craftiroExercises.length === 0) && (
                    <div>No exercises found</div>
                )}

            {/* Content */}
            {!craftiroExercisesLoading &&
                !craftiroExercisesError &&
                craftiroExercises.length > 0 && <>{children}</>}
        </Stack>
    )
}
