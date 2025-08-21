import type React from 'react'

export type ButtonVariant = 'contained' | 'outlined' | 'text'
export type ButtonColor = 'primary' | 'secondary' | 'default'
export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonTag = 'button' | 'a' | 'div' // HTML tags only

export interface ButtonProps
    extends Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'color'> {
    /** Which HTML tag to render (defaults to 'button') */
    as?: ButtonTag
    label: string
    icon?: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    variant?: ButtonVariant
    color?: ButtonColor
    size?: ButtonSize
    fullWidth?: boolean
    loading?: boolean
    loadingText?: string
    type?: 'button' | 'submit' | 'reset'
    className?: string
    style?: React.CSSProperties
}
