import { CraftElementBase } from './craftElementBase'

export type CraftTextSegment = CraftElementBase & {
    type: 'textSegment'
    text: string
    linkUrl?: string // Optional, relevant if decorations includes 'link'
}
