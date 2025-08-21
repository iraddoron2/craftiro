import { createColorPalette } from '@/utils'

export const red = createColorPalette(
    {
        10: '#180605',
        20: '#2F0D0A',
        30: '#47130F',
        40: '#5E1A14',
        50: '#76201A',
        60: '#8E261F',
        70: '#A52D24',
        80: '#BD3329',
        90: '#D43A2E',
        100: '#EC4033',
        110: '#EE5347',
        120: '#F0665C',
        130: '#F27970',
        140: '#F48C85',
        150: '#F6A099',
        160: '#F7B3AD',
        170: '#F9C6C2',
        180: '#FBD9D6',
        190: '#FDECEB',
    },
    {
        main: 100, // Main brand red
        dark: 60, // Darker red (hover, active)
        darkest: 10, // Deepest red (backgrounds, outlines)
        light: 150, // Light red (backgrounds, surfaces)
        lightest: 190, // Lightest red (almost white)
    }
)
