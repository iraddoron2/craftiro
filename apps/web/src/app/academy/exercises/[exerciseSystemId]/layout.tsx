'use client'

import { useCraftiroExercisesStore } from '@/store/craftiroExercisesStore'
import { CraftiroExercise } from '@/types/craftiroExercises'
import { Button, Stack, Text } from '@craftiro/ui'
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
            <Stack style={{ padding: '40px', alignItems: 'center' }}>
                <Text variant="h2">טוען תרגיל...</Text>
            </Stack>
        )
    }

    // Error state
    if (craftiroExercisesError) {
        return (
            <Stack
                style={{ padding: '40px', alignItems: 'center', gap: '12px' }}
            >
                <Text variant="h2" style={{ color: '#C72222' }}>
                    שגיאה בטעינת תרגיל
                </Text>
                <Text variant="caption" style={{ color: '#C72222' }}>
                    {craftiroExercisesError}
                </Text>
                <Link href="/academy/exercises">
                    <Button variant="outlined" label="חזרה לכל התרגילים" />
                </Link>
            </Stack>
        )
    }

    // Not found state
    if (!exercise) {
        return (
            <Stack
                style={{ padding: '40px', alignItems: 'center', gap: '12px' }}
            >
                <Text variant="h2">תרגיל לא נמצא</Text>
                <Text variant="caption" style={{ color: '#777' }}>
                    מזהה: {exerciseSystemId}
                </Text>
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
            style={{
                flexDirection: 'column',
                minHeight: '100vh',
                width: '100%',
            }}
        >
            <Stack>
                {/* Hero section */}
                <Stack
                    style={{
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
                        style={{
                            fontWeight: 'bold',
                            fontSize: '48px',
                            marginBottom: '24px',
                        }}
                    >
                        {name}
                    </Text>
                    <Text
                        variant="body"
                        style={{ fontWeight: 400, fontSize: '24px' }}
                    >
                        {description || 'אין תיאור זמין'}
                    </Text>
                    <Text
                        variant="h2"
                        style={{
                            fontWeight: 400,
                            fontSize: '48px',
                            position: 'absolute',
                            left: '80px',
                            top: '32px',
                        }}
                    >
                        {exerciseSystemId}
                    </Text>
                </Stack>

                {/* Local nav for exercise subpages */}
                <Stack
                    style={{
                        height: '76px',
                        backgroundColor: 'var(--color-background-main)',
                        display: 'flex',
                        padding: '8px',
                        borderTopColor: 'var(--color-border-main)',
                        borderBottomColor: 'var(--color-border-main)',
                        borderTopWidth: '2px',
                        borderBottomWidth: '2px',
                        borderTopStyle: 'solid',
                        borderBottomStyle: 'solid',
                        width: '100%',
                    }}
                >
                    <Stack
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '16px',
                            position: 'relative',
                        }}
                    >
                        <Stack style={{ position: 'absolute', right: '16px' }}>
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
            <Stack style={{ height: '60px' }} />

            {/* Nested routes content */}
            {children}
        </Stack>
    )
}
