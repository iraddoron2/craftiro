'use client'

import { useCraftiroCoursesStatus } from '@/hooks'
import { Stack } from '@craftiro/ui'
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
            style={{
                flexDirection: 'column',
                // minHeight: 'calc(100dvh - 60px)',
                height: 'calc(100dvh - 60px)',
                width: '100%',
                // maxWidth: '1800px',
            }}
        >
            {children}
        </Stack>
    )
}
