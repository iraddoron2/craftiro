'use client'

import { useCraftiroCoursesStore } from '@/store'
import { CraftiroCourse } from '@/types/craftiroCourses'
import React, { useEffect } from 'react'

export const CraftiroCoursesProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const setCraftiroCourses = useCraftiroCoursesStore(
        (s) => s.setCraftiroCourses
    )
    const setCraftiroCoursesLoading = useCraftiroCoursesStore(
        (s) => s.setCraftiroCoursesLoading
    )
    const setCraftiroCoursesError = useCraftiroCoursesStore(
        (s) => s.setCraftiroCoursesError
    )

    useEffect(() => {
        const loadCraftiroCourses = async () => {
            try {
                setCraftiroCoursesLoading(true)

                // Fetch courses from API
                const res = await fetch('/api/academy/courses')
                if (!res.ok) {
                    throw new Error(
                        `Failed to fetch CraftiroCourses: ${res.status}`
                    )
                }

                // Extract courses array from response
                const { courses } = (await res.json()) as {
                    courses: CraftiroCourse[]
                }

                // Update store
                setCraftiroCourses(courses)
            } catch (err) {
                console.error('Craftiro Error! loading courses:', err)
                setCraftiroCoursesError((err as Error).message)
            } finally {
                setCraftiroCoursesLoading(false)
            }
        }

        loadCraftiroCourses()
    }, [setCraftiroCourses, setCraftiroCoursesLoading, setCraftiroCoursesError])

    return <>{children}</>
}
