import { CraftiroParagraph, CraftiroTextSegment } from '@/types'
import { CraftiroYoutubeVideo } from './craftiroYoutubeVideo'

export type CraftiroElement =
    | CraftiroParagraph
    | CraftiroTextSegment
    | CraftiroYoutubeVideo
