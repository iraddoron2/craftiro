'use client'

import { useCraftiroCourses } from '@/context/craftiroCoursesContext'
import { useTabsNavbar } from '@/lib'
import { LinksGroups } from '@/types'
import { Stack } from '@core'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { CourseCard } from './_components'

export default function Page() {
    const pathname = usePathname()
    const tabsNavbar = useTabsNavbar()
    const linksGroups: LinksGroups = useMemo(() => [[]], [])

    // משיכת הקורסים מהקונטקסט
    const { courses } = useCraftiroCourses()

    useEffect(() => {
        if (tabsNavbar.currentPath !== pathname) {
            tabsNavbar.updateCurrentPath(pathname)
            tabsNavbar.updateLinksGroups(linksGroups)
        }
    }, [linksGroups, pathname, tabsNavbar])

    return (
        <Stack>
            <h1>Craftiro Courses</h1>
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
                {courses.length === 0 && <div>טוען קורסים...</div>}
            </Stack>
            {courses.map((course) => (
                <CourseCard key={course.systemId} course={course} />
            ))}
        </Stack>
    )
}
