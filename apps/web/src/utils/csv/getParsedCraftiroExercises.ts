import { CraftiroExercise } from '@/types/craftiroExercises'
import { getCraftiroExerciseFromRowArray, getCsvRows } from '.'

export const getParsedCraftiroExercises = (
    csvText: string
): CraftiroExercise[] => {
    const rows = getCsvRows(csvText)
    const allRowsWithoutHeaders = rows.slice(1) // Skip the first row which contains headers
    const parsedCraftiroExercises: CraftiroExercise[] = []
    allRowsWithoutHeaders.forEach((row) => {
        const craftExercise = getCraftiroExerciseFromRowArray(row, csvText)
        parsedCraftiroExercises.push(craftExercise)
    })

    return parsedCraftiroExercises
}
