// MiroButton.tsx
'use client'

import { colors } from '@/styles'
import {
    Button,
    CircularProgress,
    type ButtonProps,
    type SxProps,
    type Theme,
} from '@mui/material'
import * as React from 'react'

type MiroColors =
    | 'blue'
    | 'orange'
    | 'green'
    | 'purple'
    | 'red'
    | 'yellow'
    | 'brandBlue'
    | 'brandOrange'
    | 'brandPink'

export type MiroButtonProps = Omit<
    ButtonProps,
    'color' | 'variant' | 'size'
> & {
    children?: React.ReactNode
    color?: MiroColors | string
    variant?: 'text' | 'outlined' | 'contained'
    size?: 'small' | 'medium' | 'large'
    processing?: boolean
    width?: number | string
    sx?: SxProps<Theme>
}

type Token = { main: string; dark: string; contrastText?: string }

const hasToken = (key: string): key is MiroColors =>
    [
        'blue',
        'orange',
        'green',
        'purple',
        'red',
        'yellow',
        'brandBlue',
        'brandOrange',
        'brandPink',
    ].includes(key as MiroColors)

function resolveToken(inputColor?: MiroButtonProps['color']): Token {
    if (inputColor && typeof inputColor === 'string' && hasToken(inputColor)) {
        return colors[inputColor]
    }
    if (typeof inputColor === 'string') {
        return { main: inputColor, dark: inputColor, contrastText: '#fff' }
    }
    // fallback
    return { main: '#FFA155', dark: '#996133', contrastText: '#fff' }
}

function buildVariantSx(
    variant: NonNullable<MiroButtonProps['variant']>,
    token: Token
): SxProps<Theme> {
    const contrast = token.contrastText ?? '#fff'

    if (variant === 'contained') {
        return {
            backgroundColor: token.main,
            color: contrast,
            '&:hover': { backgroundColor: token.dark },
            '&:active': { backgroundColor: token.dark },
            '&.Mui-disabled': {
                backgroundColor: token.main,
                color: contrast,
                opacity: 0.6,
            },
        }
    }

    if (variant === 'outlined') {
        return {
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: token.main,
            color: token.main,
            backgroundColor: 'transparent',
            '&:hover': {
                borderColor: token.dark,
                color: token.dark,
                backgroundColor: 'transparent',
            },
            '&:active': { borderColor: token.dark, color: token.dark },
            '&.Mui-disabled': {
                borderColor: token.main,
                color: token.main,
                opacity: 0.6,
            },
        }
    }

    // text
    return {
        color: token.main,
        backgroundColor: 'transparent',
        '&:hover': { color: token.dark, backgroundColor: 'transparent' },
        '&:active': { color: token.dark },
        '&.Mui-disabled': { color: token.main, opacity: 0.6 },
    }
}

export const MiroButton: React.FC<MiroButtonProps> = ({
    children,
    color = 'brandOrange',
    variant = 'contained',
    size = 'medium',
    processing = false,
    disabled,
    onClick,
    width = 200,
    sx,
    ...rest
}) => {
    const isDisabled = disabled || processing
    const token = resolveToken(color)
    const variantSx = buildVariantSx(variant, token)

    const baseSx: SxProps<Theme> = {
        width,
        boxSizing: 'border-box',
        textTransform: 'none',
        fontWeight: 800,
        borderRadius: 'var(--Border-Radius-M, 12px)',
        boxShadow: `0 4px 0 0 ${token.dark}`,
        transition: (theme) =>
            theme.transitions.create(
                ['background-color', 'box-shadow', 'transform', 'border-color'],
                { duration: theme.transitions.duration.shorter }
            ),
        // משתמשים ב"&&" כדי לדרוס כל כלל ברירת מחדל של MUI
        '&&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: `0 4px 0 0 ${token.dark}`,
        },
        '&&:active': {
            transform: 'translateY(0)',
            boxShadow: `0 4px 0 0 ${token.dark}`,
        },
        '&.Mui-disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'auto',
        },
        position: 'relative',
    }

    // Merge sx props into a single object to satisfy MUI Button typing
    const mergedSx =
        typeof sx === 'function'
            ? (theme: Theme) => ({
                  ...baseSx,
                  ...variantSx,
                  ...sx(theme),
              })
            : { ...baseSx, ...variantSx, ...(sx as object) }

    return (
        <Button
            variant={variant}
            size={size}
            color="inherit"
            disabled={isDisabled}
            onClick={onClick}
            aria-busy={processing || undefined}
            aria-disabled={isDisabled || undefined}
            sx={mergedSx}
            {...rest}
        >
            <span
                style={{
                    opacity: processing ? 0 : 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                }}
            >
                {children}
            </span>

            {processing && (
                <span
                    aria-hidden
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'grid',
                        placeItems: 'center',
                    }}
                >
                    <CircularProgress size={20} />
                </span>
            )}
        </Button>
    )
}
