import { createColorPalette } from '@/utils'

export const orange = createColorPalette(
    {
        10: '#190D04',
        20: '#331B09',
        30: '#4C280D',
        40: '#663612',
        50: '#804416',
        60: '#99511A',
        70: '#B35F1F',
        80: '#CC6C23',
        90: '#E67A28',
        100: '#FF872C',
        110: '#FF9341',
        120: '#FF9F56',
        130: '#FFAB6B',
        140: '#FFB780',
        150: '#FFC396',
        160: '#FFCFAB',
        170: '#FFDBC0',
        180: '#FFE7D5',
        190: '#FFF3EA',
    },
    {
        main: 100, // Main brand orange
        dark: 60, // Darker orange for hover/active
        darkest: 10, // Deepest orange
        light: 150, // Light orange for backgrounds
        lightest: 190, // Lightest orange (almost white)
    }
)
