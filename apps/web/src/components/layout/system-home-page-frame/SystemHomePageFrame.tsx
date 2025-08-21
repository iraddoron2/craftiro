import { Section } from '@craftiro/ui'
import React from 'react'

export type SystemHomePageFrameProps = {
    children?: React.ReactNode
}

export const SystemHomePageFrame = ({ children }: SystemHomePageFrameProps) => {
    return (
        <Section
            // className=
            padding="none"
            style={{
                position: 'relative',
                minHeight: '100dvh',
                overflow: 'visible',
                display: 'block',
            }}
        >
            {children}
        </Section>
    )
}
