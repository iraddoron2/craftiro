import type { CSSProperties } from 'react'

export type CraftElementBase = {
    id: string // Unique identifier for the element
    style?: CSSProperties
    className?: string // CSS class for further style extension
    createdAt?: string // ISO date, if you want to track creation
    updatedAt?: string // ISO date, if you want to track last edit
    authorId?: string // Id of the user who created/edited the paragraph
    customAttributes?: Record<string, unknown> // For any extra data, extensions, tracking, A/B etc.
}
