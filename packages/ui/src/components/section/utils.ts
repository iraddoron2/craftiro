import type { SectionMaxWidth, SectionPadding } from './types'

/** px values for max-width container */
export const MAX_WIDTH_MAP: Record<SectionMaxWidth, string> = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    full: '100%', // no constraint
}

/** spacing scale (you can later wire this to tokens) */
export const PADDING_MAP: Record<SectionPadding, number> = {
    none: 0,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
}
