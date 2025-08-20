import clsx from 'clsx'
import React from 'react'
import type { ButtonProps } from './types'
import { getBorderBasics, getButtonStyle, sizeStyles } from './utils'

export const Button: React.FC<ButtonProps> = ({
    as = 'button',
    label,
    icon,
    onClick,
    disabled = false,
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    fullWidth = false,
    loading = false,
    loadingText,
    type = 'button',
    className,
    style,
    ...rest
}) => {
    const Tag = (as ?? 'button') as keyof HTMLElementTagNameMap

    const defaultStyle = getButtonStyle(color, variant, 'default')
    const hoverStyle = getButtonStyle(color, variant, 'hover')
    const activeStyle = getButtonStyle(color, variant, 'active')
    const borderBasics = getBorderBasics(variant)

    const baseStyles: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8, // אפשר להחליף ל-var(--radius-40) כשיהיה
        // לא shorthand כדי להימנע מבאגים עם var() ב-style/width:
        borderColor: defaultStyle.border,
        borderStyle: borderBasics.style as any,
        borderWidth: borderBasics.width as any,

        fontWeight: 500,
        fontFamily: 'inherit',
        cursor: disabled ? 'not-allowed' : 'pointer',
        width: fullWidth ? '100%' : undefined,
        opacity: disabled ? 0.5 : 1,
        background: defaultStyle.background,
        color: defaultStyle.text,
        transition: 'background 0.2s, border 0.2s, color 0.2s',
        ...sizeStyles[size],
        ...style,
    }

    let activeTimeout: ReturnType<typeof setTimeout> | null = null

    function setBtnStyle(
        el: HTMLElement | null,
        s: { background?: string; text?: string; border?: string }
    ) {
        if (!el) return
        if (s.background !== undefined) el.style.background = s.background
        if (s.text !== undefined) el.style.color = s.text
        if (s.border !== undefined) el.style.borderColor = s.border
    }

    const handleMouseOver = (e: React.MouseEvent<HTMLElement>) => {
        if (!disabled) setBtnStyle(e.currentTarget, hoverStyle)
    }
    const handleMouseOut = (e: React.MouseEvent<HTMLElement>) => {
        if (!disabled) setBtnStyle(e.currentTarget, defaultStyle)
    }
    const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
        if (!disabled) setBtnStyle(e.currentTarget, activeStyle)
    }
    const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
        if (disabled) return
        if (activeTimeout) clearTimeout(activeTimeout)
        activeTimeout = setTimeout(
            () => setBtnStyle(e.currentTarget, hoverStyle),
            70
        )
    }

    const htmlProps = rest as React.HTMLAttributes<HTMLElement>
    const Comp = Tag as unknown as React.ElementType

    return (
        <Comp
            type={type}
            onClick={disabled || loading ? undefined : onClick}
            aria-disabled={disabled || loading || undefined}
            className={clsx('crt-button', className)}
            style={baseStyles}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            {...htmlProps}
        >
            {loading ? (
                <>
                    <span style={{ marginInlineEnd: 8, lineHeight: 1 }}>
                        ⏳
                    </span>
                    <span>{loadingText || label}</span>
                </>
            ) : (
                <>
                    {icon && (
                        <span
                            style={{
                                marginInlineEnd: 8,
                                display: 'inline-flex',
                            }}
                        >
                            {icon}
                        </span>
                    )}
                    <span>{label}</span>
                </>
            )}
        </Comp>
    )
}
