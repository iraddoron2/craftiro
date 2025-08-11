'use client'

import { Theme } from '@/types'
import { useTheme } from '@hooks'
import {
    Chip as MuiBaseChip,
    ChipProps as MuiBaseChipProps,
    SxProps,
} from '@mui/material'
import React from 'react'

type ChipVariant = 'filled' | 'outlined'
type ChipColor = 'primary' | 'secondary' | 'default'
type ChipSize = 'small' | 'medium' | 'large'

export type ChipProps = Omit<MuiBaseChipProps, 'color' | 'size'> & {
    label: string
    color?: ChipColor
    variant?: ChipVariant
    size?: ChipSize
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
    onClick?: () => void
    onDelete?: () => void
    sx?: SxProps
}

/** Get theme styles for chip based on color, variant, and state */
function getChipThemeStyle(
    theme: Theme,
    color: ChipColor,
    variant: ChipVariant,
    state: 'default' | 'hover' | 'active'
) {
    return (
        theme.chip?.[color]?.[variant]?.[state] ||
        theme.chip?.primary?.filled?.default || {
            background: '#eee',
            text: '#333',
            border: '#ccc',
        }
    )
}

const sizeStyles: Record<ChipSize, React.CSSProperties> = {
    small: { fontSize: 12, padding: '2px 8px', height: 24 },
    medium: { fontSize: 14, padding: '4px 10px', height: 32 },
    large: { fontSize: 16, padding: '6px 14px', height: 40 },
}

export const Chip: React.FC<ChipProps> = ({
    label,
    color = 'default',
    variant = 'filled',
    size = 'medium',
    startIcon,
    endIcon,
    onClick,
    onDelete,
    disabled,
    sx,
    ...rest
}) => {
    const theme = useTheme()

    const defaultStyle = getChipThemeStyle(theme, color, variant, 'default')
    const hoverStyle = getChipThemeStyle(theme, color, variant, 'hover')
    const activeStyle = getChipThemeStyle(theme, color, variant, 'active')

    const baseStyles: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
        border:
            variant === 'outlined'
                ? `1px solid ${defaultStyle.border}`
                : `1px solid transparent`,
        background: defaultStyle.background,
        color: defaultStyle.text,
        cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
        opacity: disabled ? 0.5 : 1,
        gap: 6,
        transition: 'background 0.2s, border 0.2s, color 0.2s',
        ...sizeStyles[size],
    }

    let activeTimeout: NodeJS.Timeout | null = null

    function setChipStyle(e: React.MouseEvent, style: typeof defaultStyle) {
        const el = e.currentTarget as HTMLElement | null
        if (!el) return
        if (style.background !== undefined)
            el.style.background = style.background
        if (style.text !== undefined) el.style.color = style.text
        if (style.border !== undefined && variant === 'outlined') {
            el.style.borderColor = style.border
        }
    }

    return (
        <MuiBaseChip
            disabled={disabled}
            onClick={onClick}
            onDelete={onDelete}
            style={baseStyles}
            onMouseOver={(e) => !disabled && setChipStyle(e, hoverStyle)}
            onMouseOut={(e) => !disabled && setChipStyle(e, defaultStyle)}
            onMouseDown={(e) => !disabled && setChipStyle(e, activeStyle)}
            onMouseUp={(e) => {
                if (!disabled) {
                    if (activeTimeout) clearTimeout(activeTimeout)
                    activeTimeout = setTimeout(() => {
                        setChipStyle(e, hoverStyle)
                    }, 70)
                }
            }}
            sx={sx}
            label={
                <span
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                    }}
                >
                    {startIcon && (
                        <span style={{ display: 'flex' }}>{startIcon}</span>
                    )}
                    <span>{label}</span>
                    {endIcon && !onDelete && (
                        <span style={{ display: 'flex' }}>{endIcon}</span>
                    )}
                </span>
            }
            {...rest}
        />
    )
}
