import { CraftExercise } from '@/types/craftExercises'
import { getCraftExerciseFromRowArray, getCsvRows } from '../csv'

export const getParsedCraftExercises = (csvText: string): CraftExercise[] => {
    const rows = getCsvRows(csvText)
    const allRowsWithoutHeaders = rows.slice(1) // Skip the first row which contains headers
    const parsedCraftExercises: CraftExercise[] = []
    allRowsWithoutHeaders.forEach((row) => {
        const craftExercise = getCraftExerciseFromRowArray(row, csvText)
        parsedCraftExercises.push(craftExercise)
    })

    return parsedCraftExercises
}
