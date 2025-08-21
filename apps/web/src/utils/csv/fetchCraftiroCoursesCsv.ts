export const fetchCraftiroCoursesCsv = async () => {
    const response = await fetch('/data/craftiroCoursesData.csv')
    if (!response.ok) {
        throw new Error('Failed to fetch craftiro courses CSV')
    }

    const csvText = await response.text()

    return csvText
}
