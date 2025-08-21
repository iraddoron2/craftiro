// utils/csv/converters.ts (או בקובץ utils/csv.ts – לפי המבנה אצלך)
import { CraftiroExercise } from '@/types/craftiroExercises'
import { getCraftiroExerciseFromRowArray } from '.'

/**
 * Convert parsed CSV (string[][]) into CraftiroExercise[]
 * Expects the first row to be headers.
 */
export const converParsedExercisesCsvToExercisesObject = (
    parsedCsvArray: string[][]
): CraftiroExercise[] => {
    // Guard: empty or headers only
    if (!parsedCsvArray || parsedCsvArray.length <= 1) return []

    // Rebuild csvText so getRowObject(row, csvText) can map headers correctly.
    // NOTE: This mirrors your current getCsvRows implementation (simple split by comma).
    const csvText = parsedCsvArray.map((row) => row.join(',')).join('\n')

    // Skip header row
    const dataRows = parsedCsvArray.slice(1)

    // Map each row -> CraftiroExercise
    const exercises: CraftiroExercise[] = dataRows.map((row) =>
        getCraftiroExerciseFromRowArray(row, csvText)
    )

    return exercises
}
