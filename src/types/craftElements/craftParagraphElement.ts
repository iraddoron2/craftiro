import type { CSSProperties } from 'react'
import { CraftTextSegment } from './craftTextSegment'

export type CraftParagraphElement = {
    id: string // Unique id for the element instance
    type: 'paragraph'
    content: CraftTextSegment[] // Array of styled text segments ("rich text" style)
    align?: 'left' | 'center' | 'right' | 'justify'
    style?: CSSProperties
    className?: string // CSS class for further style extension
    children?: never // For future extensibility (could allow nested elements)
    editable?: boolean // For content-editable UI
    customAttributes?: Record<string, unknown> // For any extra data, extensions, tracking, A/B etc.
    createdAt?: string // ISO date, if you want to track creation
    updatedAt?: string // ISO date, if you want to track last edit
    authorId?: string // Id of the user who created/edited the paragraph
}
