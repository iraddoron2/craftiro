export const fetchCraftiroExercisesCsv = async () => {
    const response = await fetch('/data/craftiroExercisesData.csv')
    if (!response.ok) {
        throw new Error('Failed to fetch craftiro exercises CSV')
    }

    const csvText = await response.text()

    return csvText
}
