import { createColorPalette } from '@/utils'

export const blue = createColorPalette(
    {
        10: '#050B19',
        20: '#0B1732',
        30: '#10224B',
        40: '#152E64',
        50: '#1B3A7D',
        60: '#204596',
        70: '#2551AF',
        80: '#2A5CC8',
        90: '#3068E1',
        100: '#3573FA', // main
        110: '#4981FB',
        120: '#5D8FFB',
        130: '#729DFC',
        140: '#86ABFC',
        150: '#9AB9FD',
        160: '#AEC7FD',
        170: '#C2D5FE',
        180: '#D7E3FE',
        190: '#EBF1FF',
    },
    {
        main: 100, // Main brand blue
        dark: 60, // Darker blue for hover/active
        darkest: 10, // Deepest blue for backgrounds/outlines
        light: 150, // Light blue for backgrounds/surfaces
        lightest: 190, // Lightest blue, almost white
    }
)
