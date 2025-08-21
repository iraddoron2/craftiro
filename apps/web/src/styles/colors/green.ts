import { createColorPalette } from '@/utils'

export const green = createColorPalette(
    {
        10: '#061308',
        20: '#0C2610',
        30: '#133918',
        40: '#194C20',
        50: '#1F5F28',
        60: '#25712F',
        70: '#2B8437',
        80: '#32973F',
        90: '#38AA47',
        100: '#3EBD4F',
        110: '#51C461',
        120: '#65CA72',
        130: '#78D184',
        140: '#8BD795',
        150: '#9FDEA7',
        160: '#B2E5B9',
        170: '#C5EBCA',
        180: '#D8F2DC',
        190: '#ECF8ED',
    },
    {
        main: 100, // Main brand green
        dark: 60, // Darker green (hover, active)
        darkest: 10, // Deepest green (backgrounds, outlines)
        light: 150, // Light green (backgrounds, surfaces)
        lightest: 190, // Lightest green (almost white)
    }
)
