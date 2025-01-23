import * as CoreLevelBlocks from './coreLevelBlocks'

export type InfoLevelBlock =
    | CoreLevelBlocks.LevelParagraph
    | CoreLevelBlocks.LevelSubtitle
    | CoreLevelBlocks.LevelTitle
    | CoreLevelBlocks.LevelYouTubeIframe
    | CoreLevelBlocks.LevelOrderedList
    | CoreLevelBlocks.LevelUnorderedList
    | CoreLevelBlocks.LevelImage
    | CoreLevelBlocks.LevelParagraphTitle

export type InfoLevel = InfoLevelBlock[]

export type FeynmanLevelBlock =
    | CoreLevelBlocks.LevelParagraph
    | CoreLevelBlocks.LevelOrderedList
    | CoreLevelBlocks.LevelUnorderedList

export type FeynmanLevel = InfoLevelBlock[]

export type MusicPieceLevelBlock = CoreLevelBlocks.LevelParagraph

export type Level = InfoLevel | FeynmanLevel
