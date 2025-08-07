'use client'

import { CraftiroCoursesContext } from '@/context/craftiroCoursesContext'
import { CraftiroCourse } from '@/types/craftiroCourses'
import {
    converParsedCoursesCsvToCoursesObject,
    fetchCraftiroCoursesCsv,
    parsedCsv,
} from '@/utils/csv'
import { Stack } from '@core'
import { useEffect, useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    const [courses, setCourses] = useState<CraftiroCourse[] | null>(null)
    const [csvText, setCsvText] = useState<string>('')
    const [parsedCsvState, setParsedCsvState] = useState<string[][]>([])

    useEffect(() => {
        const fetchAndSet = async () => {
            const csvTextResponse = await fetchCraftiroCoursesCsv()
            // set the fetched CSV text and parsed state
            setCsvText(csvTextResponse)
            const parsedCsvArray = parsedCsv(csvTextResponse || '')
            setParsedCsvState(parsedCsvArray)
            const coursesResult = converParsedCoursesCsvToCoursesObject(
                parsedCsvArray || []
            )
            setCourses(coursesResult)
        }

        fetchAndSet()
    }, []) // 🔒 רץ פעם אחת בלבד

    useEffect(() => {
        // Update courses
        if (csvText && parsedCsvState.length > 0) {
            const coursesResult =
                converParsedCoursesCsvToCoursesObject(parsedCsvState)
            setCourses(coursesResult)
        }
    }, [csvText, parsedCsvState])

    useEffect(() => {
        // If there are no courses, fetch them again
        if (!courses || courses.length === 0) {
            const fetchAndSet = async () => {
                const csvTextResponse = await fetchCraftiroCoursesCsv()
                setCsvText(csvTextResponse)
                const parsedCsvArray = parsedCsv(csvTextResponse || '')
                setParsedCsvState(parsedCsvArray)
                const coursesResult = converParsedCoursesCsvToCoursesObject(
                    parsedCsvArray || []
                )
                setCourses(coursesResult)
            }
            fetchAndSet()
        }
    }, [courses]) // 🔒 רץ רק אם יש שינוי באחד מהמשתנים

    if (!courses) {
        return (
            <Stack>
                <div>טוען קורסים...</div>
            </Stack>
        )
    }

    return (
        <Stack sx={{ flexDirection: 'column', minHeight: '100vh' }}>
            <CraftiroCoursesContext.Provider value={{ courses: courses || [] }}>
                {children}
            </CraftiroCoursesContext.Provider>
        </Stack>
    )
}

/*



'use client'

import { CraftiroCoursesContext } from '@/context/craftiroCoursesContext'
// import { CraftiroCoursesProvider } from '@/providers'
import { CraftiroCourse } from '@/types/craftiroCourses'
import {
    converParsedCoursesCsvToCoursesObject,
    fetchCraftiroCoursesCsv,
    parsedCsv,
} from '@/utils/csv'
import { Stack } from '@core'
import { useEffect, useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    const [courses, setCourses] = useState<CraftiroCourse[] | null>(null)
    const [csvText, setCsvText] = useState<string>('')
    const [parsedCsvState, setParsedCsvState] = useState<string[][]>([])

    useEffect(() => {
        const fetchAndSet = async () => {
            const csvTextResponse = await fetchCraftiroCoursesCsv()
            setCsvText(csvTextResponse)
            const parsedCsvArray = parsedCsv(csvText || '')
            setParsedCsvState(parsedCsvArray)
            const coursesResult = converParsedCoursesCsvToCoursesObject(
                parsedCsvState || []
            )
            setCourses(coursesResult)
        }

        fetchAndSet()
    }, [csvText, parsedCsvState])

    return (
        <Stack sx={{ flexDirection: 'column', minHeight: '100vh' }}>
            <h1>קורסים</h1>
            <h2>Debugging Info</h2>
            <h3>CSV Text:</h3>
            <pre
                style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    maxHeight: '200px',
                    overflowY: 'auto',
                }}
            >
                {csvText}
            </pre>
            <h3>Parsed CSV Array:</h3>
            <pre
                style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    maxHeight: '200px',
                    overflowY: 'auto',
                }}
            >
                {JSON.stringify(parsedCsvState, null, 2)}
            </pre>
            <h3>Converted Courses:</h3>
            <pre
                style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    maxHeight: '200px',
                    overflowY: 'auto',
                }}
            >
                {JSON.stringify(courses, null, 2)}
            </pre>
            <CraftiroCoursesContext.Provider value={{ courses: courses || [] }}>
                {children}
            </CraftiroCoursesContext.Provider>
        </Stack>
    )
}




*/

/*


'use client'

import { CraftiroCoursesContext } from '@/context/craftiroCoursesContext'
import { CraftiroCourse } from '@/types/craftiroCourses'
import {
    converParsedCoursesCsvToCoursesObject,
    fetchCraftiroCoursesCsv,
    parsedCsv,
} from '@/utils/csv'
import { Stack } from '@core'
import { useEffect, useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    const [courses, setCourses] = useState<CraftiroCourse[] | null>(null)
    const [csvText, setCsvText] = useState<string>('')
    const [parsedCsvState, setParsedCsvState] = useState<string[][]>([])

    useEffect(() => {
        const fetchAndSet = async () => {
            const csvTextResponse = await fetchCraftiroCoursesCsv()
            // set the fetched CSV text and parsed state
            setCsvText(csvTextResponse)
            const parsedCsvArray = parsedCsv(csvTextResponse || '')
            setParsedCsvState(parsedCsvArray)
            const coursesResult = converParsedCoursesCsvToCoursesObject(
                parsedCsvArray || []
            )
            setCourses(coursesResult)
        }

        fetchAndSet()
    }, []) // 🔒 רץ פעם אחת בלבד

    useEffect(() => {
        // Update courses
        if (csvText && parsedCsvState.length > 0) {
            const coursesResult =
                converParsedCoursesCsvToCoursesObject(parsedCsvState)
            setCourses(coursesResult)
        }
    }, [csvText, parsedCsvState])

    if (!courses) {
        return (
            <Stack>
                <div>טוען קורסים...</div>
            </Stack>
        )
    }

    return (
        <Stack sx={{ flexDirection: 'column', minHeight: '100vh' }}>
            <CraftiroCoursesContext.Provider value={{ courses: courses || [] }}>
                {children}
            </CraftiroCoursesContext.Provider>
        </Stack>
    )
}


*/
