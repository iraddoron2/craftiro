import { CraftElementBase } from './craftElementBase'
import { CraftTextSegment } from './craftTextSegment'

export type CraftParagraph = CraftElementBase & {
    type: 'paragraph'
    content: CraftTextSegment[] // Array of styled text segments ("rich text" style)
}
