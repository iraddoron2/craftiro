import { TrackSectionLesson } from '@types'

export type TrackSection = {
    id: string
    title: string
    description: string
    tags: string[]
    startingDate: Date
    completionDate: Date
    lessons: TrackSectionLesson[]
}
