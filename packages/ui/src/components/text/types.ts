import type React from 'react'

export type TextTag =
    | 'p'
    | 'span'
    | 'strong'
    | 'em'
    | 'label'
    | 'div'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'

export type TextVariant =
    | 'display'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body'
    | 'bodySm'
    | 'caption'
    | 'overline'
    | 'code'

export type TextWeight =
    | 'light'
    | 'regular'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black'
export type TextAlign = 'left' | 'center' | 'right' | 'justify'
export type TextLeading = 'tight' | 'normal' | 'relaxed'
export type TextTracking = 'tight' | 'normal' | 'wide'

export interface TextProps
    extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
    /** Which HTML tag to render */
    as?: TextTag
    /** Inner content */
    children: React.ReactNode
    /** Preset type scale */
    variant?: TextVariant
    /** Font weight */
    weight?: TextWeight
    /** Text alignment */
    align?: TextAlign
    /** Text color (CSS color string or token) */
    color?: string
    /** Clamp to N lines with ellipsis */
    clamp?: number
    /** Single-line ellipsis */
    noWrap?: boolean
    /** Underline text */
    underline?: boolean
    /** Italic text */
    italic?: boolean
    /** Line-height override (leading) */
    leading?: TextLeading
    /** Letter-spacing (tracking) */
    tracking?: TextTracking
}
