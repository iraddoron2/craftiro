'use client'

import { useCoursesStore } from '@/store/coursesStore'
import {
    converParsedCoursesCsvToCoursesObject,
    fetchCsv,
    parsedCsv,
} from '@/utils/csv'
import { useEffect } from 'react'

export const CraftiroCoursesProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const setCourses = useCoursesStore((s) => s.setCourses)
    const setLoading = useCoursesStore((s) => s.setLoading)
    const setError = useCoursesStore((s) => s.setError)

    useEffect(() => {
        const loadCourses = async () => {
            try {
                setLoading(true)
                const csvText = await fetchCsv('/data/craftiroCoursesData.csv')
                console.log('CSV text from provider:', csvText)
                if (!csvText) {
                    throw new Error(
                        'Craftiro Error! CSV text is empty or undefined'
                    )
                }
                const parsed = parsedCsv(csvText)
                console.log('Parsed CSV from provider:', parsed)
                const courses = converParsedCoursesCsvToCoursesObject(parsed)
                setCourses(courses ?? [])
                console.log('courses saved to store:', courses)
            } catch (err) {
                console.error('Craftiro Error! Error loading courses:', err)
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        loadCourses()
    }, [setCourses, setError, setLoading])

    return <>{children}</>
}
