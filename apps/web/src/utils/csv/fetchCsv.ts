'use client'

export const fetchCsv = async (csvPath: string) => {
    const response = await fetch(csvPath)
    if (!response.ok) {
        throw new Error('Failed to fetch craft exercises CSV')
    }

    const csvText = await response.text()

    return csvText
}
