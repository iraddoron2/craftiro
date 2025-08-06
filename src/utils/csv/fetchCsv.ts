'use client'

export const fetchCsv = async (csvPath: string) => {
    console.log('Fetching CSV from:', csvPath)
    const response = await fetch(csvPath)
    if (!response.ok) {
        throw new Error('Failed to fetch craft exercises CSV')
    }

    const csvText = await response.text()

    return csvText
}
