export const getCsvRows = (csvText: string): string[][] => {
    const rowsAsStrings = csvText.split('\n')
    const rowsAsArrays = rowsAsStrings.map((row) =>
        row.split(',').map((cell) => cell.trim())
    )
    return rowsAsArrays
}
