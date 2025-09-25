import { elementsSizes } from '@/styles'
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
            className="system-home-page-frame"
            style={{
                position: 'relative',
                paddingInlineEnd: elementsSizes.pagesNavbarWidth, // מפנה מקום לתפריט הימני
                // minHeight: '100dvh',
                overflow: 'clip',
                ...style,
            }}
        >
            {children}
        </Section>
    )
}
