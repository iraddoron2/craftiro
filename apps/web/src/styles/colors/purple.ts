import { createColorPalette } from '@/utils'

export const purple = createColorPalette(
    {
        10: '#110319',
        20: '#220633',
        30: '#34094C',
        40: '#450C66',
        50: '#560F80',
        60: '#671299',
        70: '#7815B3',
        80: '#8A18CC',
        90: '#9B1BE6',
        100: '#AC1EFF',
        110: '#B435FF',
        120: '#BD4BFF',
        130: '#C562FF',
        140: '#CD78FF',
        150: '#D68FFF',
        160: '#DEA5FF',
        170: '#E6BCFF',
        180: '#EED2FF',
        190: '#F7E9FF',
    },
    {
        main: 100, // Main brand purple
        dark: 60, // Darker purple (hover, active)
        darkest: 10, // Deepest purple (backgrounds, outlines)
        light: 150, // Light purple (backgrounds, surfaces)
        lightest: 190, // Lightest purple (almost white)
    }
)
