import { CraftElementBase } from './craftElementBase'

export type CraftTextSegment = CraftElementBase & {
    text: string
    linkUrl?: string // Optional, relevant if decorations includes 'link'
}
