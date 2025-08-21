import { getHeadersListFromTextCsv } from '../csv'

export const getRowObject = (row: string[], csvText: string) => {
    const headersList = getHeadersListFromTextCsv(csvText)
    const rowObject: Record<string, string> = {}
    row.forEach((value, index) => {
        const header = headersList?.[index]
        if (header) {
            rowObject[header] = value
        }
    })

    return rowObject
}
