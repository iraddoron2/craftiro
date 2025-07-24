'use client'

import { Theme } from '@/types'
import { useTheme } from '@hooks'
import {
    Button as MuiBaseButton,
    ButtonProps as MuiButtonProps,
} from '@mui/base/Button'

type ButtonVariant = 'contained' | 'outlined' | 'text'

type ButtonProps = MuiButtonProps & {
    label: string
    onClick?: () => void
    icon?: React.ReactNode
    disabled?: boolean
    variant?: ButtonVariant
    color?: 'primary' | 'secondary' | 'default'
    size?: 'small' | 'medium' | 'large'
    fullWidth?: boolean
    loading?: boolean
    className?: string
    loadingText?: string
    style?: React.CSSProperties
}

// You can later move these out if you want
const sizeStyles = {
    small: { fontSize: 14, padding: '4px 10px' },
    medium: { fontSize: 18, padding: '18px 24px' },
    large: { fontSize: 24, padding: '12px 28px' },
}

// Helper function for theme-based style
function getButtonThemeStyle(
    theme: Theme,
    color: 'primary' | 'secondary' | 'default' = 'primary',
    variant: ButtonVariant = 'contained',
    state: 'default' | 'hover' | 'active' = 'default'
) {
    // Fallback to primary-contained-default if missing
    return (
        theme.button?.[color as keyof typeof theme.button]?.[
            variant as keyof (typeof theme.button)['primary']
        ]?.[state as keyof (typeof theme.button)['primary']['contained']] ||
        theme.button?.primary?.contained?.default || {
            background: '#ccc',
            text: '#222',
            border: '#ccc',
        }
    )
}

export const Button = ({
    label,
    icon,
    onClick,
    disabled,
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    fullWidth,
    loading = false,
    className,
    loadingText,
    style,
    ...muiProps
}: ButtonProps) => {
    const theme = useTheme()

    // Default styles
    const defaultStyle = getButtonThemeStyle(theme, color, variant, 'default')
    const hoverStyle = getButtonThemeStyle(theme, color, variant, 'hover')
    const activeStyle = getButtonThemeStyle(theme, color, variant, 'active')

    const baseStyles: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        border: `1.5px solid ${defaultStyle.border}`,
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        width: fullWidth ? '100%' : undefined,
        opacity: disabled ? 0.5 : 1,
        background: defaultStyle.background,
        color: defaultStyle.text,
        transition: 'background 0.2s, border 0.2s, color 0.2s',
        ...sizeStyles[size],
        ...style,
    }

    let activeTimeout: NodeJS.Timeout | null = null

    // === תיקון קריטי ===
    function setButtonStyle(e: React.MouseEvent, style: typeof defaultStyle) {
        const el = e.currentTarget as HTMLElement | null
        if (!el) return
        if (style.background !== undefined)
            el.style.background = style.background
        if (style.text !== undefined) el.style.color = style.text
        if (style.border !== undefined) el.style.borderColor = style.border
    }

    return (
        <MuiBaseButton
            onClick={onClick}
            disabled={disabled || loading}
            className={className}
            style={baseStyles}
            onMouseOver={(e) => {
                if (!disabled) setButtonStyle(e, hoverStyle)
            }}
            onMouseOut={(e) => {
                if (!disabled) setButtonStyle(e, defaultStyle)
            }}
            onMouseDown={(e) => {
                if (!disabled) setButtonStyle(e, activeStyle)
            }}
            onMouseUp={(e) => {
                if (!disabled) {
                    if (activeTimeout) clearTimeout(activeTimeout)
                    activeTimeout = setTimeout(() => {
                        setButtonStyle(e, hoverStyle)
                    }, 70)
                }
            }}
            {...muiProps}
        >
            {loading ? (
                <>
                    <span style={{ marginRight: 8 }}>⏳</span>
                    {loadingText || label}
                </>
            ) : (
                <>
                    {icon && <span style={{ marginInlineEnd: 8 }}>{icon}</span>}
                    {label}
                </>
            )}
        </MuiBaseButton>
    )
}
