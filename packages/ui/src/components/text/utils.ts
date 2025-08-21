import type {
    TextLeading,
    TextTracking,
    TextVariant,
    TextWeight,
} from './types'

/** Type scale (px). Later you can replace with CSS vars/tokens. */
export const VARIANT_FONT_SIZE: Record<TextVariant, number> = {
    display: 48,
    h1: 36,
    h2: 30,
    h3: 24,
    h4: 20,
    h5: 18,
    h6: 16,
    body: 16,
    bodySm: 14,
    caption: 12,
    overline: 12,
    code: 14,
}

/** Default line-heights */
export const VARIANT_LINE_HEIGHT: Record<TextVariant, number | string> = {
    display: 1.1,
    h1: 1.15,
    h2: 1.2,
    h3: 1.25,
    h4: 1.35,
    h5: 1.4,
    h6: 1.45,
    body: 1.6,
    bodySm: 1.6,
    caption: 1.4,
    overline: 1.4,
    code: 1.5,
}

/** Weight map */
export const WEIGHT_MAP: Record<TextWeight, number> = {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
}

/** Letter-spacing map */
export const TRACKING_MAP: Record<TextTracking, string> = {
    tight: '-0.01em',
    normal: '0',
    wide: '0.02em',
}

/** Leading override map */
export const LEADING_MAP: Record<TextLeading, number | string> = {
    tight: 1.3,
    normal: 'normal',
    relaxed: 1.75,
}
