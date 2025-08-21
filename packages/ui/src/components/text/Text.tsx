import clsx from 'clsx'
import React from 'react'
import type { TextProps } from './types'
import {
    LEADING_MAP,
    TRACKING_MAP,
    VARIANT_FONT_SIZE,
    VARIANT_LINE_HEIGHT,
    WEIGHT_MAP,
} from './utils'

/** Core text primitive */
export const Text: React.FC<TextProps> = ({
    as = 'p',
    children,
    className,
    style,
    variant = 'body',
    weight = 'regular',
    align = 'left',
    color,
    clamp,
    noWrap = false,
    underline = false,
    italic = false,
    leading = 'normal',
    tracking = 'normal',
    ...rest
}) => {
    // Limit to HTML tags only (no SVG)
    const Tag = (as ?? 'p') as keyof HTMLElementTagNameMap

    const computedStyle: React.CSSProperties = {
        // Typography tokens (can be wired to design tokens later)
        fontSize: VARIANT_FONT_SIZE[variant],
        lineHeight: VARIANT_LINE_HEIGHT[variant],
        fontWeight: WEIGHT_MAP[weight],
        letterSpacing: TRACKING_MAP[tracking],
        textAlign: align,
        color,
        textDecoration: underline ? 'underline' : undefined,
        fontStyle: italic ? 'italic' : undefined,

        // Flow control
        ...(noWrap
            ? {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
              }
            : null),

        // Multi-line clamp
        ...(clamp && clamp > 0
            ? {
                  display: '-webkit-box',
                  WebkitLineClamp: clamp,
                  WebkitBoxOrient: 'vertical' as any,
                  overflow: 'hidden',
              }
            : null),

        // Leading override
        ...(leading ? { lineHeight: LEADING_MAP[leading] ?? undefined } : null),

        ...style,
    }

    // Ensure we spread only HTML attributes
    const htmlProps = rest as React.HTMLAttributes<HTMLElement>
    const Comp = Tag as unknown as React.ElementType

    return (
        <Comp
            className={clsx('crt-text', className)}
            style={computedStyle}
            {...htmlProps}
        >
            {children}
        </Comp>
    )
}
