import type React from 'react'

export type ChipVariant = 'filled' | 'outlined'
export type ChipColor = 'primary' | 'secondary' | 'default'
export type ChipSize = 'small' | 'medium' | 'large'
export type ChipTag = 'button' | 'span' | 'div'

export interface ChipProps
    extends Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'color'> {
    /** Which HTML tag to render (defaults to button if clickable, span otherwise) */
    as?: ChipTag
    label: string
    color?: ChipColor
    variant?: ChipVariant
    size?: ChipSize
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
    onClick?: () => void
    onDelete?: () => void
    disabled?: boolean
    className?: string
    style?: React.CSSProperties
}
