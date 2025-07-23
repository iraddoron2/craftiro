import { createColorPalette } from '@/utils'

export const gray = createColorPalette(
    {
        10: '#090A0A',
        20: '#121315',
        30: '#1C1D1F',
        40: '#252729',
        50: '#2E3134',
        60: '#373A3E',
        70: '#404448',
        80: '#4A4E52',
        90: '#53575D',
        100: '#5C6167',
        110: '#6C7176',
        120: '#7D8185',
        130: '#8D9095',
        140: '#9DA0A4',
        150: '#AEB0B3',
        160: '#BEC0C2',
        170: '#CED0D1',
        180: '#DEDFE1',
        190: '#EFEFF0',
    },
    {
        main: 100, // Main brand gray
        dark: 60, // Darker gray (hover, active)
        darkest: 10, // Deepest gray (backgrounds, outlines)
        light: 150, // Light gray (backgrounds, surfaces)
        lightest: 190, // Lightest gray (almost white)
    }
)
