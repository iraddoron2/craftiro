import { CraftiroCourse } from '@/types/craftiroCourses'
import { convertParsedCoursesCsvToCourses } from '@/utils/csv/courses'
import { parse } from 'csv-parse/sync'
import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

export async function GET() {
    try {
        // Build absolute path to CSV
        const filePath = path.join(
            process.cwd(),
            'src',
            'tempDb',
            'csv',
            'craftiroCoursesData.csv'
        )

        // Read CSV file as UTF-8 text
        const csvText = await fs.readFile(filePath, 'utf-8')

        // Parse CSV into array of arrays (string[][]), matching frontend logic
        const parsedCsvArray = parse(csvText, {
            skip_empty_lines: true, // Ignore blank lines
            trim: true, // Trim whitespace around fields
        }) as string[][]

        // Map parsed CSV array to a stricter Course shape
        const courses: CraftiroCourse[] =
            convertParsedCoursesCsvToCourses(parsedCsvArray) ?? []

        // Return JSON payload
        return NextResponse.json(
            {
                courses,
                meta: {
                    count: courses.length,
                    source: 'craftiroCoursesData.csv',
                },
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('Failed to parse courses CSV:', error)
        return NextResponse.json(
            { error: 'Failed to read or parse craftiroCoursesData.csv' },
            { status: 500 }
        )
    }
}
