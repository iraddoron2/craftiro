import { ColorScale } from '@/types'
import { createColorPalette } from '@/utils'

// All color scales
const colorScales: ColorScale[] = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170,
    180, 190,
]

// Opacity steps, from 0.95 (most opaque) to 0.05 (most transparent)
const opacities = [
    0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5, 0.45, 0.4, 0.35, 0.3,
    0.25, 0.2, 0.15, 0.1, 0.05,
]

// Create an object where each key is ColorScale and each value is the matching rgba for black
const blackTransparentScale: Record<ColorScale, string> = colorScales.reduce(
    (acc, scale, i) => {
        acc[scale] = `rgba(0,0,0,${opacities[i]})`
        return acc
    },
    {} as Record<ColorScale, string>
)

export const opacityBlack = createColorPalette(blackTransparentScale, {
    main: 100, // "Regular" opacity, mid-range
    dark: 60, // More opaque
    darkest: 10, // Most opaque
    light: 150, // More transparent
    lightest: 190, // Most transparent
})
