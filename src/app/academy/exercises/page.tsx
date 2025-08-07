'use client'

import { useCraftiroExercises } from '@/context/craftiroExercisesContext'
import { useTabsNavbar } from '@/lib'
import { LinksGroups } from '@/types'
import { Stack, Text } from '@core'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { CraftiroExerciseCard } from './_components'

export default function Page() {
    const pathname = usePathname()
    const tabsNavbar = useTabsNavbar()
    const linksGroups: LinksGroups = useMemo(() => [[]], [])

    // משיכת התרגילים מהקונטקסט
    const { exercises } = useCraftiroExercises()

    useEffect(() => {
        if (tabsNavbar.currentPath !== pathname) {
            tabsNavbar.updateCurrentPath(pathname)
            tabsNavbar.updateLinksGroups(linksGroups)
        }
    }, [linksGroups, pathname, tabsNavbar])

    return (
        <Stack
            sx={{
                flexDirection: 'column',
                minHeight: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '24px',
                padding: '32px',
            }}
        >
            {exercises.length === 0 && <Text text="טוען תרגילים..." />}
            <Stack
                sx={{
                    width: '100%',
                    maxWidth: '1600px',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '40px',
                    flexDirection: 'row',
                }}
            >
                {exercises.map((exercise) => (
                    <CraftiroExerciseCard
                        key={exercise.systemId}
                        craftiroExercise={exercise}
                    />
                ))}
            </Stack>
        </Stack>
    )
}
