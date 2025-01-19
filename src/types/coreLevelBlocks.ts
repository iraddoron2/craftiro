import { MusicPiece } from './music'

export type LevelParagraph = string

export type LevelSubtitle = string

export type LevelTitle = string

export type LevelYouTubeIframe = {
    url: string
    width: number
    height: number
}

export type LevelOrderedList = {
    items: string[]
}

export type LevelUnorderedList = {
    items: string[]
}

export type LevelImage = {
    src: string
    alt: string
}

export type LevelParagraphTitle = string

export type LevelMusicPiece = {
    piece: MusicPiece
}
