export const fetchCraftExercisesCsv = async () => {
    const response = await fetch('/data/craftExercisesData.csv')
    if (!response.ok) {
        throw new Error('Failed to fetch craft exercises CSV')
    }

    const csvText = await response.text()

    return csvText
}
