import { CraftTextDecoration } from '@types'

export type CraftTextSegment = {
    text: string
    decorations?: CraftTextDecoration[]
    linkUrl?: string // Optional, relevant if decorations includes 'link'
    color?: string
    fontSize?: number | string
    fontFamily?: string
}
