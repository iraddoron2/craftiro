'use client'

import {
    converParsedCoursesCsvToCoursesObject,
    fetchCsv,
    parsedCsv,
} from '@/utils/csv'
import { Stack } from '@core'
import { useEffect, useState } from 'react'

export default function Page() {
    const [parsedCsvData, setParsedCsvData] = useState<string[][]>([])
    const [showObject, setShowObject] = useState(false)

    const handleShowObject = () => {
        setShowObject(!showObject)
    }

    useEffect(() => {
        const fetchData = async () => {
            const csvPath = '/data/craftiroCoursesData.csv'
            const csvText = await fetchCsv(csvPath)
            const data = parsedCsv(csvText)
            setParsedCsvData(data)
        }
        fetchData()
    }, [])

    return (
        <Stack
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                width: '100%',
            }}
        >
            <h1>courses</h1>
            <button onClick={handleShowObject}>
                {showObject ? 'Hide Object' : 'Show Object'}
            </button>
            {showObject && (
                <pre
                    style={{
                        direction: 'ltr',
                    }}
                >
                    {JSON.stringify(
                        converParsedCoursesCsvToCoursesObject(parsedCsvData),
                        null,
                        2
                    )}
                </pre>
            )}
            {!showObject && (
                <pre
                    style={{
                        direction: 'ltr',
                    }}
                >
                    {JSON.stringify(parsedCsvData, null, 2)}
                </pre>
            )}
        </Stack>
    )
}
