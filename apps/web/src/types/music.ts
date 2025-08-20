export type Notation = {
    original: string // TODO: Implement this
    simplified: string // TODO: Implement this
    simplifiedWithChordsDegrees: string // TODO: Implement this
    simplifiedWithNotesNames: string // TODO: Implement this
    lyrics: string // TODO: Implement this
    lyricsAndChords: string // TODO: Implement this
}

export type LeadSheet = {
    id: string
    title: string
    composers: string[]
    arrangers: string[]
    year: number
    month: number
    day: number
    key: string
    timeSignature: string
    tempo: number
    bars: number
    notation: Notation
}

export type NoteLength =
    | 'whole'
    | 'half'
    | 'quarter'
    | 'eighth'
    | 'sixteenth'
    | 'half-dotted'
    | 'quarter-dotted'
    | 'eighth-dotted'
    | 'sixteenth-dotted'
    | 'half-triplet'
    | 'quarter-triplet'
    | 'eighth-triplet'
    | 'sixteenth-triplet'

export type LeadSheetPiece = LeadSheet & {
    tags: string[]
    diffecilty: number // 1-10
    noteLengthIncluded: NoteLength[]
    lowestNote: string
    highestNote: string
}

export type LeadSheetSong = LeadSheet & {
    lyricists: string[]
    performers: string[]
    album: string
    track: number
}

export type LeadSheetCinemaPiece = {
    lyricists: string[]
    movie: string
}

export type MusicPiece = LeadSheetPiece | LeadSheetSong | LeadSheetCinemaPiece
