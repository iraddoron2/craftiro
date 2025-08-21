import clsx from 'clsx'
import React from 'react'
import type {
    PolymorphicProps,
    StackAlign,
    StackJustify,
    StackOwnProps,
} from './types'

export function Stack<T extends React.ElementType = 'div'>({
    as,
    direction = 'column',
    gap = 0,
    align = 'stretch',
    justify = 'start',
    wrap = false,
    className,
    style,
    children,
    ...rest
}: PolymorphicProps<T, StackOwnProps>) {
    const Tag = (as || 'div') as React.ElementType

    // map לערכי CSS
    const alignMap: Record<StackAlign, React.CSSProperties['alignItems']> = {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
        stretch: 'stretch',
        baseline: 'baseline',
    }
    const justifyMap: Record<
        StackJustify,
        React.CSSProperties['justifyContent']
    > = {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
        between: 'space-between',
        around: 'space-around',
        evenly: 'space-evenly',
    }

    return (
        <Tag
            className={clsx('crt-stack', className)}
            style={{
                display: 'flex',
                flexDirection: direction,
                gap,
                alignItems: alignMap[align],
                justifyContent: justifyMap[justify],
                flexWrap: wrap ? 'wrap' : 'nowrap',
                ...style,
            }}
            {...rest} // <-- כאן onClick יגיע עם הטיפוס המדויק מתוך ComponentPropsWithoutRef<T>
        >
            {children}
        </Tag>
    )
}
