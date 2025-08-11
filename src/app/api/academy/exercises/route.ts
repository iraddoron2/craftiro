// app/api/academy/exercises/route.ts
import { CraftiroExercise } from '@/types/craftiroExercises'
import { converParsedExercisesCsvToExercisesObject } from '@/utils/csv'
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
            'craftiroExercisesData.csv'
        )

        // Read CSV file as UTF-8 text
        const csvText = await fs.readFile(filePath, 'utf-8')

        // Parse CSV into array of arrays (string[][]), matching frontend logic
        const parsedCsvArray = parse(csvText, {
            skip_empty_lines: true, // Ignore blank lines
            trim: true, // Trim whitespace around fields
        }) as string[][]

        // Map parsed CSV -> strong typed objects
        const exercises: CraftiroExercise[] =
            converParsedExercisesCsvToExercisesObject(parsedCsvArray) ?? []

        // Return JSON payload
        return NextResponse.json(
            {
                exercises,
                meta: {
                    count: exercises.length,
                    source: 'craftiroExercisesData.csv',
                },
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('Failed to parse exercises CSV:', error)
        return NextResponse.json(
            { error: 'Failed to read or parse craftiroExercisesData.csv' },
            { status: 500 }
        )
    }
}
