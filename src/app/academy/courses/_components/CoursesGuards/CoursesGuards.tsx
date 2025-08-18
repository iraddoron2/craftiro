'use client'

import { Stack } from '@core'
import { useCraftiroCoursesStatus } from '@hooks'
import React from 'react'
import {
    CoursesEmptyState,
    CoursesErrorState,
    CoursesLoadingState,
} from '../../_components'

/** Guard wrapper for courses routes */
export const CoursesGuards = ({ children }: { children: React.ReactNode }) => {
    const { craftiroCourses, craftiroCoursesLoading, craftiroCoursesError } =
        useCraftiroCoursesStatus()

    // Loading
    if (craftiroCoursesLoading) return <CoursesLoadingState />

    // Error
    if (craftiroCoursesError)
        return <CoursesErrorState message={craftiroCoursesError} />

    // Empty
    if (!craftiroCourses?.length) return <CoursesEmptyState />

    // OK → render content
    return (
        <Stack
            sx={{
                flexDirection: 'column',
                minHeight: '100vh',
                width: '100%',
            }}
        >
            {children}
        </Stack>
    )
}
