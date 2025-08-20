import clsx from 'clsx'
import React from 'react'
import type { ChipProps } from './types'
import { getChipStyle, isClickable, sizeStyles } from './utils'

export const Chip: React.FC<ChipProps> = ({
    as,
    label,
    color = 'default',
    variant = 'filled',
    size = 'medium',
    startIcon,
    endIcon,
    onClick,
    onDelete,
    disabled = false,
    className,
    style,
    ...rest
}) => {
    // default tag: button if clickable, span otherwise (HTML only)
    const Tag = (as ??
        (isClickable({ onClick, disabled })
            ? 'button'
            : 'span')) as keyof HTMLElementTagNameMap

    const defaultStyle = getChipStyle(color, variant, 'default')
    const hoverStyle = getChipStyle(color, variant, 'hover')
    const activeStyle = getChipStyle(color, variant, 'active')

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
        gap: 6,
        transition: 'background 0.2s, border 0.2s, color 0.2s',
        cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
        opacity: disabled ? 0.5 : 1,
        ...sizeStyles[size],
        ...style,
    }

    let activeTimeout: ReturnType<typeof setTimeout> | null = null

    function setChipElStyle(el: HTMLElement | null, s: typeof defaultStyle) {
        if (!el) return
        if (s.background !== undefined) el.style.background = s.background
        if (s.text !== undefined) el.style.color = s.text
        if (s.border !== undefined && variant === 'outlined')
            el.style.borderColor = s.border
    }

    const handleMouseOver = (e: React.MouseEvent<HTMLElement>) => {
        if (!disabled) setChipElStyle(e.currentTarget, hoverStyle)
    }
    const handleMouseOut = (e: React.MouseEvent<HTMLElement>) => {
        if (!disabled) setChipElStyle(e.currentTarget, defaultStyle)
    }
    const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
        if (!disabled) setChipElStyle(e.currentTarget, activeStyle)
    }
    const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
        if (disabled) return
        if (activeTimeout) clearTimeout(activeTimeout)
        activeTimeout = setTimeout(
            () => setChipElStyle(e.currentTarget, hoverStyle),
            70
        )
    }

    // HTML-only props spread
    const htmlProps = rest as React.HTMLAttributes<HTMLElement>
    const Comp = Tag as unknown as React.ElementType

    return (
        <Comp
            className={clsx('crt-chip', className)}
            style={baseStyles}
            onClick={disabled ? undefined : onClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            aria-disabled={disabled || undefined}
            {...htmlProps}
        >
            <span
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
                {startIcon && (
                    <span style={{ display: 'flex' }}>{startIcon}</span>
                )}
                <span>{label}</span>
                {endIcon && !onDelete && (
                    <span style={{ display: 'flex' }}>{endIcon}</span>
                )}
            </span>

            {onDelete && (
                <button
                    type="button"
                    aria-label="Delete"
                    disabled={disabled}
                    onClick={(e) => {
                        e.stopPropagation()
                        if (!disabled) onDelete()
                    }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 4,
                        width:
                            size === 'small' ? 16 : size === 'large' ? 20 : 18,
                        height:
                            size === 'small' ? 16 : size === 'large' ? 20 : 18,
                        borderRadius: 999,
                        border: 'none',
                        background: 'transparent',
                        cursor: disabled ? 'not-allowed' : 'pointer',
                    }}
                    onMouseOver={(e) =>
                        !disabled &&
                        setChipElStyle(
                            e.currentTarget.parentElement as HTMLElement,
                            hoverStyle
                        )
                    }
                    onMouseOut={(e) =>
                        !disabled &&
                        setChipElStyle(
                            e.currentTarget.parentElement as HTMLElement,
                            defaultStyle
                        )
                    }
                    onMouseDown={(e) =>
                        !disabled &&
                        setChipElStyle(
                            e.currentTarget.parentElement as HTMLElement,
                            activeStyle
                        )
                    }
                    onMouseUp={(e) => {
                        if (disabled) return
                        if (activeTimeout) clearTimeout(activeTimeout)
                        activeTimeout = setTimeout(
                            () =>
                                setChipElStyle(
                                    e.currentTarget
                                        .parentElement as HTMLElement,
                                    hoverStyle
                                ),
                            70
                        )
                    }}
                >
                    <span
                        style={{
                            lineHeight: 1,
                            fontSize: size === 'small' ? 12 : 14,
                        }}
                    >
                        ×
                    </span>
                </button>
            )}
        </Comp>
    )
}
