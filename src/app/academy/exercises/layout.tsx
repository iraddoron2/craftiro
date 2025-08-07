'use client'

import { CraftiroExercisesContext } from '@/context/craftiroExercisesContext'
import { CraftiroExercise } from '@/types/craftiroExercises'
import {
    fetchCraftiroExercisesCsv,
    getParsedCraftiroExercises,
} from '@/utils/csv'
import { Stack } from '@core'
import { useEffect, useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    const [exercises, setExercises] = useState<CraftiroExercise[] | null>(null)

    useEffect(() => {
        const fetchAndSet = async () => {
            const csvText = await fetchCraftiroExercisesCsv()
            const parsedCsv = getParsedCraftiroExercises(csvText)
            setExercises(parsedCsv)
        }
        fetchAndSet()
    }, [])

    if (!exercises) {
        return (
            <Stack>
                <div>Loading exercises...</div>
            </Stack>
        )
    }

    return (
        <Stack
            sx={{
                width: '100%',
                minHeight: '100vh',
            }}
        >
            <h1>תרגילים</h1>
            <CraftiroExercisesContext.Provider value={{ exercises }}>
                {children}
            </CraftiroExercisesContext.Provider>
        </Stack>
    )
}
