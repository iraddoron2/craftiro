import { createColorPalette } from '@/utils'

export const brandOrange = createColorPalette(
    {
        10: '#191008',
        20: '#332011',
        30: '#4C3019',
        40: '#664022',
        50: '#80512B',
        60: '#996133',
        70: '#B3713B',
        80: '#CC8144',
        90: '#E6914D',
        100: '#FFA155',
        110: '#FFAA66',
        120: '#FFB477',
        130: '#FFBD88',
        140: '#FFC799',
        150: '#FFD0AA',
        160: '#FFD9BB',
        170: '#FFE3CC',
        180: '#FFECDD',
        190: '#FFF6EE',
    },
    {
        main: 100, // Main brand orange
        dark: 60, // Darker orange (hover, active)
        darkest: 10, // Deepest orange (outlines, backgrounds)
        light: 150, // Light orange (backgrounds, surfaces)
        lightest: 190, // Lightest orange (almost white)
    }
)
