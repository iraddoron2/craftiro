'use client'

import { useCraftiroExercisesStore } from '@/store/craftiroExercisesStore'
import { useTabsNavbarStore } from '@/store/tabsNavbarStore' // ← use your actual path
import { LinksGroups } from '@/types'
import { Stack, Text } from '@craftiro/ui'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { CraftiroExerciseCard } from './_components'

export default function ExercisesPage() {
    const pathname = usePathname()

    // Navbar store: select only what you need (stable selectors)
    const currentPath = useTabsNavbarStore((s) => s.currentPath)
    const updateCurrentPath = useTabsNavbarStore((s) => s.updateCurrentPath)
    const updateLinksGroups = useTabsNavbarStore((s) => s.updateLinksGroups)

    // Stable links groups (adjust when you have real tabs)
    const linksGroups: LinksGroups = useMemo(() => [[]], [])

    // Exercises state from Zustand
    const craftiroExercises = useCraftiroExercisesStore(
        (s) => s.craftiroExercises
    )
    const craftiroExercisesLoading = useCraftiroExercisesStore(
        (s) => s.craftiroExercisesLoading
    )
    const craftiroExercisesError = useCraftiroExercisesStore(
        (s) => s.craftiroExercisesError
    )

    // Sync navbar only when needed
    useEffect(() => {
        if (currentPath !== pathname) {
            updateCurrentPath(pathname)
            updateLinksGroups(linksGroups)
        }
    }, [
        pathname,
        currentPath,
        updateCurrentPath,
        updateLinksGroups,
        linksGroups,
    ])

    return (
        <Stack
            style={{
                flexDirection: 'column',
                minHeight: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '24px',
                padding: '32px',
            }}
        >
            {/* Loading */}
            {craftiroExercisesLoading && <Text>טוען תרגילים...</Text>}

            {/* Error */}
            {craftiroExercisesError && (
                <Text style={{ color: '#c22' }}>
                    שגיאה: {craftiroExercisesError}
                </Text>
            )}

            {/* Grid */}
            {!craftiroExercisesLoading && !craftiroExercisesError && (
                <Stack
                    style={{
                        width: '100%',
                        maxWidth: '1600px',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '40px',
                        flexDirection: 'row',
                    }}
                >
                    {craftiroExercises.length === 0 ? (
                        <Text>לא נמצאו תרגילים זמינים כרגע</Text>
                    ) : (
                        craftiroExercises.map((exercise) => (
                            <CraftiroExerciseCard
                                key={exercise.systemId}
                                craftiroExercise={exercise}
                            />
                        ))
                    )}
                </Stack>
            )}
        </Stack>
    )
}
