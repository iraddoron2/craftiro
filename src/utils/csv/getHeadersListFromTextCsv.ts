export const getHeadersListFromTextCsv = (csvText: string) => {
    const firstLine = csvText.split('\n')[0]
    const headers = firstLine.split(',').map((header) => header.trim())
    return headers
}
