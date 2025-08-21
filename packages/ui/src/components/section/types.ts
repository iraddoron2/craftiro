import React from 'react'

export type SectionTag = 'section' | 'div' | 'article' | 'aside' | 'main'

export type SectionMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export type SectionPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export interface SectionProps
    extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
    /** Which HTML tag to render */
    as?: SectionTag
    /** Children inside the section */
    children?: React.ReactNode
    /** If true, centers content and constrains width */
    container?: boolean
    /** Max container width (when container=true) */
    maxWidth?: SectionMaxWidth
    /** Internal padding scale */
    padding?: SectionPadding
    /** Remove horizontal padding (useful for full-bleed sections) */
    bleed?: boolean
}
