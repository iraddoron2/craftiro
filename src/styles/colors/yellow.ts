import { createColorPalette } from '@/utils'

export const yellow = createColorPalette(
    {
        10: '#191605',
        20: '#322C0B',
        30: '#4B4210',
        40: '#645816',
        50: '#7E6E1B',
        60: '#978320',
        70: '#B09926',
        80: '#C9AF2B',
        90: '#E2C531',
        100: '#FBDB36',
        110: '#FBDF4A',
        120: '#FCE25E',
        130: '#FCE672',
        140: '#FDE986',
        150: '#FDED9B',
        160: '#FDF1AF',
        170: '#FEF4C3',
        180: '#FEF8D7',
        190: '#FFFBEB',
    },
    {
        main: 100, // Main brand yellow
        dark: 60, // Darker yellow (hover, active)
        darkest: 10, // Deepest yellow (backgrounds, outlines)
        light: 150, // Light yellow (backgrounds, surfaces)
        lightest: 190, // Lightest yellow (almost white)
    }
)
