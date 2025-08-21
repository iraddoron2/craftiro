import { createColorPalette } from '@/utils'

export const brandPink = createColorPalette(
    {
        10: '#181114',
        20: '#302227',
        30: '#49333B',
        40: '#61444F',
        50: '#795663',
        60: '#916776',
        70: '#A9788A',
        80: '#C2899E',
        90: '#DA9AB1',
        100: '#F2ABC5',
        110: '#F3B3CB',
        120: '#F5BCD1',
        130: '#F6C4D6',
        140: '#F7CDDC',
        150: '#F9D5E2',
        160: '#FADDE8',
        170: '#FBE6EE',
        180: '#FCEEF3',
        190: '#FEF7F9',
    },
    {
        main: 100, // Main brand pink
        dark: 60, // Darker pink (hover, active)
        darkest: 10, // Deepest pink (outlines, backgrounds)
        light: 150, // Light pink (backgrounds, surfaces)
        lightest: 190, // Lightest pink (almost white)
    }
)
