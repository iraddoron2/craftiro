import { Section } from '@craftiro/ui'
import React from 'react'

export type SystemHomePageFrameProps = {
    children?: React.ReactNode
    style?: React.CSSProperties
}

export const SystemHomePageFrame = ({
    children,
    style,
}: SystemHomePageFrameProps) => {
    return (
        <Section
            padding="none"
            style={{
                position: 'relative',
                minHeight: '100dvh',
                overflow: 'visible',
                display: 'block',
                ...style,
            }}
        >
            {children}
        </Section>
    )
}
