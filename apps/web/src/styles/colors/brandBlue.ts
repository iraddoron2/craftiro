import { createColorPalette } from '@/utils'

export const brandBlue = createColorPalette(
    {
        10: '#030A14',
        20: '#071428',
        30: '#0A1F3C',
        40: '#0E2950',
        50: '#113364',
        60: '#143D77',
        70: '#18478B',
        80: '#1B529F',
        90: '#1F5CB3',
        100: '#2266C7',
        110: '#3875CD',
        120: '#4E85D2',
        130: '#6494D8',
        140: '#7AA3DD',
        150: '#91B3E3',
        160: '#A7C2E9',
        170: '#BDD1EE',
        180: '#D3E0F4',
        190: '#E9F0F9',
    },
    {
        main: 100, // Main brand blue
        dark: 60, // Darker brand blue (hover, active)
        darkest: 10, // Deepest brand blue (backgrounds, outlines)
        light: 150, // Light brand blue (backgrounds, surfaces)
        lightest: 190, // Lightest brand blue (almost white)
    }
)
