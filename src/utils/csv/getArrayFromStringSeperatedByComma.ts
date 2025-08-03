export const getArrayFromStringSeperatedByComma = (value: string) => {
    // Deal with one value that is a string
    const segments = value.split(',').map((segment) => segment.trim())
    return segments.length === 1 && segments[0] === '' ? [] : segments
}
