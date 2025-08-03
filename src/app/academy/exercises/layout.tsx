'use client'

import { CraftExercisesContext } from '@/context/craftExercisesContext'
import { CraftExercise } from '@/types/craftExercises'
import { fetchCraftExercisesCsv } from '@/utils/csv'
import { getParsedCraftExercises } from '@/utils/csv/getParsedCraftExercises'
import { Stack } from '@core'
import { useEffect, useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    const [exercises, setExercises] = useState<CraftExercise[] | null>(null)

    useEffect(() => {
        const fetchAndSet = async () => {
            const csvText = await fetchCraftExercisesCsv()
            const parsedCsv = getParsedCraftExercises(csvText)
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
            <CraftExercisesContext.Provider value={{ exercises }}>
                {/* <pre>{JSON.stringify(exercises, null, 2)}</pre> */}
                {children}
            </CraftExercisesContext.Provider>
        </Stack>
    )
}
