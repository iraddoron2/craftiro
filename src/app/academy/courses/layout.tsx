'use client'

import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { Stack } from '@core'

export default function CoursesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const craftiroCourses = useCraftiroCoursesStore((s) => s.craftiroCourses)
    const craftiroCoursesLoading = useCraftiroCoursesStore(
        (s) => s.craftiroCoursesLoading
    )
    const craftiroCoursesError = useCraftiroCoursesStore(
        (s) => s.craftiroCoursesError
    )

    if (craftiroCoursesLoading)
        return (
            <Stack>
                <div>טוען קורסים...</div>
            </Stack>
        )
    if (craftiroCoursesError)
        return (
            <Stack>
                <div>שגיאה בטעינת קורסים: {craftiroCoursesError}</div>
            </Stack>
        )
    if (!craftiroCourses?.length)
        return (
            <Stack>
                <div>לא נמצאו קורסים</div>
            </Stack>
        )

    return (
        <Stack sx={{ flexDirection: 'column', minHeight: '100vh' }}>
            {children}
        </Stack>
    )
}
