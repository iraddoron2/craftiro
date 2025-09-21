import { CraftiroElementBase } from './craftiroElementBase'

export type CraftiroTextSegment = CraftiroElementBase & {
    type: 'textSegment'
    content: string
    linkUrl?: string // Optional, relevant if decorations includes 'link'
}
