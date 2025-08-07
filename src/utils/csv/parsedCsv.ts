'use client'

import { parse } from 'csv-parse/browser/esm'

export const parsedCsv = (csvText: string): string[][] => {
    const rows: string[][] = []
    const options = {
        columns: false,
        skip_empty_lines: true,
        trim: true,
    }
    const parser = parse(csvText, options)

    parser
        .on('readable', () => {
            let record
            while ((record = parser.read())) {
                rows.push(record)
            }
        })
        .on('error', function (error) {
            console.error('Error parsing CSV:', error)
        })
        .on('end', function () {
            console.log('CSV parsing completed')
        })

    return rows
}
