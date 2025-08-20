import clsx from 'clsx'
import React from 'react'
import type { SectionProps, SectionTag } from './types'
import { MAX_WIDTH_MAP, PADDING_MAP } from './utils'

export const Section: React.FC<SectionProps> = ({
    as = 'section',
    children,
    className,
    style,
    container = false,
    maxWidth = 'xl',
    padding = 'lg',
    bleed = false,
    ...rest
}) => {
    // Limit to HTML tags only (no SVG)
    const Tag = (as ?? 'section') as keyof HTMLElementTagNameMap

    const px = bleed ? 0 : PADDING_MAP[padding]
    const py = PADDING_MAP[padding]

    const computedStyle: React.CSSProperties = {
        width: '100%',
        paddingTop: py,
        paddingBottom: py,
        paddingLeft: px,
        paddingRight: px,
        ...(container
            ? {
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  maxWidth: MAX_WIDTH_MAP[maxWidth],
              }
            : null),
        ...style,
    }

    // Ensure we spread only HTML attributes
    const htmlProps = rest as React.HTMLAttributes<HTMLElement>

    const Comp = Tag as unknown as React.ElementType

    return (
        <Comp
            className={clsx('crt-section', className)}
            style={computedStyle}
            {...htmlProps}
        >
            {children}
        </Comp>
    )
}
