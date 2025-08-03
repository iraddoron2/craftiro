import { TaskStatus, TrackSection } from '@types'

export type Track = {
    id: string
    title: string
    description: string
    sections: TrackSection[]
    status: TaskStatus
    startingDate: Date
    completionDate: Date
    tags: string[]
}
