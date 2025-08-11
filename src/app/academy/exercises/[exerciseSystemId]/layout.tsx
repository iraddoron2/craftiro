'use client'

import { useCraftiroExercisesStore } from '@/store/craftiroExercisesStore'
import { CraftiroExercise } from '@/types/craftiroExercises'
import { Button, Stack, Text } from '@core'
import { useTheme } from '@hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export default function ExerciseLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Route param (folder name is [exerciseSystemId])
    const { exerciseSystemId } = useParams<{ exerciseSystemId: string }>()

    // Theme + simple responsive flag
    const theme = useTheme()
    const [isMobile, setIsMobile] = useState<boolean | null>(null)

    // Select only what you need from Zustand (separate selectors)
    const craftiroExercises = useCraftiroExercisesStore(
        (s) => s.craftiroExercises
    )
    const craftiroExercisesLoading = useCraftiroExercisesStore(
        (s) => s.craftiroExercisesLoading
    )
    const craftiroExercisesError = useCraftiroExercisesStore(
        (s) => s.craftiroExercisesError
    )

    // Compute current exercise by systemId (or _id fallback)
    const exercise: CraftiroExercise | null = useMemo(() => {
        if (!craftiroExercises?.length || !exerciseSystemId) return null
        return (
            craftiroExercises.find(
                (ex) =>
                    ex.systemId === exerciseSystemId ||
                    ex._id === exerciseSystemId
            ) ?? null
        )
    }, [craftiroExercises, exerciseSystemId])

    // Simple viewport watcher
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Loading state
    if (craftiroExercisesLoading || isMobile === null) {
        return (
            <Stack sx={{ padding: '40px', alignItems: 'center' }}>
                <Text variant="h2" text="טוען תרגיל..." />
            </Stack>
        )
    }

    // Error state
    if (craftiroExercisesError) {
        return (
            <Stack sx={{ padding: '40px', alignItems: 'center', gap: '12px' }}>
                <Text
                    variant="h2"
                    text="שגיאה בטעינת תרגיל"
                    sx={{ color: '#C72222' }}
                />
                <Text
                    variant="caption"
                    text={craftiroExercisesError}
                    sx={{ color: '#C72222' }}
                />
                <Link href="/academy/exercises">
                    <Button variant="outlined" label="חזרה לכל התרגילים" />
                </Link>
            </Stack>
        )
    }

    // Not found state
    if (!exercise) {
        return (
            <Stack sx={{ padding: '40px', alignItems: 'center', gap: '12px' }}>
                <Text variant="h2" text="תרגיל לא נמצא" />
                <Text
                    variant="caption"
                    text={`מזהה: ${exerciseSystemId}`}
                    sx={{ color: '#777' }}
                />
                <Link href="/academy/exercises">
                    <Button variant="outlined" label="חזרה לכל התרגילים" />
                </Link>
            </Stack>
        )
    }

    const { baseDetails } = exercise
    const { name = 'תרגיל לא מזוהה', description = '' } = baseDetails

    return (
        <Stack
            sx={{ flexDirection: 'column', minHeight: '100vh', width: '100%' }}
        >
            <Stack>
                {/* Hero section */}
                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '32px',
                        position: 'relative',
                    }}
                >
                    <Text
                        variant="h2"
                        text={name}
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '48px',
                            marginBottom: '24px',
                        }}
                    />
                    <Text
                        variant="body1"
                        text={description}
                        sx={{ fontWeight: 400, fontSize: '24px' }}
                    />
                    <Text
                        variant="h2"
                        text={exerciseSystemId}
                        sx={{
                            fontWeight: 400,
                            fontSize: '48px',
                            position: 'absolute',
                            left: '80px',
                            top: '32px',
                        }}
                    />
                </Stack>

                {/* Local nav for exercise subpages */}
                <Stack
                    sx={{
                        height: '76px',
                        backgroundColor: theme.background.topNavbar,
                        display: 'flex',
                        padding: '8px',
                        borderTopColor: theme.common?.border,
                        borderBottomColor: theme.common?.border,
                        borderTopWidth: '2px',
                        borderBottomWidth: '2px',
                        borderTopStyle: 'solid',
                        borderBottomStyle: 'solid',
                        width: '100%',
                    }}
                >
                    <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '16px',
                            position: 'relative',
                        }}
                    >
                        <Stack sx={{ position: 'absolute', right: '16px' }}>
                            <Link href={`/academy/exercises`}>
                                <Button
                                    variant="outlined"
                                    label="חזרה לכל התרגילים"
                                />
                            </Link>
                        </Stack>

                        {/* Exercise tabs */}
                        <Link
                            href={`/academy/exercises/${exerciseSystemId}/info`}
                        >
                            <Button variant="text" label="סקירה כללית" />
                        </Link>
                        <Link
                            href={`/academy/exercises/${exerciseSystemId}/media`}
                        >
                            <Button variant="text" label="מדיה" />
                        </Link>
                        <Link
                            href={`/academy/exercises/${exerciseSystemId}/relatedExercises`}
                        >
                            <Button variant="text" label="תרגילים דומים" />
                        </Link>
                        <Link
                            href={`/academy/exercises/${exerciseSystemId}/score`}
                        >
                            <Button variant="text" label="ניקוד" />
                        </Link>
                    </Stack>
                </Stack>
            </Stack>

            {/* Spacer under local nav */}
            <Stack sx={{ height: '60px' }} />

            {/* Nested routes content */}
            {children}
        </Stack>
    )
}
