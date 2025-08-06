import { CraftiroElementBase } from './craftiroElementBase'
import { CraftiroTextSegment } from './craftiroTextSegment'

export type CraftiroParagraph = CraftiroElementBase & {
    type: 'paragraph'
    content: CraftiroTextSegment[] // Array of styled text segments ("rich text" style)
}
