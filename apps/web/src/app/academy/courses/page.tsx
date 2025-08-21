'use client'

import { useTabsNavbarStore } from '@/store' // ← חשוב: גישה ישירה ל-store
// import { useCraftiroCoursesStore } from '@/store/craftiroCoursesStore'
import { SystemHomePageFrame, SystemHomePageHeroSection } from '@/components'
import { LinksGroups } from '@/types'

import { usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'

export default function CoursesPage() {
    const pathname = usePathname()

    // Pull only what you need from the navbar store (separate selectors)
    const currentPath = useTabsNavbarStore((s) => s.currentPath)
    const updateCurrentPath = useTabsNavbarStore((s) => s.updateCurrentPath)
    const updateLinksGroups = useTabsNavbarStore((s) => s.updateLinksGroups)

    // Stable linksGroups value
    const linksGroups: LinksGroups = useMemo(() => [[]], [])

    // Pull courses state from Zustand store (separate selectors)
    // const craftiroCourses = useCraftiroCoursesStore((s) => s.craftiroCourses)
    // const craftiroCoursesLoading = useCraftiroCoursesStore(
    //     (s) => s.craftiroCoursesLoading
    // )
    // const craftiroCoursesError = useCraftiroCoursesStore(
    //     (s) => s.craftiroCoursesError
    // )

    // Update navbar ONLY when the path actually changes
    useEffect(() => {
        if (currentPath !== pathname) {
            updateCurrentPath(pathname)
            updateLinksGroups(linksGroups)
        }
        // deps רק על מה שבאמת משתנה; אל תשים את כל האובייקט tabsNavbar
    }, [
        pathname,
        currentPath,
        updateCurrentPath,
        updateLinksGroups,
        linksGroups,
    ])

    return (
        <SystemHomePageFrame>
            <SystemHomePageHeroSection
                title="קורסים"
                subtitle="למדו מוזיקה צעד אחר צעד בעזרת הקורסים שלנו"
            >
                {/* {craftiroCoursesLoading && <div>טוען קורסים...</div>}
            {craftiroCoursesError && <div>שגיאה: {craftiroCoursesError}</div>} */}

                {/* {!craftiroCoursesLoading && !craftiroCoursesError && (
                <Stack
                    style={{
                        width: '100%',
                        maxWidth: '1600px',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '40px',
                        flexDirection: 'row',
                    }}
                >
                    {craftiroCourses.map((course) => (
                        <CourseCard key={course.systemId} course={course} />
                    ))}
                </Stack>
            )} */}
            </SystemHomePageHeroSection>
        </SystemHomePageFrame>
    )
}
